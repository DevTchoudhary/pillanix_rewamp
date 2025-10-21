import React, { useLayoutEffect, useRef, useCallback, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Target, Users, Globe, Award, Code, Database, ShoppingCart, BarChart3, Search, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/About.css';


gsap.registerPlugin(ScrollTrigger);


const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isHeroVideoLoaded, setIsHeroVideoLoaded] = useState(false);
  const [isCtaVideoLoaded, setIsCtaVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();


  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const values = useMemo(() => [
    {
      icon: Target,
      title: 'Innovation & Excellence',
      description: 'Cutting-edge solutions that drive business transformation and sustainable growth.',
    },
    {
      icon: Users,
      title: 'Global Expertise',
      description: 'Experienced team serving clients across UAE, USA, and Europe with proven success.',
    },
    {
      icon: Globe,
      title: 'Digital-First Approach',
      description: 'SEO-optimized, scalable solutions designed for long-term business success.',
    },
    {
      icon: Award,
      title: 'End-to-End Solutions',
      description: 'From SaaS platforms to e-commerce, we deliver complete digital transformation.',
    },
  ], []);


  const services = useMemo(() => [
    {
      title: 'Custom SaaS Development',
      description: 'Scalable platforms designed for long-term growth and business expansion.',
      icon: Code
    },
    {
      title: 'Web & App Development',
      description: 'SEO-friendly, responsive, and high-performing websites and applications.',
      icon: Smartphone
    },
    {
      title: 'E-commerce Solutions',
      description: 'Secure, conversion-optimized online stores that drive sales.',
      icon: ShoppingCart
    },
    {
      title: 'CRM & ERP Systems',
      description: 'Tailored solutions for streamlined operations and customer management.',
      icon: Database
    },
    {
      title: 'Dashboards & Analytics',
      description: 'Real-time insights for smarter business decisions and analytics.',
      icon: BarChart3
    },
    {
      title: 'SEO & Digital Marketing',
      description: 'Building websites that rank high and convert visitors to customers.',
      icon: Search
    }
  ], []);


  const industries = useMemo(() => [
    'Retail & E-commerce',
    'Healthcare & Medical',
    'Finance & Banking',
    'Real Estate',
    'Education & Training',
    'Manufacturing'
  ], []);


  useLayoutEffect(() => {
    const heroVideo = heroVideoRef.current;
    const ctaVideo = ctaVideoRef.current;


    if (heroVideo) {
      const handleHeroVideoLoaded = () => {
        setIsHeroVideoLoaded(true);
        heroVideo.play().catch(console.error);
      };
      
      if (heroVideo.readyState >= 2) {
        handleHeroVideoLoaded();
      } else {
        heroVideo.addEventListener('loadeddata', handleHeroVideoLoaded);
        heroVideo.addEventListener('canplay', handleHeroVideoLoaded);
      }
      
      return () => {
        heroVideo.removeEventListener('loadeddata', handleHeroVideoLoaded);
        heroVideo.removeEventListener('canplay', handleHeroVideoLoaded);
      };
    }
  }, []);

  useLayoutEffect(() => {
    const ctaVideo = ctaVideoRef.current;

    if (ctaVideo) {
      const handleCtaVideoLoaded = () => {
        setIsCtaVideoLoaded(true);
        ctaVideo.play().catch(console.error);
      };
      
      if (ctaVideo.readyState >= 2) {
        handleCtaVideoLoaded();
      } else {
        ctaVideo.addEventListener('loadeddata', handleCtaVideoLoaded);
        ctaVideo.addEventListener('canplay', handleCtaVideoLoaded);
      }
      
      return () => {
        ctaVideo.removeEventListener('loadeddata', handleCtaVideoLoaded);
        ctaVideo.removeEventListener('canplay', handleCtaVideoLoaded);
      };
    }
  }, []);


  useLayoutEffect(() => {
    if (prefersReducedMotion) return;


    const ctx = gsap.context(() => {
      const sections = [
        heroRef.current,
        servicesRef.current,
        valuesRef.current,
        visionRef.current,
        ctaRef.current,
      ];

      sections.forEach((section) => {
        if (!section) return;
        const scopedElements = section.querySelectorAll('*');
        if (scopedElements.length > 0) {
          gsap.set(scopedElements, { force3D: true });
        }
      });


      const heroTitle = heroRef.current?.querySelector('.hero-title');
      const heroSubtitle = heroRef.current?.querySelector('.hero-subtitle');
      const heroBtn = heroRef.current?.querySelector('.hero-btn');


      if (heroTitle && heroSubtitle && heroBtn) {
        const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });
        heroTl
          .fromTo(heroTitle, 
            { scale: 0.9, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 1 }
          )
          .fromTo(heroSubtitle, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.5"
          )
          .fromTo(heroBtn, 
            { y: 20, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6 },
            "-=0.3"
          );
      }


      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      if (serviceCards && serviceCards.length > 0) {
        ScrollTrigger.batch(Array.from(serviceCards), {
          onEnter: (elements) => {
            gsap.fromTo(elements, 
              { y: 50, opacity: 0 },
              { 
                y: 0, 
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
              }
            );
          },
          start: "top 85%",
          once: true
        });
      }


      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      if (valueCards && valueCards.length > 0) {
        ScrollTrigger.batch(Array.from(valueCards), {
          onEnter: (elements) => {
            gsap.fromTo(elements, 
              { scale: 0.8, opacity: 0 },
              { 
                scale: 1, 
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "back.out(1.7)"
              }
            );
          },
          start: "top 80%",
          once: true
        });
      }


      const visionLeft = visionRef.current?.querySelector('.vision-left');
      const visionRight = visionRef.current?.querySelector('.vision-right');


      if (visionLeft) {
        gsap.fromTo(visionLeft, 
          { x: -30, opacity: 0 },
          { 
            x: 0, 
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visionRef.current,
              start: "top 75%",
            }
          }
        );
      }


      if (visionRight) {
        gsap.fromTo(visionRight, 
          { x: 30, opacity: 0 },
          { 
            x: 0, 
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visionRef.current,
              start: "top 75%",
            }
          }
        );
      }


      const ctaContent = ctaRef.current?.querySelector('.cta-content');
      if (ctaContent) {
        gsap.fromTo(ctaContent, 
          { scale: 0.9, opacity: 0, y: 30 },
          { 
            scale: 1, 
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
            }
          }
        );
      }


      titleRefs.current.forEach((title, index) => {
        if (title) {
          gsap.to(title, {
            y: -5,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3
          });
        }
      });


      const parallaxVideos = document.querySelectorAll('.parallax-video');
      if (parallaxVideos.length > 0) {
        gsap.to(Array.from(parallaxVideos), {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-video",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }


    });


    return () => ctx.revert();
  }, [prefersReducedMotion]);


  return (
    <div className="about-page pt-20 bg-black">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`w-full h-full object-cover parallax-video transition-opacity duration-1000 hardware-accelerated ${
              isHeroVideoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
            style={{ backgroundColor: '#000000' }}
          >
            <source
              src="https://videos.pexels.com/video-files/5735794/5735794-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>


        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 pt-20">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, ease: "easeOut" }}
            className="performance-optimized"
          >
            <h1 
              className="hero-title font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-8"
              ref={el => titleRefs.current[0] = el}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 25%, #e0e0e0 50%, #f5f5f5 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              About Pillanix
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-12 sm:mb-16 text-white/90 leading-relaxed max-w-4xl mx-auto font-light px-2">
              Empowering businesses with cutting-edge technology solutions that drive growth and digital transformation across UAE, USA, and Europe.
            </p>
            <Link
              to="/contact"
              onClick={handleScrollToTop}
              className="hero-btn cta-button relative px-6 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-2 inline-flex"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
          </motion.div>
        </div>
      </section>


      <section className="py-16 sm:py-24 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={!prefersReducedMotion ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <h2 
                className="section-title font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
                ref={el => titleRefs.current[1] = el}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Who We Are
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4 sm:mb-6">
                At Pillanix, we empower businesses with cutting-edge web development, SaaS platforms, 
                CRM & ERP solutions, and e-commerce technologies that drive growth. Headquartered in 
                UAE & India, and serving clients across the USA and Europe, we combine innovation, 
                scalability, and performance to deliver solutions that meet the demands of today's digital world.
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                We are a team of experienced developers, designers, and digital strategists passionate 
                about transforming ideas into business-ready technology. Our expertise spans multiple 
                industries, helping startups, SMEs, and enterprises adopt digital-first solutions that 
                enhance efficiency and profitability.
              </p>
            </motion.div>
            
            <motion.div
              initial={!prefersReducedMotion ? { opacity: 0, x: 30 } : { opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
              viewport={{ once: true }}
              className="relative performance-optimized"
            >
              <div 
                className="image-container w-full h-64 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-4 glass-effect"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                }}
              >
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Pillanix Team"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      <section ref={servicesRef} className="py-16 sm:py-24 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 
              className="section-title font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
              ref={el => titleRefs.current[2] = el}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              What We Do
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed px-4">
              Comprehensive digital solutions designed to transform your business and drive sustainable growth.
            </p>
          </motion.div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 performance-optimized glass-effect"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'var(--primary-gradient)'
                  }}
                >
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section ref={valuesRef} className="py-16 sm:py-24 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 
              className="section-title font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
              ref={el => titleRefs.current[3] = el}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Why Choose Pillanix?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed px-4">
              Our commitment to excellence and innovation sets us apart in the digital transformation landscape.
            </p>
          </motion.div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card text-center group p-5 sm:p-6 rounded-2xl transition-all duration-500 hover:-translate-y-3 performance-optimized glass-effect"
                style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: 'var(--primary-gradient)'
                  }}
                >
                  <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section ref={visionRef} className="py-16 sm:py-24 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 
              className="section-title font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
              ref={el => titleRefs.current[4] = el}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Our Vision
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed px-4">
              To become a global leader in SaaS and digital solutions, helping businesses across the 
              UAE, USA, and Europe achieve digital transformation with innovative, cost-effective, 
              and scalable technology.
            </p>
          </motion.div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            <div className="vision-left space-y-6 sm:space-y-8">
              <div 
                className="vision-card p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:scale-105 glass-effect performance-optimized"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                  🇦🇪🇮🇳 UAE & India Operations
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4 sm:mb-6">
                  Headquartered in UAE & India with primary operations serving as the hub for innovation 
                  and client collaboration across global markets, providing localized expertise and international standards.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    'Full-stack development team',
                    '24/7 client support',
                    'Regional business expertise'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--primary-gradient)' }}
                      ></div>
                      <span className="text-sm sm:text-base text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>


              <div 
                className="vision-card p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:scale-105 glass-effect performance-optimized"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Industries We Serve
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {industries.map((industry, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--primary-gradient)' }}
                      ></div>
                      <span className="text-sm text-white/70">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="vision-right space-y-6 sm:space-y-8">
              <div 
                className="image-container w-full h-48 sm:h-64 rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-4 glass-effect performance-optimized"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                }}
              >
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Global Operations"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>


              <div 
                className="vision-card p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:scale-105 glass-effect performance-optimized"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Get in Touch
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4 sm:mb-6">
                  Ready to take your business to the next level? Whether you need a SaaS product, 
                  e-commerce website, or CRM/ERP system, Pillanix is here to turn your vision into reality. 
                  Contact us today and let's build the future together.
                </p>
                <Link
                  to="/contact"
                  onClick={handleScrollToTop}
                  className="cta-button relative px-6 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-2 inline-flex"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">Contact Us Today</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section ref={ctaRef} className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <video
            ref={ctaVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`w-full h-full object-cover parallax-video transition-opacity duration-1000 hardware-accelerated ${
              isCtaVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundColor: '#000000' }}
          >
            <source
              src="https://videos.pexels.com/video-files/2278095/2278095-uhd_3840_2160_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
          <div
            className="cta-content cta-section-content p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl glass-effect performance-optimized"
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
          </div>
        </div>
      </section>
    </div>
  );
};


export default About;
