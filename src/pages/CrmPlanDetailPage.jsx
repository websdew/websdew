import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, PlayCircle, Image as ImageIcon, ShoppingCart, ArrowRight, ArrowLeft, Info, Mail, Users, Briefcase, Building, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/pages/NotFoundPage';
import { useToast } from "@/components/ui/use-toast";

const crmPlansMasterData = [
  {
    id: 'crmFreeTrial',
    icon: Zap,
    iconColor: 'text-blue-500',
    titleKey: 'crmFreeTrialTitle',
    priceKey: 'crmFreeTrialPrice',
    periodKey: 'crmFreeTrialPeriod',
    descriptionKey: 'crmFreeTrialDesc',
    fullDescriptionKey: 'crmFreeTrialFullDesc',
    features: [
      'crmFeatureFreeAccess', 'crmFeatureMaxCustomers3', 'crmFeatureBasicAccess',
      'crmFeatureSimplePanels', 'crmFeatureNoNotifications', 'crmFeatureIdealForTesting',
    ],
    videoUrl: 'https://www.youtube.com/embed/R999n3MHUoA', 
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'crmStarter',
    icon: Users,
    iconColor: 'text-green-500',
    titleKey: 'crmStarterTitle',
    priceKey: 'crmStarterPrice',
    periodKey: 'crmMonthly',
    descriptionKey: 'crmStarterDesc',
    fullDescriptionKey: 'crmStarterFullDesc',
    features: [
      'crmFeatureMaxCustomers50', 'crmFeatureAutoInvoice', 'crmFeatureOrderTracking',
      'crmFeatureCustomDashboard', 'crmFeatureAdminPanelOverview', 'crmFeatureClientPanelPayments',
      'crmFeatureBasicReports', 'crmFeatureSimpleTicketing', 'crmFeatureFullyResponsive',
      'crmFeaturePerfectForFreelancers',
    ],
    videoUrl: 'https://www.youtube.com/embed/9z317B9xNIs',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'crmProfessional',
    icon: Briefcase,
    iconColor: 'text-purple-500',
    titleKey: 'crmProfessionalTitle',
    priceKey: 'crmProfessionalPrice',
    periodKey: 'crmMonthly',
    descriptionKey: 'crmProfessionalDesc',
    fullDescriptionKey: 'crmProfessionalFullDesc',
    features: [
      'crmFeatureMaxCustomers500', 'crmFeatureAdvancedInvoicing', 'crmFeatureFinancialCharts',
      'crmFeatureAppEmailNotifications', 'crmFeatureFullClientDashboard', 'crmFeatureInternalTicketingPrio',
      'crmFeaturePartialPayments', 'crmFeature247Support', 'crmFeatureForActiveSales',
    ],
    popular: true,
    videoUrl: 'https://www.youtube.com/embed/8N3NujV9a3o',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'crmEnterprise',
    icon: Building,
    iconColor: 'text-orange-500',
    titleKey: 'crmEnterpriseTitle',
    priceKey: 'crmEnterprisePrice',
    periodKey: 'crmMonthly',
    descriptionKey: 'crmEnterpriseDesc',
    fullDescriptionKey: 'crmEnterpriseFullDesc',
    features: [
      'crmFeatureUnlimitedCustomersUsers', 'crmFeatureTaxCompliantInvoicing', 'crmFeatureFullCustomization',
      'crmFeatureMultiLevelAccess', 'crmFeatureSystemEmailSmsNotifications', 'crmFeatureAdvancedOrderTracking',
      'crmFeatureWhiteLabeling', 'crmFeaturePremiumSupport', 'crmFeatureBestForLargeCompanies',
    ],
    videoUrl: 'https://www.youtube.com/embed/qWKuEYyCMQc',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 'crmLifetime',
    icon: Star,
    iconColor: 'text-yellow-500',
    titleKey: 'crmLifetimeTitle',
    priceKey: 'crmLifetimePrice',
    periodKey: 'crmOneTimePayment',
    descriptionKey: 'crmLifetimeDesc',
    fullDescriptionKey: 'crmLifetimeFullDesc',
    features: [
      'crmFeatureAllEnterprise', 'crmFeatureUnlimitedCustomersUsers', 'crmFeatureLifetimeUpdates',
      'crmFeatureVipSupport', 'crmFeaturePrivateServerInstall', 'crmFeatureFullBranding',
      'crmFeatureSourceCodeAccess', 'crmFeatureIdealForOwnership',
    ],
    videoUrl: 'https://www.youtube.com/embed/1_Fr8Fw0y3o',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
];

const CrmPlanDetailPage = () => {
  const { planId } = useParams();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
  const plan = crmPlansMasterData.find(p => p.id === planId);
  const carouselRef = useRef(null);

  if (!plan) {
    return <NotFoundPage />;
  }

  const getCurrencySymbol = () => {
    switch (i18n.language) {
      case 'fa': return t('currencyIRR');
      case 'ar': return t('currencyAED');
      default: return t('currencyUSD');
    }
  };

  const formatPrice = (priceKey, periodKey) => {
    const priceVal = t(priceKey);
    if (priceVal === '0' && priceKey === 'crmFreeTrialPrice') { // Specific check for free trial
      return `${t(priceKey)} / ${t(periodKey)}`;
    }
    const symbol = getCurrencySymbol();
    const period = t(periodKey);
    return i18n.language === 'en' ? `${symbol}${priceVal} ${period}` : `${priceVal} ${symbol} ${period}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data (to be sent with PHPMailer):", formData);
    toast({
      title: t('messageSentSuccess'),
      description: t('orderFormSubmissionNote'),
      variant: "success",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  const PlanIcon = plan.icon;
  const accentColor = plan.iconColor || 'text-primary';

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8; // Scroll by 80% of visible width
      carouselRef.current.scrollBy({ 
        left: direction === 'next' ? scrollAmount : -scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const otherPlans = crmPlansMasterData.filter(p => p.id !== plan.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto py-8 px-4"
    >
      <Helmet>
        <title>{`${t(plan.titleKey)} - ${t('websdew')}`}</title>
        <meta name="description" content={t(plan.fullDescriptionKey)} />
        <meta property="og:title" content={`${t(plan.titleKey)} - ${t('websdew')}`} />
        <meta property="og:description" content={t(plan.fullDescriptionKey)} />
        <meta property="og:image" content={plan.imageUrl} />
      </Helmet>

      <header className="mb-12 text-center">
        <div className={cn("w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto", plan.iconBgColor || 'bg-primary/10')}>
          <PlanIcon className={cn("w-12 h-12", accentColor)} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground">{t(plan.titleKey)}</h1>
        <p className={cn("text-2xl md:text-3xl font-bold mb-4", accentColor)}>{formatPrice(plan.priceKey, plan.periodKey)}</p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t(plan.descriptionKey)}</p>
      </header>

      <div className="grid md:grid-cols-5 gap-8 lg:gap-12 mb-12">
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity:0, x: i18n.dir() === 'rtl' ? 50 : -50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-foreground border-b pb-3">{t('planDetails')}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
            {t(plan.fullDescriptionKey)}
          </p>
          
          <h3 className="text-2xl font-semibold mb-4 text-foreground">{t('features')}</h3>
          <ul className="space-y-3 grid sm:grid-cols-2 gap-x-6">
            {plan.features.map((featureKey, index) => (
              <li key={index} className="flex items-start text-muted-foreground">
                <CheckCircle className={cn("w-5 h-5 mr-3 rtl:ml-3 mt-1 shrink-0", accentColor)} />
                <span>{t(featureKey)}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="md:col-span-2 space-y-8"
          initial={{ opacity:0, x: i18n.dir() === 'rtl' ? -50 : 50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">{t('videoPlaceholderTitle')}</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-xl">
              {plan.videoUrl ? (
                <iframe
                  width="100%" height="100%" src={plan.videoUrl}
                  title={`${t(plan.titleKey)} Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="border-0"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center"><PlayCircle className="w-16 h-16 text-muted-foreground" /></div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">{t('imagePlaceholderTitle')}</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-xl">
              <img-replace src={plan.imageUrl} alt={t(plan.titleKey)} className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity:0, y: 50 }} animate={{ opacity:1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} 
        className="bg-card/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border border-border/40 mb-16"
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">{t('subscribeToPlan', { planName: t(plan.titleKey) })}</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <Label htmlFor="name" className="text-foreground">{t('fullNameLabel')}</Label>
            <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} placeholder={t('fullNamePlaceholder')} required className="mt-1 bg-background/70"/>
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">{t('emailAddressLabel')}</Label>
            <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} placeholder={t('emailAddressPlaceholder')} required className="mt-1 bg-background/70"/>
          </div>
          <div>
            <Label htmlFor="subject" className="text-foreground">{t('subjectLabel')}</Label>
            <Input type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange} placeholder={t('subjectPlaceholder')} required className="mt-1 bg-background/70" />
          </div>
          <div>
            <Label htmlFor="message" className="text-foreground">{t('messageLabel')}</Label>
            <Textarea name="message" id="message" value={formData.message} onChange={handleInputChange} placeholder={t('messagePlaceholder')} rows="4" required className="mt-1 bg-background/70" />
          </div>
          <Button 
            type="submit"
            size="lg" 
            className={cn("w-full group text-lg py-3", plan.iconColor ? `bg-${plan.iconColor.split('-')[1]}-500 hover:bg-${plan.iconColor.split('-')[1]}-600` : 'bg-primary hover:bg-primary/90', `text-primary-foreground shadow-xl`)}
          >
            <ShoppingCart className="mr-2 rtl:ml-2 h-5 w-5" />
            {t('submitOrder')}
            <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Button>
          <p className="text-xs text-muted-foreground text-center">{t('orderFormSubmissionNote')}</p>
        </form>
      </motion.div>

      {/* Other Plans Carousel */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">{t('otherCrmPlans')}</h2>
        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-accent disabled:opacity-50"
            onClick={() => scrollCarousel('prev')}
            aria-label={t('previousPlan')}
          >
            {i18n.dir() === 'rtl' ? <ArrowRight className="h-6 w-6"/> : <ArrowLeft className="h-6 w-6"/>}
          </Button>
          <div ref={carouselRef} className="flex overflow-x-auto space-x-6 rtl:space-x-reverse pb-4 scrollbar-hide px-12">
            {otherPlans.map(otherPlan => (
              <div key={otherPlan.id} className="min-w-[300px] md:min-w-[350px]">
                 <Card className={cn("flex flex-col h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl", otherPlan.popular ? "border-primary bg-primary/5" : "bg-card", "dark:bg-card/70")}>
                  <CardHeader className="p-4 text-center">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto", otherPlan.iconBgColor || 'bg-primary/10')}>
                      {React.createElement(otherPlan.icon, {className: cn("w-6 h-6", otherPlan.iconColor || 'text-primary')})}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{t(otherPlan.titleKey)}</CardTitle>
                    <p className={cn("text-md font-semibold", otherPlan.iconColor || 'text-primary')}>{formatPrice(otherPlan.priceKey, otherPlan.periodKey)}</p>
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <p className="text-xs text-muted-foreground text-center mb-3 min-h-[30px] line-clamp-2">{t(otherPlan.descriptionKey)}</p>
                    <Button asChild size="sm" className="w-full group bg-gradient-to-r from-secondary to-muted-foreground/80 hover:from-secondary/90 hover:to-muted-foreground/70 text-secondary-foreground">
                      <Link to={`/crm-plan/${otherPlan.id}`}>
                        {t('viewDetails')}
                        <ArrowRight className="ml-2 rtl:mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-accent disabled:opacity-50"
            onClick={() => scrollCarousel('next')}
            aria-label={t('nextPlan')}
          >
            {i18n.dir() === 'rtl' ? <ArrowLeft className="h-6 w-6"/> : <ArrowRight className="h-6 w-6"/>}
          </Button>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default CrmPlanDetailPage;