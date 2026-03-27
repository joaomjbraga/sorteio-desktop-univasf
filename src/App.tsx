import { RotateCcw, Shuffle } from 'lucide-react';
import { TitleBar } from './components/TitleBar';
import { Logo } from './components/Logo';
import { RangeInput } from './components/RangeInput';
import { SlotMachine } from './components/SlotMachine';
import { Button } from './components/Button';
import { StatusBar } from './components/StatusBar';
import { DrawnNumbers } from './components/DrawnNumbers';
import { useSorteio } from './hooks/useSorteio';
import './App.css';

function App() {
  const {
    state,
    remainingNumbers,
    setMin,
    setMax,
    startDraw,
    resetDraw,
    totalNumbers,
    canDraw,
  } = useSorteio();

  const { drawnNumbers, currentNumber, isSpinning, isFinished } = state;

  return (
    <div className="app">
      <TitleBar />
      <header className="app-header">
        <Logo />
        <h1>Sorteio UNIVASF</h1>
      </header>

      <main className="app-main">
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

        <DrawnNumbers numbers={drawnNumbers} />
      </main>

      <footer className="app-footer">
        <p>UNIVASF - Universidade Federal do Vale do São Francisco</p>
      </footer>
    </div>
  );
}

export default App;
