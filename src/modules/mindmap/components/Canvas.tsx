import React from 'react';
import { Canvas as CanvasType } from '../types/canvas';

interface CanvasProps {
  canvas: CanvasType;
  children: React.ReactNode;
}

export const Canvas: React.FC<CanvasProps> = ({ canvas, children }) => {
  const transform = `translate3d(${canvas.x}px, ${canvas.y}px, 0) scale(${canvas.scale})`;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault();
      e.stopPropagation();
      canvas.reset();
      return;
    }

    e.stopPropagation();
    canvas.pan(e.nativeEvent);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    canvas.zoom(e.nativeEvent);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <div
        id={canvas.id}
        className="w-full h-full origin-top-left"
        style={{ transform }}
      >
        {children}
      </div>
    </div>
  );
};