import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, ArrowRight, RotateCcw, Lightbulb, CheckCircle2, MessageSquare } from 'lucide-react';
import { WHAT_IF_PROMPTS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface WhatIfGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

export const WhatIfGame: React.FC<WhatIfGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCustomSentence, setUserCustomSentence] = useState('');
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const currentPrompt = WHAT_IF_PROMPTS[currentIndex];
  const isFinished = currentIndex >= WHAT_IF_PROMPTS.length;

  const handlePickStarter = (starterText: string) => {
    soundManager.playClick();
    setUserCustomSentence(starterText + ' ');
  };

  const handlePickSample = (idx: number) => {
    soundManager.playClick();
    setSelectedSampleIdx(idx);
    setUserCustomSentence(currentPrompt.sampleAnswers[idx].textEs);
  };

  const handleConfirm = () => {
    if (!userCustomSentence.trim() || isAnswered) return;
    soundManager.playClick();
    soundManager.playCorrect();
    confetti({ particleCount: 50, spread: 60 });
    setIsAnswered(true);
    setCompletedCount((prev) => prev + 1);
    onAddPoints(15);
  };

  const handleNext = () => {
    soundManager.playClick();
    setUserCustomSentence('');
    setSelectedSampleIdx(null);
    setIsAnswered(false);
    if (currentIndex + 1 >= WHAT_IF_PROMPTS.length) {
      onCompleteGame('what_if');
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setUserCustomSentence('');
    setSelectedSampleIdx(null);
    setIsAnswered(false);
    setCompletedCount(0);
  };

  if (isFinished) {
    return (
      <div className="bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-8 text-center space-y-5 shadow-2xl">
        <div className="text-5xl">✨</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFD166]">
          ¡Juego completado: ¿Qué pasaría si...?!
        </h2>
        <p className="text-lg font-bold text-white">
          Completaste los 15 desafíos de conversación hipotética
        </p>
        <p className="text-sm text-[#FFD166] max-w-md mx-auto">
          «Ի՞նչ կլիներ, եթե․․․» խաղը հաջողությամբ ավարտվեց։ Դուք յուրացրեցիք իսպաներեն պայմանական եղանակը (Condicional) և սովորեցիք ազատ արտահայտել ձեր մտքերը։
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
            <span>¿QUÉ PASARÍA SI...?</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              {currentIndex + 1} / {WHAT_IF_PROMPTS.length}
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Desarrolla tu imaginación y fluidez verbal en español hipotético
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Completados: {completedCount} / {WHAT_IF_PROMPTS.length}
        </div>
      </div>

      {/* Hypothetical Prompt Card */}
      <div className="bg-gradient-to-br from-[#650D32] to-[#450720] p-6 rounded-2xl border-2 border-[#FFD166] shadow-lg flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B]">
            Pregunta hipotética #{currentPrompt.id}
          </span>
          <p className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
            {currentPrompt.promptEs}
          </p>
          <p className="text-sm font-semibold text-[#FFD166] mt-2">
            «{currentPrompt.promptHy}»
          </p>
        </div>

        <TranslateButton
          textEs={currentPrompt.promptEs}
          textHy={currentPrompt.promptHy}
          label="Թարգմանել"
        />
      </div>

      {/* Grammar Tip Box */}
      <div className="bg-[#250311] p-3.5 rounded-xl border border-[#FF922B]/40 flex items-start gap-2.5 text-xs">
        <Lightbulb className="w-4 h-4 text-[#FFD166] flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white">Consejo gramatical: {currentPrompt.grammarTipEs}</p>
          <p className="text-[#FFD166] mt-0.5">{currentPrompt.grammarTipHy}</p>
        </div>
      </div>

      {/* Suggested Starters */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          Inicios sugeridos (haz clic para comenzar tu frase):
        </span>
        <div className="flex flex-wrap gap-2">
          {currentPrompt.suggestedStarters.map((starter, idx) => (
            <button
              key={idx}
              onClick={() => handlePickStarter(starter.textEs)}
              className="px-3 py-1.5 rounded-xl bg-[#650D32] hover:bg-[#990F32] border border-white/20 text-xs font-bold text-white transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>{starter.textEs}</span>
              <span className="text-[10px] text-[#FFD166] ml-1.5 opacity-80">({starter.textHy})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sample Natural Responses */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          O elige una de estas respuestas ejemplares:
        </span>
        <div className="space-y-2">
          {currentPrompt.sampleAnswers.map((sample, idx) => (
            <div
              key={idx}
              onClick={() => handlePickSample(idx)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                selectedSampleIdx === idx
                  ? 'bg-[#FFD166]/20 border-[#FFD166] text-white shadow-md'
                  : 'bg-[#250311] border-white/10 hover:border-white/30 text-white/90'
              }`}
            >
              <div>
                <p className="font-bold text-sm sm:text-base">
                  {sample.textEs}
                  {sample.humorous && <span className="ml-1.5 text-xs text-[#FF922B]">😄 (Humor)</span>}
                </p>
                <p className="text-xs text-[#FFD166] mt-0.5">
                  «{sample.textHy}»
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.speakSpanish(sample.textEs);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFD166]"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <TranslateButton
                  textEs={sample.textEs}
                  textHy={sample.textHy}
                  label="Թարգմանել"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input or Selected sentence to practice */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          Tu respuesta en español:
        </span>
        <div className="relative">
          <input
            type="text"
            value={userCustomSentence}
            onChange={(e) => setUserCustomSentence(e.target.value)}
            disabled={isAnswered}
            placeholder="Escribe tu propia respuesta o usa un ejemplo arriba..."
            className="w-full p-4 rounded-xl bg-[#250311] border-2 border-[#FFD166]/60 text-white placeholder-white/30 font-semibold text-sm sm:text-base focus:outline-hidden focus:border-[#FFD166]"
          />
          {userCustomSentence && (
            <button
              onClick={() => soundManager.speakSpanish(userCustomSentence)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer shadow-xs"
              title="Escuchar tu frase"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Completed feedback */}
      {isAnswered && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-400 rounded-xl text-white space-y-1 animate-in fade-in">
          <p className="font-bold text-sm text-[#FFD166] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>¡Excelente práctica de expresión libre! +15 Puntos</span>
          </p>
          <p className="text-xs text-white/80">
            Has formulado una oración en modo condicional correctamente expresando tu punto de vista.
          </p>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-white/50">
          Practica decir la frase en voz alta con el botón de audio
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
            disabled={!userCustomSentence.trim()}
            className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
              userCustomSentence.trim()
                ? 'bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmar frase</span>
          </button>
        )}
      </div>
    </div>
  );
};
