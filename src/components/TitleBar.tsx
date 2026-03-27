import { Minus, Square, Maximize2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './TitleBar.css';

declare global {
  interface Window {
    electronAPI: {
      close: () => void;
      maximize: () => void;
      minimize: () => void;
    };
  }
}

export function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { ipcRenderer } = window.require?.('electron') || {};
      if (!ipcRenderer) return;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMaximize = () => {
    window.electronAPI.maximize();
    setIsMaximized(!isMaximized);
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
