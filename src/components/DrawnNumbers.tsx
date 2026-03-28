import { DrawnItem } from '../hooks/useSorteio';
import './DrawnNumbers.css';

interface DrawnNumbersProps {
  numbers: DrawnItem[];
  concludedNumbers: number[];
  onToggleConcluded: (number: number) => void;
}

export function DrawnNumbers({ numbers, concludedNumbers, onToggleConcluded }: DrawnNumbersProps) {
  if (numbers.length === 0) return null;

  return (
    <div className="drawn-numbers">
      <h3>Números Sorteados</h3>
      <div className="numbers-list">
        {numbers.map((item) => {
          const isConcluded = concludedNumbers.includes(item.number);
          return (
            <div
              key={item.order}
              className={`drawn-item ${isConcluded ? 'concluded' : ''}`}
              onClick={() => onToggleConcluded(item.number)}
            >
              <span className="order">{item.order}°</span>
              <span className="number">{item.number}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
