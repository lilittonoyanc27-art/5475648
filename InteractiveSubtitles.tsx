import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Languages, 
  Volume2, 
  Repeat, 
  Search, 
  Sparkles, 
  Play,
  CheckCircle,
  Eye,
  EyeOff,
  Filter,
  ArrowDown
} from 'lucide-react';
import { SubtitleLine, WordBreakdown } from './types.ts';
import { SUBTITLES_DATA } from './data.ts';
import { soundManager } from './soundEffects.ts';

interface InteractiveSubtitlesProps {
  currentTime: number;
  onSeek: (seconds: number) => void;
  onRepeatPhrase: (range: { start: number; end: number }) => void;
  customSubtitles?: SubtitleLine[];
}

export const InteractiveSubtitles: React.FC<InteractiveSubtitlesProps> = ({
  currentTime,
  onSeek,
  onRepeatPhrase,
  customSubtitles
}) => {
  const subtitles = customSubtitles && customSubtitles.length > 0 ? customSubtitles : SUBTITLES_DATA;
  const [mode, setMode] = useState<'frases' | 'palabras'>('frases');
  
  // Set of opened translation IDs for individual toggles
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [selectedWord, setSelectedWord] = useState<WordBreakdown | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState<'todos' | 'Natalia' | 'Presentador'>('todos');
  // Active line currently playing in the video
  const activeLineIndex = subtitles.findIndex(
    (line) => currentTime >= line.start - 0.5 && currentTime <= line.end + 0.5
  );
  const activeLine = activeLineIndex !== -1 ? subtitles[activeLineIndex] : subtitles[0];

  const toggleTranslation = (id: string) => {
    soundManager.playClick();
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    soundManager.playClick();
    const allExpanded: Record<string, boolean> = {};
    subtitles.forEach((s) => {
      allExpanded[s.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const handleCollapseAll = () => {
    soundManager.playClick();
    setExpandedIds({});
  };

  const handleWordClick = (word: WordBreakdown, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    setSelectedWord(word);
  };

  const filteredSubtitles = subtitles.filter((s) => {
    const matchesSearch =
      !searchQuery.trim() ||
      s.textEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.textHy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpeaker =
      speakerFilter === 'todos' ||
      (speakerFilter === 'Natalia' && s.speaker.toLowerCase().includes('natalia')) ||
      (speakerFilter === 'Presentador' && !s.speaker.toLowerCase().includes('natalia'));
    return matchesSearch && matchesSpeaker;
  });

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] p-4 sm:p-5 shadow-2xl space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#990F32]">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-gradient-to-br from-[#FFD166] to-[#FF922B] text-[#650D32] shadow-md">
            <FileText className="w-5 h-5 font-black" />
          </span>
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>Subtítulos del diálogo con traducción al armenio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E63946] text-white font-mono font-bold animate-pulse">
                EN VIVO
              </span>
            </h3>
            <p className="text-xs text-[#FFD166]/90 font-medium">
              Սեղմեք ցանկացած իսպաներեն տողի կամ բառի վրա հայերեն թարգմանությունը տեսնելու համար
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 bg-[#250311] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              soundManager.playClick();
              setMode('frases');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'frases'
                ? 'bg-[#FFD166] text-[#650D32] shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Modo frases (Ամբողջ նախադասություններ)
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setMode('palabras');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'palabras'
                ? 'bg-[#FF922B] text-[#250311] shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Modo palabras (Բառ առ բառ)
          </button>
        </div>
      </div>

      {/* Featured Current Playing Line Card */}
      {activeLine && (
        <div className="bg-gradient-to-r from-[#650D32] via-[#520927] to-[#38061B] border-2 border-[#FFD166] rounded-xl p-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs ${
                activeLine.speaker.toLowerCase().includes('natalia')
                  ? 'bg-[#FFD166] text-[#650D32]'
                  : 'bg-[#FF922B] text-white'
              }`}>
                <span>{activeLine.speaker.toLowerCase().includes('natalia') ? '⭐' : '🎙'}</span>
                <span>{activeLine.speaker}</span>
              </span>

              <span className="text-xs font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded">
                ⏱ {formatSeconds(activeLine.start)} – {formatSeconds(activeLine.end)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => soundManager.speakSpanish(activeLine.textEs)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFD166] transition-colors cursor-pointer"
                title="Լսել իսպաներեն արտասանությունը"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRepeatPhrase({ start: activeLine.start, end: activeLine.end })}
                className="px-2.5 py-1 rounded-lg bg-[#E63946] hover:bg-[#E63946]/90 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                title="Կրկնել այս հատվածը տեսանյութում"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Repetir frase</span>
              </button>
            </div>
          </div>

          {/* Current line content */}
          {mode === 'frases' ? (
            <div 
              onClick={() => toggleTranslation(activeLine.id)}
              className="cursor-pointer group py-1"
            >
              <p className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFD166] transition-colors leading-relaxed">
                «{activeLine.textEs}»
              </p>

              {/* Armenian translation toggle */}
              <div className="mt-3">
                {expandedIds[activeLine.id] ? (
                  <div className="p-3.5 rounded-xl bg-[#250311] border border-[#FFD166]/50 text-[#FFD166] font-medium text-base animate-in fade-in flex items-start gap-2 shadow-inner">
                    <Sparkles className="w-4 h-4 text-[#FFD166] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-base sm:text-lg text-[#FFD166]">{activeLine.textHy}</p>
                      <span className="text-[11px] text-white/60 block mt-1">
                        Հայերեն թարգմանություն (Սեղմեք կրկին փակելու համար)
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTranslation(activeLine.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#FFD166] font-bold transition-all cursor-pointer bg-[#250311] hover:bg-[#FFD166] hover:text-[#650D32] px-3 py-1.5 rounded-lg border border-[#FFD166]/40 shadow-sm"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>Տեսնել հայերեն թարգմանությունը (Ver traducción armenia)</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Modo Palabras: Clickable individual words */
            <div className="py-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {activeLine.words && activeLine.words.length > 0 ? (
                  activeLine.words.map((w, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => handleWordClick(w, e)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                        selectedWord?.cleanWord === w.cleanWord
                          ? 'bg-[#FFD166] text-[#650D32] border-[#FFD166] shadow-md scale-105'
                          : 'bg-[#250311] text-white border-white/20 hover:border-[#FFD166] hover:text-[#FFD166]'
                      }`}
                    >
                      {w.word}
                    </button>
                  ))
                ) : (
                  activeLine.textEs.split(' ').map((chunk, i) => (
                    <span key={i} className="text-base font-semibold text-white px-1">
                      {chunk}
                    </span>
                  ))
                )}
              </div>

              {selectedWord && (
                <div className="p-3.5 rounded-xl bg-[#250311] border border-[#FF922B] text-left animate-in fade-in space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#FFD166]">
                        {selectedWord.word}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-white/80 font-medium">
                        {selectedWord.partOfSpeech}
                      </span>
                    </div>
                    <button
                      onClick={() => soundManager.speakSpanish(selectedWord.word)}
                      className="p-1 rounded bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-base font-bold text-white bg-black/30 p-2.5 rounded-lg border border-white/5">
                    Հայերեն թարգմանություն: <span className="text-[#FFD166]">{selectedWord.translationHy}</span>
                  </div>

                  {selectedWord.exampleEs && (
                    <div className="text-xs text-white/70 bg-white/5 p-2 rounded-lg">
                      <p className="font-medium text-white italic">«{selectedWord.exampleEs}»</p>
                      <p className="text-[#FF922B] mt-0.5">→ {selectedWord.exampleHy}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Control bar for the full transcript */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 bg-[#250311] p-3 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-white/50 shrink-0" />
          <input
            type="text"
            placeholder="Փնտրել իսպաներեն կամ հայերեն տեքստում (Buscar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-transparent text-white placeholder-white/40 focus:outline-hidden"
          />
        </div>

        {/* Filter by speaker */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundManager.playClick();
              setSpeakerFilter('todos');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
              speakerFilter === 'todos' ? 'bg-[#FFD166] text-[#650D32]' : 'text-white/60 hover:text-white'
            }`}
          >
            Բոլորը ({subtitles.length})
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setSpeakerFilter('Natalia');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
              speakerFilter === 'Natalia' ? 'bg-[#FFD166] text-[#650D32]' : 'text-white/60 hover:text-white'
            }`}
          >
            Նատալիա
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setSpeakerFilter('Presentador');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
              speakerFilter === 'Presentador' ? 'bg-[#FFD166] text-[#650D32]' : 'text-white/60 hover:text-white'
            }`}
          >
            Կալա
          </button>
        </div>

        {/* Action buttons: Expand all / Collapse all translations */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExpandAll}
            className="px-2.5 py-1 rounded-lg bg-[#650D32] hover:bg-[#990F32] text-xs font-bold text-[#FFD166] border border-[#FFD166]/30 flex items-center gap-1 cursor-pointer transition-colors"
            title="Բացել բոլոր թարգմանությունները միանգամից"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Բացել բոլորը</span>
          </button>
          <button
            onClick={handleCollapseAll}
            className="px-2.5 py-1 rounded-lg bg-[#650D32] hover:bg-[#990F32] text-xs font-bold text-white/70 border border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
            title="Փակել բոլոր թարգմանությունները"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Փակել</span>
          </button>
        </div>
      </div>

      {/* ================= COMPLETE SUBTITLE TRANSCRIPT LIST ================= */}
      {/* Displaying every single segment directly below the video */}
      <div 
        className="space-y-3 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin divide-y divide-white/5"
      >
        {filteredSubtitles.map((line) => {
          const isCurrent = activeLine?.id === line.id;
          const isExpanded = !!expandedIds[line.id];
          const isNatalia = line.speaker.toLowerCase().includes('natalia');

          return (
            <div
              key={line.id}
              className={`p-3.5 rounded-xl border transition-all text-left pt-3.5 ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#650D32] to-[#4a0824] border-[#FFD166] shadow-lg ring-1 ring-[#FFD166]'
                  : 'bg-[#250311]/80 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Row header: Speaker, Timestamp and Action buttons */}
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                    isNatalia ? 'bg-[#FFD166] text-[#650D32]' : 'bg-[#FF922B] text-white'
                  }`}>
                    {isNatalia ? '⭐ Natalia Oreiro' : '🎙 Ismael Cala'}
                  </span>

                  <span className="font-mono text-white/60 text-[11px] bg-black/30 px-2 py-0.5 rounded">
                    ⏱ {formatSeconds(line.start)}
                  </span>

                  {isCurrent && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E63946] text-white animate-pulse">
                      ՀԻՄԱ ԵԹԵՐՈՒՄ
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => soundManager.speakSpanish(line.textEs)}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-[#FFD166] transition-colors cursor-pointer"
                    title="Լսել արտասանությունը"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSeek(line.start)}
                    className="px-2.5 py-1 rounded bg-[#650D32] hover:bg-[#E63946] text-[#FFD166] hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer border border-[#FFD166]/20"
                    title="Սկսել դիտել այս վայրկյանից"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Saltar ▶</span>
                  </button>
                </div>
              </div>

              {/* Spanish subtitle line: Clicking anywhere toggles the Armenian translation */}
              <div
                onClick={() => toggleTranslation(line.id)}
                className="cursor-pointer group"
              >
                <p className={`text-sm sm:text-base font-semibold transition-colors leading-relaxed ${
                  isCurrent ? 'text-white font-bold' : 'text-white/90 group-hover:text-[#FFD166]'
                }`}>
                  «{line.textEs}»
                </p>

                {/* Clickable prompt hint */}
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-[#FFD166]/80 group-hover:text-[#FFD166] flex items-center gap-1">
                    <Languages className="w-3 h-3" />
                    <span>{isExpanded ? 'Փակել թարգմանությունը' : 'Սեղմել հայերեն թարգմանության համար (Ver traducción)'}</span>
                  </span>
                </div>
              </div>

              {/* Armenian translation content (unfolded on click) */}
              {isExpanded && (
                <div className="mt-2.5 p-3 rounded-lg bg-[#1a020b] border border-[#FFD166]/40 text-[#FFD166] text-sm font-medium animate-in fade-in duration-150 space-y-1 shadow-inner">
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">🇦🇲</span>
                    <p className="font-semibold text-sm sm:text-base text-[#FFD166] leading-relaxed">
                      {line.textHy}
                    </p>
                  </div>

                  {line.words && line.words.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-white/10 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold mr-1">
                        Բառարան:
                      </span>
                      {line.words.map((w, wIdx) => (
                        <button
                          key={wIdx}
                          onClick={() => {
                            soundManager.speakSpanish(w.word);
                          }}
                          className="text-[11px] bg-white/10 hover:bg-[#FFD166] hover:text-[#650D32] text-white px-2 py-0.5 rounded-md transition-colors font-medium cursor-pointer"
                          title={`${w.word} = ${w.translationHy}`}
                        >
                          <span className="font-bold">{w.word}</span>: {w.translationHy}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
