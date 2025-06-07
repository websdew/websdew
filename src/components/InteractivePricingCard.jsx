import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const InteractivePricingCard = ({ plan, icon: PlanIcon, accentColor = 'primary' }) => {
  const { t, i18n } = useTranslation();
  const [selectedAddons, setSelectedAddons] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(null);

  const getRawPrice = (priceKey) => {
    const translatedPrice = t(priceKey);
    if (typeof translatedPrice === 'string' && (translatedPrice.toLowerCase().includes('contact for estimate') || translatedPrice.includes('تماس بگیرید') || translatedPrice.includes('اتصل بنا'))) {
      return null; 
    }
    const numericString = String(translatedPrice).replace(/[^0-9.-]+/g, "");
    const parsedPrice = parseFloat(numericString);
    return isNaN(parsedPrice) ? null : parsedPrice;
  };
  
  useEffect(() => {
    const initialBasePrice = getRawPrice(plan.basePriceKey);
    setBasePrice(initialBasePrice);
    setTotalPrice(initialBasePrice);
  }, [i18n.language, plan.basePriceKey, t]);

  useEffect(() => {
    if (basePrice === null) {
      setTotalPrice(null);
      return;
    }

    let currentTotal = basePrice;
    Object.keys(selectedAddons).forEach(addonKey => {
      if (selectedAddons[addonKey]) {
        const addon = plan.addons.find(a => a.key === addonKey);
        if (addon) {
          const addonPrice = getRawPrice(addon.priceKey);
          if (addonPrice !== null) {
            currentTotal += addonPrice;
          }
        }
      }
    });
    setTotalPrice(currentTotal);
  }, [selectedAddons, basePrice, plan.addons, i18n.language, t]);

  const handleAddonToggle = (addonKey) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonKey]: !prev[addonKey]
    }));
  };

  const getCurrencySymbol = () => {
    const lang = i18n.language;
    if (lang === 'fa') return t('currencyTOMAN');
    if (lang === 'ar') return t('currencyAED');
    if (lang === 'de' || lang === 'it') return t('currencyEUR');
    return t('currencyUSD');
  };

  const formatPrice = (price) => {
    if (price === null || isNaN(price)) {
      return t(plan.basePriceKey); 
    }
    const symbol = getCurrencySymbol();
    const numberFormat = new Intl.NumberFormat(
      i18n.language === 'fa' ? 'fa-IR' : 
      i18n.language === 'ar' ? 'ar-AE' : 
      (i18n.language === 'de' || i18n.language === 'it') ? `${i18n.language}-DE` :
      'en-US'
    );
    const formattedPrice = numberFormat.format(price);

    if (i18n.language === 'en' || i18n.language === 'de' || i18n.language === 'it') {
      return `${symbol}${formattedPrice}`;
    }
    return `${formattedPrice} ${symbol}`;
  };

  const cardVariants = {
    rest: { scale: 1, boxShadow: "0px 5px 10px rgba(0,0,0,0.05)" },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }
  };

  const accentBorderClass = `border-${accentColor}`;
  const accentTextClass = `text-${accentColor}`;
  const accentBgClass = `bg-${accentColor}`;
  const accentHoverBgClass = `hover:bg-${accentColor}/90`;


  return (
    <motion.div variants={cardVariants} initial="rest" whileHover="hover" transition={{ type: "spring", stiffness: 300 }}>
      <Card className={cn("flex flex-col h-full rounded-2xl overflow-hidden shadow-lg border-2", accentBorderClass, `bg-card/70 backdrop-blur-sm`)}>
        <CardHeader className="p-6 space-y-3">
          <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-3", accentBgClass, `bg-opacity-20`)}>
            <PlanIcon className={cn("w-8 h-8", accentTextClass)} />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">{t(plan.titleKey)}</CardTitle>
          <CardDescription className={cn("text-sm", accentTextClass, `font-medium`)}>{t(plan.subtitleKey)}</CardDescription>
        </CardHeader>

        <CardContent className="p-6 flex-grow space-y-6">
          <div>
            <p className="text-4xl font-extrabold text-foreground mb-1">{formatPrice(basePrice)}</p>
            <p className="text-xs text-muted-foreground">{t('deliveryTime')}: {t(plan.deliveryTimeKey)}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground">{t('features')}</h4>
            <ul className="space-y-2">
              {plan.features.map(feature => (
                <li key={feature.key} className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 rtl:ml-2 text-green-500 shrink-0" />
                  {t(feature.textKey)}
                </li>
              ))}
            </ul>
          </div>

          {plan.addons && plan.addons.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">{t('addOns')}</h4>
              <div className="space-y-3">
                {plan.addons.map(addon => {
                  const addonPrice = getRawPrice(addon.priceKey);
                  return (
                  <div key={addon.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor={`${plan.id}-${addon.key}`} className="flex flex-col text-sm cursor-pointer">
                      <span className="font-medium text-foreground">{t(addon.textKey)}</span>
                      {addonPrice !== null && <span className={cn("text-xs", accentTextClass)}>+ {formatPrice(addonPrice)}</span>}
                    </Label>
                    <Switch
                      id={`${plan.id}-${addon.key}`}
                      checked={!!selectedAddons[addon.key]}
                      onCheckedChange={() => handleAddonToggle(addon.key)}
                      className={cn(`data-[state=checked]:${accentBgClass}`)}
                    />
                  </div>
                )})}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 bg-muted/30 flex-col items-stretch space-y-4">
          {totalPrice !== null && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('totalPrice')}</p>
              <p className="text-3xl font-bold text-foreground">{formatPrice(totalPrice)}</p>
            </div>
          )}
          <Button 
            asChild 
            size="lg" 
            className={cn("w-full group", accentBgClass, accentHoverBgClass, `text-primary-foreground shadow-lg`)}
          >
            <Link to={`/plan/${plan.id}`}>
              {t('orderNow')}
              <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default InteractivePricingCard;