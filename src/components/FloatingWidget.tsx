import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Download, MessageCircle, Menu, X } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const FloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const { toggle, isPlaying } = useAudio('/audio/background-music.mp3', 0.3);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 80, e.clientX - 40)),
        y: Math.max(0, Math.min(window.innerHeight - 80, e.clientY - 40))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+971507317870';
    const message = encodeURIComponent('Hi! I\'m interested in your services. Can we discuss my project requirements?');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  const handlePortfolioDownload = () => {
    const link = document.createElement('a');
    link.href = '/portfolio.pdf';
    link.download = 'Pillanix-Portfolio.pdf';
    link.click();
  };

  const options = [
    {
      icon: isPlaying ? Volume2 : VolumeX,
      label: isPlaying ? 'Mute Audio' : 'Play Audio',
      action: toggle,
      color: 'bg-blue-500'
    },
    {
      icon: Download,
      label: 'Download Portfolio',
      action: handlePortfolioDownload,
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp Chat',
      action: handleWhatsAppClick,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div
      ref={dragRef}
      className="draggable-widget"
      style={{ left: position.x, top: position.y }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-0 space-y-3"
          >
            {options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                onClick={option.action}
                className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glass-card`}
                title={option.label}
              >
                <option.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="w-16 h-16 glass-dark hover:bg-accent/20 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-accent/30"
        onMouseDown={handleMouseDown}
        onClick={() => !isDragging && setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full mx-1"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <div className="absolute inset-0 w-16 h-16 bg-accent rounded-full animate-ping opacity-20"></div>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingWidget;