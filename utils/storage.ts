import { Drawing, UserData } from '@/types';

const STORAGE_KEYS = {
  DRAWINGS: 'mnist_drawings',
  USERS: 'mnist_users',
};

export const storage = {
  getDrawings: (): Drawing[] => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAWINGS) || '[]');
    } catch {
      return [];
    }
  },

  getUsers: (): UserData => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
    } catch {
      return {};
    }
  },

  saveDrawing: (username: string, digit: number, imageData: number[]): Drawing => {
    const drawings = storage.getDrawings();
    const users = storage.getUsers();

    const drawing: Drawing = {
      id: `${Date.now()}-${Math.random()}`,
      username,
      digit,
      imageData,
      timestamp: new Date().toISOString(),
    };

    drawings.push(drawing);
    localStorage.setItem(STORAGE_KEYS.DRAWINGS, JSON.stringify(drawings));

    if (!users[username]) {
      users[username] = { count: 0, joinedAt: new Date().toISOString() };
    }
    users[username].count += 1;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    return drawing;
  },

  clearAll: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.DRAWINGS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
  },
};

export const generateDigitSequence = (): number[] => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  return digits;
};

export const exportToJSON = (drawings: Drawing[], users: UserData) => {
  const exportData = {
    drawings,
    users,
    exportDate: new Date().toISOString(),
    totalDrawings: drawings.length,
    totalUsers: Object.keys(users).length,
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `mnist-data-export-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (drawings: Drawing[]) => {
  let csv = 'ID,Username,Digit,Timestamp,ImageData\n';

  drawings.forEach((drawing, index) => {
    const imageDataStr = drawing.imageData.join(';');
    csv += `${index + 1},"${drawing.username}",${drawing.digit},"${drawing.timestamp}","${imageDataStr}"\n`;
  });

  const csvBlob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(csvBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `mnist-data-export-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
