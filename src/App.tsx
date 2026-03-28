import { RotateCcw, Shuffle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import './App.css';
import songAudio from './assets/song.mp3';
import selectAudio from './assets/select.mp3';
import { Button } from './components/Button';
import { DrawnNumbers } from './components/DrawnNumbers';
import { Logo } from './components/Logo';
import { RangeInput } from './components/RangeInput';
import { SlotMachine } from './components/SlotMachine';
import { StatusBar } from './components/StatusBar';
import { TitleBar } from './components/TitleBar';
import { useSorteio } from './hooks/useSorteio';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const selectAudioRef = useRef<HTMLAudioElement>(null);

  const {
    state,
    remainingNumbers,
    concludedNumbers,
    setMin,
    setMax,
    startDraw,
    resetDraw,
    toggleConcluded,
    totalNumbers,
    canDraw,
  } = useSorteio();

  const { drawnNumbers, currentNumber, isSpinning, isFinished } = state;

  useEffect(() => {
    if (audioRef.current) {
      if (isSpinning) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isSpinning]);

  useEffect(() => {
    if (audioRef.current && isFinished) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isFinished]);

  const handleToggleConcluded = (number: number) => {
    if (selectAudioRef.current) {
      selectAudioRef.current.currentTime = 0;
      selectAudioRef.current.volume = 0.5;
      selectAudioRef.current.play().catch(() => {});
    }
    toggleConcluded(number);
  };

  return (
    <div className="app">
      <audio ref={audioRef} src={songAudio} loop preload="auto" />
      <audio ref={selectAudioRef} src={selectAudio} preload="auto" />
      <TitleBar />
      <header className="app-header">
        <h1>Sorteio UNIVASF</h1>
      </header>

      <main className="app-main">
        <div className="left-panel">
          <Logo />
          
          <RangeInput
            min={state.min}
            max={state.max}
            onMinChange={setMin}
            onMaxChange={setMax}
            disabled={drawnNumbers.length > 0 || isSpinning}
          />

          <SlotMachine number={currentNumber} isSpinning={isSpinning} />

          <div className="actions">
            <Button
              onClick={startDraw}
              disabled={!canDraw}
              variant="primary"
            >
              <Shuffle size={18} />
              {isSpinning ? 'Sorteando...' : 'Sortear'}
            </Button>

            {drawnNumbers.length > 0 && !isSpinning && (
              <Button onClick={resetDraw} disabled={false} variant="secondary">
                <RotateCcw size={18} />
                Reiniciar
              </Button>
            )}
          </div>

          <StatusBar
            remaining={remainingNumbers.length}
            total={totalNumbers}
            drawn={drawnNumbers.length}
          />

          {isFinished && !isSpinning && (
            <p className="finished-message">Todos os números foram sorteados!</p>
          )}
        </div>

        <div className="right-panel">
          <DrawnNumbers 
            numbers={drawnNumbers} 
            concludedNumbers={concludedNumbers}
            onToggleConcluded={handleToggleConcluded}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>UNIVASF - Universidade Federal do Vale do São Francisco</p>
      </footer>
    </div>
  );
}

export default App;
