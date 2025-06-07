import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import TelegramIcon from '@/components/icons/TelegramIcon';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import WebsdewLogo from '@/components/WebsdewLogo';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      titleKey: 'servicesAndProducts',
      links: [
        { textKey: 'seoServices', href: '/seo-services' },
        { textKey: 'webDesign', href: '/web-design' },
        { textKey: 'digitalMarketing', href: '/digital-marketing' },
        { textKey: 'onlineCourses', href: '/online-courses' },
        { textKey: 'products', href: '/products' },
        { textKey: 'crmServices', href: '/crm-services' },
      ],
    },
    {
      titleKey: 'company',
      links: [
        { textKey: 'aboutUs', href: '/about-us' },
        { textKey: 'mag', href: '/mag' },
        { textKey: 'contactUs', href: '/contact-us' },
        { textKey: 'support', href: '/support' },
      ],
    },
    {
      titleKey: 'legal',
      links: [
        { textKey: 'privacyPolicy', href: '/privacy-policy' },
        { textKey: 'termsOfService', href: '/terms-of-service' },
      ],
    },
  ];

  const socialMedia = [
    { icon: <Facebook className="h-6 w-6" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="h-6 w-6" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="h-6 w-6" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="h-6 w-6" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="h-6 w-6" />, href: '#', label: 'Youtube' },
    { icon: <TelegramIcon className="h-6 w-6" />, href: '#', label: 'Telegram' },
    { icon: <WhatsappIcon className="h-6 w-6" />, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-gradient-to-t from-background via-muted/50 to-muted/70 dark:from-black dark:via-background/80 dark:to-background/60 text-muted-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <WebsdewLogo className="h-12 w-auto" />
            </Link>
            <p className="text-sm mb-6 max-w-xs">
              {t('heroSubtitle')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialMedia.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.titleKey}>
              <p className="font-semibold text-foreground mb-4">{t(section.titleKey)}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.textKey}>
                    <Link
                      to={link.href}
                      className="hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {t(link.textKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/40 pt-8 text-center text-sm">
          <p>{t('footerRights', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;