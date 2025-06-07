import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SeoPricingSection from '@/components/SeoPricingSection';
import ServicesGrid from '@/components/ServicesGrid';
import InteractivePricingSection from '@/components/InteractivePricingSection';
import ClientLogosSlider from '@/components/ClientLogosSlider';
import CrmPricingSection from '@/components/CrmPricingSection';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Palette, Briefcase, GraduationCap, Mail } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const serviceBoxes = [
    {
      titleKey: 'seoServices',
      descKey: 'seoServicesDesc',
      icon: <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />,
      link: '/seo-services',
    },
    {
      titleKey: 'webDesign',
      descKey: 'webDesignDesc',
      icon: <Palette className="h-12 w-12 text-primary mx-auto mb-4" />,
      link: '/web-design',
    },
    {
      titleKey: 'onlineCourses',
      descKey: 'onlineCoursesDesc',
      icon: <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />,
      link: '/online-courses',
    },
    {
      titleKey: 'digitalMarketing',
      descKey: 'digitalMarketingDesc',
      icon: <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />,
      link: '/digital-marketing',
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-20 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/20 dark:to-background"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
          {t('heroTitle')}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          {t('heroSubtitle')}
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 group">
            <Link to="/get-started">
              {t('getStarted')} <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {serviceBoxes.map((box) => (
            <motion.div 
              key={box.titleKey}
              variants={itemVariants} 
              className="p-6 rounded-xl bg-card/60 dark:bg-card/40 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-sm flex flex-col items-center text-center h-full"
            >
              {box.icon}
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t(box.titleKey)}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{t(box.descKey)}</p>
              <Button asChild variant="outline" className="mt-auto border-primary text-primary hover:bg-primary/10 hover:text-primary group">
                <Link to={box.link}>
                  {t('readMore')}
                  <ArrowRight className="ml-2 rtl:mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CRM Pricing Section */}
      <CrmPricingSection />

      {/* Web Design & Development Pricing Section */}
      <InteractivePricingSection />

      {/* Other Products & Services Grid Section */}
      <ServicesGrid />

      {/* SEO Pricing Section */}
      <SeoPricingSection />
      
      {/* Contact Section */}
      <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="text-center py-16 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 dark:from-purple-800/20 dark:to-indigo-800/20 rounded-xl glassmorphic">
        <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-6 text-foreground">{t('contactUsToday')}</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('generalContactDesc')}
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 group">
          <Link to="/contact-us">
            {t('contactUs')} <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </Button>
      </motion.section>
      
      {/* Client Logos Slider Section */}
      <ClientLogosSlider />

    </div>
  );
};

export default HomePage;