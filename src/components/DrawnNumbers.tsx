import './DrawnNumbers.css';

interface DrawnNumbersProps {
  numbers: number[];
  concludedNumbers: number[];
  onToggleConcluded: (number: number) => void;
}

export function DrawnNumbers({ numbers, concludedNumbers, onToggleConcluded }: DrawnNumbersProps) {
  if (numbers.length === 0) return null;

  return (
    <div className="drawn-numbers">
      <h3>Números Sorteados ({numbers.length})</h3>
      <div className="numbers-list">
        {numbers.map((num, index) => {
          const isConcluded = concludedNumbers.includes(num);
          return (
            <span
              key={num}
              className={`drawn-number ${isConcluded ? 'concluded' : ''}`}
              style={{ animationDelay: `${index * 30}ms` }}
              onClick={() => onToggleConcluded(num)}
            >
              {num}
            </span>
          );
        })}
      </div>
    </div>
  );
}
