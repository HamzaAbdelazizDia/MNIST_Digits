import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DrawingCanvasProps {
  username: string;
  currentDigit: number;
  userCount: number;
  onSubmit: (imageData: number[]) => void;
  onNextDigit: () => void;
  onLogout: () => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  username,
  currentDigit,
  userCount,
  onSubmit,
  onNextDigit,
  onLogout,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setHasContent(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const pos = {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setHasContent(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const pos = {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    stopDrawing();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
  };

  const get28x28ImageData = (): number[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return [];

    tempCtx.drawImage(canvas, 0, 0, 28, 28);

    const imageData = tempCtx.getImageData(0, 0, 28, 28);
    const data = imageData.data;

    const grayscale: number[] = [];
    for (let i = 0; i < data.length; i += 4) {
      const gray = 255 - Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
      grayscale.push(gray);
    }

    return grayscale;
  };

  const handleSubmit = () => {
    if (!hasContent) {
      alert('Please draw something first!');
      return;
    }

    const imageData = get28x28ImageData();
    onSubmit(imageData);
    clearCanvas();
    onNextDigit();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto text-center"
    >
      {/* User Info */}
      <div className="flex justify-center gap-5 mb-8 flex-wrap">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-dark-card px-6 py-3 rounded-full border-2 border-fire-orange/30 font-semibold"
        >
          👤 {username}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-dark-card px-6 py-3 rounded-full border-2 border-fire-orange/30 font-semibold"
        >
          🎯 {userCount} drawn
        </motion.div>
      </div>

      {/* Digit Prompt */}
      <div className="mb-8">
        <h2 className="text-2xl text-gray-400 mb-4">Draw the digit:</h2>
        <motion.div
          className="text-9xl font-extrabold bg-fire-gradient bg-clip-text text-transparent animate-pulse-glow"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentDigit}
        </motion.div>
      </div>

      {/* Canvas */}
      <div className="relative inline-block mb-8">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-2xl cursor-crosshair touch-none"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            border: '3px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #ff6b35, #f7931e, #ffd700)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        />
      </div>

      {/* Instructions */}
      <div className="mb-6 text-gray-400 space-y-1">
        <p>✨ Draw with your finger or mouse</p>
        <p>📏 Keep it centered and clear</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearCanvas}
          className="btn-secondary"
        >
          <span>Clear</span>
          <span>🔄</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="btn-primary"
        >
          <span>Submit</span>
          <span>✨</span>
        </motion.button>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="text-gray-400 hover:text-white transition-colors underline"
      >
        Change User
      </button>
    </motion.div>
  );
};

export default DrawingCanvas;
