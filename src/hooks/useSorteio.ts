import { useState, useCallback, useMemo } from 'react';

export interface SorteioState {
  min: number;
  max: number;
  drawnNumbers: number[];
  currentNumber: number | null;
  isSpinning: boolean;
  isFinished: boolean;
}

export interface UseSorteioReturn {
  state: SorteioState;
  remainingNumbers: number[];
  setMin: (value: number) => void;
  setMax: (value: number) => void;
  startDraw: () => void;
  resetDraw: () => void;
  totalNumbers: number;
  canDraw: boolean;
}

export function useSorteio(): UseSorteioReturn {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const allNumbers = useMemo(() => {
    const numbers: number[] = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [min, max]);

  const remainingNumbers = useMemo(() => {
    return allNumbers.filter((n) => !drawnNumbers.includes(n));
  }, [allNumbers, drawnNumbers]);

  const totalNumbers = allNumbers.length;
  const canDraw = remainingNumbers.length > 0 && !isSpinning;

  const startDraw = useCallback(() => {
    if (remainingNumbers.length === 0) return;

    setIsSpinning(true);
    setCurrentNumber(null);

    let iterations = 0;
    const maxIterations = 50;
    const finalNumber = remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];

    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
      setCurrentNumber(remainingNumbers[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(spinInterval);
        setCurrentNumber(finalNumber);
        setDrawnNumbers((prev) => [...prev, finalNumber]);
        setIsSpinning(false);
      }
    }, 80);
  }, [remainingNumbers]);

  const resetDraw = useCallback(() => {
    setDrawnNumbers([]);
    setCurrentNumber(null);
    setIsSpinning(false);
  }, []);

  return {
    state: {
      min,
      max,
      drawnNumbers,
      currentNumber,
      isSpinning,
      isFinished: remainingNumbers.length === 0,
    },
    remainingNumbers,
    setMin,
    setMax,
    startDraw,
    resetDraw,
    totalNumbers,
    canDraw,
  };
}
