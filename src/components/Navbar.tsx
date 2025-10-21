import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import '../styles/Navbar.css';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);


  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    
    setIsVisible(scrollDirection === 'up' || currentScrollY < 10);
    setIsScrolled(currentScrollY > 50);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);


  useEffect(() => {
    let timeoutId: number;
    
    const throttledScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(handleScroll, 10);
    };


    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);


  useLayoutEffect(() => {
    if (prefersReducedMotion) return;


    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );


      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
        );
      }
    }, navRef);


    return () => ctx.revert();
  }, [prefersReducedMotion]);


  const toggleMobileMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : 'unset';
      return next;
    });
  }, []);


  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);


  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const handlePortfolioDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/pillaportfolio.pdf';
    link.download = 'Pillanix-Portfolio.pdf';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];


  return (
    <>
      <nav 
        ref={navRef}
        className={`navbar fixed top-0 w-full z-50 ${isVisible ? '' : 'navbar--hidden'} ${isScrolled ? 'navbar--scrolled' : ''}`}
      >
        <div className="max-w-7xl mx-auto navbar-container">
          <div className="navbar-height">
            <Link 
              to="/" 
              onClick={scrollToTop} 
              className="navbar-brand-wrapper group"
            >
              <motion.div 
                ref={logoRef}
                className="navbar-logo-icon rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'var(--primary-gradient)',
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                }}
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.05,
                  boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)"
                }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/logoPillanix.svg" 
                  alt="Pillanix Logo" 
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                <div className="hidden w-full h-full items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg">
                  P
                </div>
              </motion.div>
              
              <div className="navbar-brand">
                <span className="navbar-logo-text font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300">
                  PILLANIX
                </span>
                <span className="navbar-tagline text-white/80 group-hover:text-white/90 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300">
                  Crafting Digital Solutions
                </span>
              </div>
            </Link>


            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={scrollToTop}
                  className={`nav-item-desktop font-medium tracking-wide transition-all duration-300 relative group ${
                    location.pathname === item.path 
                      ? 'text-white font-semibold' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    }`}
                    style={{
                      background: 'var(--primary-gradient)'
                    }}
                  />
                </Link>
              ))}
              
              <motion.button
                onClick={handlePortfolioDownload}
                className="cta-button desktop-cta-button rounded-lg font-medium text-white flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>Portfolio</span>
              </motion.button>
            </div>


            <button
              className="lg:hidden p-2 text-white relative z-50 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className={`hamburger-menu ${isOpen ? 'is-open' : ''}`}>
                <span className="hamburger-line line-1"></span>
                <span className="hamburger-line line-2"></span>
                <span className="hamburger-line line-3"></span>
              </div>
            </button>
          </div>
        </div>


        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu-overlay lg:hidden"
            >
              <motion.button
                className="mobile-menu-close"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="mobile-menu">
                <div className="mobile-menu__links">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;


                    return (
                      <motion.div
                        key={item.name}
                        className="mobile-menu__item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                      >
                        <Link
                          to={item.path}
                          className={`mobile-menu-item ${isActive ? 'mobile-menu-item--active' : ''}`}
                          onClick={() => {
                            toggleMobileMenu();
                            scrollToTop();
                          }}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>


                <motion.div
                  className="mobile-menu__cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.08 + 0.1, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      handlePortfolioDownload();
                      toggleMobileMenu();
                    }}
                    className="cta-button mobile-cta-button"
                  >
                    <Download className="w-4 h-4" />
                    Download Portfolio
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};


export default Navbar;
