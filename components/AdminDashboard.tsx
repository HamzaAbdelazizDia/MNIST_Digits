import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { storage, exportToJSON, exportToCSV } from '@/utils/storage';
import { Drawing, AdminStats } from '@/types';
import DigitVisualizer from './DigitVisualizer';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [stats, setStats] = useState<AdminStats>({
    totalDrawings: 0,
    totalUsers: 0,
    avgPerUser: 0,
    digitCounts: {},
  });
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [filteredDrawings, setFilteredDrawings] = useState<Drawing[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (filterText) {
      setFilteredDrawings(
        drawings.filter((d) => d.username.toLowerCase().includes(filterText.toLowerCase()))
      );
    } else {
      setFilteredDrawings(drawings);
    }
  }, [filterText, drawings]);

  const loadData = () => {
    const allDrawings = storage.getDrawings();
    const users = storage.getUsers();

    const digitCounts: { [digit: number]: number } = {};
    for (let i = 0; i < 10; i++) {
      digitCounts[i] = 0;
    }

    allDrawings.forEach((drawing) => {
      digitCounts[drawing.digit] = (digitCounts[drawing.digit] || 0) + 1;
    });

    const totalUsers = Object.keys(users).length;
    const avgPerUser = totalUsers > 0 ? (allDrawings.length / totalUsers).toFixed(1) : '0';

    setStats({
      totalDrawings: allDrawings.length,
      totalUsers,
      avgPerUser: parseFloat(avgPerUser),
      digitCounts,
    });

    setDrawings(allDrawings);
    setFilteredDrawings(allDrawings);
  };

  const handleExport = () => {
    const allDrawings = storage.getDrawings();
    const users = storage.getUsers();
    exportToJSON(allDrawings, users);
    exportToCSV(allDrawings);
  };

  const maxCount = Math.max(...Object.values(stats.digitCounts), 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <h2 className="text-5xl font-bold gradient-text">Admin Dashboard 🎯</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="btn-secondary"
        >
          Logout
        </motion.button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="card text-center"
        >
          <div className="text-6xl mb-4">📊</div>
          <div className="text-5xl font-extrabold gradient-text mb-2">{stats.totalDrawings}</div>
          <div className="text-gray-400 text-lg">Total Drawings</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="card text-center"
        >
          <div className="text-6xl mb-4">👥</div>
          <div className="text-5xl font-extrabold gradient-text mb-2">{stats.totalUsers}</div>
          <div className="text-gray-400 text-lg">Total Users</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="card text-center"
        >
          <div className="text-6xl mb-4">🔥</div>
          <div className="text-5xl font-extrabold gradient-text mb-2">{stats.avgPerUser}</div>
          <div className="text-gray-400 text-lg">Avg per User</div>
        </motion.div>
      </div>

      {/* Digit Distribution */}
      <div className="card mb-10">
        <h3 className="text-3xl font-bold mb-6">Digit Distribution</h3>
        <div className="space-y-4">
          {Object.entries(stats.digitCounts).map(([digit, count]) => {
            const percentage = (count / maxCount) * 100;
            return (
              <div key={digit} className="flex items-center gap-4">
                <span className="text-xl font-bold min-w-[100px]">Digit {digit}:</span>
                <div className="flex-1 h-10 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: parseInt(digit) * 0.1 }}
                    className="h-full bg-primary-gradient flex items-center justify-end pr-4 font-semibold"
                  >
                    {count > 0 && count}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter by username..."
          className="flex-1 min-w-[200px] px-6 py-4 rounded-xl bg-dark-bg/80 border-2 border-fire-orange/30 
                   text-white focus:outline-none focus:border-fire-orange focus:glow-orange
                   transition-all duration-300"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="btn-primary"
        >
          <span>Export Data</span>
          <span>💾</span>
        </motion.button>
      </div>

      {/* Entries Table */}
      <div className="card">
        <h3 className="text-3xl font-bold mb-6">
          All Entries {filterText && `(${filteredDrawings.length} results)`}
        </h3>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          {filteredDrawings.length === 0 ? (
            <p className="text-center text-gray-400 py-10">No entries found.</p>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-fire-orange/20 z-10">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">ID</th>
                  <th className="px-6 py-4 text-left font-bold">Username</th>
                  <th className="px-6 py-4 text-left font-bold">Digit</th>
                  <th className="px-6 py-4 text-left font-bold">Visual</th>
                  <th className="px-6 py-4 text-left font-bold">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrawings
                  .slice()
                  .reverse()
                  .map((drawing, index) => (
                    <tr
                      key={drawing.id}
                      className="border-b border-white/10 hover:bg-fire-orange/10 transition-colors"
                    >
                      <td className="px-6 py-4">{filteredDrawings.length - index}</td>
                      <td className="px-6 py-4 font-semibold">{drawing.username}</td>
                      <td className="px-6 py-4">
                        <span className="text-3xl font-bold text-fire-orange">{drawing.digit}</span>
                      </td>
                      <td className="px-6 py-4">
                        <DigitVisualizer imageData={drawing.imageData} size={56} />
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(drawing.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
