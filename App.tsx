import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Gamepad2, 
  Brain, 
  MessageSquare, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Flame, 
  Star, 
  Gem,
  Languages,
  ArrowLeft,
  Tv,
  ChevronRight
} from 'lucide-react';
import { GameTab, UserProgress, Chapter } from './types.ts';
import { CHAPTERS_DATA, DEFAULT_START_TIME } from './data.ts';
import { soundManager } from './soundEffects.ts';
import { VideoPlayer } from './VideoPlayer.tsx';
import { InteractiveSubtitles } from './InteractiveSubtitles.tsx';
import { ChapterSelector } from './ChapterSelector.tsx';
import { GamesHub } from './GamesHub.tsx';
import { ChickenMysteryGame } from './ChickenMysteryGame.tsx';
import { TrueFalseGame } from './TrueFalseGame.tsx';
import { WhoSaidItGame } from './WhoSaidItGame.tsx';
import { FillBlankGame } from './FillBlankGame.tsx';
import { SentenceOrderGame } from './SentenceOrderGame.tsx';
import { InterviewSimGame } from './InterviewSimGame.tsx';
import { ChooseResponseGame } from './ChooseResponseGame.tsx';
import { WhatIfGame } from './WhatIfGame.tsx';
import { PasapalabraGame } from './PasapalabraGame.tsx';
import { GrammarDetectiveGame } from './GrammarDetectiveGame.tsx';
import { LuckyWheelGame } from './LuckyWheelGame.tsx';
import { ListenRespondGame } from './ListenRespondGame.tsx';
import { GrandContestGame } from './GrandContestGame.tsx';
import { AchievementsView } from './AchievementsView.tsx';
import { ClickToTranslate, TranslateButton } from './ClickToTranslate.tsx';

