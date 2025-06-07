import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CrmPricingCard = ({ plan }) => {
  const { t, i18n } = useTranslation();

  const getCurrencySymbol = () => {
    const lang = i18n.language;
    if (lang === 'fa') return t('currencyTOMAN');
    if (lang === 'ar') return t('currencyAED');
    if (lang === 'de' || lang === 'it') return t('currencyEUR');
    return t('currencyUSD');
  };

  const formatPrice = (priceKey, periodKey) => {
    const priceVal = t(priceKey);
    const rawPrice = parseFloat(priceVal.replace(/[^0-9.-]+/g,""));

    if (isNaN(rawPrice)) { // Handle cases like "Contact for estimate"
        return t(priceKey); 
    }
    
    if (rawPrice === 0 && plan.id === 'crmFreeTrial') {
      return `${t('crmFreeTrialPrice')} / ${t(periodKey)}`;
    }

    const symbol = getCurrencySymbol();
    const period = t(periodKey);
    
    const numberFormat = new Intl.NumberFormat(
      i18n.language === 'fa' ? 'fa-IR' : 
      i18n.language === 'ar' ? 'ar-AE' : 
      (i18n.language === 'de' || i18n.language === 'it') ? `${i18n.language}-DE` : // Use DE for Euro formatting for both
      'en-US'
    );
    const formattedPrice = numberFormat.format(rawPrice);

    if (i18n.language === 'en' || i18n.language === 'de' || i18n.language === 'it') {
      return `${symbol}${formattedPrice} / ${period}`;
    }
    return `${formattedPrice} ${symbol} / ${period}`;
  };

  const PlanIcon = plan.icon;
  const isPopular = plan.id === 'crmProfessional';

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(var(--primary-rgb), 0.1), 0 10px 10px -5px rgba(var(--primary-rgb), 0.04)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Card className={cn(
        "flex flex-col h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out",
        isPopular ? "border-2 border-primary bg-primary/5" : "bg-card",
        "dark:bg-card/80 dark:backdrop-blur-sm"
      )}>
        {isPopular && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg z-10 rtl:left-0 rtl:right-auto rtl:rounded-br-lg">
            {t('recommended')}
          </div>
        )}
        <CardHeader className="p-6 text-center">
          <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto", plan.iconBgColor || 'bg-primary/10')}>
            <PlanIcon className={cn("w-8 h-8", plan.iconColor || 'text-primary')} />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">{t(plan.titleKey)}</CardTitle>
          <CardDescription className={cn("text-lg font-semibold", plan.iconColor || 'text-primary')}>
            {formatPrice(plan.priceKey, plan.periodKey)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-6 space-y-4">
          <p className="text-sm text-muted-foreground text-center min-h-[40px]">{t(plan.descriptionKey)}</p>
          <ul className="space-y-2">
            {plan.features.map((featureKey, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 rtl:ml-2 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{t(featureKey)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="p-6">
          <Button asChild size="lg" className={cn(
            "w-full group",
            isPopular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-gradient-to-r from-secondary to-muted-foreground/80 hover:from-secondary/90 hover:to-muted-foreground/90 text-secondary-foreground"
          )}>
            <Link to={`/crm-plan/${plan.id}`}>
              {t(plan.id === 'crmFreeTrial' ? 'startFreeTrial' : 'subscribeNow')}
              <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CrmPricingCard;