import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code, Shield, Cloud, ShoppingCart, Zap, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Services.css';

const Services = () => {
  const { t } = useTranslation();
  const [currentCard, setCurrentCard] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHeroVideoLoaded, setIsHeroVideoLoaded] = useState(false);
  const [isCtaVideoLoaded, setIsCtaVideoLoaded] = useState(false);
  const [isInCardsSection, setIsInCardsSection] = useState(false);
  const [scrollLockActive, setScrollLockActive] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const isTransitioning = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = useMemo(() => ({ damping: 25, stiffness: 700 }), []);
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const heroVideo = videoRef.current;
    const ctaVideo = ctaVideoRef.current;

    if (heroVideo) {
      const handleHeroVideoLoaded = () => {
        setIsHeroVideoLoaded(true);
        heroVideo.play().catch(console.error);
      };
      heroVideo.addEventListener('loadeddata', handleHeroVideoLoaded);
    }

    if (ctaVideo) {
      const handleCtaVideoLoaded = () => {
        setIsCtaVideoLoaded(true);
        ctaVideo.play().catch(console.error);
      };
      ctaVideo.addEventListener('loadeddata', handleCtaVideoLoaded);
    }

    return () => {
      if (heroVideo) heroVideo.removeEventListener('loadeddata', () => {});
      if (ctaVideo) ctaVideo.removeEventListener('loadeddata', () => {});
    };
  }, []);

  const services = useMemo(() => [
    {
      title: 'MERN Stack Development',
      description: 'Full-stack JavaScript applications using MongoDB, Express.js, React, and Node.js for modern, scalable web solutions that drive business growth.',
      features: ['React & Next.js Applications', 'Node.js Backend Development', 'MongoDB Database Design', 'REST & GraphQL APIs'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Code,
      number: '01',
      color: 'from-blue-500 to-purple-600',
      particles: 12
    },
    {
      title: 'Security Operations',
      description: 'Comprehensive security implementation and monitoring to protect your applications and data infrastructure with enterprise-grade solutions.',
      features: ['Security Audits & Assessment', 'Vulnerability Management', 'Compliance Implementation', 'Threat Monitoring Systems'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Shield,
      number: '02',
      color: 'from-green-500 to-teal-600',
      particles: 15
    },
    {
      title: 'DevOps & Infrastructure',
      description: 'Streamlined deployment pipelines and cloud infrastructure management for reliable, scalable operations that support business continuity.',
      features: ['CI/CD Pipeline Setup', 'Cloud Infrastructure Design', 'Container Orchestration', 'Infrastructure as Code'],
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Cloud,
      number: '03',
      color: 'from-orange-500 to-red-600',
      particles: 18
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Custom Shopify and WordPress e-commerce platforms tailored to your business needs and optimized for conversion and growth.',
      features: ['Shopify Store Development', 'WordPress E-Commerce', 'Payment Gateway Integration', 'Inventory Management Systems'],
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: ShoppingCart,
      number: '04',
      color: 'from-pink-500 to-violet-600',
      particles: 10
    },
    {
      title: 'SaaS Development',
      description: 'MERN and DevOps solutions for SaaS businesses, with a focus on scalability, security, and performance.',
      features: ['SaaS Platform Development', 'Multi-tenant Architecture', 'Subscription Management', 'Analytics Integration'],
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Code,
      number: '05',
      color: 'from-indigo-500 to-purple-600',
      particles: 10
    }
  ], []);

  useEffect(() => {
    let scrollFrame: number;
    const handleScroll = () => {
      if (scrollFrame) {
        cancelAnimationFrame(scrollFrame);
      }

      scrollFrame = requestAnimationFrame(() => {
        const servicesSection = servicesSectionRef.current;
        if (!servicesSection) return;
        
        const rect = servicesSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const isWithinSection = rect.top <= 0 && rect.bottom >= viewportHeight * 0.2;
        setIsInCardsSection(isWithinSection);

        if (isWithinSection && currentCard < services.length - 1 && !scrollLockActive) {
          setScrollLockActive(true);
        }
        
        const sectionHeight = rect.height;
        const heightDifference = Math.max(sectionHeight - viewportHeight, viewportHeight * 0.25);

        if (rect.top <= 0 && rect.bottom >= 0) {
          const scrolled = Math.min(Math.abs(rect.top), heightDifference);
          const progress = scrolled / heightDifference;
          const clampedProgress = Math.min(Math.max(progress, 0), 1);
          setScrollProgress(clampedProgress);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame) {
        cancelAnimationFrame(scrollFrame);
      }
    };
  }, [currentCard, services.length, scrollLockActive]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInCardsSection) {
        return;
      }

      const wantsToReengage = !scrollLockActive && e.deltaY < 0 && currentCard > 0;

      if (!scrollLockActive && !wantsToReengage) {
        return;
      }

      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      if (timeSinceLastScroll < 600) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const scrollingDown = delta > 0;
      const scrollingUp = delta < 0;

      if (wantsToReengage) {
        e.preventDefault();
        isTransitioning.current = true;
        lastScrollTime.current = now;

        setScrollLockActive(true);
        setCurrentCard(prev => prev - 1);

        setTimeout(() => {
          isTransitioning.current = false;
        }, 600);

        return;
      }

      if (scrollingDown && currentCard < services.length - 1) {
        e.preventDefault();
        isTransitioning.current = true;
        lastScrollTime.current = now;
        
        setCurrentCard(prev => prev + 1);
        
        setTimeout(() => {
          isTransitioning.current = false;
        }, 600);
      } 
      else if (scrollingUp && currentCard > 0) {
        e.preventDefault();
        isTransitioning.current = true;
        lastScrollTime.current = now;
        
        setCurrentCard(prev => prev - 1);
        
        setTimeout(() => {
          isTransitioning.current = false;
        }, 600);
      }
      else if (scrollingDown && currentCard === services.length - 1) {
        setScrollLockActive(false);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isInCardsSection, currentCard, services.length, scrollLockActive]);

  useEffect(() => {
    if (!isInCardsSection && currentCard > 0) {
      const timer = setTimeout(() => {
        setCurrentCard(0);
        setScrollLockActive(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInCardsSection, currentCard]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.3;
          const deltaY = (e.clientY - centerY) * 0.3;
          
          mouseX.set(deltaX);
          mouseY.set(deltaY);
          setMousePosition({ x: e.clientX, y: e.clientY });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  const getCardTransform = useCallback((index: number) => {
    const offset = index - currentCard;
    const angle = offset * 90;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    let radius, scale, blur, rotateY, rotateX;
    
    if (isMobile) {
      radius = 120;
      scale = Math.abs(offset) <= 1 ? 0.85 : 0.6;
      blur = Math.abs(offset) > 1 ? 1 : 0;
      rotateY = offset * 12;
      rotateX = Math.sin((angle * Math.PI) / 180) * 8;
    } else if (isTablet) {
      radius = 250;
      scale = Math.abs(offset) <= 1 ? 0.9 : 0.7;
      blur = Math.abs(offset) > 1 ? 1.5 : 0;
      rotateY = offset * 20;
      rotateX = Math.sin((angle * Math.PI) / 180) * 12;
    } else {
      radius = 400;
      scale = Math.abs(offset) <= 1 ? 1 : 0.8;
      blur = Math.abs(offset) > 1 ? Math.abs(offset) * 2 : 0;
      rotateY = offset * 25;
      rotateX = Math.sin((angle * Math.PI) / 180) * 15;
    }
    
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius * (isMobile ? 0.15 : 0.3);
    const z = Math.abs(offset) * (isMobile ? -80 : -200);
    
    return {
      transform: `
        perspective(1000px) 
        translate3d(${x}px, ${y}px, ${z}px) 
        rotateY(${rotateY}deg) 
        rotateX(${rotateX}deg)
        scale(${scale})
      `,
      opacity: Math.abs(offset) <= 1 ? 1 : (isMobile ? 0.5 : 0.3),
      zIndex: index === currentCard ? 20 : 10 - Math.abs(offset),
      filter: `blur(${blur}px)`,
      left: isMobile ? '50%' : 'auto',
      marginLeft: isMobile ? '-144px' : 'auto'
    };
  }, [currentCard]);

  const particleVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -30, 0],
      x: [0, Math.random() * 20 - 10, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: custom * 0.2,
        ease: "easeInOut"
      }
    })
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: 90,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 12
      }
    }
  };

  const morphingButtonVariants: Variants = {
    idle: {
      scale: 1,
      borderRadius: "8px"
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.1,
      borderRadius: "50px",
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const stats = [
    { icon: Users, value: '15+', label: 'Happy Clients' },
    { icon: Award, value: '25+', label: 'Projects Delivered' },
    { icon: TrendingUp, value: '99.99%', label: 'Success Rate' },
    { icon: Zap, value: '40+ hours/wk', label: 'Support Available' }
  ];

  return (
    <div className="pt-20 bg-black min-h-screen" ref={containerRef}>
      {!prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 performance-optimized"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {isHovering && !prefersReducedMotion && (
          <motion.div
            className="fixed pointer-events-none z-50 performance-optimized"
            style={{
              left: mousePosition.x - 20,
              top: mousePosition.y - 20,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-white/30"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 w-full h-full video-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover hardware-accelerated transition-opacity duration-1000 ${
              isHeroVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              zIndex: 1
            }}
          >
            <source
              src="https://videos.pexels.com/video-files/5735794/5735794-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              zIndex: 2
            }}
          />
          {!prefersReducedMotion && (
            <motion.div 
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 3 }}
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 80%, rgba(139, 90, 150, 0.15) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="performance-optimized"
          >
            <motion.div
              variants={titleVariants}
              animate={!prefersReducedMotion ? { y: [-5, 5, -5] } : {}}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <motion.h1 
                className="hero-title font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-8 relative"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 25%, #e0e0e0 50%, #f5f5f5 75%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t('services')}
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-12 sm:mb-16 text-white/90 leading-relaxed max-w-4xl mx-auto font-light px-2"
              variants={titleVariants}
            >
              Comprehensive technology solutions crafted with precision and delivered with excellence. 
              From concept to deployment, we handle every aspect of your digital transformation journey.
            </motion.p>
            
            <motion.div
              variants={titleVariants}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.div
                variants={morphingButtonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/contact"
                  onClick={handleScrollToTop}
                  className="cta-button relative px-6 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-2 inline-flex"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <span className="relative z-10">Start Your Project</span>
                  <motion.div
                    animate={!prefersReducedMotion ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={!prefersReducedMotion ? { y: [0, 15, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-5 h-10 sm:w-6 sm:h-12 border border-white/40 rounded-full flex justify-center glass-effect relative overflow-hidden"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
          >
            <motion.div 
              className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-2"
              animate={!prefersReducedMotion ? {
                y: [0, 16, 0],
                opacity: [1, 0.3, 1]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      <section 
        ref={servicesSectionRef}
        id="services-section" 
        className="relative bg-black"
        style={{ minHeight: '100vh' }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <motion.div 
              initial={!prefersReducedMotion ? { opacity: 0, y: 50, rotateX: 45 } : { opacity: 1, y: 0, rotateX: 0 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16 relative z-20"
            >
              <motion.h2
                className="section-title font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 relative"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                animate={!prefersReducedMotion ? { y: [-10, 10, -10] } : {}}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Our Premium Services
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{
                      background: [
                        'radial-gradient(ellipse 100% 50% at 50% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
                        'radial-gradient(ellipse 120% 60% at 50% 50%, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
                        'radial-gradient(ellipse 100% 50% at 50% 50%, rgba(139, 90, 150, 0.1) 0%, transparent 70%)'
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.h2>
              
              <motion.p 
                className="text-base sm:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed px-4"
                animate={!prefersReducedMotion ? { opacity: [0.8, 1, 0.8] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
              </motion.p>
            </motion.div>

            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center perspective-1000 overflow-hidden">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card absolute w-72 h-96 sm:w-80 sm:h-[440px] md:w-96 md:h-[520px] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 glass-effect overflow-hidden performance-optimized"
                  style={{
                    ...getCardTransform(index),
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    maxWidth: 'calc(100vw - 2rem)',
                    left: '50%',
                    transform: `translateX(-50%) ${getCardTransform(index).transform}`
                  }}
                  animate={{
                    ...getCardTransform(index),
                    left: '50%',
                    transform: `translateX(-50%) ${getCardTransform(index).transform}`
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1],
                    type: "spring",
                    damping: 20,
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: index === currentCard ? (prefersReducedMotion ? 1 : (window.innerWidth < 768 ? 0.95 : 1.05)) : (prefersReducedMotion ? 1 : (window.innerWidth < 768 ? 0.8 : 0.85)),
                    y: index === currentCard ? (prefersReducedMotion ? 0 : (window.innerWidth < 768 ? -10 : -20)) : (prefersReducedMotion ? 0 : (window.innerWidth < 768 ? 10 : 20)),
                    transition: { duration: 0.3 }
                  }}
                >
                  {!prefersReducedMotion && window.innerWidth > 768 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(Math.min(service.particles, window.innerWidth < 768 ? 4 : 8))].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: `linear-gradient(45deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`
                          }}
                          variants={particleVariants}
                          animate="animate"
                          custom={i}
                        />
                      ))}
                    </div>
                  )}

                  {!prefersReducedMotion && window.innerWidth > 768 && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-20 pointer-events-none"
                      animate={{
                        background: [
                          `linear-gradient(0deg, ${service.color})`,
                          `linear-gradient(90deg, ${service.color})`,
                          `linear-gradient(180deg, ${service.color})`,
                          `linear-gradient(270deg, ${service.color})`,
                          `linear-gradient(360deg, ${service.color})`
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <div className="h-full flex flex-col relative z-10">
                    <motion.div
                      className="h-24 sm:h-32 md:h-40 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 md:mb-6 relative"
                      style={!prefersReducedMotion && window.innerWidth > 768 ? { y: useTransform(useMotionValue(scrollProgress), [0, 1], [0, -50]) } : {}}
                    >
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: prefersReducedMotion || window.innerWidth < 768 ? 1 : 1.1 }}
                        transition={{ duration: 0.4 }}
                        loading="lazy"
                      />
                      {!prefersReducedMotion && window.innerWidth > 768 && (
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(45deg, ${service.color})`
                          }}
                          animate={{ opacity: [0.1, 0.3, 0.1] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                    </motion.div>

                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <motion.div
                        className="relative"
                        whileHover={{ 
                          rotate: prefersReducedMotion || window.innerWidth < 768 ? 0 : 360,
                          scale: prefersReducedMotion || window.innerWidth < 768 ? 1 : 1.2
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${service.color})`
                          }}
                          animate={!prefersReducedMotion && window.innerWidth > 768 ? {
                            boxShadow: [
                              '0 0 20px rgba(102, 126, 234, 0.3)',
                              '0 0 40px rgba(118, 75, 162, 0.4)',
                              '0 0 20px rgba(139, 90, 150, 0.3)'
                            ]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <service.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        </motion.div>
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <motion.h3 
                          className="font-display text-sm sm:text-lg md:text-xl font-bold text-white truncate"
                          animate={!prefersReducedMotion && window.innerWidth > 768 ? { opacity: [0.8, 1, 0.8] } : {}}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {service.title}
                        </motion.h3>
                        <motion.span
                          className="text-white/40 font-mono text-xs sm:text-sm"
                          animate={!prefersReducedMotion && window.innerWidth > 768 ? { 
                            color: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)']
                          } : {}}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {service.number}
                        </motion.span>
                      </div>
                    </div>
                    
                    <motion.p 
                      className="text-white/80 mb-3 sm:mb-4 md:mb-6 leading-relaxed flex-1 text-xs sm:text-sm line-clamp-3"
                      animate={!prefersReducedMotion && window.innerWidth > 768 ? { y: [0, -2, 0] } : {}}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {service.description}
                    </motion.p>

                    <div className="space-y-1 sm:space-y-2">
                      {service.features.slice(0, window.innerWidth < 768 ? 2 : 3).map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          className="flex items-center gap-2 sm:gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: featureIndex * 0.1,
                            duration: 0.5,
                            repeat: prefersReducedMotion || window.innerWidth < 768 ? 0 : Infinity,
                            repeatDelay: 5
                          }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                            style={{
                              background: `linear-gradient(45deg, ${service.color})`
                            }}
                            animate={!prefersReducedMotion && window.innerWidth > 768 ? {
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7]
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: featureIndex * 0.2,
                              ease: "easeInOut"
                            }}
                          />
                          <span className="text-xs text-white/70 truncate">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16 relative z-20">
              <div className="flex justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                {services.map((_, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
                  >
                    <motion.div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 ${
                        index === currentCard ? 'w-6 sm:w-8' : ''
                      }`}
                      style={{
                        background: index === currentCard 
                          ? `linear-gradient(45deg, ${services[currentCard]?.color})` 
                          : 'rgba(255,255,255,0.3)'
                      }}
                      animate={index === currentCard && !prefersReducedMotion ? {
                        boxShadow: [
                          '0 0 10px rgba(102, 126, 234, 0.5)',
                          '0 0 20px rgba(118, 75, 162, 0.7)',
                          '0 0 10px rgba(139, 90, 150, 0.5)'
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                ))}
              </div>
              
              <motion.p 
                className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base"
                animate={!prefersReducedMotion ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Currently viewing: {' '}
                <motion.span 
                  className="font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {services[currentCard]?.title}
                </motion.span>
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(139, 90, 150, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Our track record speaks for itself with proven results across diverse industries
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                className="glass-effect p-6 rounded-2xl text-center performance-optimized"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
                  }}
                  animate={!prefersReducedMotion ? {
                    boxShadow: [
                      '0 0 20px rgba(102, 126, 234, 0.3)',
                      '0 0 30px rgba(118, 75, 162, 0.4)',
                      '0 0 20px rgba(102, 126, 234, 0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </motion.div>
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 z-0 video-container">
          <video
            ref={ctaVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-1000 hardware-accelerated ${
              isCtaVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source
              src="https://videos.pexels.com/video-files/2278095/2278095-uhd_3840_2160_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50 z-1" />
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 z-2"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(139, 90, 150, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 80%, rgba(155, 49, 146, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={!prefersReducedMotion ? {
              opacity: 0,
              scale: 0.5,
              rotateY: 180,
              y: 100
            } : { opacity: 1, scale: 1, rotateY: 0, y: 0 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              y: 0
            }}
            transition={{ 
              duration: prefersReducedMotion ? 0.3 : 1.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              damping: 12
            }}
            viewport={{ once: true }}
            className="cta-section-content p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl relative overflow-hidden glass-effect performance-optimized"
            style={{
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 50%, rgba(139, 90, 150, 0.05) 100%)',
                    'linear-gradient(135deg, rgba(118, 75, 162, 0.05) 0%, rgba(139, 90, 150, 0.05) 50%, rgba(155, 49, 146, 0.05) 100%)',
                    'linear-gradient(225deg, rgba(139, 90, 150, 0.05) 0%, rgba(155, 49, 146, 0.05) 50%, rgba(102, 126, 234, 0.05) 100%)',
                    'linear-gradient(315deg, rgba(155, 49, 146, 0.05) 0%, rgba(102, 126, 234, 0.05) 50%, rgba(118, 75, 162, 0.05) 100%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <motion.h2 
              className="cta-section-title font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10 relative z-10"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e8e8e8 50%, #f0f0f0 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={!prefersReducedMotion ? { 
                y: [-3, 3, -3],
                scale: [1, 1.02, 1]
              } : {}}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Ready to Transform Your Vision?
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl text-white/80 mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto relative z-10"
              animate={!prefersReducedMotion ? { opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Join the ranks of satisfied clients who've experienced the Pillanix difference. 
              Let's build something extraordinary together.
            </motion.p>
            
            <motion.div
              className="relative z-10"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                onClick={handleScrollToTop}
                className="cta-button relative px-8 py-4 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-3 inline-flex"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(102, 126, 234, 0.4)',
                        '0 0 0 20px rgba(102, 126, 234, 0)',
                        '0 0 0 0 rgba(102, 126, 234, 0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                <span className="relative z-10">Get Started Today</span>
                <motion.div
                  animate={!prefersReducedMotion ? {
                    x: [0, 5, 0],
                    rotate: [0, 10, 0]
                  } : {}}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
