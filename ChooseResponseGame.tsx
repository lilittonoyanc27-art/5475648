import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, RotateCcw, MessageCircle, Sparkles } from 'lucide-react';
import { CHOOSE_RESPONSE_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface ChooseResponseGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

export const ChooseResponseGame: React.FC<ChooseResponseGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = CHOOSE_RESPONSE_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= CHOOSE_RESPONSE_QUESTIONS.length;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null || isAnswered) return;
    soundManager.playClick();
    setIsAnswered(true);

    const chosen = currentQ.options[selectedOption];
    if (chosen.isCorrect) {
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
    if (currentIndex + 1 >= CHOOSE_RESPONSE_QUESTIONS.length) {
      onCompleteGame('choose_reply');
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

  if (isFinished) {
    return (
      <div className="bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-8 text-center space-y-5 shadow-2xl">
        <div className="text-5xl">💬</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: Elige tu respuesta!
        </h2>
        <p className="text-lg font-bold text-white">
          Aciertos: {score} de {CHOOSE_RESPONSE_QUESTIONS.length}
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Ընտրի՛ր քո պատասխանը» խաղը հաջողությամբ ավարտվեց։ Դուք սովորեցիք բնական, կենդանի և հումորային իսպաներեն արձագանքներ։
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
            <span>ELIGE TU RESPUESTA</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {CHOOSE_RESPONSE_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Elige la respuesta más natural, adecuada y empática para cada situación
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Aciertos: {score} / {CHOOSE_RESPONSE_QUESTIONS.length}
        </div>
      </div>

      {/* Situation Card */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B] flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            Situación de la vida real #{currentQ.id}
          </span>
          <p className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
            {currentQ.situationEs}
          </p>
          <p className="text-sm font-semibold text-[#FFD166] mt-2">
            «{currentQ.situationHy}»
          </p>
        </div>

        <TranslateButton
          textEs={currentQ.situationEs}
          textHy={currentQ.situationHy}
          label="Թարգմանել"
        />
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          let style = 'bg-[#250311] border-white/10 hover:border-white/30 text-white';

          if (isAnswered) {
            if (opt.isCorrect) {
              style = 'bg-emerald-900/60 border-emerald-400 text-white';
            } else if (isSelected && !opt.isCorrect) {
              style = 'bg-[#E63946]/30 border-[#E63946] text-white';
            }
          } else if (isSelected) {
            style = 'bg-[#FFD166]/20 border-[#FFD166] text-white shadow-md';
          }

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${style}`}
            >
              <div 
                onClick={() => handleSelect(idx)}
                className="flex items-center gap-3 flex-1 cursor-pointer"
              >
                <span className="w-7 h-7 rounded-lg bg-black/40 text-[#FFD166] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div>
                  <span className="font-bold text-base">{opt.textEs}</span>
                  <span className="text-xs text-[#FFD166]/70 block">{opt.textHy}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
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
      {isAnswered && selectedOption !== null && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in space-y-1.5 ${
            currentQ.options[selectedOption].isCorrect
              ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
              : 'bg-[#E63946]/20 border-[#E63946] text-white'
          }`}
        >
          <p className="font-bold text-sm">
            {currentQ.options[selectedOption].feedbackEs}
          </p>
          <p className="text-xs text-[#FFD166]">
            {currentQ.options[selectedOption].feedbackHy}
          </p>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-white/50">
          Usa "Elegir" para seleccionar la opción más natural
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Siguiente situación</span>
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
