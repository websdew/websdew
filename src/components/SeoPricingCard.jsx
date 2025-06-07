import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SeoPricingCard = ({ plan, onOrder }) => {
  const { t, i18n } = useTranslation();

  const getCurrencySymbol = () => {
    const lang = i18n.language;
    if (lang === 'fa') return t('currencyTOMAN');
    if (lang === 'ar') return t('currencyAED');
    if (lang === 'de' || lang === 'it') return t('currencyEUR');
    return t('currencyUSD');
  };

  const renderFeature = (feature) => {
    const isExcluded = feature.startsWith('<s>');
    const featureText = isExcluded ? feature.substring(3, feature.length - 4) : feature;

    return (
      <li key={featureText} className={`flex items-start space-x-2 rtl:space-x-reverse ${isExcluded ? 'text-muted-foreground/70' : 'text-foreground'}`}>
        {isExcluded ? <XCircle className="h-5 w-5 text-red-500/70 mt-0.5 shrink-0" /> : <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />}
        <span className={isExcluded ? 'line-through' : ''}>{t(featureText)}</span>
      </li>
    );
  };
  
  const rawPrice = parseFloat(String(t(plan.price)).replace(/[^0-9.-]+/g,""));
  const numberFormat = new Intl.NumberFormat(
    i18n.language === 'fa' ? 'fa-IR' : 
    i18n.language === 'ar' ? 'ar-AE' : 
    (i18n.language === 'de' || i18n.language === 'it') ? `${i18n.language}-DE` :
    'en-US'
  );
  const formattedPrice = isNaN(rawPrice) ? t(plan.price) : numberFormat.format(rawPrice);
  const currencySymbol = getCurrencySymbol();
  
  const priceText = (i18n.language === 'en' || i18n.language === 'de' || i18n.language === 'it') 
    ? `${currencySymbol}${formattedPrice}` 
    : `${formattedPrice} ${currencySymbol}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col h-full w-full ${plan.recommended ? 'border-2 border-primary shadow-2xl transform md:scale-105' : 'border-border'}`}
    >
      <Card className={`flex flex-col flex-grow h-full bg-card/80 backdrop-blur-xs ${plan.recommended ? 'bg-gradient-to-br from-primary/10 to-background' : ''}`}>
        {plan.recommended && (
          <div className="absolute -top-3 -right-3 rtl:-left-3 rtl:-right-auto bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
            {t('recommended')}
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-xl lg:text-2xl font-bold text-primary">{t(plan.title)}</CardTitle>
          <CardDescription className="text-muted-foreground min-h-[40px] text-sm">{t(plan.description)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mb-6">
            <span className="text-3xl lg:text-4xl font-extrabold text-foreground">{priceText}</span>
            <span className="text-sm text-muted-foreground"> {t(plan.period)}</span>
          </div>
          <ul className="space-y-2 text-sm">
            {plan.features.map(renderFeature)}
          </ul>
          {plan.finalLine && <p className="mt-4 text-sm text-primary font-medium">{t(plan.finalLine)}</p>}
        </CardContent>
        <CardFooter>
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transition-transform hover:scale-105"
            onClick={() => onOrder(plan.id)}
          >
            {t('orderNow')}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SeoPricingCard;