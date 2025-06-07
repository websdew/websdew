import React from 'react';
import { useTranslation } from 'react-i18next';

const WebsdewLogo = ({ className = "h-10 w-auto" }) => {
  const { t } = useTranslation();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/07876105-21f2-4209-b06f-94bd1cb8a0f1/73e4a5ff968f5c00b467352209d60c99.png";

  return (
    <div className="flex items-center">
      <img src={logoUrl} alt={t('websdew')} className={className} />
    </div>
  );
};

export default WebsdewLogo;