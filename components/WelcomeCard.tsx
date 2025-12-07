import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeCardProps {
  onStart: (username: string) => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onStart }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onStart(username.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto mt-20"
    >
      <div className="relative card overflow-hidden">
        {/* Animated glow effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-fire-orange/50 to-transparent animate-pulse" />
        </div>

        <div className="relative z-10 text-center">
          <motion.h2 
            className="text-5xl font-bold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome, Artist! 🎨
          </motion.h2>
          
          <p className="text-gray-400 text-lg mb-8">
            Help us train AI by drawing handwritten digits
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              className="w-full px-6 py-4 text-lg rounded-xl bg-dark-bg/80 border-2 border-fire-orange/30 
                       text-white focus:outline-none focus:border-fire-orange focus:glow-orange 
                       transition-all duration-300"
              autoFocus
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full text-lg"
            >
              <span>Start Drawing</span>
              <span className="text-2xl">🚀</span>
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
