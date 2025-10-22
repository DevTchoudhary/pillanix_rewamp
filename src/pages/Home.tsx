import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';


const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isCtaVideoLoaded, setIsCtaVideoLoaded] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isStoryVideoReady, setIsStoryVideoReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();


  // 🔥 PREVENT INITIAL OVERFLOW - Component Mount Fix
  useEffect(() => {
    // Force overflow hidden immediately
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
    document.body.style.width = '100%';
    
    // Set mounted state after small delay to prevent flash
    const timer = setTimeout(() => {
      setIsComponentMounted(true);
    }, 50);


    return () => {
      clearTimeout(timer);
    };
  }, []);


  useEffect(() => {
    if (isStoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }


    return () => {
      document.body.style.overflow = '';
    };
  }, [isStoryOpen]);


  // Video handlers using element props instead of addEventListener
  const handleHeroVideoReady = useCallback(() => {
    setIsVideoLoaded(true);
    videoRef.current?.play().catch(console.error);
  }, []);


  const handleCtaVideoReady = useCallback(() => {
    setIsCtaVideoLoaded(true);
    ctaVideoRef.current?.play().catch(console.error);
  }, []);


  const handleHeroVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Hero video error:', e);
    setIsVideoLoaded(true); // Show content even if video fails
  }, []);


  const handleCtaVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('CTA video error:', e);
    setIsCtaVideoLoaded(true); // Show content even if video fails
  }, []);


  const handleStoryOpen = useCallback(() => {
    setIsStoryVideoReady(false);
    setIsStoryOpen(true);
  }, []);


  const handleStoryClose = useCallback(() => {
    setIsStoryOpen(false);
    setIsStoryVideoReady(false);
  }, []);


  const handleIframeLoad = useCallback(() => {
    setIsStoryVideoReady(true);
  }, []);


  useEffect(() => {
    if (!isStoryOpen) return;


    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleStoryClose();
      }
    };


    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStoryClose, isStoryOpen]);


  const expertiseAreas = useMemo(() => [
    {
      title: 'Full-Stack Development',
      description: 'Modern web applications with cutting-edge technology stacks',
      image: '/illust1.svg',
      number: '01'
    },
    {
      title: 'Cloud Architecture', 
      description: 'Scalable infrastructure solutions for enterprise growth',
      image: '/illut2.svg',
      number: '02'
    },
    {
      title: 'Security Solutions',
      description: 'Advanced protection for mission-critical applications',
      image: '/illust3.svg',
      number: '03'
    },
    {
      title: 'Digital Commerce',
      description: 'E-commerce platforms that drive conversion and growth',
      image: '/illust4.svg',
      number: '04'
    }
  ], []);


  const CounterStat = React.memo(({ end, suffix = '', duration = 2, delay = 0 }: { 
    end: number; 
    suffix?: string; 
    duration?: number; 
    delay?: number 
  }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const rafRef = useRef<number>();


    useEffect(() => {
      if (isInView && !prefersReducedMotion) {
        const timer = setTimeout(() => {
          let start = 0;
          const startTime = Date.now();
          const endTime = startTime + (duration * 1000);
          
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            setCount(Math.floor(easedProgress * end));
            
            if (now < endTime) {
              rafRef.current = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          
          rafRef.current = requestAnimationFrame(animate);
        }, delay * 1000);
        
        return () => {
          clearTimeout(timer);
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        };
      } else if (isInView && prefersReducedMotion) {
        setTimeout(() => setCount(end), delay * 1000);
      }
    }, [isInView, end, duration, delay, prefersReducedMotion]);


    return (
      <span ref={ref}>
        {count}{suffix}
      </span>
    );
  });


  const stats = useMemo(() => [
    { number: 50, suffix: '+', label: t('projectsDelivered'), delay: 0.1 },
    { number: 30, suffix: '+', label: t('globalClients'), delay: 0.2 },
    { number: 99, suffix: '%', label: t('clientSatisfaction'), delay: 0.3 },
    { number: 40, suffix: '+', label: t('Support Hours Weekly'), delay: 0.4 }
  ], [t]);


  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  // 🔥 RENDER NOTHING UNTIL MOUNTED TO PREVENT OVERFLOW FLASH
  if (!isComponentMounted) {
    return (
      <div className="bg-black min-h-screen w-full flex items-center justify-center" style={{ overflow: 'hidden' }}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }


  return (
    <div className="relative bg-black min-h-screen" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>


      {/* 🔥 Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-protection section-wrapper">
        {/* Video Background */}
        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={handleHeroVideoReady}
            onCanPlay={handleHeroVideoReady}
            onError={handleHeroVideoError}
            className={`transition-opacity duration-1000 hardware-accelerated ${
              isVideoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
          >
            <source
              src="https://videos.pexels.com/video-files/5735794/5735794-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>


        {/* Hero Content */}
        <div className="relative z-10 text-center text-white content-container max-w-6xl">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, ease: "easeOut" }}
            className="performance-optimized"
          >
            <motion.h1 
              className="hero-title font-display text-4lg sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-8 whitespace-normal sm:whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 25%, #e0e0e0 50%, #f5f5f5 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              {t('heroTitle')}
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-12 sm:mb-16 text-white/90 leading-relaxed max-w-4xl mx-auto font-light px-2"
              initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.4 }}
            >
              {t('heroSubtitle')}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mobile-safe"
              initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.6 }}
            >
              <Link
                to="/contact"
                onClick={handleScrollToTop}
                className="cta-button relative px-6 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-2 hover:shadow-xl w-full sm:w-auto justify-center max-w-xs"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">{t('startProject')}</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </Link>
              
              <button 
                className="relative px-6 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center glass-effect max-w-xs"
                type="button"
                onClick={handleStoryOpen}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: 'var(--primary-gradient)' }}
                ></div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center relative z-10 bg-white/10">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
                <span className="relative z-10">{t('watchStory')}</span>
              </button>
            </motion.div>
          </motion.div>
        </div>


        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 performance-optimized"
          animate={!prefersReducedMotion ? { y: [0, 10, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border border-white/40 rounded-full flex justify-center glass-effect">
            <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>


      {/* Stats Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-black overflow-protection section-wrapper">
        <div className="content-container max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : stat.delay, duration: prefersReducedMotion ? 0 : 0.8 }}
                viewport={{ once: true, margin: "-10%" }}
                className="text-center group performance-optimized"
              >
                <div 
                  className="stats-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 glass-effect"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <h3 
                    className="stats-number font-display text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 25%, #e8e8e8 50%, #f0f0f0 75%, #ffffff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    <CounterStat end={stat.number} suffix={stat.suffix} delay={stat.delay} />
                  </h3>
                  <p className="text-white/80 font-medium text-base sm:text-lg leading-relaxed">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Expertise Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-black overflow-protection section-wrapper">
        <div className="content-container max-w-7xl">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-24"
          >
            <h2 
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('ourExpertise')}
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed px-4">
              {t('expertiseSubtitle')}
            </p>
          </motion.div>


          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {expertiseAreas.map((expertise, index) => (
              <motion.div
                key={index}
                initial={!prefersReducedMotion ? { opacity: 0, x: index % 2 === 0 ? -50 : 50 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: prefersReducedMotion ? 0 : 0.8 }}
                viewport={{ once: true, margin: "-10%" }}
                className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20 mobile-safe ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-8">
                    <span 
                      className="expertise-number font-display text-6xl sm:text-8xl md:text-9xl font-bold leading-none opacity-15 select-none"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {expertise.number}
                    </span>
                    <div className="space-y-4 sm:space-y-6 pt-0 lg:pt-4">
                      <h3 className="expertise-title font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        {expertise.title}
                      </h3>
                      <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {expertise.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 max-w-md lg:max-w-none">
                  <div className="relative group performance-optimized">
                    <div 
                      className="expertise-card w-full h-64 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden relative flex items-center justify-center transition-all duration-700 hover:scale-105 hover:-translate-y-4 p-6 sm:p-8 glass-effect"
                      style={{
                        background: 'rgba(255, 255, 255, 0.015)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      <img 
                        src={expertise.image} 
                        alt={expertise.title}
                        className="w-full h-full max-w-xs object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 filter brightness-90 contrast-125 saturate-110"
                        loading="lazy"
                        onError={(e) => {
                          console.log(`Error loading image: ${expertise.image}`);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700"
                        style={{ background: 'var(--primary-gradient)' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


          <motion.div 
            className="text-center mt-16 sm:mt-24"
            initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              onClick={handleScrollToTop}
              className="cta-button relative px-6 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-2 inline-flex"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">{t('services')}</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-black relative overflow-protection section-wrapper">
        <div className="video-container opacity-30">
          <video
            ref={ctaVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={handleCtaVideoReady}
            onCanPlay={handleCtaVideoReady}
            onError={handleCtaVideoError}
            className={`transition-opacity duration-1000 hardware-accelerated ${
              isCtaVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source
              src="https://videos.pexels.com/video-files/2278095/2278095-uhd_3840_2160_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 content-container max-w-5xl text-center">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            viewport={{ once: true }}
            className="cta-section-content p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl glass-effect performance-optimized mobile-safe"
            style={{
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <h2 
              className="cta-section-title font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e8e8e8 50%, #f0f0f0 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Ready to Transform Your Vision?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto">
              Join the ranks of satisfied clients who've experienced the Pillanix difference. 
              Let's build something extraordinary together.
            </p>
            <Link
              to="/contact"
              onClick={handleScrollToTop}
              className="cta-button relative px-8 py-4 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-3 inline-flex"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Get Started Today</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Story Video Modal with IFRAME */}
      <AnimatePresence>
        {isStoryOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleStoryClose}
            />
            <motion.div
              className="relative z-10 w-full max-w-3xl bg-black/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              <button
                type="button"
                onClick={handleStoryClose}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
                aria-label="Close story video"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative w-full pt-[56.25%] bg-black">
                <iframe
                  src="https://drive.google.com/file/d/1hoEsBH6J1afQx-PaXxbv9Jl5cJw4nqjV/preview"
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isStoryVideoReady ? 'opacity-100' : 'opacity-0'}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                  title="Our Story"
                />
                {!isStoryVideoReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80">
                    <motion.div
                      className="w-10 h-10 border-3 border-white/30 border-t-white/80 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                    <span className="text-sm uppercase tracking-widest">Loading Story</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Home;
