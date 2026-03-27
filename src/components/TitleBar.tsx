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
  return (
    <div className="title-bar">
      <div className="title-bar-drag">
        <span className="title-bar-text">Sorteio UNIVASF</span>
      </div>
      <div className="title-bar-controls">
        <button
          className="title-bar-btn minimize"
          onClick={() => window.electronAPI.minimize()}
          aria-label="Minimizar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="2" y="5.5" width="8" height="1" fill="currentColor" />
          </svg>
        </button>
        <button
          className="title-bar-btn maximize"
          onClick={() => window.electronAPI.maximize()}
          aria-label="Maximizar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <button
          className="title-bar-btn close"
          onClick={() => window.electronAPI.close()}
          aria-label="Fechar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
