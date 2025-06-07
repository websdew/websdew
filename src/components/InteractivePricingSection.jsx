import React from 'react';
import { useTranslation } from 'react-i18next';
import InteractivePricingCard from '@/components/InteractivePricingCard';
import { motion } from 'framer-motion';
import { UserCircle, Store, Rocket, Server, Layers } from 'lucide-react';

const plansData = [
  {
    id: 'personalPortfolio',
    icon: UserCircle,
    accentColor: 'blue-500',
    titleKey: 'planPersonalPortfolioTitle',
    subtitleKey: 'planPersonalPortfolioSubtitle',
    basePriceKey: 'planPersonalPortfolioBasePrice',
    deliveryTimeKey: 'planPersonalPortfolioDelivery',
    features: [
      { key: 'f1', textKey: 'planPersonalPortfolioFeature1' },
      { key: 'f2', textKey: 'planPersonalPortfolioFeature2' },
      { key: 'f3', textKey: 'planPersonalPortfolioFeature3' },
    ],
    addons: [
      { key: 'logo', textKey: 'planPersonalPortfolioAddonLogo', priceKey: 'planPersonalPortfolioAddonLogoPrice' },
      { key: 'content', textKey: 'planPersonalPortfolioAddonContent', priceKey: 'planPersonalPortfolioAddonContentPrice' },
    ],
    orderLink: '#order-personal',
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
      { key: 'f1', textKey: 'planStartupBusinessFeature1' },
      { key: 'f2', textKey: 'planStartupBusinessFeature2' },
      { key: 'f3', textKey: 'planStartupBusinessFeature3' },
      { key: 'f4', textKey: 'planStartupBusinessFeature4' },
    ],
    addons: [
      { key: 'blog', textKey: 'planStartupBusinessAddonBlog', priceKey: 'planStartupBusinessAddonBlogPrice' },
      { key: 'analytics', textKey: 'planStartupBusinessAddonAnalytics', priceKey: 'planStartupBusinessAddonAnalyticsPrice' },
    ],
    orderLink: '#order-startup',
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
      { key: 'f1', textKey: 'planEcommerceStoreFeature1' },
      { key: 'f2', textKey: 'planEcommerceStoreFeature2' },
      { key: 'f3', textKey: 'planEcommerceStoreFeature3' },
      { key: 'f4', textKey: 'planEcommerceStoreFeature4' },
      { key: 'f5', textKey: 'planEcommerceStoreFeature5' },
    ],
    addons: [
      { key: 'products', textKey: 'planEcommerceStoreAddonProducts', priceKey: 'planEcommerceStoreAddonProductsPrice' },
      { key: 'marketing', textKey: 'planEcommerceStoreAddonMarketing', priceKey: 'planEcommerceStoreAddonMarketingPrice' },
    ],
    orderLink: '#order-ecommerce',
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
      { key: 'f1', textKey: 'planCorporateWebsiteFeature1' },
      { key: 'f2', textKey: 'planCorporateWebsiteFeature2' },
      { key: 'f3', textKey: 'planCorporateWebsiteFeature3' },
      { key: 'f4', textKey: 'planCorporateWebsiteFeature4' },
      { key: 'f5', textKey: 'planCorporateWebsiteFeature5' },
    ],
    addons: [
      { key: 'seo', textKey: 'planCorporateWebsiteAddonSeo', priceKey: 'planCorporateWebsiteAddonSeoPrice' },
      { key: 'maintenance', textKey: 'planCorporateWebsiteAddonMaintenance', priceKey: 'planCorporateWebsiteAddonMaintenancePrice' },
    ],
    orderLink: '#order-corporate',
  },
  {
    id: 'customPlatform',
    icon: Layers,
    accentColor: 'red-500',
    titleKey: 'planCustomPlatformTitle',
    subtitleKey: 'planCustomPlatformSubtitle',
    basePriceKey: 'planCustomPlatformBasePrice', // This will be "Contact for estimate"
    deliveryTimeKey: 'planCustomPlatformDelivery',
    features: [
      { key: 'f1', textKey: 'planCustomPlatformFeature1' },
      { key: 'f2', textKey: 'planCustomPlatformFeature2' },
      { key: 'f3', textKey: 'planCustomPlatformFeature3' },
      { key: 'f4', textKey: 'planCustomPlatformFeature4' },
      { key: 'f5', textKey: 'planCustomPlatformFeature5' },
      { key: 'f6', textKey: 'planCustomPlatformFeature6' },
    ],
    addons: [
      { key: 'mobile', textKey: 'planCustomPlatformAddonMobile', priceKey: 'planCustomPlatformAddonMobilePrice' },
      { key: 'ai', textKey: 'planCustomPlatformAddonAi', priceKey: 'planCustomPlatformAddonAiPrice' },
    ],
    orderLink: '#order-custom',
  },
];

const InteractivePricingSection = () => {
  const { t } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2,
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="interactive-pricing"
      className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-black/30"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('interactivePricingPlans')}
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-center text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('webDesignDesc')} {/* Using existing translation key for generic description */}
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 items-stretch"
          variants={sectionVariants}
        >
          {plansData.map((plan) => (
            <motion.div key={plan.id} variants={cardVariants}>
              <InteractivePricingCard 
                plan={plan} 
                icon={plan.icon} 
                accentColor={plan.accentColor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InteractivePricingSection;