import { Drawing, UserData } from '@/types';
import { supabase } from '@/lib/supabase';

const STORAGE_KEYS = {
  DRAWINGS: 'mnist_drawings',
  USERS: 'mnist_users',
};

export const storage = {
  getDrawings: async (): Promise<Drawing[]> => {
    try {
      const { data, error } = await supabase
        .from('drawings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((row) => ({
        id: row.id,
        username: row.username,
        digit: row.digit,
        imageData: row.image_data,
        timestamp: row.timestamp,
      }));
    } catch (error) {
      console.error('Error fetching drawings:', error);
      return [];
    }
  },

  getUsers: async (): Promise<UserData> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('count', { ascending: false });

      if (error) throw error;

      const users: UserData = {};
      (data || []).forEach((row) => {
        users[row.username] = {
          count: row.count,
          joinedAt: row.joined_at,
        };
      });

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return {};
    }
  },

  saveDrawing: async (username: string, digit: number, imageData: number[]): Promise<Drawing | null> => {
    try {
      console.log('🎨 Saving drawing:', { username, digit, imageDataLength: imageData.length });
      
      // FIRST: Upsert user (create if doesn't exist, or increment count)
      console.log('👤 Checking/creating user...');
      const { data: existingUser } = await supabase
        .from('users')
        .select('count')
        .eq('username', username)
        .single();

      if (existingUser) {
        // Update existing user
        const { error: updateError } = await supabase
          .from('users')
          .update({ count: existingUser.count + 1 })
          .eq('username', username);

        if (updateError) throw updateError;
        console.log('✅ User count updated');
      } else {
        // Insert new user
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            username,
            count: 1,
            joined_at: new Date().toISOString(),
          }]);

        if (insertError) throw insertError;
        console.log('✅ New user created');
      }

      // SECOND: Insert drawing (now that user exists)
      const drawing = {
        username,
        digit,
        image_data: imageData,
        timestamp: new Date().toISOString(),
      };

      console.log('📤 Inserting drawing to Supabase...');
      const { error: drawingError, data: drawingData } = await supabase
        .from('drawings')
        .insert([drawing])
        .select();

      if (drawingError) {
        console.error('❌ Drawing insert error:', {
          message: drawingError.message,
          details: drawingError.details,
          hint: drawingError.hint,
          code: drawingError.code,
        });
        throw drawingError;
      }
      console.log('✅ Drawing saved successfully:', drawingData);

      // Return the saved drawing from Supabase response
      if (drawingData && drawingData.length > 0) {
        const saved = drawingData[0];
        return {
          id: saved.id,
          username: saved.username,
          digit: saved.digit,
          imageData: saved.image_data,
          timestamp: saved.timestamp,
        };
      }

      return null;
    } catch (error) {
      console.error('Error saving drawing:', error);
      return null;
    }
  },

  clearAll: async () => {
    try {
      await supabase.from('drawings').delete().neq('id', '');
      await supabase.from('users').delete().neq('username', '');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
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
