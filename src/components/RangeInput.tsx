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
      if (!isNaN(num)) {
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
      if (!isNaN(num)) {
        onMaxChange(num);
      }
    }
  };

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
        />
      </div>
    </div>
  );
}
