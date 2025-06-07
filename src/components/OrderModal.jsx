import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', tKey: 'english' },
  { code: 'fa', name: 'فارسی', tKey: 'persian' },
  { code: 'ar', name: 'العربية', tKey: 'arabic' },
];

const countryCodes = [
  { code: '+1', nameKey: 'countryCodeUS', country: 'US' },
  { code: '+44', nameKey: 'countryCodeGB', country: 'GB' },
  { code: '+98', nameKey: 'countryCodeIR', country: 'IR' },
  { code: '+966', nameKey: 'countryCodeSA', country: 'SA' },
  { code: '+971', nameKey: 'countryCodeAE', country: 'AE' },
];

const OrderModal = ({ isOpen, onClose, selectedPlanId, plans }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+1',
    phoneNumber: '',
    email: '',
    message: '',
    language: i18n.language,
    plan: selectedPlanId || '',
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, plan: selectedPlanId || '', language: i18n.language }));
  }, [selectedPlanId, i18n.language, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'language') {
      i18n.changeLanguage(value);
      localStorage.setItem('language', value);
      document.documentElement.lang = value;
      document.documentElement.dir = i18n.dir(value);
    }
  };
  
  const sendForm = () => {
    console.log("Form data submitted:", formData);
    alert("Form submitted! (Check console for data)");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendForm();
  };

  const currentDir = i18n.dir(formData.language);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent 
            className="sm:max-w-[525px] p-0 overflow-hidden glassmorphic"
            dir={currentDir}
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DialogHeader className={cn("p-6 pb-4", currentDir === 'rtl' ? 'text-right' : 'text-left')}>
              <DialogTitle className="text-2xl font-bold text-primary">{t('orderFormTitle')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
              <div>
                <Label htmlFor="fullName" className={cn("block mb-1 text-sm font-medium", currentDir === 'rtl' ? 'text-right' : 'text-left')}>{t('fullNameLabel')}</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder={t('fullNamePlaceholder')} required dir={currentDir} />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className={cn("block mb-1 text-sm font-medium", currentDir === 'rtl' ? 'text-right' : 'text-left')}>{t('phoneNumberLabel')}</Label>
                <div className="flex">
                  <Select value={formData.countryCode} onValueChange={(value) => handleSelectChange('countryCode', value)} dir="ltr">
                    <SelectTrigger className="w-[150px] rounded-r-none rtl:rounded-l-none rtl:rounded-r-md">
                      <SelectValue placeholder={t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map(cc => (
                        <SelectItem key={cc.code} value={cc.code}>{t(cc.nameKey)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} placeholder={t('phoneNumberPlaceholder')} required className="rounded-l-none rtl:rounded-r-none rtl:rounded-l-md" dir="ltr" />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className={cn("block mb-1 text-sm font-medium", currentDir === 'rtl' ? 'text-right' : 'text-left')}>{t('emailAddressLabel')}</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t('emailAddressPlaceholder')} required dir="ltr" />
              </div>

              <div>
                <Label htmlFor="plan" className={cn("block mb-1 text-sm font-medium", currentDir === 'rtl' ? 'text-right' : 'text-left')}>{t('selectedPlanLabel')}</Label>
                <Select value={formData.plan} onValueChange={(value) => handleSelectChange('plan', value)} dir={currentDir}>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder={t('selectedPlanLabel')} />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map(plan => (
                      <SelectItem key={plan.id} value={plan.id}>{t(plan.title)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className={cn("block mb-1 text-sm font-medium", currentDir === 'rtl' ? 'text-right' : 'text-left')}>{t('messageLabel')}</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder={t('messagePlaceholder')} rows={3} dir={currentDir} />
              </div>
              
              <div>
                <Label htmlFor="language" className={cn("block mb-1 text-sm font-medium", currentDir === 'rtl' ? 'text-right' : 'text-left')}>{t('language')}</Label>
                <Select value={formData.language} onValueChange={(value) => handleSelectChange('language', value)} dir={currentDir}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder={t('language')} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>{t(lang.tKey)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className={cn("pt-4", currentDir === 'rtl' ? 'sm:justify-start' : 'sm:justify-end')}>
                <DialogClose asChild>
                  <Button type="button" variant="outline">{t('closeModal')}</Button>
                </DialogClose>
                <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground">{t('submitOrder')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;