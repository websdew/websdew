import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Clock, Users, DollarSign, BookOpen, MonitorPlay, Code, Database, FileText, Server, CheckCircle, LayoutGrid, ListChecks } from 'lucide-react';

const coursesList = [
  { id: 'vb', titleKey: 'courseVBTitle', descKey: 'courseVBDesc', durationKey: 'courseVBDuration', priceKey: 'courseVBPrice', audienceKey: 'courseVBAudience', priceUSDKey: 'courseVBPriceUSD', icon: <MonitorPlay className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4', 'Module5', 'Module6'] },
  { id: 'csharp', titleKey: 'courseCSharpTitle', descKey: 'courseCSharpDesc', durationKey: 'courseCSharpDuration', priceKey: 'courseCSharpPrice', audienceKey: 'courseCSharpAudience', priceUSDKey: 'courseCSharpPriceUSD', icon: <Code className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4', 'Module5', 'Module6'] },
  { id: 'excel', titleKey: 'courseExcelTitle', descKey: 'courseExcelDesc', durationKey: 'courseExcelDuration', priceKey: 'courseExcelPrice', audienceKey: 'courseExcelAudience', priceUSDKey: 'courseExcelPriceUSD', icon: <FileText className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4'] },
  { id: 'access', titleKey: 'courseAccessTitle', descKey: 'courseAccessDesc', durationKey: 'courseAccessDuration', priceKey: 'courseAccessPrice', audienceKey: 'courseAccessAudience', priceUSDKey: 'courseAccessPriceUSD', icon: <Database className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4', 'Module5', 'Module6'] },
  { id: 'htmlcssjs', titleKey: 'courseHtmlCssJsTitle', descKey: 'courseHtmlCssJsDesc', durationKey: 'courseHtmlCssJsDuration', priceKey: 'courseHtmlCssJsPrice', audienceKey: 'courseHtmlCssJsAudience', priceUSDKey: 'courseHtmlCssJsPriceUSD', icon: <Code className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4', 'Module5', 'Module6'] },
  { id: 'php', titleKey: 'coursePhpTitle', descKey: 'coursePhpDesc', durationKey: 'coursePhpDuration', priceKey: 'coursePhpPrice', audienceKey: 'coursePhpAudience', priceUSDKey: 'coursePhpPriceUSD', icon: <Server className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4', 'Module5', 'Module6'] },
  { id: 'wordpress', titleKey: 'courseWordPressTitle', descKey: 'courseWordPressDesc', durationKey: 'courseWordPressDuration', priceKey: 'courseWordPressPrice', audienceKey: 'courseWordPressAudience', priceUSDKey: 'courseWordPressPriceUSD', icon: <BookOpen className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4', 'Module5'] },
  { id: 'fullstack', titleKey: 'courseFullStackTitle', descKey: 'courseFullStackDesc', durationKey: 'courseFullStackDuration', priceKey: 'courseFullStackPrice', audienceKey: 'courseFullStackAudience', priceUSDKey: 'courseFullStackPriceUSD', icon: <LayoutGrid className="h-8 w-8" />, modules: ['Module1', 'Module2', 'Module3', 'Module4', 'Module5', 'Module6', 'Module7'] },
];

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { t, i18n } = useTranslation(['common', 'onlineCoursesData']);
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const course = coursesList.find(c => c.id === courseId);

  if (!course) {
    return <Navigate to="/404" replace />;
  }

  const lang = i18n.language;

  const getPriceText = () => {
    const tomanPriceKey = `onlineCoursesData:${course.id}Price`;
    const usdPriceKey = `onlineCoursesData:${course.id}PriceUSD`;
    
    const rawTomanPrice = parseFloat(String(t(tomanPriceKey, { ns: 'onlineCoursesData' })).replace(/[^۰-۹0-9.-]+/g,""));
    const rawUsdPrice = parseFloat(String(t(usdPriceKey, { ns: 'onlineCoursesData', lng: 'en' })).replace(/[^0-9.-]+/g,""));

    const numberFormatToman = new Intl.NumberFormat('fa-IR');
    const numberFormatUsd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    const formattedTomanPrice = isNaN(rawTomanPrice) ? t(tomanPriceKey, { ns: 'onlineCoursesData' }) : numberFormatToman.format(rawTomanPrice);
    const formattedUsdPrice = isNaN(rawUsdPrice) ? t(usdPriceKey, { ns: 'onlineCoursesData', lng: 'en' }) : numberFormatUsd.format(rawUsdPrice);
    
    if (lang === 'fa') {
      return `${formattedTomanPrice} ${t('common:currencyTOMAN')} (${formattedUsdPrice})`;
    }
    
    let priceDisplay = formattedUsdPrice;
     if (lang !== 'fa' && !isNaN(rawTomanPrice)) {
      priceDisplay += ` (~${formattedTomanPrice} ${t('common:currencyTOMAN')})`;
    }
    return priceDisplay;
  };
  
  const benefits = [
    t(`onlineCoursesData:${course.id}Benefit1`, { ns: 'onlineCoursesData' }),
    t(`onlineCoursesData:${course.id}Benefit2`, { ns: 'onlineCoursesData' }),
    t(`onlineCoursesData:${course.id}Benefit3`, { ns: 'onlineCoursesData' }),
    t(`onlineCoursesData:${course.id}Benefit4`, { ns: 'onlineCoursesData' }),
  ].filter(benefit => benefit && !benefit.startsWith('onlineCoursesData:') && !benefit.includes('Benefit'));

  const modules = course.modules?.map(moduleKey => 
    t(`onlineCoursesData:${course.id}${moduleKey}`, { ns: 'onlineCoursesData' })
  ).filter(mod => mod && !mod.startsWith('onlineCoursesData:')) || [];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enrollment Form Data:', { course: t(`onlineCoursesData:${course.titleKey}`), ...formData });
    toast({
      title: t('common:courseEnrollSuccess', { courseName: t(`onlineCoursesData:${course.titleKey}`) }),
      description: t('common:orderFormSubmissionNote'),
      variant: 'success',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 md:py-16 container mx-auto px-4 font-sans"
    >
      <Helmet>
        <title>{`${t(`onlineCoursesData:${course.titleKey}`)} - ${t('common:websdew')}`}</title>
        <meta name="description" content={t(`onlineCoursesData:${course.descKey}`)} />
        <meta property="og:title" content={`${t(`onlineCoursesData:${course.titleKey}`)} - ${t('common:websdew')}`} />
        <meta property="og:description" content={t(`onlineCoursesData:${course.descKey}`)} />
      </Helmet>

      <header className="mb-12 md:mb-16 text-center">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4"
        >
          {course.icon}
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-foreground leading-tight"
        >
          {t(`onlineCoursesData:${course.titleKey}`)}
        </motion.h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          <Card className="bg-card/70 dark:bg-card/50 backdrop-blur-lg shadow-xl border border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-primary font-semibold">{t('common:planDetailDescription')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-base text-muted-foreground leading-relaxed space-y-4">
                {t(`onlineCoursesData:${course.descKey}`).split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </CardDescription>
            </CardContent>
          </Card>
          
          {modules.length > 0 && (
             <Card className="bg-card/70 dark:bg-card/50 backdrop-blur-lg shadow-xl border border-border/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-primary font-semibold flex items-center">
                  <ListChecks className="w-7 h-7 mr-3 rtl:ml-3 text-primary/80" />
                  {t('common:courseModules')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {modules.map((moduleItem, index) => (
                    <li key={index} className="flex items-start text-base text-muted-foreground p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
                      <span className="font-semibold text-primary mr-2 rtl:ml-2">{t('common:module')} {index + 1}:</span>
                      {moduleItem}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}


          {benefits.length > 0 && (
            <Card className="bg-card/70 dark:bg-card/50 backdrop-blur-lg shadow-xl border border-border/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-primary font-semibold flex items-center">
                   <CheckCircle className="w-7 h-7 mr-3 rtl:ml-3 text-primary/80" />
                  {t('common:courseBenefits')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2.5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-base text-muted-foreground">
                      <CheckCircle className="w-5 h-5 mr-3 rtl:ml-3 text-green-500 shrink-0 mt-1" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}


          <Card className="bg-card/70 dark:bg-card/50 backdrop-blur-lg shadow-xl border border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-primary font-semibold">{t('common:enrollmentFormTitle', { courseName: t(`onlineCoursesData:${course.titleKey}`) })}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium text-base">{t('common:fullNameLabel')}</Label>
                  <Input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('common:fullNamePlaceholder')} required className="mt-2 text-base bg-input/50 dark:bg-input/30 backdrop-blur-sm border-border focus:border-primary rounded-lg p-3" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium text-base">{t('common:emailAddressLabel')}</Label>
                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('common:emailAddressPlaceholder')} required className="mt-2 text-base bg-input/50 dark:bg-input/30 backdrop-blur-sm border-border focus:border-primary rounded-lg p-3" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground font-medium text-base">{t('common:messageLabel')}</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder={t('common:messagePlaceholderOptional')} rows={4} className="mt-2 text-base bg-input/50 dark:bg-input/30 backdrop-blur-sm border-border focus:border-primary rounded-lg p-3" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-md hover:shadow-lg text-lg py-3 rounded-lg">
                  {t('common:enrollNow')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <Card className="bg-card/70 dark:bg-card/50 backdrop-blur-lg shadow-xl border border-border/50 rounded-2xl sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-primary font-semibold">{t('common:courseDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-5">
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 mr-3 rtl:ml-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('common:coursePrice')}</p>
                  <p className="font-semibold text-foreground text-lg md:text-xl">{getPriceText()}</p>
                </div>
              </div>
               {lang === 'fa' && t(`onlineCoursesData:${course.id}PricePerSession`, { ns: 'onlineCoursesData' }) && !t(`onlineCoursesData:${course.id}PricePerSession`, { ns: 'onlineCoursesData' }).includes('PricePerSession') && (
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-3 rtl:ml-3 text-primary/70" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('onlineCoursesData:pricePerSession', { ns: 'onlineCoursesData', defaultValue: 'Price per Session' })}</p>
                    <p className="font-medium text-foreground/80 text-sm">{t(`onlineCoursesData:${course.id}PricePerSession`, { ns: 'onlineCoursesData' })}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="h-6 w-6 mr-3 rtl:ml-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('common:courseDuration')}</p>
                  <p className="font-semibold text-foreground text-base md:text-lg">{t(`onlineCoursesData:${course.durationKey}`)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-6 w-6 mr-3 rtl:ml-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('common:courseSchedule')}</p>
                  <p className="font-semibold text-foreground text-base md:text-lg">{t('common:flexibleSchedule')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-6 w-6 mr-3 rtl:ml-3 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('common:courseAudience')}</p>
                  <p className="font-semibold text-foreground text-base md:text-lg">{t(`onlineCoursesData:${course.audienceKey}`)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default CourseDetailPage;