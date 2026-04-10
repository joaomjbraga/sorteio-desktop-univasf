import './RangeInput.css';

interface RangeInputProps {
  min: number;
  max: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  disabled: boolean;
}

export function RangeInput({ min, max, onMinChange, onMaxChange, disabled }: RangeInputProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onMinChange(1);
    } else {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 1 && num <= 10000) {
        onMinChange(num);
      }
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onMaxChange(1);
    } else {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 1 && num <= 10000) {
        onMaxChange(num);
      }
    }
  };

  const isInvalid = min > max || min > 10000 || max > 10000;

  return (
    <div className="range-input">
      <div className="input-group">
        <label htmlFor="min-input">De</label>
        <input
          id="min-input"
          type="number"
          value={min}
          onChange={handleMinChange}
          disabled={disabled}
          min={1}
          max={10000}
        />
      </div>
      <span className="separator">até</span>
      <div className="input-group">
        <label htmlFor="max-input">Até</label>
        <input
          id="max-input"
          type="number"
          value={max}
          onChange={handleMaxChange}
          disabled={disabled}
          min={1}
          max={10000}
        />
      </div>
      {isInvalid && (
        <span className="validation-error">Min deve ser menor que Max</span>
      )}
    </div>
  );
}
