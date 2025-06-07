import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const roles = ['customer', 'collaborator', 'teacher'];

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'customer' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
    navigate('/profile');
  };

  return (
    <motion.section className="max-w-md mx-auto" initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">{t('register')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="block mb-1">{t('fullName')}</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-1">{t('email')}</Label>
          <Input id="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="phone" className="block mb-1">{t('phone')}</Label>
          <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="role" className="block mb-1">{t('role')}</Label>
          <Select value={form.role} onValueChange={(val) => setForm(prev=>({ ...prev, role: val }))}>
            <SelectTrigger id="role">
              <SelectValue placeholder={t('role')} />
            </SelectTrigger>
            <SelectContent>
              {roles.map(r => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">{t('register')}</Button>
      </form>
    </motion.section>
  );
};

export default RegisterPage;
