import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const GetStartedPage = () => {
  const { t } = useTranslation('common');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center"
    >
      <Helmet>
        <title>{`${t('getStarted')} - ${t('websdew')}`}</title>
        <meta name="description" content={t('getStartedPageDesc')} />
      </Helmet>
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500"
      >
        {t('getStarted')}
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl text-muted-foreground max-w-xl"
      >
        {t('getStartedPageDesc')}
      </motion.p>
      
    </motion.div>
  );
};

export default GetStartedPage;