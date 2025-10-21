import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      about: "About Us", 
      services: "Our Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact Us",
      
      // Home Page
      heroTitle: "Enterprise-Grade Technology Solutions",
      heroSubtitle: "We are a remote-first collective of independent technology professionals delivering enterprise-grade web solutions with precision and innovation.",
      startProject: "Start Your Project",
      watchStory: "Watch Our Story",
      projectsDelivered: "Projects Delivered",
      globalClients: "Global Clients", 
      clientSatisfaction: "Client Satisfaction",
      supportAvailable: "Support Available",
      ourExpertise: "Our Expertise",
      expertiseSubtitle: "From modern web applications to enterprise solutions, we deliver excellence across the technology spectrum with precision and innovation.",
      
      // Services
      mernTitle: "MERN Stack Development",
      mernDesc: "Full-stack JavaScript applications with modern architecture and scalable solutions that drive business growth.",
      secopsTitle: "Security Operations",
      secopsDesc: "Comprehensive security implementation and monitoring for enterprise applications with advanced threat protection.",
      devopsTitle: "DevOps & Infrastructure", 
      devopsDesc: "Streamlined deployment pipelines and cloud infrastructure management for reliable, scalable operations.",
      ecommerceTitle: "E-Commerce Solutions",
      ecommerceDesc: "Custom Shopify and WordPress platforms tailored to business objectives with conversion optimization.",
      
      // Contact
      contactTitle: "Let's Build Something Amazing",
      contactSubtitle: "Ready to transform your ideas into reality? Let's discuss your project requirements and explore how our expertise can drive your success.",
      getConsultation: "Get Your Free Consultation",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      companyName: "Company Name",
      serviceInterest: "Service Interest",
      projectDetails: "Project Details",
      sendMessage: "Send Message",
      
      // Footer
      footerDesc: "Remote-first collective of technology professionals delivering enterprise-grade web solutions with precision and innovation.",
      quickLinks: "Quick Links",
      ourServices: "Our Services",
      whyPillanix: "Why Pillanix?",
      stayUpdated: "Stay Updated",
      subscribe: "Subscribe",
      copyright: "© 2025 PILLANIX. All rights reserved. Crafted with passion and precision."
    }
  },
  hi: {
    translation: {
      // Navigation
      home: "होम",
      about: "हमारे बारे में",
      services: "हमारी सेवाएं", 
      projects: "प्रोजेक्ट्स",
      blog: "ब्लॉग",
      contact: "संपर्क करें",
      
      // Home Page
      heroTitle: "एंटरप्राइज़-ग्रेड टेक्नोलॉजी समाधान",
      heroSubtitle: "हम स्वतंत्र प्रौद्योगिकी पेशेवरों का एक रिमोट-फर्स्ट समूह हैं जो सटीकता और नवाचार के साथ एंटरप्राइज़-ग्रेड वेब समाधान प्रदान करते हैं।",
      startProject: "अपना प्रोजेक्ट शुरू करें",
      watchStory: "हमारी कहानी देखें",
      projectsDelivered: "प्रोजेक्ट्स डिलीवर किए गए",
      globalClients: "वैश्विक ग्राहक",
      clientSatisfaction: "ग्राहक संतुष्टि", 
      supportAvailable: "सहायता उपलब्ध",
      ourExpertise: "हमारी विशेषज्ञता",
      expertiseSubtitle: "आधुनिक वेब एप्लिकेशन से लेकर एंटरप्राइज़ समाधान तक, हम सटीकता और नवाचार के साथ प्रौद्योगिकी स्पेक्ट्रम में उत्कृष्टता प्रदान करते हैं।"
    }
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      projects: "المشاريع", 
      blog: "المدونة",
      contact: "اتصل بنا",
      
      // Home Page
      heroTitle: "حلول تقنية على مستوى المؤسسات",
      heroSubtitle: "نحن مجموعة من المحترفين التقنيين المستقلين الذين يعملون عن بُعد ويقدمون حلول ويب على مستوى المؤسسات بدقة وابتكار.",
      startProject: "ابدأ مشروعك",
      watchStory: "شاهد قصتنا",
      projectsDelivered: "المشاريع المنجزة",
      globalClients: "العملاء العالميون",
      clientSatisfaction: "رضا العملاء",
      supportAvailable: "الدعم متاح",
      ourExpertise: "خبرتنا",
      expertiseSubtitle: "من تطبيقات الويب الحديثة إلى حلول المؤسسات، نقدم التميز عبر طيف التكنولوجيا بدقة وابتكار."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;