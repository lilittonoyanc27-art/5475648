import React, { useState } from 'react';
import { Volume2, Play, Sparkles, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INTERVIEW_QUESTIONS } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface InterviewSimGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
  onSeekVideo?: (seconds: number) => void;
}

export const InterviewSimGame: React.FC<InterviewSimGameProps> = ({
  onAddPoints,
  onCompleteGame,
  onSeekVideo
}) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(INTERVIEW_QUESTIONS[0].id);
  const [askedQuestionIds, setAskedQuestionIds] = useState<number[]>([INTERVIEW_QUESTIONS[0].id]);
  const [filterCategory, setFilterCategory] = useState<string>('Todas');

  const activeDialog = INTERVIEW_QUESTIONS.find((q) => q.id === selectedQuestionId) || INTERVIEW_QUESTIONS[0];

  const categories = ['Todas', ...Array.from(new Set(INTERVIEW_QUESTIONS.map((q) => q.categoryEs)))];

  const handleAsk = (id: number) => {
    soundManager.playClick();
    setSelectedQuestionId(id);
    if (!askedQuestionIds.includes(id)) {
      const updated = [...askedQuestionIds, id];
      setAskedQuestionIds(updated);
      onAddPoints(10);
      if (updated.length >= INTERVIEW_QUESTIONS.length) {
        onCompleteGame('interview');
      }
    }
  };

  const filteredQuestions = filterCategory === 'Todas'
    ? INTERVIEW_QUESTIONS
    : INTERVIEW_QUESTIONS.filter((q) => q.categoryEs === filterCategory);

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] p-5 shadow-xl space-y-6 text-left">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#990F32]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>ENTREVISTA A NATALIA</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              Simulador de Periodismo
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Conviértete en periodista: haz preguntas y descubre las respuestas reales de Natalia
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Preguntadas: {askedQuestionIds.length} / {INTERVIEW_QUESTIONS.length}
        </div>
      </div>

      {/* Interactive Television Studio Stage */}
      <div className="relative bg-gradient-to-b from-[#4A0E2E] via-[#2F0619] to-[#1A030E] rounded-2xl border-2 border-[#FFD166] p-6 shadow-2xl overflow-hidden space-y-6">
        <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-2">
          <span className="font-bold text-[#FFD166] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>ESTUDIO EN VIVO • CALA EN CNN ESPAÑOL</span>
          </span>
          <span className="text-[11px] text-white/70">
            Categoría: {activeDialog.categoryEs} ({activeDialog.categoryHy})
          </span>
        </div>

        {/* Dialogue Balloons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Journalist Balloon (Left) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#650D32] to-[#FF922B] flex items-center justify-center text-xl shadow-md">
                🎙️
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#FF922B] block">Tú (Periodista)</span>
                <span className="text-[10px] text-white/60">Դուք (Լրագրող)</span>
              </div>
            </div>

            <div className="p-4 bg-[#650D32] rounded-2xl rounded-tl-xs border border-[#FF922B]/60 shadow-lg relative space-y-2">
              <p className="text-lg font-bold text-white">
                «{activeDialog.questionEs}»
              </p>
              <p className="text-xs text-[#FFD166] font-medium">
                «{activeDialog.questionHy}»
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => soundManager.speakSpanish(activeDialog.questionEs)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFD166] cursor-pointer"
                  title="Escuchar pregunta"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <TranslateButton
                  textEs={activeDialog.questionEs}
                  textHy={activeDialog.questionHy}
                  label="Թարգմանել"
                />
              </div>
            </div>
          </div>

          {/* Natalia Balloon (Right) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-end">
              <div className="text-right">
                <span className="text-xs uppercase font-bold text-[#FFD166] block">Natalia Oreiro</span>
                <span className="text-[10px] text-white/60">Նատալիա Օրեյրո</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#990F32] to-[#E63946] flex items-center justify-center text-xl shadow-md">
                👩🏻
              </div>
            </div>

            <div className="p-4 bg-[#250311] rounded-2xl rounded-tr-xs border-2 border-[#FFD166] shadow-xl relative space-y-2">
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                «{activeDialog.responseEs}»
              </p>
              <p className="text-xs text-[#FFD166] font-medium leading-relaxed">
                «{activeDialog.responseHy}»
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => soundManager.speakSpanish(activeDialog.responseEs)}
                    className="p-1.5 rounded-lg bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer shadow-xs"
                    title="Escuchar respuesta"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  {activeDialog.videoTimestamp && onSeekVideo && (
                    <button
                      onClick={() => onSeekVideo(activeDialog.videoTimestamp!)}
                      className="px-2.5 py-1 rounded-lg bg-[#E63946] hover:bg-[#E63946]/90 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Ver momento en video</span>
                    </button>
                  )}
                </div>

                <TranslateButton
                  textEs={activeDialog.responseEs}
                  textHy={activeDialog.responseHy}
                  label="Թարգմանել"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playClick();
              setFilterCategory(cat);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#FFD166] text-[#650D32] shadow-sm'
                : 'bg-[#250311] text-white/70 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Question Selector Carousel / Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          Elige tu siguiente pregunta como periodista:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {filteredQuestions.map((q) => {
            const isSelected = selectedQuestionId === q.id;
            const isAsked = askedQuestionIds.includes(q.id);

            return (
              <button
                key={q.id}
                onClick={() => handleAsk(q.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFD166] text-[#650D32] border-[#FFD166] shadow-md scale-102'
                    : 'bg-[#250311] text-white border-white/10 hover:border-[#FFD166]/50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-[#650D32]/80' : 'text-[#FF922B]'}`}>
                    {q.categoryEs}
                  </span>
                  {isAsked && (
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-[#650D32]' : 'text-emerald-400'}`}>
                      ✓ Preguntada
                    </span>
                  )}
                </div>

                <p className="font-bold text-xs sm:text-sm line-clamp-2">
                  {q.questionEs}
                </p>
                <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-[#650D32]/90' : 'text-[#FFD166]/80'}`}>
                  {q.questionHy}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
