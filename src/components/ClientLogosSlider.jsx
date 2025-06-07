import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const clientsData = [
  { id: 1, name: 'Client Alpha', logoDescription: 'Logo of Client Alpha, a tech company', website: 'https://example.com/alpha', alt: 'Client Alpha Logo' },
  { id: 2, name: 'Client Beta', logoDescription: 'Logo of Client Beta, a design agency', website: 'https://example.com/beta', alt: 'Client Beta Logo' },
  { id: 3, name: 'Client Gamma', logoDescription: 'Logo of Client Gamma, an e-commerce platform', website: 'https://example.com/gamma', alt: 'Client Gamma Logo' },
  { id: 4, name: 'Client Delta', logoDescription: 'Logo of Client Delta, a finance group', website: 'https://example.com/delta', alt: 'Client Delta Logo' },
  { id: 5, name: 'Client Epsilon', logoDescription: 'Logo of Client Epsilon, a healthcare provider', website: 'https://example.com/epsilon', alt: 'Client Epsilon Logo' },
  { id: 6, name: 'Client Zeta', logoDescription: 'Logo of Client Zeta, a travel agency', website: 'https://example.com/zeta', alt: 'Client Zeta Logo' },
  { id: 7, name: 'Client Eta', logoDescription: 'Logo of Client Eta, a food and beverage company', website: 'https://example.com/eta', alt: 'Client Eta Logo' },
  { id: 8, name: 'Client Theta', logoDescription: 'Logo of Client Theta, a real estate firm', website: 'https://example.com/theta', alt: 'Client Theta Logo' },
];

const ClientLogosSlider = () => {
  const { t } = useTranslation();
  const duplicatedClients = [...clientsData, ...clientsData]; // Duplicate for seamless loop

  const sliderVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30, // Adjust duration for speed
          ease: 'linear',
        },
      },
    },
  };

  return (
    <section className="py-16 bg-background/70 dark:bg-background/50 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{t('ourFamousClients')}</h2>
        <div className="relative w-full">
          <motion.div
            className="flex"
            variants={sliderVariants}
            animate="animate"
          >
            {duplicatedClients.map((client, index) => (
              <a
                key={`${client.id}-${index}`}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${client.name}'s website`}
                className="flex-shrink-0 w-1/4 md:w-1/6 lg:w-1/8 p-4 flex items-center justify-center h-32 group"
              >
                <img 
                  alt={client.alt}
                  className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out transform group-hover:scale-110"
                 src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
              </a>
            ))}
          </motion.div>
          {/* Gradient Overlays for fade effect */}
          <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-background to-transparent dark:from-background"></div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent dark:from-background"></div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSlider;