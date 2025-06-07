import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const PricingCard = ({ title, description, price, period, features, buttonText, popular, type = "service" }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col h-full ${popular ? 'border-2 border-primary shadow-2xl transform scale-105' : ''}`}
    >
      <Card className={`flex flex-col flex-grow h-full bg-card/80 backdrop-blur-xs ${popular ? 'bg-gradient-to-br from-primary/10 to-background' : ''}`}>
        {popular && (
          <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            Popular
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-primary">{t(title)}</CardTitle>
          <CardDescription className="text-muted-foreground min-h-[40px]">{t(description)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-foreground">{price}</span>
            <span className="text-sm text-muted-foreground">{t(period)}</span>
          </div>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm text-foreground">{t(feature)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
            {t(buttonText)}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PricingCard;