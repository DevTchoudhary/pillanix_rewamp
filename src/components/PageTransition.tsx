import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ 
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        opacity: 0 
      }}
      animate={{ 
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        opacity: 1 
      }}
      exit={{ 
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        opacity: 0 
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1] 
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;