import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckCircle, PlayCircle, Image as ImageIcon, ShoppingCart, ArrowRight, UserCircle, Store, Rocket, Server, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/pages/NotFoundPage';

const plansMasterData = [
  {
    id: 'personalPortfolio',
    icon: UserCircle,
    accentColor: 'blue-500',
    titleKey: 'planPersonalPortfolioTitle',
    subtitleKey: 'planPersonalPortfolioSubtitle',
    basePriceKey: 'planPersonalPortfolioBasePrice',
    deliveryTimeKey: 'planPersonalPortfolioDelivery',
    features: [
      { key: 'f1', textKey: 'planPersonalPortfolioFeature1', icon: CheckCircle },
      { key: 'f2', textKey: 'planPersonalPortfolioFeature2', icon: CheckCircle },
      { key: 'f3', textKey: 'planPersonalPortfolioFeature3', icon: CheckCircle },
    ],
    addons: [
      { key: 'logo', textKey: 'planPersonalPortfolioAddonLogo', priceKey: 'planPersonalPortfolioAddonLogoPrice' },
      { key: 'content', textKey: 'planPersonalPortfolioAddonContent', priceKey: 'planPersonalPortfolioAddonContentPrice' },
    ],
    orderLink: '#order-personal-detail', // Example, can be more specific
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80', // Placeholder
  },
  {
    id: 'startupBusiness',
    icon: Rocket,
    accentColor: 'green-500',
    titleKey: 'planStartupBusinessTitle',
    subtitleKey: 'planStartupBusinessSubtitle',
    basePriceKey: 'planStartupBusinessBasePrice',
    deliveryTimeKey: 'planStartupBusinessDelivery',
    features: [
      { key: 'f1', textKey: 'planStartupBusinessFeature1', icon: CheckCircle },
      { key: 'f2', textKey: 'planStartupBusinessFeature2', icon: CheckCircle },
      { key: 'f3', textKey: 'planStartupBusinessFeature3', icon: CheckCircle },
      { key: 'f4', textKey: 'planStartupBusinessFeature4', icon: CheckCircle },
    ],
    addons: [
      { key: 'blog', textKey: 'planStartupBusinessAddonBlog', priceKey: 'planStartupBusinessAddonBlogPrice' },
      { key: 'analytics', textKey: 'planStartupBusinessAddonAnalytics', priceKey: 'planStartupBusinessAddonAnalyticsPrice' },
    ],
    orderLink: '#order-startup-detail',
    videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso', // Placeholder
    imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', // Placeholder
  },
  {
    id: 'ecommerceStore',
    icon: Store,
    accentColor: 'purple-500',
    titleKey: 'planEcommerceStoreTitle',
    subtitleKey: 'planEcommerceStoreSubtitle',
    basePriceKey: 'planEcommerceStoreBasePrice',
    deliveryTimeKey: 'planEcommerceStoreDelivery',
    features: [
        { key: 'f1', textKey: 'planEcommerceStoreFeature1', icon: CheckCircle },
        { key: 'f2', textKey: 'planEcommerceStoreFeature2', icon: CheckCircle },
        { key: 'f3', textKey: 'planEcommerceStoreFeature3', icon: CheckCircle },
        { key: 'f4', textKey: 'planEcommerceStoreFeature4', icon: CheckCircle },
        { key: 'f5', textKey: 'planEcommerceStoreFeature5', icon: CheckCircle },
    ],
    addons: [
        { key: 'products', textKey: 'planEcommerceStoreAddonProducts', priceKey: 'planEcommerceStoreAddonProductsPrice' },
        { key: 'marketing', textKey: 'planEcommerceStoreAddonMarketing', priceKey: 'planEcommerceStoreAddonMarketingPrice' },
    ],
    orderLink: '#order-ecommerce-detail',
    videoUrl: 'https://www.youtube.com/embed/h4pxLHG0Wzs', // Placeholder
    imageUrl: 'https://images.unsplash.com/photo-1585160994900-00799421013e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', // Placeholder
  },
  {
    id: 'corporateWebsite',
    icon: Server,
    accentColor: 'yellow-500',
    titleKey: 'planCorporateWebsiteTitle',
    subtitleKey: 'planCorporateWebsiteSubtitle',
    basePriceKey: 'planCorporateWebsiteBasePrice',
    deliveryTimeKey: 'planCorporateWebsiteDelivery',
    features: [
        { key: 'f1', textKey: 'planCorporateWebsiteFeature1', icon: CheckCircle },
        { key: 'f2', textKey: 'planCorporateWebsiteFeature2', icon: CheckCircle },
        { key: 'f3', textKey: 'planCorporateWebsiteFeature3', icon: CheckCircle },
        { key: 'f4', textKey: 'planCorporateWebsiteFeature4', icon: CheckCircle },
        { key: 'f5', textKey: 'planCorporateWebsiteFeature5', icon: CheckCircle },
    ],
    addons: [
        { key: 'seo', textKey: 'planCorporateWebsiteAddonSeo', priceKey: 'planCorporateWebsiteAddonSeoPrice' },
        { key: 'maintenance', textKey: 'planCorporateWebsiteAddonMaintenance', priceKey: 'planCorporateWebsiteAddonMaintenancePrice' },
    ],
    orderLink: '#order-corporate-detail',
    videoUrl: 'https://www.youtube.com/embed/6g2g2y40L-Y', // Placeholder
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80', // Placeholder
  },
  {
    id: 'customPlatform',
    icon: Layers,
    accentColor: 'red-500',
    titleKey: 'planCustomPlatformTitle',
    subtitleKey: 'planCustomPlatformSubtitle',
    basePriceKey: 'planCustomPlatformBasePrice',
    deliveryTimeKey: 'planCustomPlatformDelivery',
    features: [
        { key: 'f1', textKey: 'planCustomPlatformFeature1', icon: CheckCircle },
        { key: 'f2', textKey: 'planCustomPlatformFeature2', icon: CheckCircle },
        { key: 'f3', textKey: 'planCustomPlatformFeature3', icon: CheckCircle },
        { key: 'f4', textKey: 'planCustomPlatformFeature4', icon: CheckCircle },
        { key: 'f5', textKey: 'planCustomPlatformFeature5', icon: CheckCircle },
        { key: 'f6', textKey: 'planCustomPlatformFeature6', icon: CheckCircle },
    ],
    addons: [
        { key: 'mobile', textKey: 'planCustomPlatformAddonMobile', priceKey: 'planCustomPlatformAddonMobilePrice' },
        { key: 'ai', textKey: 'planCustomPlatformAddonAi', priceKey: 'planCustomPlatformAddonAiPrice' },
    ],
    orderLink: '#order-custom-detail',
    videoUrl: 'https://www.youtube.com/embed/3tmd-ClpJxA', // Placeholder
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', // Placeholder
  }
];


