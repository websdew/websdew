import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '@/locales/en/common.json';
import enSeoPricing from '@/locales/en/seoPricing.json';
import enServicesGrid from '@/locales/en/servicesGrid.json';
import enInteractivePricing from '@/locales/en/interactivePricing.json';
import enCrmPricing from '@/locales/en/crmPricing.json';

import faCommon from '@/locales/fa/common.json';
import faSeoPricing from '@/locales/fa/seoPricing.json';
import faServicesGrid from '@/locales/fa/servicesGrid.json';
import faInteractivePricing from '@/locales/fa/interactivePricing.json';
import faCrmPricing from '@/locales/fa/crmPricing.json';

import arTranslation from '@/locales/ar.json';

import itCommon from '@/locales/it/common.json';
import itSeoPricing from '@/locales/it/seoPricing.json';
import itServicesGrid from '@/locales/it/servicesGrid.json';
import itInteractivePricing from '@/locales/it/interactivePricing.json';
import itCrmPricing from '@/locales/it/crmPricing.json';

import deCommon from '@/locales/de/common.json';
import deSeoPricing from '@/locales/de/seoPricing.json';
import deServicesGrid from '@/locales/de/servicesGrid.json';
import deInteractivePricing from '@/locales/de/interactivePricing.json';
import deCrmPricing from '@/locales/de/crmPricing.json';

import frCommon from '@/locales/fr/common.json';
import frSeoPricing from '@/locales/fr/seoPricing.json';
import frServicesGrid from '@/locales/fr/servicesGrid.json';
import frInteractivePricing from '@/locales/fr/interactivePricing.json';
import frCrmPricing from '@/locales/fr/crmPricing.json';

const mergeTranslations = (common, ...specifics) => {
  let merged = { ...common };
  specifics.forEach(specific => {
    merged = { ...merged, ...specific };
  });
  return { translation: merged };
};

const resources = {
  en: mergeTranslations(
    enCommon, 
    enSeoPricing, 
    enServicesGrid, 
    enInteractivePricing, 
    enCrmPricing
  ),
  fa: mergeTranslations(
    faCommon,
    faSeoPricing,
    faServicesGrid,
    faInteractivePricing,
    faCrmPricing
  ),
  ar: arTranslation,
  it: mergeTranslations(
    itCommon,
    itSeoPricing,
    itServicesGrid,
    itInteractivePricing,
    itCrmPricing
  ),
  de: mergeTranslations(
    deCommon,
    deSeoPricing,
    deServicesGrid,
    deInteractivePricing,
    deCrmPricing
  ),
  fr: mergeTranslations(
    frCommon,
    frSeoPricing,
    frServicesGrid,
    frInteractivePricing,
    frCrmPricing
  ),
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;