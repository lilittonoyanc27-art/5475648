import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2, ArrowRight, RotateCcw, User, Mic } from 'lucide-react';
import { WHO_SAID_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface WhoSaidItGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

export const WhoSaidItGame: React.FC<WhoSaidItGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState<'Natalia' | 'Presentador' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = WHO_SAID_QUESTIONS[currentIndex];
  const isFinished = currentIndex >= WHO_SAID_QUESTIONS.length;

  const handleSelectSpeaker = (speaker: 'Natalia' | 'Presentador') => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedSpeaker(speaker);
  };

  const handleConfirmAnswer = () => {
    if (!selectedSpeaker || isAnswered) return;
    soundManager.playClick();
    setIsAnswered(true);

    if (selectedSpeaker === currentQ.speaker) {
      soundManager.playCorrect();
      confetti({ particleCount: 50, spread: 60 });
      setCorrectCount((prev) => prev + 1);
      onAddPoints(10);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedSpeaker(null);
    setIsAnswered(false);
    if (currentIndex + 1 >= WHO_SAID_QUESTIONS.length) {
      onCompleteGame('who_said');
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedSpeaker(null);
    setIsAnswered(false);
    setCorrectCount(0);
  };

  if (isFinished) {
    return (
      <div className="bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-8 text-center space-y-5 shadow-2xl">
        <div className="text-5xl">🎙️</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: ¿Quién dijo eso?!
        </h2>
        <p className="text-lg font-bold text-white">
          Aciertos: {correctCount} de {WHO_SAID_QUESTIONS.length}
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Ո՞վ ասաց դա» խաղը հաջողությամբ ավարտվեց։ Դուք հիանալի տարբերում եք Նատալիայի և հաղորդավար Իսմայել Կալայի խոսքերը։
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
            <span>¿QUIÉN DIJO ESO?</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {WHO_SAID_QUESTIONS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Identifica si la frase fue pronunciada por Natalia Oreiro o por el presentador Cala
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Aciertos: {correctCount} / {WHO_SAID_QUESTIONS.length}
        </div>
      </div>

      {/* Quote Banner */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B]">
              Cita auténtica de la entrevista
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white mt-2 leading-relaxed">
              {currentQ.quoteEs}
            </p>
            <p className="text-base font-semibold text-[#FFD166] mt-2">
              «{currentQ.quoteHy}»
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => soundManager.speakSpanish(currentQ.quoteEs)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFD166] transition-colors cursor-pointer"
              title="Escuchar frase"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <TranslateButton
              textEs={currentQ.quoteEs}
              textHy={currentQ.quoteHy}
              label="Թարգմանել"
            />
          </div>
        </div>
      </div>

      {/* Characters selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Natalia Card */}
        <div
          onClick={() => handleSelectSpeaker('Natalia')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
            selectedSpeaker === 'Natalia'
              ? 'bg-[#FFD166] text-[#650D32] border-[#FFD166] shadow-xl scale-102'
              : 'bg-[#250311] hover:bg-[#650D32] text-white border-white/10 hover:border-[#FFD166]'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#990F32] to-[#E63946] flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
            👩🏻
          </div>
          <div>
            <h3 className="text-xl font-black">NATALIA OREIRO</h3>
            <p className="text-xs opacity-80 mt-0.5">Actriz, cantante y protagonista</p>
            <span className="text-[11px] font-bold mt-1 inline-block opacity-90">
              (Նատալիա Օրեյրո)
            </span>
          </div>
        </div>

        {/* Presentador Card */}
        <div
          onClick={() => handleSelectSpeaker('Presentador')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
            selectedSpeaker === 'Presentador'
              ? 'bg-[#FF922B] text-[#250311] border-[#FF922B] shadow-xl scale-102'
              : 'bg-[#250311] hover:bg-[#650D32] text-white border-white/10 hover:border-[#FF922B]'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#650D32] to-[#FF922B] flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
            👨🏻‍💼
          </div>
          <div>
            <h3 className="text-xl font-black">PRESENTADOR CALA</h3>
            <p className="text-xs opacity-80 mt-0.5">Conductor del programa CNN</p>
            <span className="text-[11px] font-bold mt-1 inline-block opacity-90">
              (Հաղորդավար Իսմայել Կալա)
            </span>
          </div>
        </div>
      </div>

      {/* Explanation Banner when answered */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in space-y-1.5 ${
            selectedSpeaker === currentQ.speaker
              ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
              : 'bg-[#E63946]/20 border-[#E63946] text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wide">
              {selectedSpeaker === currentQ.speaker ? '🎉 ¡Correcto!' : '❌ Incorrecto'}
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">
              Voz de: {currentQ.speaker}
            </span>
          </div>
          <p className="text-sm font-semibold">{currentQ.contextEs}</p>
          <p className="text-xs text-[#FFD166] border-t border-white/10 pt-1">
            {currentQ.contextHy}
          </p>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-white/50">
          Haz clic en la tarjeta del personaje y confirma tu respuesta
        </span>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
          >
            <span>Siguiente cita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleConfirmAnswer}
            disabled={!selectedSpeaker}
            className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
              selectedSpeaker
                ? 'bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmar elección</span>
          </button>
        )}
      </div>
    </div>
  );
};
