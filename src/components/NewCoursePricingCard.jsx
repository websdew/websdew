import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Users, Tv, FileText, DollarSign, CheckCircle, Briefcase, Code, Database, Palette, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  excelAccess: <Database className="h-8 w-8 text-primary" />,
  wordpress: <Palette className="h-8 w-8 text-primary" />,
  phpMysql: <Code className="h-8 w-8 text-primary" />,
  frontend: <Code className="h-8 w-8 text-primary" />,
  vbnet: <Briefcase className="h-8 w-8 text-primary" />,
  csharpWinforms: <Briefcase className="h-8 w-8 text-primary" />,
};

const NewCoursePricingCard = ({ course, index }) => {
  const { t, i18n } = useTranslation(['common']);
  const lang = i18n.language;

  const formatPrice = (price) => {
    if (lang === 'fa') {
      const tomanPrice = price * 500; 
      return new Intl.NumberFormat('fa-IR').format(tomanPrice) + ` ${t('currencyTOMAN')}`;
    }
    if (lang === 'de' || lang === 'it') {
      const euroPrice = price * 0.9; 
      return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'it-IT', { style: 'currency', currency: 'EUR' }).format(euroPrice);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full flex"
    >
      <Card className={cn(
        "flex flex-col w-full rounded-2xl overflow-hidden font-sans",
        "bg-card/80 dark:bg-card/60 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-lg border border-border/60 hover:border-primary/50"
      )}>
        <CardHeader className="p-6 space-y-3 bg-gradient-to-br from-muted/50 to-muted/20 dark:from-muted/30 dark:to-muted/10 border-b border-border/50">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-3 bg-primary/10 rounded-full">
              {iconMap[course.id] || <FileText className="h-8 w-8 text-primary" />}
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold text-primary leading-tight">{course.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-lg text-foreground">{formatPrice(course.price)}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground col-span-2">
              <Tv className="h-5 w-5 text-purple-500" />
              <span>{t('courseFormatLabel')}: {course.format}</span>
            </div>
          </div>

          <CardDescription className="text-muted-foreground text-sm leading-relaxed pt-2 border-t border-border/30">
            {course.description}
          </CardDescription>
          
          <div className="pt-3">
            <h4 className="text-sm font-semibold mb-2 text-foreground uppercase tracking-wider flex items-center">
              <Users className="h-5 w-5 mr-2 rtl:ml-2 text-primary" />
              {t('whoShouldAttendLabel')}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{course.whoShouldAttend}</p>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-gradient-to-tr from-muted/50 to-muted/20 dark:from-muted/30 dark:to-muted/10 border-t border-border/50">
          <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground group shadow-md hover:shadow-lg text-base">
            {t('enrollNow')}
            <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NewCoursePricingCard;