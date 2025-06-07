import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DigitalProductCard from '@/components/DigitalProductCard';
import { motion } from 'framer-motion';

const products = [
  {
    id: 'theme1',
    title: 'Modern Business Theme',
    description: 'Responsive WordPress theme perfect for startups and agencies.',
    price: 49,
    discountPrice: 29,
    category: 'Themes',
    image: 'https://images.unsplash.com/photo-1502882700264-02ff9277f1d9?auto=format&fit=crop&w=800&q=60',
    label: 'Sale'
  },
  {
    id: 'plugin1',
    title: 'SEO Booster Plugin',
    description: 'Improve your rankings with automated SEO suggestions.',
    price: 39,
    discountPrice: null,
    category: 'Plugins',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 'system1',
    title: 'Invoice Manager System',
    description: 'Manage invoices and clients with this lightweight web app.',
    price: 99,
    discountPrice: 79,
    category: 'Systems',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=60',
    label: 'New'
  },
  {
    id: 'app1',
    title: 'Task Tracker Desktop App',
    description: 'Windows application to track tasks and productivity.',
    price: 59,
    discountPrice: null,
    category: 'Apps',
    image: 'https://images.unsplash.com/photo-1587825140807-06b3f33c37e7?auto=format&fit=crop&w=800&q=60'
  }
];

const categories = ['All', 'Themes', 'Plugins', 'Systems', 'Apps'];

const DigitalStore = () => {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? products : products.filter(p => p.category === category);

  return (
    <motion.section className="py-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Digital Products Store</h2>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <DigitalProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default DigitalStore;
