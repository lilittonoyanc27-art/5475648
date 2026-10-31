import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { FILL_BLANK_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface FillBlankGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

export const FillBlankGame: React.FC<FillBlankGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = FILL_BLANK_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= FILL_BLANK_QUESTIONS.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
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
    if (currentIndex + 1 >= FILL_BLANK_QUESTIONS.length) {
      onCompleteGame('fill_blank');
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
        <div className="text-5xl">🎯</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: Completa la frase!
        </h2>
        <p className="text-lg font-bold text-white">
          Aciertos: {score} de {FILL_BLANK_QUESTIONS.length}
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Լրացրո՛ւ նախադասությունը» խաղը հաջողությամբ ավարտվեց։ Դուք հիանալի յուրացրեցիք հիմնական բառապաշարն ու քերականությունը։
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

  // Display completed sentence if answered
  const displaySentence = isAnswered && selectedOption !== null
    ? currentQ.sentenceEs.replace('________', currentQ.options[currentQ.correctIndex].textEs)
    : currentQ.sentenceEs;

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] p-5 shadow-xl space-y-5 text-left">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#990F32]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>COMPLETA LA FRASE</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {FILL_BLANK_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Selecciona la palabra exacta que encaja en el contexto de la entrevista
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Aciertos: {score} / {FILL_BLANK_QUESTIONS.length}
        </div>
      </div>

      {/* Sentence Card */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B]">
              Ejercicio #{currentQ.id}
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white mt-2 leading-relaxed">
              {displaySentence}
            </p>
            <p className="text-sm font-semibold text-[#FFD166] mt-2">
              «{currentQ.sentenceHy}»
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => soundManager.speakSpanish(currentQ.sentenceEs.replace('________', ''))}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFD166] transition-colors cursor-pointer"
              title="Escuchar"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <TranslateButton
              textEs={currentQ.sentenceEs}
              textHy={currentQ.sentenceHy}
              label="Թարգմանել"
            />
          </div>
        </div>
      </div>

      {/* Options List with separate Translate vs Choose buttons */}
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
                onClick={() => handleSelectOption(idx)}
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
                <TranslateButton
                  textEs={opt.textEs}
                  textHy={opt.textHy}
                  label="Թարգմանել"
                />
                {!isAnswered && (
                  <button
                    onClick={() => handleSelectOption(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFD166] text-[#650D32]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isSelected ? 'Elegido ✓' : 'Elegir'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation Banner */}
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
              {selectedOption === currentQ.correctIndex ? '🎉 ¡Palabra correcta!' : '❌ Intento fallido'}
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">
              Respuesta: {currentQ.options[currentQ.correctIndex].textEs}
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
          Haz clic en la palabra o en "Elegir" para confirmar tu respuesta
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Siguiente frase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleConfirmAnswer}
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
