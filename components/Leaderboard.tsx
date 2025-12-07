import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { storage } from '@/utils/storage';
import { LeaderboardEntry } from '@/types';

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = () => {
    const users = storage.getUsers();
    const sortedUsers = Object.entries(users)
      .map(([username, data]) => ({ username, count: data.count, rank: 0 }))
      .sort((a, b) => b.count - a.count)
      .map((user, index) => ({ ...user, rank: index + 1 }));

    setEntries(sortedUsers);
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-dark-card border-yellow-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-dark-card border-gray-400';
    if (rank === 3) return 'bg-gradient-to-r from-orange-600/20 to-dark-card border-orange-600';
    return 'border-fire-orange/30';
  };

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-5xl font-bold gradient-text mb-12">🏆 Top Contributors</h2>
        <p className="text-gray-400 text-xl py-20">No entries yet. Be the first!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-5xl font-bold gradient-text mb-12 text-center">🏆 Top Contributors</h2>

      <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.username}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 10 }}
            className={`flex items-center justify-between p-6 rounded-2xl border-2 
                       transition-all duration-300 hover:glow-orange ${getRankClass(entry.rank)}`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl font-extrabold min-w-[60px]">#{entry.rank}</span>
              {getMedalEmoji(entry.rank) && (
                <span className="text-4xl">{getMedalEmoji(entry.rank)}</span>
              )}
              <span className="text-2xl font-semibold">{entry.username}</span>
            </div>
            <span className="text-3xl font-bold text-fire-orange">{entry.count} 🎨</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Leaderboard;
