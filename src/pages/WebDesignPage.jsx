import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import InteractivePricingSection from '@/components/InteractivePricingSection';

const WebDesignPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <Helmet>
        <title>{`${t('webDesign')} - ${t('websdew')}`}</title>
        <meta name="description" content={t('webDesignDesc')} />
        <meta property="og:title" content={`${t('webDesign')} - ${t('websdew')}`} />
        <meta property="og:description" content={t('webDesignDesc')} />
      </Helmet>

      <header className="mb-12 text-center">
        <Palette className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground">{t('webDesign')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('webDesignDesc')}</p>
      </header>
      
      <InteractivePricingSection />

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">{t('comingSoon')}</h2>
        <p className="text-lg text-muted-foreground">{t('comingSoonDetail')}</p>
      </section>

    </motion.div>
  );
};

export default WebDesignPage;