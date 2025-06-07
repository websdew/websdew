import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CrmPricingSection from '@/components/CrmPricingSection';
import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CrmServicesPage = () => {
  const { t } = useTranslation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="py-8"
    >
      <Helmet>
        <title>{`${t('crmServices')} - ${t('websdew')}`}</title>
        <meta name="description" content={t('crmServicesPageDesc')} />
        <meta property="og:title" content={`${t('crmServices')} - ${t('websdew')}`} />
        <meta property="og:description" content={t('crmServicesPageDesc')} />
      </Helmet>

      <header className="mb-16 text-center relative overflow-hidden py-20 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-background">
        <div className="absolute inset-0 opacity-30">
            <img-replace src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80" alt="CRM Abstract Background" className="w-full h-full object-cover"/>
        </div>
        <div className="relative z-10 container mx-auto px-4">
            <Users className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            {t('crmServicesTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            {t('crmServicesPageDesc')}
            </p>
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 group">
                <Link to="#crm-pricing">
                    {t('viewCrmPlans')} <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
            </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="prose dark:prose-invert lg:prose-xl max-w-none"
          >
            <h2 className="text-3xl font-semibold mb-4 text-foreground">{t('whyChooseOurCrm')}</h2>
            <p>{t('crmBenefit1')}</p>
            <p>{t('crmBenefit2')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('crmBenefitFeature1')}</li>
              <li>{t('crmBenefitFeature2')}</li>
              <li>{t('crmBenefitFeature3')}</li>
              <li>{t('crmBenefitFeature4')}</li>
            </ul>
            <p>{t('crmBenefitConclusion')}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img-replace src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt={t('crmTeamCollaborationAlt')} className="rounded-xl shadow-2xl"/>
          </motion.div>
        </div>
      </section>
      
      <CrmPricingSection />

      <section className="py-16 bg-muted/30 dark:bg-background/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-foreground">{t('readyToTransformCrm')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">{t('crmPageCtaText')}</p>
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 group">
            <Link to="/contact-us">
              {t('contactSupportTeam')} <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

    </motion.div>
  );
};

export default CrmServicesPage;