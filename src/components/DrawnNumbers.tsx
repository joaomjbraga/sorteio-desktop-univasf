import { memo } from 'react';
import { DrawnItem } from '../hooks/useSorteio';
import './DrawnNumbers.css';

interface DrawnNumbersProps {
  numbers: DrawnItem[];
  concludedNumbers: number[];
  onToggleConcluded: (number: number) => void;
}

function DrawnNumbersComponent({ numbers, concludedNumbers, onToggleConcluded }: DrawnNumbersProps) {
  if (numbers.length === 0) return null;

  const concludedSet = new Set(concludedNumbers);

  return (
    <div className="drawn-numbers">
      <h3>Números Sorteados</h3>
      <div className="numbers-list">
        {numbers.map((item) => (
          <div
            key={item.number}
            className={`drawn-item ${concludedSet.has(item.number) ? 'concluded' : ''}`}
            onClick={() => onToggleConcluded(item.number)}
          >
            <span className="order">{item.order}°</span>
            <span className="number">{item.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const DrawnNumbers = memo(DrawnNumbersComponent);
