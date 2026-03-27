import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

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
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allNumbers = useMemo(() => {
    if (min > max) return [];
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
  const canDraw = remainingNumbers.length > 0 && !isSpinning && min <= max;

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, []);

  const startDraw = useCallback(() => {
    if (remainingNumbers.length === 0 || min > max) return;

    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
    }

    setIsSpinning(true);
    setCurrentNumber(null);

    let iterations = 0;
    const maxIterations = 50;
    const finalNumber = remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];

    spinIntervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
      setCurrentNumber(remainingNumbers[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        if (spinIntervalRef.current) {
          clearInterval(spinIntervalRef.current);
          spinIntervalRef.current = null;
        }
        setCurrentNumber(finalNumber);
        setDrawnNumbers((prev) => [...prev, finalNumber]);
        setIsSpinning(false);
      }
    }, 80);
  }, [remainingNumbers, min, max]);

  const resetDraw = useCallback(() => {
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }
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
      isFinished: remainingNumbers.length === 0 && min <= max,
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
