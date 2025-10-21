import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

gsap.registerPlugin(TextPlugin);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const successRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
        video.play().catch(console.error);
      };
      video.addEventListener('loadeddata', handleVideoLoaded);
      return () => video.removeEventListener('loadeddata', handleVideoLoaded);
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
          text: "Let's Build Something Amazing Together",
          duration: 2,
          ease: "none",
          delay: 1.5
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== '').length;
    const progress = (filledFields / fields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
        to_email: 'info@pillanix.com'
      };

      await emailjs.send(
        'service_gv5ihid',
        'template_x51atlg',
        templateParams,
        'uERejEyTEkdh8pZLY'
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      subtitle: 'Get detailed project proposals',
      value: 'info@pillanix.com',
      href: 'mailto:info@pillanix.com',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      subtitle: 'Mon-Fri from 9am to 6pm IST',
      value: '+971 557603610',
      href: 'tel:+971507317870',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: MapPin,
      title: 'Our Locations',
      subtitle: 'India & Dubai based agency',
      value: 'India • Dubai',
      href: '#',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      subtitle: 'We\'re here to help',
      value: 'Mon-Fri: 9AM - 6PM IST',
      href: '#',
      color: 'from-pink-500 to-violet-600'
    }
  ];

  const services = [
    'MERN Stack Development',
    'Security Operations (SecOps)',
    'DevOps & Infrastructure',
    'E-Commerce Solutions',
    'Database Architecture',
    'Cloud Solutions',
    'Mobile Development',
    'UI/UX Design',
    'Other'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-4">
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        </div>

        <motion.div
          ref={successRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center p-6 md:p-8 relative z-10 max-w-md w-full"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
          >
            Message Sent Successfully!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 mb-6 text-base leading-relaxed"
          >
            Thank you for contacting Pillanix. We'll get back to you within 24 hours with a detailed proposal.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => setIsSubmitted(false)}
            className="w-full px-4 py-3 text-white font-medium rounded-lg overflow-hidden group transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <span>Send Another Message</span>
            <Rocket className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-black min-h-screen relative overflow-hidden" ref={containerRef}>
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 video-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-1000 hardware-accelerated ${
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              ref={titleRef}
              className="font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 leading-tight performance-optimized"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 25%, #e0e0e0 50%, #f5f5f5 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Let's Build Something Amazing
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}
            >
              Ready to transform your ideas into reality? Let's discuss your project requirements and 
              explore how our expertise can drive your success.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={!prefersReducedMotion ? { y: [0, 15, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-5 h-10 sm:w-6 sm:h-12 border border-white/40 rounded-full flex justify-center"
               style={{
                 backdropFilter: 'blur(25px)',
                 WebkitBackdropFilter: 'blur(25px)'
               }}>
            <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      <section className="py-8 md:py-12 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="p-4 md:p-5 rounded-xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}
                  />

                  <div className="flex items-start gap-3 md:gap-4 relative z-10">
                    <motion.div 
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-r ${info.color}`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <info.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white mb-1 text-base md:text-lg">{info.title}</h3>
                      <p className="text-xs md:text-sm text-white/70 mb-2">{info.subtitle}</p>
                      {info.href !== '#' ? (
                        <a
                          href={info.href}
                          className="text-white font-semibold text-sm md:text-base hover:text-blue-400 transition-colors inline-block break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-white font-semibold text-sm md:text-base">{info.value}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div 
                className="p-4 md:p-5 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-white mb-4 text-lg md:text-xl">Why Choose Pillanix?</h3>
                <ul className="space-y-3 text-white/80">
                  {[
                    '24/7 Support & Maintenance',
                    'Enterprise-Grade Security',
                    'Scalable Architecture',
                    'Global Team Expertise'
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center gap-2 md:gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* FORM WITHOUT LABELS - ONLY PLACEHOLDERS */}
            <div className="lg:col-span-7 xl:col-span-8">
              <motion.div
                className="p-4 sm:p-6 md:p-8 rounded-xl relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 md:mb-6">
                  <div className="flex justify-between text-white/70 mb-2 text-sm">
                    <span>Progress</span>
                    <span>{Math.round(formProgress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
                      style={{ width: `${formProgress}%` }}
                    />
                  </div>
                </div>

                <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-white mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Get Your Free Consultation
                </h2>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name - NO LABEL */}
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border transition-all duration-300 text-white placeholder-white/50 text-sm bg-white/5 backdrop-blur-lg border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                      placeholder="Full Name *"
                    />

                    {/* Email - NO LABEL */}
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border transition-all duration-300 text-white placeholder-white/50 text-sm bg-white/5 backdrop-blur-lg border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                      placeholder="Email Address *"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone - NO LABEL */}
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border transition-all duration-300 text-white placeholder-white/50 text-sm bg-white/5 backdrop-blur-lg border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                      placeholder="Phone Number"
                    />

                    {/* Company - NO LABEL */}
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border transition-all duration-300 text-white placeholder-white/50 text-sm bg-white/5 backdrop-blur-lg border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                      placeholder="Company Name"
                    />
                  </div>

                  {/* Service - NO LABEL */}
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border transition-all duration-300 text-white text-sm bg-white/5 backdrop-blur-lg border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                  >
                    <option value="" className="bg-gray-800 text-white">Service Interest *</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-gray-800 text-white">{service}</option>
                    ))}
                  </select>

                  {/* Message - NO LABEL */}
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border transition-all duration-300 resize-none text-white placeholder-white/50 text-sm bg-white/5 backdrop-blur-lg border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                    placeholder="Project Details *"
                  />

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 md:py-3.5 text-white font-medium rounded-lg overflow-hidden group transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-2 border-white border-t-transparent relative z-10"></div>
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <Send className="w-4 h-4 relative z-10" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Global Presence
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              Serving clients worldwide from our strategic locations in India and Dubai.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              className="p-6 md:p-8 rounded-xl relative overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-r from-blue-500 to-purple-600"
              />

              <h3 className="font-bold text-xl md:text-2xl text-white mb-4 flex items-center gap-3 relative z-10">
                🇮🇳 India Hub
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-orange-500 to-green-500"
                />
              </h3>
              
              <p className="text-white/80 mb-4 text-sm md:text-base leading-relaxed relative z-10">
                Our primary development center houses our core technical team and serves as the innovation hub 
                for cutting-edge solutions and research.
              </p>
              
              <div className="h-32 md:h-40 rounded-lg overflow-hidden relative z-10 bg-white/5 backdrop-blur-lg border border-white/10">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="India Operations"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div
              className="p-6 md:p-8 rounded-xl relative overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-r from-purple-500 to-pink-600"
              />

              <h3 className="font-bold text-xl md:text-2xl text-white mb-4 flex items-center gap-3 relative z-10">
                🇦🇪 UAE Hub
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-red-500 to-yellow-500"
                />
              </h3>
              
              <p className="text-white/80 mb-4 text-sm md:text-base leading-relaxed relative z-10">
                Strategic presence in UAE facilitating global business relationships 
                and providing localized support for our regional and international clients.
              </p>
              
              <div className="h-32 md:h-40 rounded-lg overflow-hidden relative z-10 bg-white/5 backdrop-blur-lg border border-white/10">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Dubai Operations"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
