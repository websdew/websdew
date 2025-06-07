import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <motion.section className="max-w-2xl mx-auto" initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">{t('profile')}</h1>
      <Tabs.Root defaultValue="info" className="w-full">
        <Tabs.List className="flex space-x-2 rtl:space-x-reverse mb-4 border-b border-border/40">
          <Tabs.Trigger value="info" className="px-3 py-2 text-sm">{t('userInfo')}</Tabs.Trigger>
          <Tabs.Trigger value="orders" className="px-3 py-2 text-sm">{t('orders')}</Tabs.Trigger>
          <Tabs.Trigger value="payments" className="px-3 py-2 text-sm">{t('payments')}</Tabs.Trigger>
          <Tabs.Trigger value="classes" className="px-3 py-2 text-sm">{t('classes')}</Tabs.Trigger>
          <Tabs.Trigger value="products" className="px-3 py-2 text-sm">{t('products')}</Tabs.Trigger>
          <Tabs.Trigger value="subs" className="px-3 py-2 text-sm">{t('subscriptions')}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="info" className="p-4">
          <p>{t('fullName')}: {user.name || user.identifier}</p>
          <p>{t('role')}: {user.role}</p>
        </Tabs.Content>
        <Tabs.Content value="orders" className="p-4">
          <p>{t('noData')}</p>
        </Tabs.Content>
        <Tabs.Content value="payments" className="p-4">
          <p>{t('noData')}</p>
        </Tabs.Content>
        <Tabs.Content value="classes" className="p-4">
          <p>{t('noData')}</p>
        </Tabs.Content>
        <Tabs.Content value="products" className="p-4">
          <p>{t('noData')}</p>
        </Tabs.Content>
        <Tabs.Content value="subs" className="p-4">
          <p>{t('noData')}</p>
        </Tabs.Content>
      </Tabs.Root>
      <div className="text-center mt-6">
        <Button onClick={logout}>{t('logout')}</Button>
      </div>
    </motion.section>
  );
};

export default ProfilePage;
