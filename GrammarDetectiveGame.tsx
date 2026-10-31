import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Search, CheckCircle2, XCircle, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { GRAMMAR_ERROR_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface GrammarDetectiveGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

export const GrammarDetectiveGame: React.FC<GrammarDetectiveGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = GRAMMAR_ERROR_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= GRAMMAR_ERROR_QUESTIONS.length;

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [userCorrection, setUserCorrection] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const words = currentQ ? currentQ.incorrectSentenceEs.replace(/[.,]/g, '').split(' ') : [];

  const handleSelectWord = (word: string) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedWord(word);
  };

  const handleCheck = () => {
    if (isAnswered) return;
    soundManager.playClick();

    // Check if the user identified the error or typed correction
    const targetError = currentQ.errorWord.toLowerCase();
    const correctTarget = currentQ.correctionWord.toLowerCase();
    const inputClean = userCorrection.trim().toLowerCase();

    const ok = 
      (selectedWord && targetError.includes(selectedWord.toLowerCase())) ||
      inputClean === correctTarget ||
      inputClean === currentQ.correctSentenceEs.toLowerCase();

    setIsAnswered(true);
    setIsCorrect(ok);

    if (ok) {
      soundManager.playCorrect();
      confetti({ particleCount: 50, spread: 60 });
      setScore((prev) => prev + 1);
      onAddPoints(15);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedWord(null);
    setUserCorrection('');
    setIsAnswered(false);
    setIsCorrect(false);
    if (currentIndex + 1 >= GRAMMAR_ERROR_QUESTIONS.length) {
      onCompleteGame('grammar_detective');
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedWord(null);
    setUserCorrection('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
  };

  if (isFinished) {
    return (
      <div className="bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-8 text-center space-y-5 shadow-2xl">
        <div className="text-5xl">🕵️‍♂️</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: Detective de errores!
        </h2>
        <p className="text-lg font-bold text-white">
          Aciertos: {score} de {GRAMMAR_ERROR_QUESTIONS.length}
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Սխալների դետեկտիվ» խաղը հաջողությամբ ավարտվեց։ Դուք սովորեցիք նկատել և ուղղել ամենատարածված քերականական սխալները։
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
            <span>DETECTIVE DE ERRORES</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {GRAMMAR_ERROR_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Encuentra la palabra incorrecta en la frase y descubre la regla de oro
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Aciertos: {score} / {GRAMMAR_ERROR_QUESTIONS.length}
        </div>
      </div>

      {/* Target Sentence with click on words */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B]">
              Caso detectivesco #{currentQ.id}
            </span>
            <p className="text-xs text-white/70 mt-0.5">
              Toca la palabra que contiene el error gramatical:
            </p>
          </div>

          <TranslateButton
            textEs={currentQ.correctSentenceEs}
            textHy={currentQ.correctSentenceHy}
            label="Թարգմանել"
          />
        </div>

        {/* Word chips in the incorrect sentence */}
        <div className="flex flex-wrap gap-2 py-2">
          {words.map((word, idx) => {
            const isPicked = selectedWord === word;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectWord(word)}
                disabled={isAnswered}
                className={`px-3.5 py-2 rounded-xl text-base sm:text-lg font-black transition-all cursor-pointer border ${
                  isPicked
                    ? 'bg-[#E63946] text-white border-white ring-2 ring-white/50 shadow-md scale-105'
                    : 'bg-[#250311] text-white border-white/20 hover:border-[#FFD166]'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#FFD166] font-medium">
          «{currentQ.incorrectSentenceHy}»
        </p>
      </div>

      {/* Optional text input for correction */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
          ¿Cómo se escribe correctamente la palabra o la frase? (opcional)
        </label>
        <input
          type="text"
          value={userCorrection}
          onChange={(e) => setUserCorrection(e.target.value)}
          disabled={isAnswered}
          placeholder={`Escribe la corrección (ej: ${currentQ.correctionWord})...`}
          className="w-full p-3.5 rounded-xl bg-[#250311] border border-white/20 text-white placeholder-white/30 text-sm focus:outline-hidden focus:border-[#FFD166]"
        />
      </div>

      {/* Explanation when answered */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in space-y-2 ${
            isCorrect
              ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
              : 'bg-[#E63946]/20 border-[#E63946] text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wide flex items-center gap-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>¡Error detectado con precisión!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-[#E63946]" />
                  <span>No acertaste esta vez</span>
                </>
              )}
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">
              Palabra correcta: {currentQ.correctionWord}
            </span>
          </div>

          <p className="text-sm font-bold text-white">
            Frase correcta: «{currentQ.correctSentenceEs}»
          </p>
          <div className="pt-2 border-t border-white/10 space-y-1 text-xs">
            <p className="text-white font-medium">Explicación: {currentQ.ruleEs}</p>
            <p className="text-[#FFD166]">Բացատրություն: {currentQ.ruleHy}</p>
          </div>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-white/50">
          Selecciona la palabra con error y presiona Comprobar
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Siguiente caso</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleCheck}
            disabled={!selectedWord && !userCorrection.trim()}
            className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
              selectedWord || userCorrection.trim()
                ? 'bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Comprobar error</span>
          </button>
        )}
      </div>
    </div>
  );
};
