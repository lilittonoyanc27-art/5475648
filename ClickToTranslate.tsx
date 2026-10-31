import React, { useState } from 'react';
import { Volume2, Languages, X, Sparkles } from 'lucide-react';
import { soundManager } from './soundEffects.ts';

interface ClickToTranslateProps {
  textEs: string;
  textHy: string;
  className?: string;
  children?: React.ReactNode;
  badge?: boolean;
  inline?: boolean;
  wordBreakdown?: {
    word: string;
    translationHy: string;
    partOfSpeech?: string;
    exampleEs?: string;
    exampleHy?: string;
  }[];
}

export const ClickToTranslate: React.FC<ClickToTranslateProps> = ({
  textEs,
  textHy,
  className = '',
  children,
  badge = false,
  inline = false,
  wordBreakdown = []
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    setIsOpen(!isOpen);
  };

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.speakSpanish(textEs);
  };

  return (
    <>
      <span
        onClick={handleClick}
        className={`cursor-pointer group relative transition-all duration-200 select-none ${
          inline ? 'inline-flex items-center gap-1' : 'block'
        } ${className}`}
        title="Haz clic para ver la traducción al armenio (Սեղմիր թարգմանության համար)"
      >
        {children ? (
          children
        ) : (
          <span className="border-b border-dashed border-[#FFD166]/50 group-hover:border-[#FFD166] group-hover:text-[#FFD166] transition-colors">
            {textEs}
          </span>
        )}

        {badge && (
          <span className="inline-flex items-center ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/30 group-hover:bg-[#FFD166] group-hover:text-[#650D32] transition-colors">
            <Languages className="w-2.5 h-2.5 mr-0.5" />
            հայ
          </span>
        )}
      </span>

      {/* Translation Popup Modal / Card */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-[#2D0616] border-2 border-[#FFD166] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#FFD166]/20 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#FFD166]/10 text-[#FFD166]">
                  <Languages className="w-5 h-5" />
                </span>
                <span className="text-xs uppercase tracking-wider font-bold text-[#FFD166]">
                  Traducción interactiva • Ինտերակտիվ թարգմանություն
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1">
              {/* Spanish Block */}
              <div className="bg-[#650D32]/80 p-4 rounded-xl border border-[#990F32]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF922B]">
                      Español (Իսպաներեն)
                    </span>
                    <p className="text-lg font-semibold text-white mt-1 leading-snug">
                      {textEs}
                    </p>
                  </div>
                  <button
                    onClick={handlePronounce}
                    className="p-2 rounded-xl bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/80 transition-transform active:scale-95 shadow-md flex-shrink-0 cursor-pointer"
                    title="Escuchar pronunciación (Լսել արտասանությունը)"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Armenian Block */}
              <div className="bg-[#990F32]/60 p-4 rounded-xl border border-[#E63946]/50">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFD166] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#FFD166]" />
                  Հայերեն թարգմանություն (Armenio)
                </span>
                <p className="text-lg font-medium text-[#FFD166] mt-1 leading-relaxed">
                  {textHy}
                </p>
              </div>

              {/* Word Breakdown if present */}
              {wordBreakdown.length > 0 && (
                <div className="space-y-2 mt-2">
                  <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider">
                    Desglose de palabras • Բառերի մանրամասնում
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {wordBreakdown.map((w, idx) => (
                      <div 
                        key={idx} 
                        className="bg-black/30 p-2.5 rounded-lg border border-white/10 text-sm flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#FFD166]">{w.word}</span>
                          {w.partOfSpeech && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-white/70">
                              {w.partOfSpeech}
                            </span>
                          )}
                        </div>
                        <div className="text-white/90 text-sm font-medium">
                          {w.translationHy}
                        </div>
                        {w.exampleEs && (
                          <div className="text-xs text-white/60 mt-1 border-t border-white/5 pt-1">
                            <span className="italic">«{w.exampleEs}»</span>
                            {w.exampleHy && (
                              <span className="block text-[#FF922B]/80 font-normal">→ {w.exampleHy}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom info */}
            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>Haz clic fuera para cerrar • Սեղմիր դրսում փակելու համար</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-lg bg-[#FFD166] text-[#650D32] font-semibold text-xs hover:bg-[#FFD166]/90 cursor-pointer"
              >
                Entendido • Պարզ է
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const TranslateButton: React.FC<{
  textEs: string;
  textHy: string;
  label?: string;
  className?: string;
  wordBreakdown?: {
    word: string;
    translationHy: string;
    partOfSpeech?: string;
    exampleEs?: string;
    exampleHy?: string;
  }[];
}> = ({ textEs, textHy, label = 'Traducir', className = '', wordBreakdown = [] }) => {
  return (
    <ClickToTranslate
      textEs={textEs}
      textHy={textHy}
      wordBreakdown={wordBreakdown}
      inline
      className={className}
    >
      <button 
        type="button"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FFD166]/15 hover:bg-[#FFD166]/30 text-[#FFD166] border border-[#FFD166]/40 transition-all cursor-pointer shadow-xs active:scale-95"
      >
        <Languages className="w-3.5 h-3.5" />
        <span>{label}</span>
        <span className="text-[10px] opacity-75">(Հայ)</span>
      </button>
    </ClickToTranslate>
  );
};
