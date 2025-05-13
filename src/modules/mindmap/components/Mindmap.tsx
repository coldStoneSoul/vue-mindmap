import React, { useEffect, useState } from 'react';
import { Mindmap as MindmapType } from '../types/mindmap';
import { Canvas } from './Canvas';
import actions from '../../../core/actions';
import settings from '../../../core/settings';

export const Mindmap: React.FC = () => {
  const [mindmap] = useState(() => {
    const instance = new MindmapType();
    instance.actions.addActions(...actions);
    instance.settings.addSettings(...settings);
    instance.repo.init();
    return instance;
  });

  const clearActiveElement = () => {
    mindmap.setActiveElement(null);
  };

  return (
    <div className="flex flex-col relative bg-main-background w-full h-full">
      <div className="relative flex-1 overflow-hidden">
        <Canvas canvas={mindmap.canvas} onMouseDown={clearActiveElement}>
          {/* Tree component will go here */}
        </Canvas>
      </div>
    </div>
  );
};