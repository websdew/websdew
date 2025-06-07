import React from 'react';
import { useTranslation } from 'react-i18next';
import CrmPricingCard from '@/components/CrmPricingCard';
import { motion } from 'framer-motion';
import { Zap, Users, Briefcase, Building, Star, ShoppingCart } from 'lucide-react';

const crmPlansData = [
  {
    id: 'crmFreeTrial',
    icon: Zap,
    iconColor: 'text-blue-500',
    iconBgColor: 'bg-blue-500/10',
    titleKey: 'crmFreeTrialTitle',
    priceKey: 'crmFreeTrialPrice',
    periodKey: 'crmFreeTrialPeriod',
    descriptionKey: 'crmFreeTrialDesc',
    features: [
      'crmFeatureFreeAccess',
      'crmFeatureMaxCustomers3',
      'crmFeatureBasicAccess',
      'crmFeatureSimplePanels',
      'crmFeatureNoNotifications',
      'crmFeatureIdealForTesting',
    ],
  },
  {
    id: 'crmStarter',
    icon: Users,
    iconColor: 'text-green-500',
    iconBgColor: 'bg-green-500/10',
    titleKey: 'crmStarterTitle',
    priceKey: 'crmStarterPrice',
    periodKey: 'crmMonthly',
    descriptionKey: 'crmStarterDesc',
    features: [
      'crmFeatureMaxCustomers50',
      'crmFeatureAutoInvoice',
      'crmFeatureOrderTracking',
      'crmFeatureCustomDashboard',
      'crmFeatureAdminPanelOverview',
      'crmFeatureClientPanelPayments',
      'crmFeatureBasicReports',
      'crmFeatureSimpleTicketing',
      'crmFeatureFullyResponsive',
      'crmFeaturePerfectForFreelancers',
    ],
  },
  {
    id: 'crmProfessional',
    icon: Briefcase,
    iconColor: 'text-purple-500',
    iconBgColor: 'bg-purple-500/10',
    titleKey: 'crmProfessionalTitle',
    priceKey: 'crmProfessionalPrice',
    periodKey: 'crmMonthly',
    descriptionKey: 'crmProfessionalDesc',
    features: [
      'crmFeatureMaxCustomers500',
      'crmFeatureAdvancedInvoicing',
      'crmFeatureFinancialCharts',
      'crmFeatureAppEmailNotifications',
      'crmFeatureFullClientDashboard',
      'crmFeatureInternalTicketingPrio',
      'crmFeaturePartialPayments',
      'crmFeature247Support',
      'crmFeatureForActiveSales',
    ],
    popular: true,
  },
  {
    id: 'crmEnterprise',
    icon: Building,
    iconColor: 'text-orange-500',
    iconBgColor: 'bg-orange-500/10',
    titleKey: 'crmEnterpriseTitle',
    priceKey: 'crmEnterprisePrice',
    periodKey: 'crmMonthly',
    descriptionKey: 'crmEnterpriseDesc',
    features: [
      'crmFeatureUnlimitedCustomersUsers',
      'crmFeatureTaxCompliantInvoicing',
      'crmFeatureFullCustomization',
      'crmFeatureMultiLevelAccess',
      'crmFeatureSystemEmailSmsNotifications',
      'crmFeatureAdvancedOrderTracking',
      'crmFeatureWhiteLabeling',
      'crmFeaturePremiumSupport',
      'crmFeatureBestForLargeCompanies',
    ],
  },
  {
    id: 'crmLifetime',
    icon: Star,
    iconColor: 'text-yellow-500',
    iconBgColor: 'bg-yellow-500/10',
    titleKey: 'crmLifetimeTitle',
    priceKey: 'crmLifetimePrice',
    periodKey: 'crmOneTimePayment',
    descriptionKey: 'crmLifetimeDesc',
    features: [
      'crmFeatureAllEnterprise',
      'crmFeatureUnlimitedCustomersUsers',
      'crmFeatureLifetimeUpdates',
      'crmFeatureVipSupport',
      'crmFeaturePrivateServerInstall',
      'crmFeatureFullBranding',
      'crmFeatureSourceCodeAccess',
      'crmFeatureIdealForOwnership',
    ],
  },
];


const CrmPricingSection = () => {
  const { t } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="crm-pricing"
      className="py-16 sm:py-24 bg-gradient-to-br from-muted/20 via-background to-muted/20 dark:from-background/30 dark:via-black/20 dark:to-background/30"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            {t('crmPricingTitle')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('crmPricingSubtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          variants={sectionVariants} // Use sectionVariants for staggering children
        >
          {crmPlansData.map((plan) => (
             <motion.div key={plan.id} variants={cardVariants}>
              <CrmPricingCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CrmPricingSection;