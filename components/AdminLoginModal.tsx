import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'forsa';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'forsa2025';

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials!');
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-dark-card border-2 border-rocket-purple rounded-3xl p-10 max-w-md w-full relative"
          style={{ boxShadow: '0 10px 50px rgba(102, 126, 234, 0.5)' }}
        >
          <button
            onClick={handleClose}
            className="absolute right-6 top-6 text-4xl text-gray-400 hover:text-white transition-colors"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold mb-8 text-center">Admin Access 🔐</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-6 py-4 rounded-xl bg-dark-bg/80 border-2 border-rocket-purple/30 
                       text-white focus:outline-none focus:border-rocket-purple focus:glow-purple
                       transition-all duration-300"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 rounded-xl bg-dark-bg/80 border-2 border-rocket-purple/30 
                       text-white focus:outline-none focus:border-rocket-purple focus:glow-purple
                       transition-all duration-300"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 rounded-xl font-semibold bg-secondary-gradient text-white
                       transition-all duration-300 glow-purple"
            >
              Login
            </motion.button>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center font-semibold"
              >
                {error}
              </motion.p>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
