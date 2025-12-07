import React, { useEffect, useRef } from 'react';

interface DigitVisualizerProps {
  imageData: number[];
  size?: number;
  className?: string;
}

const DigitVisualizer: React.FC<DigitVisualizerProps> = ({ 
  imageData, 
  size = 56,
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageData || imageData.length !== 784) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create ImageData object
    const imgData = ctx.createImageData(28, 28);
    
    // Our drawing canvas saves: white background (RGB 255,255,255) gets inverted to 255
    // black ink (RGB 0,0,0) gets inverted to 0
    // So in storage: high values (toward 255) = was white/background
    //                low values (toward 0) = was black/ink
    // 
    // To display: we want black ink to show as black (0) and background as white (255)
    // So we DON'T invert - use values directly
    for (let i = 0; i < imageData.length; i++) {
      const value = imageData[i];
      const idx = i * 4;
      
      imgData.data[idx] = value;       // R
      imgData.data[idx + 1] = value;   // G
      imgData.data[idx + 2] = value;   // B
      imgData.data[idx + 3] = 255;     // A
    }

    // Draw the image data
    ctx.putImageData(imgData, 0, 0);
  }, [imageData]);

  return (
    <canvas
      ref={canvasRef}
      width={28}
      height={28}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        imageRendering: 'pixelated',
        border: '2px solid rgba(255, 107, 53, 0.3)',
        borderRadius: '8px',
        background: '#ffffff'
      }}
    />
  );
};

export default DigitVisualizer;
