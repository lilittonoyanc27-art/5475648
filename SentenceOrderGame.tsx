import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles, Volume2, HelpCircle } from 'lucide-react';
import { ORDER_WORDS_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface SentenceOrderGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

export const SentenceOrderGame: React.FC<SentenceOrderGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = ORDER_WORDS_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= ORDER_WORDS_QUESTIONS.length;

  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize words for current question
  useEffect(() => {
    if (currentQ) {
      setAvailableWords([...currentQ.scrambledWords]);
      setPlacedWords([]);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }, [currentIndex, currentQ]);

  const handlePickWord = (word: string, index: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    const newAvail = [...availableWords];
    newAvail.splice(index, 1);
    setAvailableWords(newAvail);
    setPlacedWords([...placedWords, word]);
  };

  const handleRemovePlacedWord = (word: string, index: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    const newPlaced = [...placedWords];
    newPlaced.splice(index, 1);
    setPlacedWords(newPlaced);
    setAvailableWords([...availableWords, word]);
  };

  const handleResetCurrent = () => {
    soundManager.playClick();
    if (currentQ) {
      setAvailableWords([...currentQ.scrambledWords]);
      setPlacedWords([]);
      setIsAnswered(false);
    }
  };

  const handleCheck = () => {
    if (placedWords.length === 0 || isAnswered) return;
    soundManager.playClick();

    const constructed = placedWords.join(' ').trim();
    const target = currentQ.correctSentence.trim();
    const ok = constructed.toLowerCase() === target.toLowerCase();

    setIsAnswered(true);
    setIsCorrect(ok);

    if (ok) {
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
    if (currentIndex + 1 >= ORDER_WORDS_QUESTIONS.length) {
      onCompleteGame('order_words');
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestartAll = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setScore(0);
  };

  if (isFinished) {
    return (
      <div className="bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-8 text-center space-y-5 shadow-2xl">
        <div className="text-5xl">🧩</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: Ordena las palabras!
        </h2>
        <p className="text-lg font-bold text-white">
          Aciertos: {score} de {ORDER_WORDS_QUESTIONS.length}
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Դասավորի՛ր բառերը» խաղը հաջողությամբ ավարտվեց։ Դուք յուրացրեցիք իսպաներեն նախադասությունների ճիշտ շարահյուսությունը։
        </p>
        <button
          onClick={handleRestartAll}
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
            <span>ORDENA LAS PALABRAS</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {ORDER_WORDS_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Toca las palabras para construir la oración española correcta
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Aciertos: {score} / {ORDER_WORDS_QUESTIONS.length}
        </div>
      </div>

      {/* Target Meaning & Hint */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-5 rounded-2xl border-2 border-[#FFD166] shadow-lg flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Significado a construir en armenio
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#FFD166] mt-1">
            «{currentQ.translationHy}»
          </p>
          <p className="text-xs text-white/70 mt-1.5">
            Pista: {currentQ.hintEs} ({currentQ.hintHy})
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <TranslateButton
            textEs={currentQ.correctSentence}
            textHy={currentQ.translationHy}
            label="TRADUCIR"
          />
          <button
            onClick={handleResetCurrent}
            disabled={isAnswered || placedWords.length === 0}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors disabled:opacity-30 cursor-pointer"
            title="Reiniciar palabras"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Placed Words Slot / Construction Line */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          Tu frase construida:
        </span>
        <div className="min-h-16 p-3.5 bg-[#250311] rounded-2xl border-2 border-dashed border-[#FFD166]/50 flex flex-wrap items-center gap-2">
          {placedWords.length === 0 ? (
            <span className="text-sm text-white/30 italic">
              Haz clic en las palabras de abajo para colocarlas aquí en orden...
            </span>
          ) : (
            placedWords.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleRemovePlacedWord(word, idx)}
                disabled={isAnswered}
                className="px-3.5 py-2 rounded-xl bg-[#FFD166] text-[#650D32] font-black text-sm sm:text-base shadow-md hover:scale-95 active:scale-90 transition-all cursor-pointer border border-[#FF922B]"
                title="Toca para retirar"
              >
                {word}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Scrambled Words Pool */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          Palabras disponibles:
        </span>
        <div className="p-4 bg-[#250311] rounded-2xl border border-white/10 flex flex-wrap gap-2.5">
          {availableWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handlePickWord(word, idx)}
              disabled={isAnswered}
              className="px-4 py-2 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white font-bold text-sm sm:text-base shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              {word}
            </button>
          ))}
          {availableWords.length === 0 && placedWords.length > 0 && !isAnswered && (
            <span className="text-xs text-[#FFD166] font-semibold flex items-center gap-1">
              ✓ Todas las palabras han sido colocadas. Presiona "COMPROBAR".
            </span>
          )}
        </div>
      </div>

      {/* Result feedback */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in space-y-1.5 ${
            isCorrect
              ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
              : 'bg-[#E63946]/20 border-[#E63946] text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wide">
              {isCorrect ? '🎉 ¡Frase perfectamente ordenada!' : '❌ Orden incorrecto'}
            </span>
            <button
              onClick={() => soundManager.speakSpanish(currentQ.correctSentence)}
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-[#FFD166]"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-base font-bold text-white">
            Correcto: «{currentQ.correctSentence}»
          </p>
          <p className="text-xs text-[#FFD166] border-t border-white/10 pt-1">
            Թարգմանություն: {currentQ.translationHy}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-white/50">
          Ordena todas las palabras y presiona COMPROBAR
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Siguiente reto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleCheck}
            disabled={placedWords.length === 0}
            className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
              placedWords.length > 0
                ? 'bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>COMPROBAR</span>
          </button>
        )}
      </div>
    </div>
  );
};
