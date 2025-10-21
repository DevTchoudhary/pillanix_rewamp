import React, { useRef, useLayoutEffect, useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, ArrowRight, Heart, Send, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import '../styles/Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = React.memo(() => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = useCallback(() => {
    try {
      if ('scrollTo' in window) {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      } else {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    } catch (error) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  const quickLinks = useMemo(() => [
    { name: t('home') || 'Home', path: '/' },
    { name: t('about') || 'About Us', path: '/about' },
    { name: t('services') || 'Our Services', path: '/services' },
    { name: t('projects') || 'Projects', path: '/projects' },
    { name: t('blog') || 'Blog', path: '/blog' },
    { name: t('contact') || 'Contact Us', path: '/contact' },
  ], [t]);

  const services = useMemo(() => [
    'MERN Stack Development',
    'Security Operations', 
    'DevOps & Infrastructure',
    'E-Commerce Solutions',
    'Database Architecture',
    'Cloud Solutions',
  ], []);

  const whyPillanix = useMemo(() => [
    'Enterprise-Grade Solutions',
    'Remote-First Expertise',
    'Studio-Style Collaboration',
    'Global Support',
    'Scalable Architecture',
    'Security-First Approach',
  ], []);

  const socialLinks = useMemo(() => [
    {
      icon: Instagram,
      href: "https://instagram.com/pillanix",
      color: "from-pink-500 to-purple-600",
      label: "Instagram"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/pillanix", 
      color: "from-blue-500 to-cyan-600",
      label: "LinkedIn"
    },
    {
      icon: Twitter,
      href: "https://twitter.com/pillanix",
      color: "from-sky-400 to-blue-500",
      label: "Twitter"
    }
  ], []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            onEnter: () => setIsVisible(true),
            once: true
          }
        }
      );

      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.2,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 85%",
        onEnter: () => {
          console.log("Footer entered viewport");
        },
        once: true
      });

      gsap.fromTo(".footer-section",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
            once: true
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleNewsletterSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        subscriber_email: email,
        subscriber_name: email.split('@')[0],
        to_email: 'info@pillanix.com',
        subscription_date: new Date().toLocaleDateString(),
        message: `New newsletter subscription from: ${email}`
      };

      await emailjs.send(
        'service_gv5ihid',
        'template_x51atlg', 
        templateParams,
        'uERejEyTEkdh8pZLY'
      );

      setSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setSubscribed(false);
      }, 4000);

    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      alert('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email]);

  return (
    <>
      <div className="footer-wrapper">
        <footer ref={footerRef} className="footer-main text-white overflow-hidden">
          {/* Enhanced Background Effects - Solid Black Base */}
          <div className="absolute inset-0 bg-black z-0"></div>
          
          <div className="absolute inset-0 opacity-5 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          </div>

          {!prefersReducedMotion && (
            <div className="absolute inset-0 opacity-3 z-10">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
                    'radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.08) 0%, transparent 70%)',
                    'radial-gradient(circle at 50% 50%, rgba(139, 90, 150, 0.08) 0%, transparent 70%)'
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          )}

          <div className="footer-main-content relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
            {/* Main Footer Content */}
            <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-16 sm:mb-20">
              {/* Company Info Section */}
              <div className="footer-section footer-section--center lg:col-span-1">
                <motion.div
                  ref={logoRef}
                  className="flex items-center justify-center space-x-3 mb-8 sm:mb-10"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'var(--primary-gradient)'
                    }}
                    whileHover={{ 
                      rotate: prefersReducedMotion ? 0 : 180,
                      boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <img 
                      src="/logo.svg" 
                      alt="Pillanix Logo" 
                      className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                      style={{
                        filter: 'brightness(0) invert(1)',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-white font-bold text-xl">
                      P
                    </div>
                  </motion.div>
                  
                  <span className="font-bold text-2xl sm:text-3xl tracking-tight">
                    PILLANIX
                  </span>
                </motion.div>

                <motion.p 
                  className="text-white/80 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {t('footerDesc') || 'Remote-first collective of technology professionals delivering enterprise-grade web solutions with precision and innovation.'}
                </motion.p>

                {/* Social Media Icons */}
                <div className="social-icons flex space-x-5">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center relative overflow-hidden group transition-all duration-300 glass-effect"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      whileHover={{ 
                        scale: prefersReducedMotion ? 1 : 1.1,
                        boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                    >
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${social.color})`
                        }}
                      />
                      
                      <social.icon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-section footer-section--stacked">
                <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-white">
                  {t('quickLinks') || 'Quick Links'}
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        to={link.path}
                        onClick={scrollToTop}
                        className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group text-base sm:text-lg justify-center lg:justify-start"
                      >
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="footer-section footer-section--stacked">
                <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-white">
                  {t('ourServices') || 'Our Services'}
                </h3>
                <ul className="space-y-4 footer-services-list">
                  {services.map((service, index) => (
                    <motion.li
                      key={service}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        to="/services"
                        onClick={scrollToTop}
                        className="footer-service-link text-white/70 hover:text-white transition-all duration-300 text-base sm:text-lg"
                      >
                        {service}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Why Pillanix */}
              <div className="footer-section footer-section--stacked">
                <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-white">
                  {t('whyPillanix') || 'Why Pillanix?'}
                </h3>
                <ul className="space-y-4">
                  {whyPillanix.map((reason, index) => (
                    <motion.li
                      key={reason}
                      className="text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    >
                      <span className="text-white/70 text-base sm:text-lg">{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <motion.div
              className="newsletter-section border-t border-white/10 pt-16 sm:pt-20 mb-16 sm:mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div>
                  <motion.h3 
                    className="newsletter-title font-bold text-3xl sm:text-4xl mb-6 text-white"
                    animate={!prefersReducedMotion ? { y: [-2, 2, -2] } : {}}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    {t('stayUpdated') || 'Stay Updated'}
                  </motion.h3>
                  <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                    Get the latest insights on technology trends and industry innovations delivered straight to your inbox.
                  </p>
                </div>

                <motion.form 
                  onSubmit={handleNewsletterSubmit}
                  className="newsletter-form flex flex-col sm:flex-row gap-4 sm:gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.7, duration: 0.8 }}
                >
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    className="newsletter-input flex-1 px-6 py-4 sm:py-5 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 text-base sm:text-lg glass-effect"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                    whileFocus={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                    required
                  />
                  
                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-button px-8 py-4 sm:py-5 text-white font-medium rounded-xl overflow-hidden group transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
                    style={{
                      background: subscribed 
                        ? 'linear-gradient(135deg, #10b981, #34d399)' 
                        : undefined
                    }}
                    whileHover={{ scale: isSubmitting ? 1 : (prefersReducedMotion ? 1 : 1.02) }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <span>
                      {isSubmitting 
                        ? 'Subscribing...' 
                        : subscribed 
                          ? 'Subscribed!' 
                          : (t('subscribe') || 'Subscribe')
                      }
                    </span>
                    
                    <motion.div
                      animate={{ 
                        rotate: isSubmitting ? 360 : 0
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: isSubmitting ? Infinity : 0, 
                        ease: "linear" 
                      }}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : subscribed ? (
                        <Heart className="w-5 h-5" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.div>
                  </motion.button>
                </motion.form>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    className="mt-6 p-5 rounded-xl text-center glass-effect"
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <p className="text-green-400 font-medium text-base sm:text-lg">
                      🎉 Thank you for subscribing! You'll receive our latest updates soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              className="footer-bottom border-t border-white/10 pt-12 sm:pt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
                <motion.p 
                  className="text-white/70 text-base sm:text-lg"
                  animate={!prefersReducedMotion ? { opacity: [0.7, 1, 0.7] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  © 2025 PILLANIX. All rights reserved. Crafted with passion and precision.
                </motion.p>

                <div className="footer-links flex flex-col sm:flex-row gap-3 sm:gap-8 text-base sm:text-lg">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                    <motion.a
                      key={item}
                      href="#"
                      className="text-white/70 hover:text-white transition-all duration-300 text-center sm:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Fixed Scroll to Top Button - NO OVERLAP */}
          <motion.button
            ref={scrollButtonRef}
            onClick={scrollToTop}
            className="scroll-to-top"
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.5, duration: 0.5 }}
            whileHover={{
              scale: prefersReducedMotion ? 1 : 1.1,
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <motion.div
              animate={!prefersReducedMotion ? { y: [-2, 2, -2] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </motion.button>
        </footer>
      </div>
    </>
  );
});

Footer.displayName = 'Footer';

export default Footer;
