import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Newspaper, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MagPage = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState("allCategories");
  const [visiblePosts, setVisiblePosts] = useState(6);

  const allPosts = [
    { id: 1, title: "The Future of SEO in 2025", category: "SEO", date: "2025-05-10", excerpt: "Discover the upcoming trends and changes in the SEO landscape...", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { id: 2, title: "Web Design Principles for High Conversion", category: "Web Design", date: "2025-05-05", excerpt: "Learn how to design websites that not only look good but also convert visitors...", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { id: 3, title: "Mastering WordPress: A Beginner's Guide", category: "WordPress", date: "2025-04-28", excerpt: "Step-by-step guide to understanding and using WordPress effectively...", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { id: 4, title: "Advanced Link Building Strategies", category: "SEO", date: "2025-04-20", excerpt: "Explore effective techniques for building high-quality backlinks...", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { id: 5, title: "The Role of AI in Modern Web Development", category: "Web Design", date: "2025-04-15", excerpt: "How artificial intelligence is shaping the future of web design and development...", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80" },
    { id: 6, title: "Content Marketing for Small Businesses", category: "Digital Marketing", date: "2025-04-10", excerpt: "Practical tips for creating and distributing valuable content...", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" },
    { id: 7, title: "Understanding Core Web Vitals", category: "SEO", date: "2025-03-25", excerpt: "A deep dive into Google's Core Web Vitals and how to optimize for them...", image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { id: 8, title: "Choosing the Right WordPress Plugins", category: "WordPress", date: "2025-03-18", excerpt: "Essential plugins to enhance your WordPress website's functionality...", image: "https://images.unsplash.com/photo-1611078489935-95b8584889d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
  ];

  const categories = ["allCategories", "SEO", "Web Design", "WordPress", "Digital Marketing"];

  const filteredPosts = category === "allCategories" 
    ? allPosts 
    : allPosts.filter(post => post.category === category);

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 6);
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
        <title>{`${t('mag')} - ${t('websdew')}`}</title>
        <meta name="description" content={t('magPageDesc')} />
        <meta property="og:title" content={`${t('mag')} - ${t('websdew')}`} />
        <meta property="og:description" content={t('magPageDesc')} />
      </Helmet>

      <header className="mb-12 text-center">
        <Newspaper className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground">{t('magPageTitle')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('magPageDesc')}</p>
      </header>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-foreground">{t('comingSoon')}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[200px] justify-between">
              {t(category)} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
              {categories.map(cat => (
                <DropdownMenuRadioItem key={cat} value={cat}>{t(cat)}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-center p-6 bg-muted/30 rounded-lg mb-12">
        <p className="text-lg text-muted-foreground mb-3">{t('wordpressShortcodePlaceholder')}</p>
        <div className="p-4 border-2 border-dashed border-border/50 rounded-md text-muted-foreground bg-background/50">
          {t('comingSoonDetail')}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredPosts.slice(0, visiblePosts).map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full overflow-hidden bg-card/70 backdrop-blur-sm">
              <div className="aspect-video overflow-hidden">
                <img-replace src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary hover:underline">
                  <a href={`/mag/${post.id}`}>{post.title}</a>
                </CardTitle>
                <CardDescription className="text-xs">
                  {post.date} / <span className="text-primary font-medium">{post.category}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="text-primary p-0">
                  <a href={`/mag/${post.id}`}>Read More &rarr;</a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {visiblePosts < filteredPosts.length && (
        <div className="text-center">
          <Button size="lg" onClick={loadMorePosts} className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground">
            {t('loadMore')}
          </Button>
        </div>
      )}

    </motion.div>
  );
};

export default MagPage;