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
    const value = parseInt(e.target.value, 10) || 1;
    onMinChange(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 1;
    onMaxChange(value);
  };

  return (
    <div className="range-input">
      <div className="input-group">
        <label htmlFor="min-input">Número Mínimo</label>
        <input
          id="min-input"
          type="number"
          value={min}
          onChange={handleMinChange}
          disabled={disabled}
          min={1}
        />
      </div>
      <span className="separator">-</span>
      <div className="input-group">
        <label htmlFor="max-input">Número Máximo</label>
        <input
          id="max-input"
          type="number"
          value={max}
          onChange={handleMaxChange}
          disabled={disabled}
          min={1}
        />
      </div>
    </div>
  );
}
