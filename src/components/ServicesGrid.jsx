import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Ticket, Brush, ShoppingBag, LayoutGrid, Cpu, Puzzle, Zap } from 'lucide-react'; // Updated icons

const servicesData = [
  {
    id: 'onlineTicketing',
    titleKey: 'serviceOnlineTicketingTitle',
    descriptionKey: 'serviceOnlineTicketingDesc',
    orderLink: '#order-online-ticketing',
    icon: <Ticket className="h-12 w-12 text-primary mb-4" />,
  },
  {
    id: 'wordpressThemes',
    titleKey: 'serviceWordPressThemesTitle',
    descriptionKey: 'serviceWordPressThemesDesc',
    orderLink: '#order-wordpress-themes',
    icon: <Brush className="h-12 w-12 text-primary mb-4" />,
  },
  {
    id: 'webApps',
    titleKey: 'serviceWebAppsTitle',
    descriptionKey: 'serviceWebAppsDesc',
    orderLink: '#order-web-apps',
    icon: <LayoutGrid className="h-12 w-12 text-primary mb-4" />,
  },
  {
    id: 'windowsApps',
    titleKey: 'serviceWindowsAppsTitle',
    descriptionKey: 'serviceWindowsAppsDesc',
    orderLink: '#order-windows-apps',
    icon: <Cpu className="h-12 w-12 text-primary mb-4" />,
  },
  {
    id: 'excelAccess',
    titleKey: 'serviceExcelAccessTitle',
    descriptionKey: 'serviceExcelAccessDesc',
    orderLink: '#order-excel-access',
    icon: <Puzzle className="h-12 w-12 text-primary mb-4" />,
  },
  {
    id: 'smartGadgets',
    titleKey: 'serviceSmartGadgetsTitle',
    descriptionKey: 'serviceSmartGadgetsDesc',
    orderLink: '#order-smart-gadgets',
    icon: <Zap className="h-12 w-12 text-primary mb-4" />,
  },
];

const ServiceCard = ({ service }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(var(--card-foreground-rgb),0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="flex flex-col h-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out bg-card/80 backdrop-blur-xs dark:bg-card/60">
        <CardHeader className="items-center text-center">
          {service.icon}
          <CardTitle className="text-2xl font-semibold text-primary">{t(service.titleKey)}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-muted-foreground leading-relaxed line-clamp-6 text-center">
            {t(service.descriptionKey)}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button 
            asChild 
            size="lg" 
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-md group"
          >
            <a href={service.orderLink} target="_blank" rel="noopener noreferrer">
              {t('orderNow')}
              <ArrowRight className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const { t } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  return (
    <motion.section 
      id="other-services" 
      className="py-16 sm:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">{t('ourProductsAndServices')}</h2>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('productsDesc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesGrid;