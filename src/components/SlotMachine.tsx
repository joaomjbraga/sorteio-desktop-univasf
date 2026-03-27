import './SlotMachine.css';

interface SlotMachineProps {
  number: number | null;
  isSpinning: boolean;
}

export function SlotMachine({ number, isSpinning }: SlotMachineProps) {
  return (
    <div className={`slot-machine ${isSpinning ? 'spinning' : ''}`}>
      <div className="slot-display">
        {number !== null ? number : '-'}
      </div>
      <div className="slot-glow" />
    </div>
  );
}
