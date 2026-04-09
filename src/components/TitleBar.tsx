import { Minus, Square, Maximize2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './TitleBar.css';

declare global {
  interface Window {
    electronAPI: {
      close: () => void;
      maximize: () => void;
      minimize: () => void;
      onMaximizeChange: (callback: (isMaximized: boolean) => void) => () => void;
    };
  }
}

export function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const unsubscribe = window.electronAPI.onMaximizeChange((maximized) => {
      setIsMaximized(maximized);
    });
    return unsubscribe;
  }, []);

  const handleMaximize = () => {
    window.electronAPI.maximize();
  };

  return (
    <div className="title-bar">
      <div className="title-bar-drag">
        <span className="title-bar-text">Sorteio UNIVASF</span>
      </div>
      <div className="title-bar-controls">
        <button
          className="title-bar-btn"
          onClick={() => window.electronAPI.minimize()}
          aria-label="Minimizar"
        >
          <Minus size={16} />
        </button>
        <button
          className="title-bar-btn"
          onClick={handleMaximize}
          aria-label={isMaximized ? "Restaurar" : "Maximizar"}
        >
          {isMaximized ? <Maximize2 size={14} /> : <Square size={14} />}
        </button>
        <button
          className="title-bar-btn close"
          onClick={() => window.electronAPI.close()}
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
