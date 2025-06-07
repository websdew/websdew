import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      // Placeholder for actual form submission logic
      // For now, just show a success toast
      toast({
        title: t('messageSentSuccess'),
        description: `${t('fullNameLabel')}: ${formData.name}`,
        variant: 'default',
      });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } else {
      toast({
        title: t('messageSentError'),
        description: "Please check the form for errors.",
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <Helmet>
        <title>{`${t('contactUs')} - ${t('websdew')}`}</title>
        <meta name="description" content={t('generalContactDesc')} />
        <meta property="og:title" content={`${t('contactUs')} - ${t('websdew')}`} />
        <meta property="og:description" content={t('generalContactDesc')} />
      </Helmet>

      <header className="mb-12 text-center">
        <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground">{t('contactUs')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('generalContactDesc')}</p>
      </header>
      
      <motion.div 
        className="max-w-2xl mx-auto bg-card/70 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-border/40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">{t('contactFormTitle')}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-foreground">{t('fullNameLabel')}</Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder={t('fullNamePlaceholder')} className={`mt-1 ${errors.name ? 'border-destructive' : ''}`} />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">{t('emailAddressLabel')}</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('emailAddressPlaceholder')} className={`mt-1 ${errors.email ? 'border-destructive' : ''}`} />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="subject" className="text-foreground">{t('subjectLabel')}</Label>
            <Input id="subject" value={formData.subject} onChange={handleChange} placeholder={t('subjectPlaceholder')} className={`mt-1 ${errors.subject ? 'border-destructive' : ''}`} />
            {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
          </div>
          <div>
            <Label htmlFor="message" className="text-foreground">{t('messageLabel')}</Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} placeholder={t('messagePlaceholder')} rows={5} className={`mt-1 ${errors.message ? 'border-destructive' : ''}`} />
            {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground group">
            {t('submitOrder')} <Send className="ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Button>
        </form>
      </motion.div>

    </motion.div>
  );
};

export default ContactPage;