import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle, 
  Send, 
  SkipForward,
  Trophy
} from 'lucide-react';
import { PASAPALABRA_DATA } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface PasapalabraGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

type LetterStatus = 'pending' | 'correct' | 'wrong';

export const PasapalabraGame: React.FC<PasapalabraGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [lettersState, setLettersState] = useState<Record<string, LetterStatus>>(() => {
    const init: Record<string, LetterStatus> = {};
    PASAPALABRA_DATA.forEach((item) => {
      init[item.letter] = 'pending';
    });
    return init;
  });

  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = PASAPALABRA_DATA[currentLetterIdx];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timeLeft > 0 && !isGameOver) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft, isGameOver]);

  const correctCount = Object.values(lettersState).filter((s) => s === 'correct').length;
  const wrongCount = Object.values(lettersState).filter((s) => s === 'wrong').length;
  const pendingCount = Object.values(lettersState).filter((s) => s === 'pending').length;

  // Move to next pending letter
  const findNextPending = (fromIdx: number): number => {
    const total = PASAPALABRA_DATA.length;
    for (let i = 1; i <= total; i++) {
      const nextIdx = (fromIdx + i) % total;
      const letter = PASAPALABRA_DATA[nextIdx].letter;
      if (lettersState[letter] === 'pending') {
        return nextIdx;
      }
    }
    return -1; // All finished
  };

  const handleStart = () => {
    soundManager.playClick();
    setTimerActive(true);
  };

  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userAnswer.trim() || isGameOver) return;
    if (!timerActive) setTimerActive(true);

    soundManager.playClick();
    const cleanUser = userAnswer.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cleanTarget = currentItem.answer.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const isMatch = cleanUser === cleanTarget;
    const newLetters = { ...lettersState };

    if (isMatch) {
      soundManager.playCorrect();
      newLetters[currentItem.letter] = 'correct';
      onAddPoints(10);
    } else {
      soundManager.playWrong();
      newLetters[currentItem.letter] = 'wrong';
    }

    setLettersState(newLetters);
    setUserAnswer('');
    setShowHint(false);

    // Check if game complete
    const remainingPending = Object.values(newLetters).filter((s) => s === 'pending').length;
    if (remainingPending === 0) {
      setIsGameOver(true);
      setTimerActive(false);
      soundManager.playFanfare();
      confetti({ particleCount: 150, spread: 100 });
      onAddPoints(50);
      onCompleteGame('pasapalabra');
    } else {
      const nextIdx = findNextPending(currentLetterIdx);
      if (nextIdx !== -1) {
        setCurrentLetterIdx(nextIdx);
      } else {
        setIsGameOver(true);
        setTimerActive(false);
      }
    }
  };

  const handlePasapalabra = () => {
    soundManager.playClick();
    if (!timerActive) setTimerActive(true);
    setUserAnswer('');
    setShowHint(false);

    const nextIdx = findNextPending(currentLetterIdx);
    if (nextIdx !== -1) {
      setCurrentLetterIdx(nextIdx);
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    const init: Record<string, LetterStatus> = {};
    PASAPALABRA_DATA.forEach((item) => {
      init[item.letter] = 'pending';
    });
    setLettersState(init);
    setCurrentLetterIdx(0);
    setUserAnswer('');
    setTimeLeft(240);
    setTimerActive(false);
    setShowHint(false);
    setIsGameOver(false);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] p-5 shadow-xl space-y-6 text-left">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#990F32]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>EL ROSCO DE PASAPALABRA</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              27 Letras A-Z + Ñ
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Adivina la palabra para cada letra del alfabeto basada en la vida de Natalia Oreiro
          </p>
        </div>

        {/* Stats and Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono font-bold">
            <Clock className="w-4 h-4 text-[#FFD166]" />
            <span className={timeLeft <= 30 ? 'text-[#E63946] animate-pulse font-black' : 'text-white'}>
              {formatTimer(timeLeft)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-500/30">
              ✓ {correctCount}
            </span>
            <span className="text-[#E63946] bg-red-950/60 px-2 py-1 rounded-lg border border-red-500/30">
              ✗ {wrongCount}
            </span>
          </div>
        </div>
      </div>

      {/* Circular Alphabet Rosco Matrix */}
      <div className="p-4 bg-[#250311] rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {PASAPALABRA_DATA.map((item, idx) => {
            const status = lettersState[item.letter];
            const isCurrent = idx === currentLetterIdx;

            let badgeStyle = 'bg-[#650D32] text-white border-white/20';
            if (status === 'correct') {
              badgeStyle = 'bg-emerald-600 text-white border-emerald-300 shadow-xs shadow-emerald-500/50';
            } else if (status === 'wrong') {
              badgeStyle = 'bg-[#E63946] text-white border-red-300 shadow-xs shadow-red-500/50';
            } else if (isCurrent) {
              badgeStyle = 'bg-[#FFD166] text-[#650D32] border-[#FFD166] font-black scale-120 ring-4 ring-[#FFD166]/40 z-10';
            }

            return (
              <button
                key={item.letter}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentLetterIdx(idx);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${badgeStyle}`}
              >
                {item.letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Letter Prompt Card */}
      {!isGameOver ? (
        <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[#FFD166] text-[#650D32] font-black text-2xl flex items-center justify-center shadow-md">
                {currentItem.letter}
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF922B]">
                  {currentItem.type === 'starts_with'
                    ? `Empieza por la letra ${currentItem.letter}`
                    : `Contiene la letra ${currentItem.letter}`}
                </span>
                <p className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                  {currentItem.definitionEs}
                </p>
                <p className="text-sm font-semibold text-[#FFD166] mt-2">
                  «{currentItem.definitionHy}»
                </p>
              </div>
            </div>

            <TranslateButton
              textEs={currentItem.definitionEs}
              textHy={currentItem.definitionHy}
              label="Թարգմանել"
            />
          </div>

          {/* Hint disclosure */}
          {showHint && (
            <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs space-y-1 animate-in fade-in">
              <p className="text-[#FFD166] font-bold">Pista: {currentItem.hintEs}</p>
              <p className="text-white/80">Հուշում: {currentItem.hintHy}</p>
            </div>
          )}

          {/* Input & Form */}
          <form onSubmit={handleCheckAnswer} className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Escribe la palabra aquí..."
                autoFocus
                className="flex-1 p-3.5 rounded-xl bg-[#250311] border-2 border-[#FFD166]/60 text-white uppercase placeholder-white/30 font-black tracking-wider text-base focus:outline-hidden focus:border-[#FFD166]"
              />

              <button
                type="submit"
                disabled={!userAnswer.trim()}
                className="px-5 py-3.5 rounded-xl bg-[#FFD166] hover:bg-[#FFD166]/90 disabled:opacity-30 text-[#650D32] font-black text-sm transition-all flex items-center gap-1.5 shadow-md cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>COMPROBAR</span>
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/80 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#FFD166]" />
                <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
              </button>

              <button
                type="button"
                onClick={handlePasapalabra}
                className="px-4 py-1.5 rounded-lg bg-[#FF922B] hover:bg-[#FF922B]/90 text-[#250311] font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>PASAPALABRA</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Game Over Summary */
        <div className="bg-gradient-to-b from-[#650D32] to-[#250311] p-8 rounded-2xl border-4 border-[#FFD166] text-center space-y-5 animate-in zoom-in-95 shadow-2xl">
          <div className="text-6xl">🏆</div>
          <h2 className="text-3xl font-black text-[#FFD166]">
            ¡EL ROSCO HA TERMINADO!
          </h2>
          <div className="flex items-center justify-center gap-6 text-lg font-bold">
            <span className="text-emerald-400">✓ Aciertos: {correctCount}</span>
            <span className="text-red-400">✗ Errores: {wrongCount}</span>
          </div>
          <p className="text-sm text-white/90 max-w-md mx-auto">
            {correctCount >= 20
              ? '¡Extraordinario dominio del vocabulario de Natalia Oreiro!'
              : '¡Buen intento! Cada ronda amplía tu vocabulario en español.'}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-xl hover:brightness-110 cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar otra partida</span>
          </button>
        </div>
      )}
    </div>
  );
};
