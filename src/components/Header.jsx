import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MegaMenu from '@/components/MegaMenu';
import WebsdewLogo from '@/components/WebsdewLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Info, Mail, HelpCircle, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const topLevelNavItemsLtr = [
    { titleKey: 'mag', href: '/mag', icon: <Newspaper /> },
  ];

  const topLevelNavItemsRtl = [
    { titleKey: 'mag', href: '/mag', icon: <Newspaper /> },
  ];
  
  const mobileNavItems = [
    { titleKey: 'aboutUs', href: '/about-us', icon: <Info /> },
    { titleKey: 'contactUs', href: '/contact-us', icon: <Mail /> },
    { titleKey: 'support', href: '/support', icon: <HelpCircle /> },
    { titleKey: 'mag', href: '/mag', icon: <Newspaper /> },
  ];

  const isRtl = i18n.dir(i18n.language) === 'rtl';
  const currentTopLevelNavItems = isRtl ? topLevelNavItemsRtl : topLevelNavItemsLtr;


  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "w-full border-b border-border/40 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          isHeaderSticky ? "sticky top-0 z-50 shadow-lg" : "relative z-40"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <WebsdewLogo className="h-10 w-auto" />
            <span className="sr-only">{t('websdew')}</span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
            {isRtl ? (
              <>
                <MegaMenu key="services-rtl" menuKey="servicesAndProducts" />
                <MegaMenu key="contact-rtl" menuKey="contactUs" />
                {currentTopLevelNavItems.map(item => (
                  <Button key={item.href} variant="ghost" asChild>
                    <NavLink 
                      to={item.href}
                      className={({ isActive }) => cn("text-base", isActive ? "text-primary font-semibold" : "text-foreground")}
                    >
                      {t(item.titleKey)}
                    </NavLink>
                  </Button>
                ))}
              </>
            ) : (
              <>
                <MegaMenu key="services-ltr" menuKey="servicesAndProducts" />
                <MegaMenu key="contact-ltr" menuKey="contactUs" />
                {currentTopLevelNavItems.map(item => (
                  <Button key={item.href} variant="ghost" asChild>
                    <NavLink 
                      to={item.href}
                      className={({ isActive }) => cn("text-base", isActive ? "text-primary font-semibold" : "text-foreground")}
                    >
                      {t(item.titleKey)}
                    </NavLink>
                  </Button>
                ))}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {user ? (
              <Button asChild variant="outline" className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <Link to="/profile">{t('profile')}</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <Link to="/login">{t('login')}</Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-md shadow-lg border-b border-border/40 overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-2">
              <NavLink to="/seo-services" className={({isActive}) => cn("flex items-center p-3 rounded-md hover:bg-accent", isActive && "bg-accent text-primary font-semibold")} onClick={toggleMobileMenu}>{t('seoServices')}</NavLink>
              <NavLink to="/web-design" className={({isActive}) => cn("flex items-center p-3 rounded-md hover:bg-accent", isActive && "bg-accent text-primary font-semibold")} onClick={toggleMobileMenu}>{t('webDesign')}</NavLink>
              <NavLink to="/online-courses" className={({isActive}) => cn("flex items-center p-3 rounded-md hover:bg-accent", isActive && "bg-accent text-primary font-semibold")} onClick={toggleMobileMenu}>{t('onlineCourses')}</NavLink>
              <NavLink to="/digital-marketing" className={({isActive}) => cn("flex items-center p-3 rounded-md hover:bg-accent", isActive && "bg-accent text-primary font-semibold")} onClick={toggleMobileMenu}>{t('digitalMarketing')}</NavLink>
              <NavLink to="/products" className={({isActive}) => cn("flex items-center p-3 rounded-md hover:bg-accent", isActive && "bg-accent text-primary font-semibold")} onClick={toggleMobileMenu}>{t('products')}</NavLink>
              <NavLink to="/crm-services" className={({isActive}) => cn("flex items-center p-3 rounded-md hover:bg-accent", isActive && "bg-accent text-primary font-semibold")} onClick={toggleMobileMenu}>{t('crmServices')}</NavLink>
              
              {mobileNavItems.map(item => (
                <NavLink 
                  key={item.href} 
                  to={item.href} 
                  className={({isActive}) => cn("flex items-center p-3 rounded-md hover:bg-accent space-x-2 rtl:space-x-reverse", isActive && "bg-accent text-primary font-semibold")}
                  onClick={toggleMobileMenu}
                >
                  {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                  <span>{t(item.titleKey)}</span>
                </NavLink>
              ))}
              {user ? (
                <Button asChild variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={toggleMobileMenu}>
                  <Link to="/profile">{t('profile')}</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={toggleMobileMenu}>
                  <Link to="/login">{t('login')}</Link>
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;