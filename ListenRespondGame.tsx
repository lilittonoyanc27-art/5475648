import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Play, Volume2, CheckCircle2, ArrowRight, RotateCcw, Headphones, Sparkles } from 'lucide-react';
import { LISTEN_RESPOND_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface ListenRespondGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
  onSeekVideo?: (seconds: number) => void;
}

export const ListenRespondGame: React.FC<ListenRespondGameProps> = ({
  onAddPoints,
  onCompleteGame,
  onSeekVideo
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = LISTEN_RESPOND_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= LISTEN_RESPOND_QUESTIONS.length;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null || isAnswered) return;
    soundManager.playClick();
    setIsAnswered(true);

    if (selectedOption === currentQ.correctIndex) {
      soundManager.playCorrect();
      confetti({ particleCount: 50, spread: 60 });
      setScore((prev) => prev + 1);
      onAddPoints(10);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex + 1 >= LISTEN_RESPOND_QUESTIONS.length) {
      onCompleteGame('listen_respond');
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  const formatMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    return (
      <div className="bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-8 text-center space-y-5 shadow-2xl">
        <div className="text-5xl">🎧</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: Escucha y responde!
        </h2>
        <p className="text-lg font-bold text-white">
          Aciertos: {score} de {LISTEN_RESPOND_QUESTIONS.length}
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Լսի՛ր և պատասխանի՛ր» խաղը հաջողությամբ ավարտվեց։ Դուք ցուցաբերեցիք իսպաներենի ունկնդրման (comprensión auditiva) գերազանց ունակություններ։
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-xl hover:brightness-110 cursor-pointer inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Jugar de nuevo</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] p-5 shadow-xl space-y-5 text-left">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#990F32]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>ESCUCHA Y RESPONDE</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {LISTEN_RESPOND_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Escucha el fragmento auténtico en el video y elige la frase exacta que dijo Natalia
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Aciertos: {score} / {LISTEN_RESPOND_QUESTIONS.length}
        </div>
      </div>

      {/* Video snippet trigger & prompt */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FFD166] text-[#650D32]">
              <Headphones className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#FF922B] tracking-wider block">
                Momento de la entrevista • {formatMinSec(currentQ.timestamp)}
              </span>
              <p className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {currentQ.promptEs}
              </p>
              <p className="text-xs text-[#FFD166] mt-1 font-medium">
                «{currentQ.promptHy}»
              </p>
            </div>
          </div>

          {onSeekVideo && (
            <button
              onClick={() => {
                soundManager.playClick();
                onSeekVideo(currentQ.timestamp);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Reproducir momento ({formatMinSec(currentQ.timestamp)})</span>
            </button>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctIndex;

          let cardStyle = 'bg-[#250311] border-white/10 hover:border-white/30 text-white';
          if (isAnswered) {
            if (isCorrect) {
              cardStyle = 'bg-emerald-900/60 border-emerald-400 text-white';
            } else if (isSelected && !isCorrect) {
              cardStyle = 'bg-[#E63946]/30 border-[#E63946] text-white';
            }
          } else if (isSelected) {
            cardStyle = 'bg-[#FFD166]/20 border-[#FFD166] text-white shadow-md';
          }

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${cardStyle}`}
            >
              <div 
                onClick={() => handleSelect(idx)}
                className="flex items-center gap-3 flex-1 cursor-pointer"
              >
                <span className="w-7 h-7 rounded-lg bg-black/40 text-[#FFD166] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div>
                  <span className="font-bold text-base sm:text-lg">{opt.textEs}</span>
                  <span className="text-xs text-[#FFD166]/70 block">{opt.textHy}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => soundManager.speakSpanish(opt.textEs)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFD166] cursor-pointer"
                  title="Escuchar opción"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <TranslateButton
                  textEs={opt.textEs}
                  textHy={opt.textHy}
                  label="Թարգմանել"
                />
                {!isAnswered && (
                  <button
                    onClick={() => handleSelect(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFD166] text-[#650D32]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isSelected ? 'Elegida ✓' : 'Elegir'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback when answered */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in space-y-1.5 ${
            selectedOption === currentQ.correctIndex
              ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
              : 'bg-[#E63946]/20 border-[#E63946] text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wide">
              {selectedOption === currentQ.correctIndex ? '🎉 ¡Oído perfecto!' : '❌ Frase equivocada'}
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">
              Frase auténtica: {currentQ.options[currentQ.correctIndex].textEs}
            </span>
          </div>
          <p className="text-sm font-semibold">{currentQ.explanationEs}</p>
          <p className="text-xs text-[#FFD166] border-t border-white/10 pt-1">
            {currentQ.explanationHy}
          </p>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-white/50">
          Usa el botón "Reproducir momento" para escuchar el fragmento en el video
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Siguiente audición</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleConfirm}
            disabled={selectedOption === null}
            className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
              selectedOption !== null
                ? 'bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmar respuesta</span>
          </button>
        )}
      </div>
    </div>
  );
};
