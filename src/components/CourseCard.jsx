import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Database, FileText, MonitorPlay, Server, Users, CheckCircle, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  vb: <MonitorPlay className="h-10 w-10 text-primary" />,
  csharp: <Code className="h-10 w-10 text-primary" />,
  excel: <FileText className="h-10 w-10 text-primary" />,
  access: <Database className="h-10 w-10 text-primary" />,
  htmlcssjs: <Code className="h-10 w-10 text-primary" />,
  php: <Server className="h-10 w-10 text-primary" />,
  wordpress: <BookOpen className="h-10 w-10 text-primary" />,
  fullstack: <LayoutGrid className="h-10 w-10 text-primary" />,
};

const CourseCard = ({ course }) => {
  const { t, i18n } = useTranslation(['common', 'onlineCoursesData']);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className={cn(
        "flex flex-col h-full rounded-2xl overflow-hidden font-sans",
        "bg-card/70 dark:bg-card/50 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-lg border border-border/50"
      )}>
        <CardHeader className="items-center text-center p-6 space-y-3 bg-muted/30 dark:bg-muted/20">
          <div className="p-3 bg-primary/10 rounded-full">
            {iconMap[course.id] || <BookOpen className="h-10 w-10 text-primary" />}
          </div>
          <CardTitle className="text-lg md:text-xl font-semibold text-primary">{t(`onlineCoursesData:${course.titleKey}`)}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-5 md:p-6 space-y-4">
          <CardDescription className="text-muted-foreground text-sm min-h-[70px] line-clamp-4 leading-relaxed">
            {t(`onlineCoursesData:${course.descKey}`)}
          </CardDescription>
          
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p><span className="font-medium text-foreground">{t('common:courseDuration')}:</span> {t(`onlineCoursesData:${course.durationKey}`)}</p>
            <p><span className="font-medium text-foreground">{t('common:courseAudience')}:</span> {t(`onlineCoursesData:${course.audienceKey}`)}</p>
          </div>

          {benefits.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-semibold mb-2 text-foreground uppercase tracking-wider">{t('common:features')}</h4>
              <ul className="space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 mr-2 rtl:ml-2 text-green-500 shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <p className="text-xl md:text-2xl font-bold text-foreground pt-3">{getPriceText()}</p>
        </CardContent>
        <CardFooter className="p-5 md:p-6 bg-muted/30 dark:bg-muted/20 border-t border-border/50">
          <Button asChild size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground group shadow-md hover:shadow-lg text-base">
            <Link to={`/course/${course.id}`}>
              {t('common:viewDetails')}
              <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;