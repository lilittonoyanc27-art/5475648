import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Flame, 
  Gem, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Volume2
} from 'lucide-react';
import { INITIAL_ACHIEVEMENTS, EXPRESSIONS_DATA } from './data.ts';
import { UserProgress } from './types.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface AchievementsViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  progress,
  onResetProgress
}) => {
  const [activeTab, setActiveTab] = useState<'trophies' | 'expressions'>('trophies');
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] p-5 shadow-xl space-y-6 text-left">
      {/* Top Banner Stats */}
      <div className="bg-gradient-to-r from-[#650D32] via-[#990F32] to-[#FF922B]/20 p-6 rounded-2xl border-2 border-[#FFD166] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-[#FF922B] tracking-wider">
            Tablero de Honor • Փառքի տախտակ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Mis Logros y Progreso
          </h2>
          <p className="text-xs text-[#FFD166] mt-1 font-medium">
            «Իմ նվաճումները և առաջընթացը իսպաներենի ուսուցման մեջ»
          </p>
        </div>

        {/* Big Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-black/40 p-3 rounded-xl border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-[#FFD166]">
              <Gem className="w-4 h-4 fill-current" />
              <span className="font-mono text-xl font-black">{progress.points}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-white/60 block mt-0.5">
              Puntos (Միավորներ)
            </span>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-[#FF922B]">
              <Flame className="w-4 h-4 fill-current" />
              <span className="font-mono text-xl font-black">{progress.streak}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-white/60 block mt-0.5">
              Racha (Շարք)
            </span>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-300">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-mono text-xl font-black">{progress.stars}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-white/60 block mt-0.5">
              Estrellas (Աստղեր)
            </span>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              <Trophy className="w-4 h-4 fill-current" />
              <span className="font-mono text-xl font-black">{progress.achievements.length}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-white/60 block mt-0.5">
              Trofeos (Գավաթներ)
            </span>
          </div>
        </div>
      </div>

      {/* Sub tabs: Trophies vs Expressions Dictionary */}
      <div className="flex items-center gap-2 border-b border-[#990F32] pb-2">
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('trophies');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'trophies'
              ? 'bg-[#FFD166] text-[#650D32] shadow-md'
              : 'text-white/70 hover:text-white bg-[#250311]'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Trofeos y Recompensas</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('expressions');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'expressions'
              ? 'bg-[#FF922B] text-[#250311] shadow-md'
              : 'text-white/70 hover:text-white bg-[#250311]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Diccionario de Expresiones</span>
        </button>
      </div>

      {/* TAB 1: TROPHIES */}
      {activeTab === 'trophies' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = progress.achievements.includes(ach.id) || ach.unlocked;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-[#650D32] to-[#450720] border-[#FFD166] shadow-lg shadow-yellow-500/10'
                    : 'bg-[#250311]/60 border-white/10 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{ach.icon}</span>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#FFD166]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Desbloqueado</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Bloqueado</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">
                    {ach.titleEs}
                  </h3>
                  <p className="text-xs text-[#FFD166] font-semibold mt-0.5">
                    {ach.titleHy}
                  </p>

                  <p className="text-xs text-white/70 mt-2 leading-relaxed">
                    {ach.descriptionEs}
                  </p>
                  <p className="text-[11px] text-[#FF922B]/90 mt-0.5">
                    {ach.descriptionHy}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-end">
                  <TranslateButton
                    textEs={ach.titleEs + ': ' + ach.descriptionEs}
                    textHy={ach.titleHy + '՝ ' + ach.descriptionHy}
                    label="Թարգմանել"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: EXPRESSIONS DICTIONARY */}
      {activeTab === 'expressions' && (
        <div className="space-y-3">
          <div className="p-3 bg-[#250311] rounded-xl border border-white/10 text-xs text-white/80">
            📖 8 expresiones idiomáticas clave de la entrevista explicadas con su significado literal y contexto en armenio.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {EXPRESSIONS_DATA.map((exp) => (
              <div
                key={exp.id}
                className="p-4 bg-[#250311] rounded-2xl border border-white/10 hover:border-[#FFD166]/50 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#FF922B]">
                      Expresión #{exp.id}
                    </span>
                    <h3 className="text-lg font-black text-white mt-0.5">
                      «{exp.phraseEs}»
                    </h3>
                    <p className="text-xs font-semibold text-[#FFD166] mt-0.5">
                      {exp.phraseHy}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => soundManager.speakSpanish(exp.phraseEs)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFD166] cursor-pointer"
                      title="Escuchar"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <TranslateButton
                      textEs={exp.phraseEs + ': ' + exp.usageContextEs}
                      textHy={exp.phraseHy + '։ ' + exp.usageContextHy}
                      label="Թարգմանել"
                    />
                  </div>
                </div>

                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-xs">
                  <p className="text-white/70">
                    <span className="font-bold text-white">Significado literal:</span> {exp.literalHy}
                  </p>
                  <p className="text-white/80">
                    <span className="font-bold text-white">Uso:</span> {exp.usageContextEs}
                  </p>
                  <p className="text-[#FF922B]">
                    <span className="font-bold">Համատեքստ:</span> {exp.usageContextHy}
                  </p>
                </div>

                <div className="p-2.5 bg-white/5 rounded-xl text-xs space-y-0.5">
                  <p className="font-medium text-white italic">«{exp.exampleEs}»</p>
                  <p className="text-[#FFD166]">→ {exp.exampleHy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset Progress Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
        <span>Tus datos se guardan automáticamente en tu dispositivo</span>

        {confirmReset ? (
          <div className="flex items-center gap-2">
            <span className="text-[#E63946] font-bold">¿Seguro que deseas reiniciar?</span>
            <button
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
              className="px-2.5 py-1 rounded bg-[#E63946] text-white font-bold cursor-pointer"
            >
              Sí, reiniciar
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="px-2.5 py-1 rounded bg-white/10 text-white cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="flex items-center gap-1 text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar progreso</span>
          </button>
        )}
      </div>
    </div>
  );
};
