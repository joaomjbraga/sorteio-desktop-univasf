import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

export interface DrawnItem {
  number: number;
  order: number;
}

export interface SorteioState {
  min: number;
  max: number;
  drawnNumbers: DrawnItem[];
  currentNumber: number | null;
  isSpinning: boolean;
  isFinished: boolean;
}

export interface UseSorteioReturn {
  state: SorteioState;
  remainingNumbers: number[];
  concludedNumbers: number[];
  setMin: (value: number) => void;
  setMax: (value: number) => void;
  startDraw: () => void;
  resetDraw: () => void;
  toggleConcluded: (number: number) => void;
  totalNumbers: number;
  canDraw: boolean;
}

export function useSorteio(): UseSorteioReturn {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(48);
  const [drawnNumbers, setDrawnNumbers] = useState<DrawnItem[]>([]);
  const [concludedNumbers, setConcludedNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const numbersToDrawRef = useRef<number[]>([]);

  const allNumbers = useMemo(() => {
    if (min > max) return [];
    const numbers: number[] = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [min, max]);

  const drawnNumbersSet = useMemo(() => new Set(drawnNumbers.map((item) => item.number)), [drawnNumbers]);

  const remainingNumbers = useMemo(() => {
    return allNumbers.filter((n) => !drawnNumbersSet.has(n));
  }, [allNumbers, drawnNumbersSet]);

  const totalNumbers = allNumbers.length;
  const canDraw = remainingNumbers.length > 0 && !isSpinning && min <= max;

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, []);

  const toggleConcluded = useCallback((number: number) => {
    setConcludedNumbers((prev) => {
      if (prev.includes(number)) {
        return prev.filter((n) => n !== number);
      }
      return [...prev, number];
    });
  }, []);

  const startDraw = useCallback(() => {
    if (remainingNumbers.length === 0 || min > max) return;

    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
    }

    numbersToDrawRef.current = [...remainingNumbers].sort(() => Math.random() - 0.5);
    
    setIsSpinning(true);
    setCurrentNumber(null);
    setDrawnNumbers([]);
    setConcludedNumbers([]);

    let index = 0;
    const total = numbersToDrawRef.current.length;

    spinIntervalRef.current = setInterval(() => {
      setCurrentNumber(numbersToDrawRef.current[index]);
      index++;

      if (index >= total) {
        if (spinIntervalRef.current) {
          clearInterval(spinIntervalRef.current);
          spinIntervalRef.current = null;
        }
        
        const result: DrawnItem[] = numbersToDrawRef.current.map((num, i) => ({
          number: num,
          order: i + 1,
        }));
        
        setDrawnNumbers(result);
        setCurrentNumber(numbersToDrawRef.current[numbersToDrawRef.current.length - 1]);
        setIsSpinning(false);
        numbersToDrawRef.current = [];
      }
    }, 150);
  }, [remainingNumbers, min, max]);

  const resetDraw = useCallback(() => {
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }
    setDrawnNumbers([]);
    setConcludedNumbers([]);
    setCurrentNumber(null);
    setIsSpinning(false);
    numbersToDrawRef.current = [];
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
    concludedNumbers,
    setMin,
    setMax,
    startDraw,
    resetDraw,
    toggleConcluded,
    totalNumbers,
    canDraw,
  };
}
