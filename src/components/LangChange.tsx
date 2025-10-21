// src/components/LangChange.tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸', dir: 'ltr' },
  { code: 'hi', name: 'हिंदी (India)', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ar', name: 'العربية (UAE)', flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr', name: 'Français (France)', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Español (Spain)', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', name: 'Deutsch (Germany)', flag: '🇩🇪', dir: 'ltr' },
  // ... add more languages as needed
];

const LangChange = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const updateLanguage = () => {
      const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = currentLang.dir;
      localStorage.setItem('language', i18n.language);
    };

    updateLanguage();
    i18n.on('languageChanged', updateLanguage);
    return () => i18n.off('languageChanged', updateLanguage);
  }, [i18n]);

  return null; // Invisible component
};

export default LangChange;
