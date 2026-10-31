import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Languages, Sparkles } from 'lucide-react';
import { TRUE_FALSE_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface TrueFalseGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
  onSeekVideo?: (seconds: number) => void;
}

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({
  onAddPoints,
  onCompleteGame,
  onSeekVideo
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentQ = TRUE_FALSE_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= TRUE_FALSE_QUESTIONS.length;

  const handleSelectAnswer = (ans: boolean) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedAnswer(ans);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null || isAnswered) return;
    soundManager.playClick();
    setIsAnswered(true);

    const isCorrect = selectedAnswer === currentQ.isTrue;
    if (isCorrect) {
      soundManager.playCorrect();
      confetti({ particleCount: 40, spread: 60 });
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCorrectCount((prev) => prev + 1);

      // +10 pts, +20 bonus on 5 streak
      let pts = 10;
      if (newStreak % 5 === 0) {
        pts += 20;
      }
      onAddPoints(pts);
    } else {
      soundManager.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentIndex + 1 >= TRUE_FALSE_QUESTIONS.length) {
      onCompleteGame('true_false');
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setStreak(0);
  };

  if (isFinished) {
    return (
      <div className="bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-8 text-center space-y-5 shadow-2xl">
        <div className="text-5xl">🏆</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: Verdadero o Falso!
        </h2>
        <p className="text-lg font-bold text-white">
          Aciertos: {correctCount} de {TRUE_FALSE_QUESTIONS.length}
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Ճիշտ թե Սխալ» խաղը հաջողությամբ ավարտվեց։ Դուք ցուցաբերեցիք գերազանց գիտելիքներ Նատալիայի հարցազրույցի վերաբերյալ։
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
            <span>¿VERDADERO O FALSO?</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {TRUE_FALSE_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Analiza cada afirmación basada en el testimonio de Natalia Oreiro
          </p>
        </div>

        {/* Streak counter */}
        <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold">
          <span className="text-[#FF922B]">🔥 Racha:</span>
          <span className="text-[#FFD166] font-mono">{streak}</span>
          <span className="text-white/40">|</span>
          <span className="text-white/80">Aciertos: {correctCount}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B]">
              Afirmación #{currentQ.id}
            </span>
            <p className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
              {currentQ.statementEs}
            </p>
            <p className="text-sm font-semibold text-[#FFD166] mt-2">
              «{currentQ.statementHy}»
            </p>
          </div>

          <TranslateButton
            textEs={currentQ.statementEs}
            textHy={currentQ.statementHy}
            label="Թարգմանել"
          />
        </div>
      </div>

      {/* TRUE / FALSE Choice Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSelectAnswer(true)}
          disabled={isAnswered}
          className={`p-5 rounded-2xl border-2 font-black text-lg transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedAnswer === true
              ? 'bg-[#FFD166] text-[#650D32] border-[#FFD166] shadow-xl scale-102'
              : 'bg-[#250311] hover:bg-[#650D32] text-white border-white/10 hover:border-[#FFD166]'
          }`}
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          <span>VERDADERO</span>
          <span className="text-xs font-normal opacity-80">(ՃԻՇՏ Է)</span>
        </button>

        <button
          onClick={() => handleSelectAnswer(false)}
          disabled={isAnswered}
          className={`p-5 rounded-2xl border-2 font-black text-lg transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedAnswer === false
              ? 'bg-[#E63946] text-white border-[#E63946] shadow-xl scale-102'
              : 'bg-[#250311] hover:bg-[#650D32] text-white border-white/10 hover:border-[#E63946]'
          }`}
        >
          <XCircle className="w-8 h-8 text-[#FF922B]" />
          <span>FALSO</span>
          <span className="text-xs font-normal opacity-80">(ՍԽԱԼ Է)</span>
        </button>
      </div>

      {/* Explanation Banner when answered */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in space-y-2 ${
            selectedAnswer === currentQ.isTrue
              ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
              : 'bg-[#E63946]/20 border-[#E63946] text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wide flex items-center gap-1.5">
              {selectedAnswer === currentQ.isTrue ? '🎉 ¡Respuesta correcta!' : '❌ Respuesta incorrecta'}
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">
              Respuesta: {currentQ.isTrue ? 'VERDADERO' : 'FALSO'}
            </span>
          </div>

          <p className="text-sm font-semibold">{currentQ.explanationEs}</p>
          <p className="text-xs text-[#FFD166] font-medium border-t border-white/10 pt-1.5">
            {currentQ.explanationHy}
          </p>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-white/50">
          Selecciona una opción y confirma tu respuesta
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Siguiente pregunta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleConfirmAnswer}
            disabled={selectedAnswer === null}
            className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
              selectedAnswer !== null
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
