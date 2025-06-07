import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import GetStartedPage from '@/pages/GetStartedPage';
import PlanDetailPage from '@/pages/PlanDetailPage';
import SeoServicesPage from '@/pages/SeoServicesPage';
import WebDesignPage from '@/pages/WebDesignPage';
import OnlineCoursesPage from '@/pages/OnlineCoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import DigitalMarketingPage from '@/pages/DigitalMarketingPage';
import ProductsPage from '@/pages/ProductsPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import SupportPage from '@/pages/SupportPage';
import MagPage from '@/pages/MagPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CrmPlanDetailPage from '@/pages/CrmPlanDetailPage';
import CrmServicesPage from '@/pages/CrmServicesPage';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async'; 

function App() {
  const { i18n, t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{t('common:websdew')}</title>
        <meta name="description" content={t('common:heroSubtitle')} />
        <meta property="og:title" content={t('common:websdew')} />
        <meta property="og:description" content={t('common:heroSubtitle')} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1684479350733-b70f1318d953?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/plan/:planId" element={<PlanDetailPage />} />
            <Route path="/crm-plan/:planId" element={<CrmPlanDetailPage />} />
            <Route path="/seo-services" element={<SeoServicesPage />} />
            <Route path="/web-design" element={<WebDesignPage />} />
            <Route path="/online-courses" element={<OnlineCoursesPage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/crm-services" element={<CrmServicesPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/mag" element={<MagPage />} />
            
            <Route path="/contact/general" element={<Navigate to="/contact-us" replace />} />
            <Route path="/contact/support" element={<Navigate to="/support" replace />} />
            
            <Route path="/courses/seo" element={<Navigate to="/course/seo" replace />} />
            <Route path="/courses/web-design" element={<Navigate to="/course/htmlcssjs" replace />} />
            <Route path="/courses/wordpress" element={<Navigate to="/course/wordpress" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;