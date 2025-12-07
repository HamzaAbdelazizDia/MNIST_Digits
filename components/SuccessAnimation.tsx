import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessAnimationProps {
  show: boolean;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-dark-card border-3 border-green-400 rounded-3xl px-16 py-12 text-center"
               style={{ boxShadow: '0 10px 50px rgba(0, 255, 136, 0.5)' }}>
            <motion.div
              animate={{ y: [-20, 0, -20] }}
              transition={{ duration: 0.5, repeat: 0 }}
              className="text-8xl mb-4"
            >
              🎉
            </motion.div>
            <p className="text-3xl font-bold text-green-400">Awesome!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;
