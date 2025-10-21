import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  ExternalLink, X, Calendar, Users, Play, 
  Eye, Clock, ChevronRight, User, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Projects.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  client: string;
  title: string;
  description: string;
  category: string;
  year: string;
  duration: string;
  teamSize: number;
  technologies: string[];
  image: string;
  video?: string;
  liveUrl: string;
  color: string;
  detailedInfo: {
    challenge: string;
    solution: string;
    results: string[];
    testimonial: {
      text: string;
      author: string;
      position: string;
    };
  };
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videosLoaded, setVideosLoaded] = useState<Set<number>>(new Set());
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();

  // Refs for GSAP - Optimized
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Optimized scroll handler
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoized Projects Data
  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      client: "legaliteacademy",
      title: "Comprehensive Learning Management System",
      description: "A modern e-learning platform with interactive courses, & personalized learning paths for students and educators.",
      category: "Education Technology",
      year: "2024",
      duration: "3 months",
      teamSize: 2,
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC", "AWS"],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      video: "https://videos.pexels.com/video-files/5192066/5192066-uhd_2732_1440_25fps.mp4",
      liveUrl: "https://www.legaliteacademy.com/",
      color: "from-blue-500 to-purple-600",
      detailedInfo: {
        challenge: "EduTech Academy needed a comprehensive platform that could handle live classes, course management, student progress tracking, and provide personalized learning experiences at scale.",
        solution: "We developed a full-featured LMS with real-time video streaming, interactive whiteboards, AI-powered content recommendations, and comprehensive analytics dashboard for educators.",
        results: [
          "25,000+ students enrolled within 3 months",
          "95% course completion rate achieved",
          "60% improvement in learning outcomes",
          "99.8% platform uptime maintained"
        ],
        testimonial: {
          text: "Pillanix transformed our vision into reality. The platform has revolutionized how we deliver education and engage with students.",
          author: "legaliteacademy Founding Team",
          position: "Founder & CEO, legaliteacademy"
        }
      }
    },
    {
      id: 2,
      client: "Flava Coffee",
      title: "Premium Coffee E-Commerce & Brand Platform",
      description: "A sophisticated coffee e-commerce platform with subscription services, coffee finder tools, brewing guides, and complete brand experience for premium coffee enthusiasts.",
      category: "Food & Beverage",
      year: "2025",
      duration: "2 weeks",
      teamSize: 2,
      technologies: ["Liquid", "Shopify", "HTML5", "CSS3", "JavaScript", "Monochrome Theme", "Shopify Core", "Fast load"],
      video: "//flavacoffee.com/cdn/shop/videos/c/vp/21a6d79ed1f84bb0acdf68c47ea6313f/21a6d79ed1f84bb0acdf68c47ea6313f.SD-480p-1.5Mbps-53379711.mp4?v=0",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      liveUrl: "https://flava-coffee.com",
      color: "from-amber-600 to-orange-700",
      detailedInfo: {
        challenge: "Flava Coffee wanted to create a premium online presence that would capture their artisanal brand essence while providing seamless e-commerce functionality and subscription services.",
        solution: "We built an elegant e-commerce platform with custom coffee subscription system, interactive brewing guides, coffee finder quiz, and immersive brand storytelling experience.",
        results: [
          "300% increase in online sales",
          "5,000+ active subscribers",
          "40% higher customer retention",
          "4.9/5 average customer rating"
        ],
        testimonial: {
          text: "The website perfectly captures our brand's premium feel. Sales have skyrocketed and customers love the subscription service.",
          author: "Safdar Abbas Badami",
          position: "Founder, Flava Coffee"
        }
      }
    },
    {
      id: 3,
      client: "Taste Fills",
      title: "Creative Developer Portfolio",
      description: "A visually captivating portfolio website with interactive UI, scroll-triggered animations.",
      category: "Portfolio Website",
      year: "2024",
      duration: "2 months",
      teamSize: 1,
      technologies: ["React", "CSS3", "JavaScript", "Tailwind CSS", "Netlify"],
      image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800",
      video: "https://videos.pexels.com/video-files/13443895/13443895-uhd_1440_2560_24fps.mp4",
      liveUrl: "https://tastefills.netlify.app/",
      color: "from-purple-500 to-pink-600",
      detailedInfo: {
        challenge: "Taste Fills needed a portfolio website that showcased their creative skills in a visually captivating way.",
        solution: "We built a modern and responsive portfolio website with clean UI ",
        results: [
          "20% increase in portfolio traffic",
          "50+ client inquiries in first month",
          "90% increase in project requests",
          "Recognition from design community"
        ],
        testimonial: {
          text: "This portfolio has been a game-changer for my career. The quality of inquiries and projects has improved dramatically.",
          author: "Taste Fills Founding Team",
          position: "Founder, Taste Fills"
        }
      }
    }
  ], []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const handleHeroVideoLoaded = () => {
      setHeroVideoLoaded(true);

      if (prefersReducedMotion) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      video.play().catch(console.error);
    };

    video.addEventListener('loadeddata', handleHeroVideoLoaded);
    return () => video.removeEventListener('loadeddata', handleHeroVideoLoaded);
  }, [prefersReducedMotion]);

  // Optimized video loading handler
  const handleVideoLoad = useCallback((projectId: number) => {
    setVideosLoaded(prev => new Set([...prev, projectId]));
  }, []);

  // Optimized GSAP Animations with null checks
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Title animation with null check
      const titleEl = titleRef.current;
      if (titleEl) {
        gsap.fromTo(titleEl, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
        );
      }

      // Project animations with null checks
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Optimized Mouse Tracking with throttling
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationId) cancelAnimationFrame(animationId);
      
      animationId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="pt-20 bg-black min-h-screen relative" ref={containerRef}>

      {/* Optimized Subtle Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden video-container">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-1000 hardware-accelerated ${
              heroVideoLoaded ? 'opacity-80' : 'opacity-0'
            }`}
          >
            <source
              src="https://videos.pexels.com/video-files/5735794/5735794-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.4 : 1, ease: "easeOut" }}
            className="performance-optimized space-y-6 sm:space-y-8"
          >
            <h1 
              ref={titleRef}
              className="hero-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight performance-optimized"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #f8f8f8 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Featured Projects
            </h1>
            
            <motion.p 
              className="hero-subtitle text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 performance-optimized"
              initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.4 : 1, delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              Showcasing our latest work in education technology, food & beverage, and creative development.
            </motion.p>

            <motion.div
              initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.4 : 1, delay: prefersReducedMotion ? 0 : 0.4 }}
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
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={!prefersReducedMotion ? { y: [0, 15, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-5 h-10 sm:w-6 sm:h-12 border border-white/40 rounded-full flex justify-center glass-effect">
            <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section - Alternating Layout */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className={`mb-24 sm:mb-32 last:mb-0 ${index === projects.length - 1 ? 'pb-16 sm:pb-20' : ''}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Project Image/Video - Left/Right alternating */}
                <div className={`relative group performance-optimized ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div 
                    className="relative rounded-xl sm:rounded-2xl overflow-hidden glass-effect smooth-hover"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {/* Media Container */}
                    <div className="project-card relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hardware-accelerated"
                          onLoadedData={() => handleVideoLoad(project.id)}
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 hardware-accelerated"
                          loading="lazy"
                        />
                      )}
                      
                      {/* Gradient Overlay */}
                      <div 
                        className="absolute inset-0 opacity-40 performance-optimized"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}, transparent 70%)`
                        }}
                      />

                      {/* Play Button for Video */}
                      {project.video && !prefersReducedMotion && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 performance-optimized">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 glass-effect rounded-full flex items-center justify-center smooth-hover">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                        <span 
                          className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white font-medium text-xs sm:text-sm smooth-hover"
                          style={{ background: `linear-gradient(135deg, ${project.color})` }}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    {!prefersReducedMotion && (
                      <div 
                        className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl sm:rounded-2xl pointer-events-none performance-optimized"
                        style={{
                          borderImage: `linear-gradient(135deg, ${project.color}) 1`
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Project Info - Right/Left alternating */}
                <div className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Client & Year */}
                  <div className="flex items-center gap-3 sm:gap-4 text-white/60 text-sm sm:text-base performance-optimized">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.duration}</span>
                  </div>

                  {/* Project Title */}
                  <div className="performance-optimized">
                    <h2 className="project-title text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
                      {project.client}
                    </h2>
                    <h3 className="project-subtitle text-xl sm:text-2xl text-white/90 font-semibold mb-3 sm:mb-4">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed performance-optimized">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="performance-optimized">
                    <h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 sm:px-3 sm:py-2 bg-white/10 rounded-lg text-white/90 text-xs sm:text-sm font-medium glass-effect smooth-hover"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 py-3 sm:py-4 performance-optimized">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1 sm:mb-2">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{project.teamSize}</div>
                      <div className="text-white/60 text-xs sm:text-sm">Team Members</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1 sm:mb-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{project.duration}</div>
                      <div className="text-white/60 text-xs sm:text-sm">Duration</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl glass-effect border border-white/20 text-sm sm:text-base btn-smooth focus-smooth flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      View Details
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 text-white font-medium rounded-xl btn-smooth focus-smooth text-sm sm:text-base flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${project.color})`
                      }}
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      Live Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="cta-section-content p-8 sm:p-12 rounded-2xl sm:rounded-3xl glass-effect performance-optimized"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="cta-section-title text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
              Let's discuss how we can bring your vision to life with cutting-edge technology 
              and exceptional design.
            </p>
            <motion.a
              href="/contact"
              className="cta-button inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-xl text-sm sm:text-base focus-smooth"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToTop}
            >
              Get In Touch
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Optimized Project Modal - Fixed Responsive Size Issues */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 modal-overlay flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="modal-content modal-scroll-container relative overflow-y-auto rounded-xl sm:rounded-2xl"
              style={{
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Close Button - Always Visible */}
              <div className="sticky top-0 right-0 z-50 flex justify-end p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="modal-close-btn w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/10 glass-effect hover:bg-white/20 focus-smooth"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              {/* Modal Content - Optimized Layout */}
              <div className="px-4 pb-4 sm:px-6 sm:pb-6 -mt-2">
                {/* Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <span 
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white font-medium text-xs sm:text-sm smooth-hover"
                      style={{ background: `linear-gradient(135deg, ${selectedProject.color})` }}
                    >
                      {selectedProject.category}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{selectedProject.client}</h2>
                  <h3 className="text-sm sm:text-base text-white/80 leading-tight">{selectedProject.title}</h3>
                </div>

                {/* Content Sections - Compact Layout */}
                <div className="space-y-4 sm:space-y-5">
                  {/* Challenge */}
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <div 
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                        style={{ background: `linear-gradient(45deg, ${selectedProject.color})` }}
                      />
                      Challenge
                    </h4>
                    <p className="text-white/80 leading-relaxed text-xs sm:text-sm">{selectedProject.detailedInfo.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <div 
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                        style={{ background: `linear-gradient(45deg, ${selectedProject.color})` }}
                      />
                      Solution
                    </h4>
                    <p className="text-white/80 leading-relaxed text-xs sm:text-sm">{selectedProject.detailedInfo.solution}</p>
                  </div>

                  {/* Results - Compact Grid */}
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <div 
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                        style={{ background: `linear-gradient(45deg, ${selectedProject.color})` }}
                      />
                      Results
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                      {selectedProject.detailedInfo.results.map((result, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div 
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: `linear-gradient(45deg, ${selectedProject.color})` }}
                          />
                          <span className="text-white/90 text-xs sm:text-sm leading-tight">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial - Compact */}
                  <div 
                    className="p-3 sm:p-4 rounded-lg glass-effect"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <blockquote className="text-white/90 italic mb-2 text-xs sm:text-sm leading-relaxed">
                      "{selectedProject.detailedInfo.testimonial.text}"
                    </blockquote>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${selectedProject.color})` }}
                      >
                        <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs sm:text-sm">
                          {selectedProject.detailedInfo.testimonial.author}
                        </div>
                        <div className="text-white/60 text-xs leading-tight">
                          {selectedProject.detailedInfo.testimonial.position}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Site Button - Compact */}
                  <div className="pt-2">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 text-white font-medium rounded-lg btn-smooth focus-smooth text-sm flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${selectedProject.color})`
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Visit Live Website
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
