'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import WelcomeCard from '@/components/WelcomeCard';
import DrawingCanvas from '@/components/DrawingCanvas';
import Leaderboard from '@/components/Leaderboard';
import AdminLoginModal from '@/components/AdminLoginModal';
import AdminDashboard from '@/components/AdminDashboard';
import SuccessAnimation from '@/components/SuccessAnimation';
import { storage, generateDigitSequence } from '@/utils/storage';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<string>('draw');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentDigit, setCurrentDigit] = useState<number>(0);
  const [digitSequence, setDigitSequence] = useState<number[]>([]);
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      updateUserCount();
    }
  }, [currentUser]);

  const handleStartDrawing = (username: string) => {
    setCurrentUser(username);
    const sequence = generateDigitSequence();
    setDigitSequence(sequence);
    setSequenceIndex(0);
    setCurrentDigit(sequence[0]);
    updateUserCount();
  };

  const handleNextDigit = () => {
    let nextIndex = sequenceIndex + 1;
    
    if (nextIndex >= digitSequence.length) {
      const newSequence = generateDigitSequence();
      setDigitSequence(newSequence);
      nextIndex = 0;
      setCurrentDigit(newSequence[0]);
    } else {
      setCurrentDigit(digitSequence[nextIndex]);
    }
    
    setSequenceIndex(nextIndex);
  };

  const updateUserCount = () => {
    const users = storage.getUsers();
    const count = users[currentUser || '']?.count || 0;
    setUserCount(count);
  };

  const handleSubmitDrawing = (imageData: number[]) => {
    if (!currentUser) return;
    
    storage.saveDrawing(currentUser, currentDigit, imageData);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
    
    updateUserCount();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserCount(0);
  };

  const handleAdminLogin = () => {
    setShowAdminModal(false);
    setIsAdminMode(true);
    setCurrentSection('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
    setCurrentSection('draw');
  };

  const handleSectionChange = (section: string) => {
    if (section === 'admin') {
      setShowAdminModal(true);
    } else {
      setCurrentSection(section);
      setIsAdminMode(false);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Header
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          onAdminClick={() => setShowAdminModal(true)}
        />

        <AnimatePresence mode="wait">
          {currentSection === 'draw' && !isAdminMode && (
            <div key="draw">
              {!currentUser ? (
                <WelcomeCard onStart={handleStartDrawing} />
              ) : (
                <DrawingCanvas
                  username={currentUser}
                  currentDigit={currentDigit}
                  userCount={userCount}
                  onSubmit={handleSubmitDrawing}
                  onNextDigit={handleNextDigit}
                  onLogout={handleLogout}
                />
              )}
            </div>
          )}

          {currentSection === 'leaderboard' && !isAdminMode && (
            <Leaderboard key="leaderboard" />
          )}

          {isAdminMode && currentSection === 'admin' && (
            <AdminDashboard key="admin" onLogout={handleAdminLogout} />
          )}
        </AnimatePresence>

        <AdminLoginModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
          onLogin={handleAdminLogin}
        />

        <SuccessAnimation show={showSuccess} />
      </div>
    </main>
  );
}
