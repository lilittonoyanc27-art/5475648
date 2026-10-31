import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, ArrowRight, RotateCcw, Award, Star, Sparkles } from 'lucide-react';
import { GRAND_CONTEST_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface GrandContestGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

export const GrandContestGame: React.FC<GrandContestGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = GRAND_CONTEST_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= GRAND_CONTEST_QUESTIONS.length;

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

      // Point values by difficulty
      let pts = 10;
      if (currentQ.level === 'medio') pts = 15;
      if (currentQ.level === 'dificil') pts = 25;
      onAddPoints(pts);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex + 1 >= GRAND_CONTEST_QUESTIONS.length) {
      onCompleteGame('grand_contest');
      soundManager.playFanfare();
      confetti({ particleCount: 150, spread: 100 });
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

  // Final performance evaluation as requested
  const getPerformanceBadge = (sc: number) => {
    if (sc <= 10) {
      return {
        titleEs: '¡Sigue practicando!',
        titleHy: 'Շարունակիր պարապել',
        desc: 'Cada día se aprende algo nuevo. ¡Vuelve a ver los episodios y repasa el vocabulario!',
        color: 'text-amber-400',
        stars: 1
      };
    } else if (sc <= 20) {
      return {
        titleEs: '¡Muy bien!',
        titleHy: 'Շատ լավ է',
        desc: '¡Tienes un buen conocimiento de la historia y el español de Natalia!',
        color: 'text-[#FFD166]',
        stars: 2
      };
    } else if (sc <= 27) {
      return {
        titleEs: '¡Excelente!',
        titleHy: 'Գերազանց է',
        desc: '¡Un rendimiento sobresaliente! Casi dominas todo el material.',
        color: 'text-[#FF922B]',
        stars: 3
      };
    } else {
      return {
        titleEs: '¡Eres una estrella!',
        titleHy: 'Դու իսկական աստղ ես',
        desc: '¡Puntuación casi perfecta! Te has convertido en el mayor experto en Natalia Oreiro.',
        color: 'text-yellow-300',
        stars: 4
      };
    }
  };

  if (isFinished) {
    const badge = getPerformanceBadge(score);

    return (
      <div className="bg-gradient-to-b from-[#650D32] via-[#4A0E2E] to-[#250311] p-8 rounded-2xl border-4 border-[#FFD166] text-center space-y-6 animate-in zoom-in-95 shadow-2xl">
        <div className="text-6xl animate-bounce">🏆</div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFD166] tracking-wide">
            {badge.titleEs}
          </h2>
          <p className="text-lg font-bold text-white mt-1">
            «{badge.titleHy}»
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-2xl text-[#FFD166]">
          {Array.from({ length: badge.stars }).map((_, i) => (
            <Star key={i} className="w-8 h-8 fill-current text-[#FFD166]" />
          ))}
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/10 max-w-sm mx-auto">
          <p className="text-2xl font-black text-white">
            Puntuación final: <span className="text-[#FFD166]">{score}</span> / 30
          </p>
          <p className="text-xs text-white/70 mt-1">{badge.desc}</p>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-xl hover:brightness-110 cursor-pointer inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Intentar de nuevo para superarte</span>
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
            <span>EL GRAN CONCURSO</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              Pregunta {currentIndex + 1} / {GRAND_CONTEST_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            El gran examen final de 30 preguntas con dificultad progresiva
          </p>
        </div>

        {/* Level badge & points */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
              currentQ.level === 'facil'
                ? 'bg-emerald-950/70 border-emerald-400 text-emerald-300'
                : currentQ.level === 'medio'
                ? 'bg-amber-950/70 border-[#FFD166] text-[#FFD166]'
                : 'bg-red-950/70 border-[#E63946] text-[#E63946]'
            }`}
          >
            Nivel: {currentQ.level}
          </span>
          <span className="bg-black/40 px-3 py-1 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
            Puntos: {score}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#250311] h-2 rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#FFD166] via-[#FF922B] to-[#E63946] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / GRAND_CONTEST_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Pregunta #{currentQ.id}
          </span>
          <p className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
            {currentQ.questionEs}
          </p>
          <p className="text-sm font-semibold text-[#FFD166] mt-2">
            «{currentQ.questionHy}»
          </p>
        </div>

        <TranslateButton
          textEs={currentQ.questionEs}
          textHy={currentQ.questionHy}
          label="Թարգմանել"
        />
      </div>

      {/* Options */}
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

      {/* Explanation when answered */}
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
              {selectedOption === currentQ.correctIndex ? '🎉 ¡Respuesta correcta!' : '❌ Respuesta equivocada'}
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">
              Opción correcta: {currentQ.options[currentQ.correctIndex].textEs}
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
          Revisa el significado con "Թարգմանել" y luego presiona "Elegir"
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>{currentIndex + 1 === GRAND_CONTEST_QUESTIONS.length ? 'Ver resultados' : 'Siguiente pregunta'}</span>
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
