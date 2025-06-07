import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-12"
    >
      <Helmet>
        <title>{`${t('pageNotFound')} - ${t('websdew')}`}</title>
        <meta name="description" content={t('pageNotFoundMsg')} />
      </Helmet>

      <motion.div
        initial={{ rotate: -10, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
      >
        <AlertTriangle className="w-32 h-32 text-destructive mb-8" />
      </motion.div>

      <motion.h1 
        className="text-5xl md:text-7xl font-extrabold text-destructive mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold text-foreground mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {t('pageNotFound')}
      </motion.h2>
      <motion.p 
        className="text-lg text-muted-foreground mb-10 max-w-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {t('pageNotFoundMsg')}
      </motion.p>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: 'spring' }}
      >
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground group">
          <Link to="/">
            <Home className="mr-2 rtl:ml-2 h-5 w-5" />
            {t('goHome')}
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;