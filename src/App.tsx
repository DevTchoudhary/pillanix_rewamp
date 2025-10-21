// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// i18n Configuration (Simple and modular)
const resources = {
  en: {
    translation: {
      home: 'Home', about: 'About Us', services: 'Our Services', 
      projects: 'Projects', blog: 'Blog', contact: 'Contact Us',
      portfolio: 'Portfolio', chooseLanguage: 'Choose Language',
      downloadPortfolio: 'Download Portfolio',
      moreLanguages: '+ {{count}} more languages available on desktop',
    },
  },
  hi: {
    translation: {
      home: 'होम', about: 'हमारे बारे में', services: 'हमारी सेवाएँ',
      projects: 'प्रोजेक्ट्स', blog: 'ब्लॉग', contact: 'संपर्क करें',
      portfolio: 'पोर्टफोलियो', chooseLanguage: 'भाषा चुनें',
      downloadPortfolio: 'पोर्टफोलियो डाउनलोड करें',
      moreLanguages: 'डेस्कटॉप पर {{count}} और भाषाएँ उपलब्ध',
    },
  },
  ar: {
    translation: {
      home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا',
      projects: 'المشاريع', blog: 'المدونة', contact: 'اتصل بنا',
      portfolio: 'المعرض', chooseLanguage: 'اختر اللغة',
      downloadPortfolio: 'تحميل المعرض', moreLanguages: '+ {{count}} لغات أخرى متاحة',
    },
  },
  fr: {
    translation: {
      home: 'Accueil', about: 'À Propos', services: 'Nos Services',
      projects: 'Projets', blog: 'Blog', contact: 'Contact',
      portfolio: 'Portfolio', chooseLanguage: 'Choisir la Langue',
      downloadPortfolio: 'Télécharger Portfolio', moreLanguages: '+ {{count}} langues supplémentaires',
    },
  },
  es: {
    translation: {
      home: 'Inicio', about: 'Acerca de', services: 'Nuestros Servicios',
      projects: 'Proyectos', blog: 'Blog', contact: 'Contacto',
      portfolio: 'Portafolio', chooseLanguage: 'Elegir Idioma',
      downloadPortfolio: 'Descargar Portafolio', moreLanguages: '+ {{count}} idiomas más',
    },
  },
  de: {
    translation: {
      home: 'Startseite', about: 'Über Uns', services: 'Unsere Services',
      projects: 'Projekte', blog: 'Blog', contact: 'Kontakt',
      portfolio: 'Portfolio', chooseLanguage: 'Sprache Wählen',
      downloadPortfolio: 'Portfolio Herunterladen', moreLanguages: '+ {{count}} weitere Sprachen',
    },
  },
  pt: {
    translation: {
      home: 'Início', about: 'Sobre Nós', services: 'Nossos Serviços',
      projects: 'Projetos', blog: 'Blog', contact: 'Contato',
      portfolio: 'Portfólio', chooseLanguage: 'Escolher Idioma',
      downloadPortfolio: 'Baixar Portfólio', moreLanguages: '+ {{count}} idiomas adicionais',
    },
  },
  ru: {
    translation: {
      home: 'Главная', about: 'О Нас', services: 'Наши Услуги',
      projects: 'Проекты', blog: 'Блог', contact: 'Контакты',
      portfolio: 'Портфолио', chooseLanguage: 'Выберите Язык',
      downloadPortfolio: 'Скачать Портфолио', moreLanguages: '+ {{count}} дополнительных языков',
    },
  },
};

// const TEN_MINUTES = 10 * 60 * 1000;
// const CONSENT_COOKIE = 'pillanix_cookie_consent';
// const LOADER_COOKIE = 'pillanix_loader_last';

// const setCookie = (name: string, value: string, days: number) => {
//   if (typeof document === 'undefined') return;
//   const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
//   document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
// };

// const getCookie = (name: string) => {
//   if (typeof document === 'undefined') return null;
//   const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
//   return match ? decodeURIComponent(match[1]) : null;
// };

// const deleteCookie = (name: string) => {
//   if (typeof document === 'undefined') return;
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
// };

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
// import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import LangChange from './components/LangChange';
import CustomCursor from './components/CustomCursor';
// import CookieConsent from './components/CookieConsent';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/services" element={
          <PageTransition>
            <Services />
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <Projects />
          </PageTransition>
        } />
        <Route path="/blog" element={
          <PageTransition>
            <Blog />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Contact />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  /*
  const [isLoading, setIsLoading] = useState(true);
  const [initialised, setInitialised] = useState(false);
  const [hasConsent, setHasConsent] = useState<'accepted' | 'declined' | null>(null);
  const [showConsent, setShowConsent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const rememberLoader = useCallback(() => {
    setCookie(LOADER_COOKIE, Date.now().toString(), 1);
  }, []);

  useEffect(() => {
    const consentCookie = getCookie(CONSENT_COOKIE);
    if (consentCookie === 'accepted') {
      setHasConsent('accepted');
      const loaderCookie = getCookie(LOADER_COOKIE);
      if (loaderCookie) {
        const lastSeen = Number(loaderCookie);
        if (!Number.isNaN(lastSeen) && Date.now() - lastSeen < TEN_MINUTES) {
          setIsLoading(false);
          rememberLoader();
        } else {
          setIsLoading(true);
        }
      } else {
        setIsLoading(true);
      }
    } else {
      if (consentCookie === 'declined') {
        deleteCookie(CONSENT_COOKIE);
        deleteCookie(LOADER_COOKIE);
        setHasConsent('declined');
      } else {
        setHasConsent(null);
      }
      deleteCookie(LOADER_COOKIE);
      setShowConsent(true);
      setIsLoading(true);
    }
    setInitialised(true);
  }, [rememberLoader]);

  const handleLoadingComplete = useCallback(() => {
    if (hasConsent === 'accepted') {
      rememberLoader();
    }
    setIsLoading(false);
  }, [hasConsent, rememberLoader]);

  const handleConsentAccept = useCallback(() => {
    setCookie(CONSENT_COOKIE, 'accepted', 365);
    setHasConsent('accepted');
    setShowConsent(false);
    rememberLoader();
  }, [rememberLoader]);

  const handleConsentDecline = useCallback(() => {
    deleteCookie(CONSENT_COOKIE);
    deleteCookie(LOADER_COOKIE);
    setHasConsent('declined');
    setShowConsent(false);
  }, []);

  return (
    <>
      <LangChange />
      <CustomCursor />

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-dark-50">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      )}

      <CookieConsent
        visible={!isLoading && showConsent}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
      />
    </>
  );
  */

  return (
    <>
      <LangChange />
      <CustomCursor />

      <div className="min-h-screen bg-dark-50">
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
