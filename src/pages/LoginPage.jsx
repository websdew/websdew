import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');

  const sendCode = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    login({ identifier, role: 'customer' });
    navigate('/profile');
  };

  return (
    <motion.section className="max-w-md mx-auto" initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">{t('login')}</h1>
      {step === 1 && (
        <form onSubmit={sendCode} className="space-y-4">
          <div>
            <Label htmlFor="identifier" className="block mb-1">{t('email')} / {t('phone')}</Label>
            <Input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">{t('sendCode')}</Button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <Label htmlFor="code" className="block mb-1">{t('verificationCode')}</Label>
            <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">{t('verify')}</Button>
        </form>
      )}
    </motion.section>
  );
};

export default LoginPage;
