import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+971507317870';
    const message = encodeURIComponent('Hi! I\'m interested in your services. Can we discuss my project requirements?');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  // Original WhatsApp Logo SVG
  const WhatsAppIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
      onClick={handleWhatsAppClick}
      style={{
        borderRadius: '25px',
      }}
      initial={{ 
        scale: 0,
        width: '50px',
        height: '50px'
      }}
      animate={{ 
        scale: 1,
        width: '50px',
        height: '50px'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut",
        delay: 1
      }}
    >
      {/* WhatsApp Icon */}
      <motion.div
        className="flex items-center justify-center"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
      >
        <WhatsAppIcon />
      </motion.div>

      {/* Animated Background Ring */}
      <div className="absolute inset-0 bg-green-500 opacity-20 animate-ping" 
           style={{ borderRadius: 'inherit' }}></div>
      
      {/* Hover Text (Optional) */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        Chat with us
      </motion.div>

      {/* Success Ripple Effect on Click */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        style={{ borderRadius: 'inherit' }}
        whileTap={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default WhatsAppFloat;
