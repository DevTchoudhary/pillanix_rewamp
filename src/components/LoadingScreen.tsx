import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing SaaS Infrastructure...');
  const [tapCount, setTapCount] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showTapHint, setShowTapHint] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const completionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced SaaS deployment messages
  const loadingTexts = [
    'Initializing SaaS Infrastructure...',
    'Connecting to AWS Cloud Services...',
    'Setting up Database Architecture...',
    'Configuring API Endpoints...',
    'Installing Security Protocols...',
    'Deploying Frontend Components...',
    'Setting up User Authentication...',
    'Configuring Payment Gateway...',
    'Running System Health Checks...',
    'Optimizing Performance Metrics...',
    'Finalizing Dashboard Analytics...',
    'Your SaaS Platform is Ready! 🚀'
  ];

  useEffect(() => {
    if (isCompleted) return;

    // Slower timing for 4-5 second loading
    const baseSpeed = Math.max(250 - (tapCount * 40), 100); // Much slower base speed
    const increment = 0.8 + (speedMultiplier * 0.6); // Smaller increments for longer duration

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100 && !isCompleted) {
          setIsCompleted(true);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          
          completionTimeoutRef.current = setTimeout(() => {
            onComplete();
          }, 1500); // Longer completion delay
          
          return 100;
        }
        
        // More detailed text progression
        const textIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1));
        const newText = loadingTexts[Math.min(textIndex, loadingTexts.length - 1)];
        if (newText !== currentText) {
          setCurrentText(newText);
        }
        
        return newProgress;
      });
    }, baseSpeed);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [tapCount, speedMultiplier, currentText, isCompleted, onComplete]);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, []);

  const handleTap = () => {
    if (isCompleted) return;
    
    setTapCount(prev => prev + 1);
    setSpeedMultiplier(prev => Math.min(prev + 0.5, 3)); // Higher speed boost
    
    if (tapCount >= 2) { // Show hint for less taps
      setShowTapHint(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleTap}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Dynamic Background */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 20%, rgba(139, 90, 150, 0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 80%, rgba(155, 49, 146, 0.3) 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center relative z-10 max-w-md mx-auto px-6">
        {/* Enhanced 3D SaaS Animation */}
        <div className="relative mb-8">
          <motion.div
            className="w-52 h-52 mx-auto relative saas-3d-container"
            animate={{ 
              scale: [1, 1.08, 1],
              filter: [
                'drop-shadow(0 0 25px rgba(102, 126, 234, 0.6))',
                'drop-shadow(0 0 45px rgba(118, 75, 162, 0.9))',
                'drop-shadow(0 0 25px rgba(139, 90, 150, 0.6))'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Enhanced Glow Effect */}
            <div className="glow-effect"></div>
            
            {/* Progress Ring */}
            <div className="progress-ring"></div>
            
            {/* Data Connections */}
            <div className="data-connections absolute inset-0 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="connection-line"></div>
              ))}
            </div>
            
            {/* Building Blocks with progress response */}
            <div className="building-blocks absolute inset-0 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="block"
                  style={{
                    transform: `translateZ(${(progress / 100) * (i + 1) * 15}px)`,
                    opacity: Math.min(0.6 + (progress / 100) * 0.4, 1)
                  }}
                ></div>
              ))}
            </div>
            
            {/* Enhanced SaaS Laptop Model */}
            <div className="saas-laptop absolute inset-0 flex items-center justify-center">
              <div className="laptop-base"></div>
              <div className="laptop-screen">
                <div className="screen-content">
                  <div className="code-lines">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i}
                        className="code-line"
                        style={{
                          width: `${Math.random() * 70 + 30}%`,
                          animationDelay: `${i * 0.15}s`,
                          background: i % 3 === 0 ? 
                            'linear-gradient(90deg, #00ff88, #00cc66, transparent)' :
                            i % 3 === 1 ?
                            'linear-gradient(90deg, #667eea, #4f46e5, transparent)' :
                            'linear-gradient(90deg, #764ba2, #6b46c1, transparent)'
                        }}
                      ></div>
                    ))}
                  </div>
                  <div 
                    className="text-xs font-mono text-green-400 mt-2"
                    style={{ fontSize: '8px' }}
                  >
                    Deploy {Math.round(progress)}%
                  </div>
                  <div className="deployment-indicator">
                    LIVE
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Progress Ring SVG */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 210 210">
                <circle
                  cx="105"
                  cy="105"
                  r="95"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <circle
                  cx="105"
                  cy="105"
                  r="95"
                  fill="none"
                  stroke="url(#enhancedProgressGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 95}`}
                  strokeDashoffset={`${2 * Math.PI * 95 * (1 - progress / 100)}`}
                  style={{ 
                    transition: 'stroke-dashoffset 0.3s ease',
                    filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.8))'
                  }}
                />
                <defs>
                  <linearGradient id="enhancedProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="33%" stopColor="#764ba2" />
                    <stop offset="66%" stopColor="#8b5a96" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Company Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
        >
          PILLANIX
        </motion.h1>

        {/* Enhanced Loading Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-white/85 mb-8 font-medium text-lg"
          >
            {currentText}
          </motion.p>
        </AnimatePresence>

        {/* Enhanced Progress Bar */}
        <div className="w-full max-w-sm mx-auto mb-6">
          <div className="relative bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                boxShadow: '0 0 15px rgba(102, 126, 234, 0.8)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-white/70 text-sm font-medium">
              {Math.round(progress)}%
            </span>
            {speedMultiplier > 1 && (
              <span className="text-blue-400 text-sm font-medium animate-pulse">
                🚀 {speedMultiplier.toFixed(1)}x Speed
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Tap Hint */}
        <AnimatePresence>
          {showTapHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center gap-2 text-white/60 text-sm"
            >
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
              <span>Tap to boost deployment speed</span>
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Tap Counter */}
        {tapCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 text-white/40 text-xs"
          >
            🚀 Boosts: {tapCount}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
