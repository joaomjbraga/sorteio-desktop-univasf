import { Minus, Square, Maximize2, X, Shuffle, RotateCcw, Hash, ChevronRight, Settings, CheckCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import songAudio from './assets/song.mp3'
import selectAudio from './assets/select.mp3'
import logoImg from './assets/logo.png'
import { useSorteio } from './hooks/useSorteio'

declare global {
  interface Window {
    electronAPI?: {
      close: () => void
      maximize: () => void
      minimize: () => void
      onMaximizeChange: (callback: (isMaximized: boolean) => void) => () => void
    }
  }
}

function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    if (!window.electronAPI?.onMaximizeChange) return
    const unsub = window.electronAPI.onMaximizeChange(setIsMaximized)
    return unsub
  }, [])

  return (
    <div className="titlebar">
      <div className="titlebar-drag">
        <img src={logoImg} alt="UNIVASF" className="titlebar-logo" />
      </div>
      <div className="titlebar-controls">
        <button className="titlebar-btn" onClick={() => window.electronAPI?.minimize()} aria-label="Minimizar">
          <Minus size={15} />
        </button>
        <button className="titlebar-btn" onClick={() => window.electronAPI?.maximize()} aria-label={isMaximized ? 'Restaurar' : 'Maximizar'}>
          {isMaximized ? <Maximize2 size={13} /> : <Square size={13} />}
        </button>
        <button className="titlebar-btn close" onClick={() => window.electronAPI?.close()} aria-label="Fechar">
          <X size={15} />
        </button>
      </div>
    </div>
  )
}

