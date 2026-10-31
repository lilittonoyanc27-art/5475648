import React from 'react';
import { Play, Sparkles, CheckCircle2, ChevronRight, Gamepad2 } from 'lucide-react';
import { Chapter } from './types.ts';
import { CHAPTERS_DATA } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface ChapterSelectorProps {
  currentChapterId: number;
  completedChapters: number[];
  onSelectChapter: (chapter: Chapter) => void;
  onPlayGameForChapter?: (chapterId: number) => void;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  currentChapterId,
  completedChapters,
  onSelectChapter,
  onPlayGameForChapter
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>Capítulos interactivos</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/30">
              7 Episodios
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Explora cada momento de la entrevista y pon a prueba lo aprendido
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CHAPTERS_DATA.map((chapter) => {
          const isActive = currentChapterId === chapter.id;
          const isCompleted = completedChapters.includes(chapter.id);
          const isSpecialChickenChapter = chapter.id === 4;

          return (
            <div
              key={chapter.id}
              onClick={() => {
                soundManager.playClick();
                onSelectChapter(chapter);
              }}
              className={`group relative rounded-2xl p-4 transition-all duration-200 cursor-pointer text-left border flex flex-col justify-between overflow-hidden shadow-lg ${
                isSpecialChickenChapter
                  ? 'bg-gradient-to-br from-[#650D32] via-[#990F32] to-[#FF922B]/30 border-[#FFD166] ring-2 ring-[#FFD166]/50'
                  : isActive
                  ? 'bg-gradient-to-br from-[#990F32] to-[#650D32] border-[#FFD166] ring-1 ring-[#FFD166]'
                  : 'bg-[#38061B] border-[#990F32] hover:border-[#FFD166]/60 hover:bg-[#450720]'
              }`}
            >
              {/* Highlight ribbon for Chicken Mystery chapter */}
              {isSpecialChickenChapter && (
                <div className="absolute -right-12 top-4 rotate-45 bg-[#FFD166] text-[#650D32] font-black text-[9px] uppercase px-12 py-0.5 shadow-md">
                  ¡Juego estrella!
                </div>
              )}

              <div>
                {/* Header with time and status */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-[#FFD166] bg-black/30 px-2 py-0.5 rounded-md border border-white/10">
                    {chapter.timeLabel}
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[#FFD166] text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD166]" />
                      <span>Completado</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-white/50">Por explorar</span>
                  )}
                </div>

                {/* Title */}
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-2xl flex-shrink-0">{chapter.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#FFD166] transition-colors">
                      {chapter.titleEs}
                    </h3>
                    <p className="text-xs text-[#FFD166]/80 font-medium mt-0.5">
                      {chapter.titleHy}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-3">
                  {chapter.descriptionEs}
                </p>

                {/* Topics tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {chapter.topicsEs.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/90 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <TranslateButton
                  textEs={chapter.titleEs + '. ' + chapter.descriptionEs}
                  textHy={chapter.titleHy + '։ ' + chapter.descriptionHy}
                  label="Թարգմանել"
                />

                <div className="flex items-center gap-1.5">
                  {isSpecialChickenChapter && onPlayGameForChapter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                        onPlayGameForChapter(chapter.id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Gamepad2 className="w-3.5 h-3.5" />
                      <span>Jugar</span>
                    </button>
                  )}

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FFD166] group-hover:translate-x-1 transition-transform">
                    <span>Ver</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
