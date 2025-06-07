import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const formatPrice = (price) => {
  return `$${price}`;
};

const DigitalProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm">
        {product.label && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
            {product.label}
          </div>
        )}
        <CardHeader className="p-4">
          <img-replace src={product.image} alt={product.title} className="w-full h-40 object-cover rounded" />
          <CardTitle className="mt-4 text-lg font-bold text-foreground line-clamp-2">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{product.description}</p>
          {product.discountPrice ? (
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="line-through text-muted-foreground text-sm">{formatPrice(product.price)}</span>
              <span className="text-xl font-bold text-primary">{formatPrice(product.discountPrice)}</span>
            </div>
          ) : (
            <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
          )}
        </CardContent>
        <CardFooter className="p-4 mt-auto">
          <Button size="sm" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground">
            <ShoppingCart className="w-4 h-4 mr-2 rtl:ml-2" /> Buy Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DigitalProductCard;
