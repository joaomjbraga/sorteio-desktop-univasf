import './DrawnNumbers.css';

interface DrawnNumbersProps {
  numbers: number[];
}

export function DrawnNumbers({ numbers }: DrawnNumbersProps) {
  if (numbers.length === 0) return null;

  return (
    <div className="drawn-numbers">
      <h3>Números Sorteados</h3>
      <div className="numbers-list">
        {numbers.map((num, index) => (
          <span key={num} className="drawn-number" style={{ animationDelay: `${index * 50}ms` }}>
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}
