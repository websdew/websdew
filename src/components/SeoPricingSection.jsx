import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SeoPricingCard from '@/components/SeoPricingCard';
import OrderModal from '@/components/OrderModal';
import { motion } from 'framer-motion';

const seoPlansData = [
  {
    id: 'basicBoost',
    title: 'seoBasicBoostTitle',
    description: 'seoBasicBoostDesc',
    price: 'seoBasicBoostPrice', // Price key, actual value in translation file
    period: 'oneTime',
    features: [
      'seoBasicBoostFeatureKeywords',
      'seoBasicBoostFeatureOnPage',
      'seoBasicBoostFeatureSpeedMobile',
      'seoBasicBoostFeatureReport',
    ],
    finalLine: 'seoBasicBoostFeaturePerfectFor',
  },
  {
    id: 'growthPlan',
    title: 'seoGrowthPlanTitle',
    description: 'seoGrowthPlanDesc',
    price: 'seoGrowthPlanPrice',
    period: 'monthly',
    features: [
      'seoGrowthPlanFeatureKeywords',
      'seoGrowthPlanFeatureContentOpt',
      'seoGrowthPlanFeatureTechFixes',
      'seoGrowthPlanFeatureBacklink',
      'seoGrowthPlanFeatureAnalytics',
    ],
    finalLine: 'seoGrowthPlanFeatureGreatFor',
    recommended: true,
  },
  {
    id: 'proPackage',
    title: 'seoProPackageTitle',
    description: 'seoProPackageDesc',
    price: 'seoProPackagePrice',
    period: 'monthly',
    features: [
      'seoProPackageFeatureKeywords',
      'seoProPackageFeatureAudit',
      'seoProPackageFeatureAdvLink',
      'seoProPackageFeatureCompetitor',
      'seoProPackageFeatureReporting',
    ],
    finalLine: 'seoProPackageFeatureDesignedFor',
  },
  {
    id: 'localFocus',
    title: 'seoLocalFocusTitle',
    description: 'seoLocalFocusDesc',
    price: 'seoLocalFocusPrice',
    period: 'monthly',
    features: [
      'seoLocalFocusFeatureGBP',
      'seoLocalFocusFeatureCitations',
      'seoLocalFocusFeatureKeywords',
      'seoLocalFocusFeatureReview',
    ],
    finalLine: 'seoLocalFocusFeatureBoost',
  },
  {
    id: 'contentBundle',
    title: 'seoContentBundleTitle',
    description: 'seoContentBundleDesc',
    price: 'seoContentBundlePrice',
    period: 'monthly',
    features: [
      'seoContentBundleFeatureGrowth',
      'seoContentBundleFeatureBlog',
      'seoContentBundleFeaturePlanning',
    ],
    finalLine: 'seoContentBundleFeatureTraffic',
  },
];


const SeoPricingSection = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOrderNow = (planId) => {
    setSelectedPlan(planId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  return (
    <motion.section 
      id="seo-pricing" 
      className="py-16 sm:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">{t('seoPricingPlans')}</h2>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('seoServicesDesc')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {seoPlansData.map((plan) => (
            <SeoPricingCard key={plan.id} plan={plan} onOrder={handleOrderNow} />
          ))}
        </div>
      </div>
      <OrderModal isOpen={isModalOpen} onClose={closeModal} selectedPlanId={selectedPlan} plans={seoPlansData} />
    </motion.section>
  );
};

export default SeoPricingSection;