function RangeModal({ open, onClose, value, onChange, disabled }: {
  open: boolean
  onClose: () => void
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}) {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Configurar Sorteio</span>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <span className="modal-label">Quantidade de números</span>
          <input
            type="number"
            className="range-input"
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            min={2}
            max={10000}
            placeholder="2"
          />
          {value > 0 && <span className="modal-hint">Números de 2 até {value}</span>}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const selectAudioRef = useRef<HTMLAudioElement>(null)
  const [slotKey, setSlotKey] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRangeOpen, setIsRangeOpen] = useState(false)

  const {
    state,
    setMax,
    startDraw,
    resetDraw,
    toggleConcluded,
    totalNumbers,
    canDraw,
  } = useSorteio()

  const { drawnNumbers, currentNumber, isSpinning, isFinished, max } = state
  const handleReset = () => {
    setCurrentIndex(0)
    resetDraw()
  }

  const isAtEnd = isFinished && !isSpinning && currentIndex >= drawnNumbers.length - 1 && drawnNumbers.length > 0

  useEffect(() => {
    if (audioRef.current) {
      if (isSpinning) {
        audioRef.current.volume = 0.4
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [isSpinning])

  useEffect(() => {
    if (audioRef.current && isFinished) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setCurrentIndex(0)
    }
  }, [isFinished])

  useEffect(() => {
    const a = audioRef.current
    const b = selectAudioRef.current
    return () => { a?.pause(); b?.pause() }
  }, [])

  useEffect(() => {
    if (currentNumber !== null) {
      setSlotKey((k) => k + 1)
    }
  }, [currentNumber])

  const handleToggle = (num: number) => {
    if (selectAudioRef.current) {
      selectAudioRef.current.currentTime = 0
      selectAudioRef.current.volume = 0.5
      selectAudioRef.current.play().catch(() => {})
    }
    toggleConcluded(num)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (v === '') return
    const n = parseInt(v, 10)
    if (!isNaN(n) && n >= 2 && n <= 10000) setMax(n)
  }

  return (
    <div className="app">
      <audio ref={audioRef} src={songAudio} loop preload="auto" />
      <audio ref={selectAudioRef} src={selectAudio} preload="auto" />

      <TitleBar />

      <main className="app-body">
        <div className="left-panel">
          <div className="controls-top">
            <button
              className="range-trigger"
              onClick={() => setIsRangeOpen(true)}
              disabled={drawnNumbers.length > 0 || isSpinning}
            >
              <Settings size={16} />
              Configurar quantidade de números
            </button>
          </div>

          <div className="slot-area">
            {isSpinning ? (
              <>
                <div className="slot-machine is-spinning">
                  <div key={slotKey} className={currentNumber !== null ? 'slot-number slot-reveal' : 'slot-number slot-placeholder'}>
                    {currentNumber !== null ? currentNumber : <Hash size={64} strokeWidth={1.5} color="#dee2e6" />}
                  </div>
                </div>
                <span className="slot-status spin">Sorteando...</span>
              </>
            ) : isFinished && drawnNumbers.length > 0 ? (
              isAtEnd ? (
                <div className="finish-screen">
                  <div className="finish-icon"><CheckCircle size={64} strokeWidth={1.5} /></div>
                  <span className="finish-title">Fim do Sorteio</span>
                  <span className="finish-sub">Todos os números foram apresentados</span>
                </div>
              ) : (
                <>
                  <div className="number-display">
                    <div className="display-card" key={currentIndex}>
                      <span className="display-order">{drawnNumbers[currentIndex].order}º</span>
                      <div className="display-number">{drawnNumbers[currentIndex].number}</div>
                      <span className="display-label">{currentIndex + 1} de {drawnNumbers.length}</span>
                    </div>
                    <button
                      className="nav-btn"
                      onClick={() => {
                        handleToggle(drawnNumbers[currentIndex].number)
                        setCurrentIndex((i) => i + 1)
                      }}
                      disabled={currentIndex >= drawnNumbers.length - 1}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </>
              )
            ) : (
              <>
                <div className="slot-machine">
                  <div key={slotKey} className={currentNumber !== null ? 'slot-number slot-reveal' : 'slot-number slot-placeholder'}>
                    {currentNumber !== null ? currentNumber : <Hash size={64} strokeWidth={1.5} color="#dee2e6" />}
                  </div>
                </div>
                <span className="slot-status">Aguardando sorteio</span>
              </>
            )}
          </div>

          <div className="actions">
            <button className="btn btn-primary" onClick={() => { setIsRangeOpen(false); startDraw() }} disabled={!canDraw}>
              <Shuffle size={18} />
              {isSpinning ? 'Sorteando...' : 'Sortear'}
            </button>
            {drawnNumbers.length > 0 && !isSpinning && (
              <button className="btn btn-secondary" onClick={handleReset}>
                <RotateCcw size={18} />
                Reiniciar
              </button>
            )}
          </div>

          {isFinished && !isSpinning && drawnNumbers.length > 0 && !isAtEnd && (
            <div className="finished-msg">Todos os números foram sorteados!</div>
          )}
        </div>

        <div className="right-panel">
          <div className="panel-header">
            <span className="panel-title">Números Sorteados</span>
            {drawnNumbers.length > 0 && (
              <span className="panel-count">{isFinished && drawnNumbers.length > 0 ? currentIndex + 1 : drawnNumbers.length} de {totalNumbers}</span>
            )}
          </div>

          {drawnNumbers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><Hash size={48} strokeWidth={1} /></div>
              <span className="empty-text">Nenhum número sorteado ainda</span>
            </div>
          ) : (
                <div className="numbers-grid">
              {drawnNumbers.map((item, i) => {
                const isConcluded = isFinished && !isSpinning && item.order <= currentIndex + 1
                return (
                  <div
                    key={item.number}
                    className={`number-card ${isConcluded ? 'concluded' : ''} card-in`}
                    style={{ animationDelay: `${i * 0.02}s` }}
                  >
                    <span className="number-order">{item.order}°</span>
                    <span className="number-value">{item.number}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>UNIVASF — Universidade Federal do Vale do São Francisco</p>
      </footer>

      <RangeModal
        open={isRangeOpen}
        onClose={() => setIsRangeOpen(false)}
        value={max}
        onChange={handleMaxChange}
        disabled={drawnNumbers.length > 0 || isSpinning}
      />
    </div>
  )
}

export default App
