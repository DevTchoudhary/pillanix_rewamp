import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, ArrowRight, X, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import '../styles/Blog.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface BlogItem {
  src: string;
  title: string;
  category: string;
  date: string;
  size: 'large' | 'medium' | 'small';
  author: string;
  readTime: string;
  color: string;
  article: {
    content: string;
  };
}

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogItem | null>(null);
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);
  const [newsletterVideoLoaded, setNewsletterVideoLoaded] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const newsletterVideoRef = useRef<HTMLVideoElement>(null);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const galleryImages = useMemo<BlogItem[]>(() => [
    {
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'AI Revolution in Business',
      category: 'Artificial Intelligence',
      date: '2025-01-15',
      size: 'large',
      author: 'Tech Innovation Team',
      readTime: '8 min read',
      color: 'from-blue-500 to-purple-600',
      article: {
        content: `Artificial Intelligence is transforming how businesses operate, making processes more efficient and enabling data-driven decisions. Companies leveraging AI see 40% improvement in operational efficiency and 25% increase in customer satisfaction.

Key benefits include automated customer service, predictive analytics for inventory management, and personalized marketing campaigns that increase conversion rates by up to 60%.

The future of business lies in intelligent automation, where AI handles routine tasks while humans focus on creative and strategic initiatives.`
      }
    },
    {
      src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Cybersecurity Excellence',
      category: 'Security',
      date: '2025-01-12',
      size: 'medium',
      author: 'Security Operations',
      readTime: '6 min read',
      color: 'from-green-500 to-teal-600',
      article: {
        content: `Modern cybersecurity requires a multi-layered approach combining advanced threat detection, employee training, and robust infrastructure protection. Businesses implementing comprehensive security see 70% reduction in security incidents.

Essential components include real-time monitoring, automated threat response, and regular security audits. Companies with strong security posture experience 50% less downtime and maintain customer trust.

Investment in cybersecurity pays dividends through protected reputation, compliance adherence, and operational continuity.`
      }
    },
    {
      src: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Cloud Infrastructure Revolution',
      category: 'Cloud Computing',
      date: '2025-01-10',
      size: 'medium',
      author: 'DevOps Team',
      readTime: '7 min read',
      color: 'from-orange-500 to-red-600',
      article: {
        content: `Cloud infrastructure enables businesses to scale rapidly while reducing operational costs by up to 30%. Modern cloud solutions provide flexibility, reliability, and global reach that traditional infrastructure cannot match.

Benefits include automatic scaling, disaster recovery, and pay-as-you-use pricing models. Companies migrating to cloud see improved performance and reduced maintenance overhead.

The future is cloud-native, where applications are built specifically for cloud environments, maximizing efficiency and innovation potential.`
      }
    },
    {
      src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'E-Commerce Innovation',
      category: 'E-Commerce',
      date: '2025-01-08',
      size: 'small',
      author: 'Digital Commerce',
      readTime: '5 min read',
      color: 'from-pink-500 to-violet-600',
      article: {
        content: `E-commerce platforms powered by modern technology drive 300% higher conversion rates through personalized experiences and seamless checkout processes.

Key innovations include AI-powered recommendations, mobile-first design, and integrated payment solutions that reduce cart abandonment by 45%.

Success in e-commerce requires understanding customer behavior and implementing technology that enhances the shopping experience.`
      }
    },
    {
      src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Database Architecture Mastery',
      category: 'Backend Development',
      date: '2025-01-05',
      size: 'large',
      author: 'Backend Specialists',
      readTime: '9 min read',
      color: 'from-indigo-500 to-purple-600',
      article: {
        content: `Proper database architecture is the foundation of scalable applications. Well-designed databases handle millions of transactions while maintaining sub-second response times.

Modern approaches include microservices architecture, distributed databases, and caching strategies that improve performance by 80%.

Investment in robust database design prevents future scalability issues and ensures smooth business operations as companies grow.`
      }
    },
    {
      src: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Machine Learning Impact',
      category: 'AI/ML',
      date: '2025-01-03',
      size: 'small',
      author: 'ML Engineers',
      readTime: '6 min read',
      color: 'from-emerald-500 to-cyan-600',
      article: {
        content: `Machine learning transforms business operations by automating complex decision-making processes and uncovering insights from data patterns.

Applications include fraud detection, customer behavior prediction, and supply chain optimization, resulting in 35% cost reduction and improved accuracy.

The competitive advantage comes from implementing ML solutions that continuously learn and adapt to changing business conditions.`
      }
    },
    {
      src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Mobile-First Development',
      category: 'Mobile Development',
      date: '2025-01-01',
      size: 'medium',
      author: 'Mobile Team',
      readTime: '7 min read',
      color: 'from-rose-500 to-pink-600',
      article: {
        content: `Mobile-first development ensures optimal user experience across all devices, leading to 60% higher user engagement and improved conversion rates.

Key principles include responsive design, fast loading times, and intuitive navigation that works seamlessly on smartphones and tablets.

Businesses prioritizing mobile experience see increased customer retention and higher revenue per user.`
      }
    },
    {
      src: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'UX Design Excellence',
      category: 'Design',
      date: '2024-12-28',
      size: 'small',
      author: 'Design Team',
      readTime: '5 min read',
      color: 'from-amber-500 to-orange-600',
      article: {
        content: `Exceptional UX design increases user satisfaction by 200% and directly impacts business success through improved conversion rates and customer loyalty.

Great design focuses on user needs, accessibility, and intuitive interactions that make complex tasks simple and enjoyable.

Investment in UX design pays dividends through reduced support costs and increased user adoption.`
      }
    }
  ], []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (video) {
      const handleHeroVideoLoaded = () => {
        setHeroVideoLoaded(true);
        video.play().catch(console.error);
      };
      video.addEventListener('loadeddata', handleHeroVideoLoaded);
      return () => video.removeEventListener('loadeddata', handleHeroVideoLoaded);
    }
  }, []);

  useEffect(() => {
    const video = newsletterVideoRef.current;
    if (video) {
      const handleNewsletterVideoLoaded = () => {
        setNewsletterVideoLoaded(true);
        video.play().catch(console.error);
      };
      video.addEventListener('loadeddata', handleNewsletterVideoLoaded);
      return () => video.removeEventListener('loadeddata', handleNewsletterVideoLoaded);
    }
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const titleEl = titleRef.current;
      if (titleEl) {
        gsap.fromTo(titleEl, 
          { y: 50, opacity: 0, rotateX: 45, scale: 0.8 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
        );

        gsap.to(titleEl, {
          text: "Innovation Gallery",
          duration: 1.5,
          ease: "none",
          delay: 1.5
        });
      }

      const blogItems = document.querySelectorAll(".blog-item");
      if (blogItems.length > 0) {
        gsap.fromTo(Array.from(blogItems), 
          { y: 60, opacity: 0, rotateY: 15, scale: 0.9 },
          {
            y: 0, opacity: 1, rotateY: 0, scale: 1,
            duration: 0.8,
            stagger: { amount: 1.5, grid: "auto", from: "start" },
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      const particles = document.querySelectorAll(".particle");
      if (particles.length > 0) {
        particles.forEach((particle, index) => {
          gsap.to(particle, {
            y: "random(-50, 50)",
            x: "random(-25, 25)",
            rotation: "random(0, 180)",
            scale: "random(0.7, 1.3)",
            duration: "random(4, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          });
        });
      }

      ScrollTrigger.batch(".blog-item", {
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { scale: 0.9, opacity: 0.7 }, 
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
          );
        },
        onLeave: (elements) => {
          gsap.to(elements, { scale: 0.95, opacity: 0.8, duration: 0.4, stagger: 0.05 });
        },
        onEnterBack: (elements) => {
          gsap.to(elements, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05 });
        }
      });

      const heroVideo = heroVideoRef.current;
      if (heroVideo) {
        gsap.to(heroVideo, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);


  const handleCardHover = useCallback((index: number) => {
    if (prefersReducedMotion) return;
    
    gsap.to(`.blog-item-${index}`, {
      rotateY: 5,
      z: 30,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.fromTo(`.ripple-${index}`, 
      { scale: 0, opacity: 1 },
      { scale: 3, opacity: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [prefersReducedMotion]);

  const handleCardLeave = useCallback((index: number) => {
    if (prefersReducedMotion) return;
    
    gsap.to(`.blog-item-${index}`, {
      rotateY: 0, z: 0, scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  }, [prefersReducedMotion]);

  return (
    <div className="pt-20 bg-black min-h-screen relative overflow-hidden" ref={containerRef}>

      {!prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 rounded-full opacity-20 performance-optimized"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, 
                  hsl(${Math.random() * 360}, 70%, 60%), 
                  hsl(${Math.random() * 360}, 70%, 80%))`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      )}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.2) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden video-container">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-1000 hardware-accelerated ${
              heroVideoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
          >
            <source
              src="https://videos.pexels.com/video-files/5735794/5735794-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="performance-optimized"
          >
            <h1 
              ref={titleRef}
              className="hero-title font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-8 magnetic smooth-hover"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 25%, #e0e0e0 50%, #f5f5f5 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
              }}
            >
              Blog Gallery
            </h1>
            
            <motion.p 
              className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-12 sm:mb-16 text-white/90 leading-relaxed max-w-4xl mx-auto font-light magnetic px-2 performance-optimized"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}
            >
              Discover how technology drives business success through real-world applications and innovative solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  onClick={handleScrollToTop}
                  className="cta-button relative px-6 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-500 flex items-center gap-2 inline-flex"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={!prefersReducedMotion ? { y: [0, 15, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-5 h-10 sm:w-6 sm:h-12 border border-white/40 rounded-full flex justify-center glass-effect">
            <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={gridRef}>
          <div className="blog-grid">
            {galleryImages.map((item, index) => (
              <motion.div
                key={index}
                className={`blog-item blog-item-${index} blog-card group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer magnetic performance-optimized smooth-hover ${
                  item.size === 'large' ? 'large-item' : 
                  item.size === 'medium' ? 'medium-item' : 
                  ''
                }`}
                onClick={() => setSelectedArticle(item)}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardLeave(index)}
              >
                <div 
                  className={`ripple-${index} absolute inset-0 pointer-events-none`}
                  style={{
                    background: `linear-gradient(45deg, ${item.color})`,
                    borderRadius: '50%',
                    transformOrigin: 'center'
                  }}
                />

                <div 
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl glass-effect smooth-hover"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                />

                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover hardware-accelerated group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  <div 
                    className="absolute inset-0 opacity-40 group-hover:opacity-60 performance-optimized"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, transparent 70%)`
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 performance-optimized" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-2 group-hover:translate-y-0 performance-optimized">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span 
                      className="text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full font-medium text-white smooth-hover"
                      style={{
                        background: `linear-gradient(45deg, ${item.color})`
                      }}
                    >
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs text-white/80">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-4 leading-tight">{item.title}</h3>
                  
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 performance-optimized delay-200">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs text-white/80">
                      <User className="w-3 h-3" />
                      <span className="truncate">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs text-white/80">
                      <Clock className="w-3 h-3" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>

                {!prefersReducedMotion && (
                  <div 
                    className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl sm:rounded-3xl pointer-events-none performance-optimized"
                    style={{
                      borderImage: `linear-gradient(45deg, ${item.color}) 1`
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Modal - Fixed Size Issues */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 modal-overlay flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                damping: 12
              }}
              className="modal-content modal-scroll-container relative overflow-y-auto rounded-2xl sm:rounded-3xl"
              style={{
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Header with Close Button */}
              <div className="sticky top-0 z-50 flex justify-end p-3 sm:p-4 bg-gradient-to-b from-black/90 to-transparent">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="modal-close-btn w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:scale-110 text-white magnetic glass-effect focus-smooth"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Image Header - Compact */}
              <div className="relative -mt-2">
                <img
                  src={selectedArticle.src}
                  alt={selectedArticle.title}
                  className="w-full h-32 sm:h-40 object-cover"
                  loading="lazy"
                />
                
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${selectedArticle.color}, transparent 70%)`
                  }}
                />
              </div>
              
              {/* Content - Compact Layout */}
              <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                  <span 
                    className="px-3 py-1 sm:px-4 sm:py-2 text-white rounded-full text-xs sm:text-sm font-medium smooth-hover"
                    style={{
                      background: `linear-gradient(45deg, ${selectedArticle.color})`
                    }}
                  >
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{selectedArticle.date}</span>
                  </div>
                </div>
                
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {selectedArticle.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mb-6 text-white/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
                
                <div className="prose prose-sm sm:prose-base max-w-none">
                  {selectedArticle.article.content.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-white/90 leading-relaxed mb-4 text-sm sm:text-base">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-16 sm:py-24 md:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 video-container">
          <video
            ref={newsletterVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover hardware-accelerated ${
              newsletterVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source
              src="https://videos.pexels.com/video-files/853986/853986-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 50, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.3 : 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              damping: 12
            }}
            viewport={{ once: true }}
            className="newsletter-content p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl glass-effect performance-optimized"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <motion.h2 
              className="newsletter-title font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10 magnetic smooth-hover"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e8e8e8 50%, #f0f0f0 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={!prefersReducedMotion ? { 
                y: [-3, 3, -3],
                scale: [1, 1.01, 1]
              } : {}}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Stay Ahead of Technology Trends
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl text-white/80 mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto performance-optimized"
              animate={!prefersReducedMotion ? { opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Get exclusive insights on how technology can transform your business 
              and drive competitive advantage in your industry.
            </motion.p>
            
            <div className="newsletter-form flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg mx-auto">
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all magnetic text-sm sm:text-base glass-effect smooth-hover focus-smooth"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
                whileFocus={{ scale: prefersReducedMotion ? 1 : 1.02 }}
              />
              
              <motion.button 
                className="cta-button px-6 sm:px-8 py-3 sm:py-4 text-white font-medium rounded-xl sm:rounded-2xl overflow-hidden group magnetic text-sm sm:text-base btn-smooth focus-smooth flex items-center justify-center gap-2 sm:gap-3"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScrollToTop}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">Subscribe</span>
                <motion.div
                  animate={!prefersReducedMotion ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