const LOCAL_STORAGE_KEY = 'natalia_oreiro_spanish_progress_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<GameTab>('video');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Video State
  const [currentTime, setCurrentTime] = useState<number>(DEFAULT_START_TIME);
  const [currentChapterId, setCurrentChapterId] = useState<number>(2);
  const [repeatPhraseRange, setRepeatPhraseRange] = useState<{ start: number; end: number } | null>(null);

  // User Progress with localStorage persistence
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      points: 50,
      streak: 1,
      stars: 1,
      completedChapters: [],
      completedGames: [],
      achievements: ['first_step'],
      savedWords: [],
      lastActiveDate: new Date().toISOString()
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  // Determine current chapter by currentTime
  useEffect(() => {
    const ch = CHAPTERS_DATA.find((c) => currentTime >= c.start && currentTime <= c.end);
    if (ch && ch.id !== currentChapterId) {
      setCurrentChapterId(ch.id);
    }
  }, [currentTime, currentChapterId]);

  const addPoints = (pts: number) => {
    setProgress((prev) => {
      const newPts = prev.points + pts;
      const newStars = Math.floor(newPts / 100);
      return {
        ...prev,
        points: newPts,
        stars: Math.max(prev.stars, newStars),
        streak: prev.streak + 1
      };
    });
  };

  const markGameCompleted = (gameId: string) => {
    setProgress((prev) => {
      const existing = prev.completedGames || [];
      const updatedGames = existing.includes(gameId) ? existing : [...existing, gameId];
      const ach = [...prev.achievements];

      if (gameId === 'chicken_mystery' && !ach.includes('chicken_master')) {
        ach.push('chicken_master');
      }
      if (gameId === 'true_false' && !ach.includes('true_detective')) {
        ach.push('true_detective');
      }
      if (gameId === 'pasapalabra' && !ach.includes('pasapalabra_hero')) {
        ach.push('pasapalabra_hero');
      }
      if (gameId === 'grammar_detective' && !ach.includes('grammarian')) {
        ach.push('grammarian');
      }
      if (gameId === 'grand_contest' && !ach.includes('grand_contest_star')) {
        ach.push('grand_contest_star');
      }

      return {
        ...prev,
        completedGames: updatedGames,
        achievements: ach,
        points: prev.points + 50
      };
    });
  };

  const handleSeekVideo = (seconds: number) => {
    setCurrentTime(seconds);
    setActiveTab('video');
  };

  const handleSelectChapter = (chapter: Chapter) => {
    setCurrentChapterId(chapter.id);
    setCurrentTime(chapter.start);
    setActiveTab('video');
    setRepeatPhraseRange(null);
  };

  const handleRepeatPhrase = (range: { start: number; end: number }) => {
    setRepeatPhraseRange(range);
    setCurrentTime(range.start);
    setActiveTab('video');
  };

  const toggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
  };

  const resetAllProgress = () => {
    const fresh: UserProgress = {
      points: 0,
      streak: 0,
      stars: 0,
      completedChapters: [],
      completedGames: [],
      achievements: [],
      savedWords: [],
      lastActiveDate: new Date().toISOString()
    };
    setProgress(fresh);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Quick navigation categories
  const mainNavTabs = [
    {
      id: 'video' as GameTab,
      labelEs: 'VER LA ENTREVISTA',
      labelHy: 'ԴԻՏԵԼ ՀԱՐՑԱԶՐՈՒՅՑԸ',
      icon: Play
    },
    {
      id: 'games_hub' as GameTab,
      labelEs: 'JUGAR',
      labelHy: 'ԽԱՂԱԼ',
      icon: Gamepad2
    },
    {
      id: 'grand_contest' as GameTab,
      labelEs: 'PONTE A PRUEBA',
      labelHy: 'ՍՏՈՒԳԻ՛Ր ՔԵԶ',
      icon: Brain
    },
    {
      id: 'interview' as GameTab,
      labelEs: 'APRENDE EXPRESIONES',
      labelHy: 'ՍՈՎՈՐԻ՛Ր ԱՐՏԱՀԱՅՏՈՒԹՅՈՒՆՆԵՐ',
      icon: MessageSquare
    },
    {
      id: 'achievements' as GameTab,
      labelEs: 'MIS LOGROS',
      labelHy: 'ԻՄ ՆՎԱՃՈՒՄՆԵՐԸ',
      icon: Trophy
    }
  ];

  return (
    <div className="min-h-screen bg-[#650D32] text-white flex flex-col font-['Montserrat',sans-serif] selection:bg-[#FFD166] selection:text-[#650D32]">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-[#250311]/95 backdrop-blur-md border-b-2 border-[#990F32] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo and Titles */}
          <div 
            onClick={() => {
              soundManager.playClick();
              setActiveTab('video');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FFD166] via-[#FF922B] to-[#E63946] flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform">
              ✨
            </div>
            <div>
              <h1 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-black tracking-wider text-[#FFD166] group-hover:text-white transition-colors">
                NATALIA OREIRO
              </h1>
              <p className="text-[11px] sm:text-xs font-semibold text-white/90">
                ¡Aprende español con historias reales!
              </p>
            </div>
          </div>

          {/* Points, Streaks, & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Gamification badges */}
            <div className="flex items-center gap-2 bg-[#38061B] px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold">
              <span className="flex items-center gap-1 text-[#FFD166]">
                <Gem className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono">{progress.points}</span>
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="items-center gap-1 text-[#FF922B] hidden sm:flex">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono">{progress.streak}</span>
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-yellow-300">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono">{progress.stars}</span>
              </span>
            </div>

            {/* Armenian Translation Badge Info */}
            <div 
              className="hidden md:flex items-center gap-1.5 bg-[#FFD166]/10 text-[#FFD166] border border-[#FFD166]/30 px-2.5 py-1 rounded-xl text-[11px] font-semibold"
              title="Սեղմիր ցանկացած իսպաներեն տեքստի վրա թարգմանության համար"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>Սեղմիր թարգմանության համար</span>
            </div>

            {/* Sound toggle button */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-[#38061B] hover:bg-[#990F32] border border-white/10 text-[#FFD166] transition-colors cursor-pointer"
              title={soundEnabled ? 'Sonido activado (Ձայնը միացված է)' : 'Sonido desactivado'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#E63946]" />}
            </button>
          </div>
        </div>

        {/* 5 Primary Navigation Buttons Requested */}
        <div className="bg-[#1A030E] border-t border-white/5 px-2 overflow-x-auto">
          <nav className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-1 py-1.5">
            {mainNavTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl font-black text-xs tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] shadow-md scale-102'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 fill-current" />
                  <span>{tab.labelEs}</span>
                  <span className={`text-[10px] font-medium opacity-80 ml-0.5 ${isActive ? 'text-[#650D32]' : 'text-[#FFD166]'}`}>
                    ({tab.labelHy})
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 space-y-6">
        {/* Back to video bar if inside a subgame */}
        {activeTab !== 'video' && activeTab !== 'games_hub' && (
          <div className="flex items-center justify-between bg-[#250311] px-4 py-2 rounded-xl border border-white/10">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('games_hub');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD166] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a todos los juegos (Բոլոր խաղերը)</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('video');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-[#FFD166] transition-colors cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Ir al reproductor de video</span>
            </button>
          </div>
        )}

        {/* ================= SECTION 1: VER LA ENTREVISTA ================= */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            {/* Video Player + Subtitles Dual Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Player & Subtitles */}
              <div className="lg:col-span-8 space-y-4">
                <VideoPlayer
                  currentTime={currentTime}
                  onTimeUpdate={setCurrentTime}
                  repeatPhraseRange={repeatPhraseRange}
                  onClearRepeat={() => setRepeatPhraseRange(null)}
                />

                <InteractiveSubtitles
                  currentTime={currentTime}
                  onSeek={handleSeekVideo}
                  onRepeatPhrase={handleRepeatPhrase}
                />
              </div>

              {/* Right Column: Quick Chapter Nav & Mini Game Launcher */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#38061B] p-4 rounded-2xl border-2 border-[#990F32] shadow-xl text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-[#990F32] pb-2">
                    <span className="font-bold text-sm text-[#FFD166] flex items-center gap-1.5">
                      <span>🎬</span>
                      <span>Capítulo actual</span>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#650D32] border border-white/10 text-white font-mono">
                      #{currentChapterId}
                    </span>
                  </div>

                  {(() => {
                    const ch = CHAPTERS_DATA.find((c) => c.id === currentChapterId) || CHAPTERS_DATA[0];
                    return (
                      <div className="space-y-2">
                        <h4 className="font-bold text-white text-base">
                          {ch.titleEs}
                        </h4>
                        <p className="text-xs text-[#FFD166]">
                          {ch.titleHy}
                        </p>
                        <p className="text-xs text-white/80 line-clamp-3">
                          {ch.descriptionEs}
                        </p>

                        <div className="pt-2 flex flex-wrap gap-1.5">
                          <TranslateButton
                            textEs={ch.titleEs + '. ' + ch.descriptionEs}
                            textHy={ch.titleHy + '։ ' + ch.descriptionHy}
                            label="Թարգմանել"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Featured Chicken Mystery Banner */}
                <div 
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('chicken_mystery');
                  }}
                  className="bg-gradient-to-br from-[#650D32] via-[#990F32] to-[#FF922B]/30 p-5 rounded-2xl border-2 border-[#FFD166] shadow-xl cursor-pointer hover:scale-102 transition-all text-left relative overflow-hidden group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl group-hover:rotate-12 transition-transform">🍗</span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#FFD166] tracking-wider block">
                        Juego Especial • Capítulo 4
                      </span>
                      <h3 className="text-lg font-black text-white group-hover:text-[#FFD166] transition-colors leading-snug">
                        ¿Dónde está el dinero?
                      </h3>
                      <p className="text-xs text-[#FFD166] mt-0.5">
                        «Սառեցված հավի առեղծվածը խոհանոցում»
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FFD166]">
                    <span>4 Niveles interactivos</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>JUGAR</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Quick Shortcuts to games */}
                <div className="bg-[#250311] p-4 rounded-2xl border border-white/10 text-left space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">
                    Más juegos del capítulo:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('true_false')}
                      className="p-2.5 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white border border-white/10 text-left cursor-pointer"
                    >
                      ❓ Verdadero/Falso
                    </button>
                    <button
                      onClick={() => setActiveTab('who_said')}
                      className="p-2.5 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white border border-white/10 text-left cursor-pointer"
                    >
                      🎙️ ¿Quién dijo eso?
                    </button>
                    <button
                      onClick={() => setActiveTab('wheel')}
                      className="p-2.5 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white border border-white/10 text-left cursor-pointer"
                    >
                      🎡 Rueda mágica
                    </button>
                    <button
                      onClick={() => setActiveTab('pasapalabra')}
                      className="p-2.5 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white border border-white/10 text-left cursor-pointer"
                    >
                      🔤 Pasapalabra A-Z
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 7 Chapters Grid Component */}
            <div className="pt-4">
              <ChapterSelector
                currentChapterId={currentChapterId}
                completedChapters={progress.completedChapters}
                onSelectChapter={handleSelectChapter}
                onPlayGameForChapter={() => setActiveTab('chicken_mystery')}
              />
            </div>
          </div>
        )}

        {/* ================= SECTION 2: JUGAR (GAMES HUB) ================= */}
        {activeTab === 'games_hub' && (
          <GamesHub
            onSelectGame={(tab) => setActiveTab(tab)}
            completedGames={progress.completedGames}
          />
        )}

        {/* Specific Mini-Games */}
        {activeTab === 'chicken_mystery' && (
          <ChickenMysteryGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
            onSeekVideo={handleSeekVideo}
          />
        )}

        {activeTab === 'true_false' && (
          <TrueFalseGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
            onSeekVideo={handleSeekVideo}
          />
        )}

        {activeTab === 'who_said' && (
          <WhoSaidItGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'fill_blank' && (
          <FillBlankGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'order_words' && (
          <SentenceOrderGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewSimGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
            onSeekVideo={handleSeekVideo}
          />
        )}

        {activeTab === 'choose_reply' && (
          <ChooseResponseGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'what_if' && (
          <WhatIfGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'pasapalabra' && (
          <PasapalabraGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'grammar_detective' && (
          <GrammarDetectiveGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'wheel' && (
          <LuckyWheelGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'listen_respond' && (
          <ListenRespondGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
            onSeekVideo={handleSeekVideo}
          />
        )}

        {activeTab === 'grand_contest' && (
          <GrandContestGame
            onAddPoints={addPoints}
            onCompleteGame={markGameCompleted}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsView
            progress={progress}
            onResetProgress={resetAllProgress}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#1A030E] border-t border-[#990F32] py-6 px-4 text-center text-xs text-white/60 space-y-2">
        <p className="font-bold text-[#FFD166]">
          NATALIA OREIRO — APRENDE ESPAÑOL JUGANDO
        </p>
        <p className="text-[11px] text-white/50 max-w-xl mx-auto">
          Basado en la entrevista de Natalia Oreiro en CNN en Español con Ismael Cala. Subtítulos reales, traducciones al armenio y actividades interactivas para dominar el español rioplatense.
        </p>
        <p className="text-[10px] text-white/40">
          Կրթական ինտերակտիվ խաղ իսպաներեն սովորելու համար • Բոլոր իրավունքները պաշտպանված են
        </p>
      </footer>
    </div>
  );
}
