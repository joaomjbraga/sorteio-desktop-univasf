import './StatusBar.css';

interface StatusBarProps {
  remaining: number;
  total: number;
  drawn: number;
}

export function StatusBar({ remaining, total, drawn }: StatusBarProps) {
  const percentage = total > 0 && isFinite(drawn / total) ? (drawn / total) * 100 : 0;

  return (
    <div className="status-bar">
      <div className="status-text">
        <span className="remaining">{remaining} restantes</span>
        <span className="separator">|</span>
        <span className="drawn">{drawn} sorteados</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