const PlanDetailPage = () => {
  const { planId } = useParams();
  const { t, i18n } = useTranslation();
  const [selectedAddons, setSelectedAddons] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const plan = plansMasterData.find(p => p.id === planId);

  const getRawPrice = (priceKey) => {
    const translatedPrice = t(priceKey);
    if (typeof translatedPrice === 'string' && (translatedPrice.toLowerCase() === 'contact for estimate' || translatedPrice.toLowerCase() === 'تماس بگیرید' || translatedPrice.toLowerCase() === 'اتصل بنا')) {
      return null;
    }
    return parseFloat(translatedPrice.replace(/[^0-9.-]+/g,""));
  };

  const basePrice = plan ? getRawPrice(plan.basePriceKey) : 0;

  useEffect(() => {
    if (!plan) return;
    let currentTotal = basePrice;
    if (currentTotal === null) {
      setTotalPrice(null);
      return;
    }

    Object.keys(selectedAddons).forEach(addonKey => {
      if (selectedAddons[addonKey]) {
        const addonPrice = getRawPrice(plan.addons.find(a => a.key === addonKey)?.priceKey);
        if (addonPrice !== null) {
          currentTotal += addonPrice;
        }
      }
    });
    setTotalPrice(currentTotal);
  }, [selectedAddons, i18n.language, plan, t]);


  if (!plan) {
    return <NotFoundPage />;
  }

  const handleAddonToggle = (addonKey) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonKey]: !prev[addonKey]
    }));
  };

  const getCurrencySymbol = () => {
    switch (i18n.language) {
      case 'fa': return t('currencyIRR');
      case 'ar': return t('currencyAED');
      default: return t('currencyUSD');
    }
  };

  const formatPrice = (price) => {
    if (price === null) {
      return t(plan.basePriceKey);
    }
    const symbol = getCurrencySymbol();
    const numberFormat = new Intl.NumberFormat(i18n.language === 'fa' ? 'fa-IR' : i18n.language === 'ar' ? 'ar-AE' : 'en-US');
    const formattedPrice = numberFormat.format(price);
    return i18n.language === 'en' ? `${symbol}${formattedPrice}` : `${formattedPrice} ${symbol}`;
  };

  const PlanIcon = plan.icon;
  const accentColor = plan.accentColor;
  const accentTextClass = `text-${accentColor}`;
  const accentBgClass = `bg-${accentColor}`;
  const accentHoverBgClass = `hover:bg-${accentColor}/90`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-8"
    >
      <Helmet>
        <title>{`${t(plan.titleKey)} - ${t('websdew')}`}</title>
        <meta name="description" content={`${t(plan.subtitleKey)}. ${t('planDetailDescription')}`} />
        <meta property="og:title" content={`${t(plan.titleKey)} - ${t('websdew')}`} />
        <meta property="og:description" content={`${t(plan.subtitleKey)}. ${t('planDetailDescription')}`} />
        <meta property="og:image" content={plan.imageUrl} />
      </Helmet>

      <header className="mb-12 text-center">
        <div className={cn("w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto", accentBgClass, `bg-opacity-20`)}>
          <PlanIcon className={cn("w-12 h-12", accentTextClass)} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground">{t(plan.titleKey)}</h1>
        <p className={cn("text-xl md:text-2xl font-medium", accentTextClass)}>{t(plan.subtitleKey)}</p>
        <p className="text-lg text-muted-foreground mt-2">{t('deliveryTime')}: {t(plan.deliveryTimeKey)}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <motion.div initial={{ opacity:0, x: -50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('planDetailDescription')}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t('planDetailDescription')} {/* Replace with specific plan description if available */}
          </p>
          <h3 className="text-xl font-semibold mb-3 text-foreground">{t('features')}</h3>
          <ul className="space-y-3">
            {plan.features.map(feature => {
              const FeatureIcon = feature.icon || CheckCircle;
              return (
                <li key={feature.key} className="flex items-start text-muted-foreground">
                  <FeatureIcon className={cn("w-5 h-5 mr-3 rtl:ml-3 mt-1 shrink-0", accentTextClass)} />
                  <span>{t(feature.textKey)} - <span className="text-xs">{t('planFeatureIconDesc')}</span></span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity:0, x: 50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-foreground">{t('videoPlaceholderTitle')}</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
              {plan.videoUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={plan.videoUrl}
                  title={t(plan.titleKey) + " Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{t('imagePlaceholderTitle')}</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
              <img-replace src={plan.imageUrl} alt={t(plan.titleKey)} className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity:0, y: 50 }} animate={{ opacity:1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-card/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border border-border/40 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">{t('pricingPlans')} & {t('addOns')}</h2>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <p className="text-5xl font-extrabold text-foreground mb-1">{formatPrice(basePrice)}</p>
            <p className="text-sm text-muted-foreground">{t('oneTime')}</p>
          </div>

          {plan.addons && plan.addons.length > 0 && (
            <div className="space-y-4 mb-8">
              {plan.addons.map(addon => {
                const addonPrice = getRawPrice(addon.priceKey);
                return (
                <div key={addon.key} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/20">
                  <Label htmlFor={`detail-${plan.id}-${addon.key}`} className="flex flex-col text-sm cursor-pointer">
                    <span className="font-medium text-foreground">{t(addon.textKey)}</span>
                    {addonPrice !== null && <span className={cn("text-xs", accentTextClass)}>+ {formatPrice(addonPrice)}</span>}
                  </Label>
                  <Switch
                    id={`detail-${plan.id}-${addon.key}`}
                    checked={!!selectedAddons[addon.key]}
                    onCheckedChange={() => handleAddonToggle(addon.key)}
                    className={cn(`data-[state=checked]:${accentBgClass}`)}
                  />
                </div>
              )})}
            </div>
          )}

          {totalPrice !== null && (
            <div className="text-center mb-8 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary uppercase tracking-wider font-semibold">{t('totalPrice')}</p>
              <p className="text-4xl font-bold text-primary">{formatPrice(totalPrice)}</p>
            </div>
          )}
          <Button 
            asChild 
            size="lg" 
            className={cn("w-full group text-lg py-6", accentBgClass, accentHoverBgClass, `text-primary-foreground shadow-xl`)}
          >
            <a href={plan.orderLink} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 rtl:ml-2 h-6 w-6" />
              {t('orderNow')}
              <ArrowRight className="ml-2 rtl:mr-2 h-6 w-6 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-foreground">WordPress Shortcode Area</h3>
        <p className="text-sm text-muted-foreground mb-3">{t('wordpressShortcodePlaceholder')}</p>
        <div className="p-4 border-2 border-dashed border-border/50 rounded-md text-muted-foreground bg-background/50">
          {t('comingSoonDetail')}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default PlanDetailPage;