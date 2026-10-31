import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface LuckyWheelGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
}

const SECTORS = [
  { label: '¿Qué pasó?', color: '#650D32', textCol: '#FFD166' },
  { label: 'Traduce', color: '#990F32', textCol: '#FFFFFF' },
  { label: 'Completa', color: '#E63946', textCol: '#FFFFFF' },
  { label: 'Verdadero o falso', color: '#FF922B', textCol: '#250311' },
  { label: 'Pregunta sorpresa', color: '#FFD166', textCol: '#650D32' },
  { label: 'Encuentra el error', color: '#650D32', textCol: '#FFD166' },
  { label: 'Ordena la frase', color: '#990F32', textCol: '#FFFFFF' },
  { label: 'Desafío vocabulario', color: '#FF922B', textCol: '#250311' },
];

export const LuckyWheelGame: React.FC<LuckyWheelGameProps> = ({
  onAddPoints,
  onCompleteGame
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<{
    promptEs: string;
    promptHy: string;
    options: { textEs: string; textHy: string; isCorrect: boolean }[];
    explanationEs: string;
    explanationHy: string;
  } | null>(null);

  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;
    soundManager.playClick();
    setIsSpinning(true);
    setActiveSector(null);
    setActiveTask(null);
    setSelectedOpt(null);
    setIsAnswered(false);

    // Random spin angle: multiple 360 loops + random offset
    const randomSectorIdx = Math.floor(Math.random() * SECTORS.length);
    const sectorAngle = 360 / SECTORS.length;
    const targetAngle = 360 * 5 + (SECTORS.length - 1 - randomSectorIdx) * sectorAngle + sectorAngle / 2;

    const newRotation = rotation + targetAngle;
    setRotation(newRotation);

    // Play tick sounds during spin
    let tickCount = 0;
    const interval = setInterval(() => {
      soundManager.playWheelTick();
      tickCount++;
      if (tickCount > 15) clearInterval(interval);
    }, 180);

    setTimeout(() => {
      setIsSpinning(false);
      const chosen = SECTORS[randomSectorIdx].label;
      setActiveSector(chosen);
      soundManager.playCorrect();
      generateTaskForSector(chosen);
      setSpinCount((prev) => {
        const next = prev + 1;
        if (next >= 5) onCompleteGame('wheel');
        return next;
      });
    }, 3600);
  };

  const generateTaskForSector = (sector: string) => {
    switch (sector) {
      case 'Traduce':
        setActiveTask({
          promptEs: '¿Cómo se traduce al armenio «El silencio dice más que mil palabras»?',
          promptHy: 'Ինչպե՞ս է հայերեն թարգմանվում «El silencio dice más que mil palabras» արտահայտությունը։',
          options: [
            { textEs: 'Լռությունը շատ ավելին է ասում, քան հազարավոր բառերը։', textHy: 'Traducción exacta y poética.', isCorrect: true },
            { textEs: 'Լռությունը վտանգավոր է գիշերը։', textHy: 'Սխալ իմաստ։', isCorrect: false },
            { textEs: 'Խոսելը հազար անգամ ավելի լավ է։', textHy: 'Հակառակ իմաստ։', isCorrect: false }
          ],
          explanationEs: '«Silencio» es լռություն y «dice más que mil palabras» es շատ ավելին է ասում, քան հազար բառերը։',
          explanationHy: 'Լռությունը կարող է ավելի շատ բան ասել, քան հազարավոր բառերը։'
        });
        break;
      case 'Completa':
        setActiveTask({
          promptEs: 'Completa: «Abro el congelador y veo una bolsa de ________».',
          promptHy: 'Լրացրո՛ւ․ «Բացում եմ սառցախցիկն ու տեսնում ________-ի տոպրակ»։',
          options: [
            { textEs: 'patitas de pollo', textHy: 'հավի ոտքեր', isCorrect: true },
            { textEs: 'manzanas rojas', textHy: 'կարմիր խնձորներ', isCorrect: false },
            { textEs: 'botellas de leche', textHy: 'կաթի շշեր', isCorrect: false }
          ],
          explanationEs: 'Natalia vio patitas de pollo congeladas con dinero adentro.',
          explanationHy: 'Նատալիան տեսավ հավի ոտքերի տոպրակը։'
        });
        break;
      case 'Verdadero o falso':
        setActiveTask({
          promptEs: '¿Verdadero o Falso?: «Natalia sabía desde el principio que el pollo tenía dinero».',
          promptHy: 'Ճի՞շտ է, թե՞ սխալ․ «Նատալիան ի սկզբանե գիտեր, որ հավի մեջ գումար կա»։',
          options: [
            { textEs: 'Falso (Սխալ է)', textHy: 'Ella no tenía idea de que había dólares dentro.', isCorrect: true },
            { textEs: 'Verdadero (Ճիշտ է)', textHy: 'Incorrecto.', isCorrect: false }
          ],
          explanationEs: 'Falso. Su pareja escondió el dinero sin decirle nada.',
          explanationHy: 'Սխալ է։ Նրա զուգընկերն էր թաքցրել առանց նրան ասելու։'
        });
        break;
      case 'Encuentra el error':
        setActiveTask({
          promptEs: '¿Dónde está el error?: «Yo tiene mi casa en Uruguay».',
          promptHy: 'Որտե՞ղ է սխալը․ «Yo tiene mi casa en Uruguay»։',
          options: [
            { textEs: 'Tiene → debe ser «tengo»', textHy: 'Tiene-ի փոխարեն պետք է լինի «tengo»', isCorrect: true },
            { textEs: 'Uruguay → debe ser España', textHy: 'Սխալ ուղղում', isCorrect: false },
            { textEs: 'Casa → debe ser casas', textHy: 'Սխալ ուղղում', isCorrect: false }
          ],
          explanationEs: 'La primera persona de tener es «yo tengo».',
          explanationHy: 'Tener բայի առաջին դեմքը «tengo»-ն է։'
        });
        break;
      default:
        setActiveTask({
          promptEs: 'Pregunta estrella: ¿Cuánto dinero rescataron de la basura?',
          promptHy: 'Աստղային հարց․ Որքա՞ն գումար փրկեցին աղբից։',
          options: [
            { textEs: 'Entre 3.000 y 4.000 dólares', textHy: '3.000-ից 4.000 դոլար', isCorrect: true },
            { textEs: 'Cincuenta euros', textHy: '50 եվրո', isCorrect: false },
            { textEs: 'Diez pesos', textHy: '10 պեսո', isCorrect: false }
          ],
          explanationEs: 'Eran entre 3.000 y 4.000 dólares guardados.',
          explanationHy: 'Պահված էր 3000-ից 4000 դոլար։'
        });
        break;
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOpt(idx);
  };

  const handleConfirmTask = () => {
    if (selectedOpt === null || !activeTask || isAnswered) return;
    soundManager.playClick();
    setIsAnswered(true);

    if (activeTask.options[selectedOpt].isCorrect) {
      soundManager.playCorrect();
      confetti({ particleCount: 60, spread: 70 });
      onAddPoints(20);
    } else {
      soundManager.playWrong();
    }
  };

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] p-5 shadow-xl space-y-6 text-left">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#990F32]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>LA RUEDA DE LA SUERTE</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
              Gira y Gana
            </span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Gira la ruleta mágica y responde al desafío sorpresa de Natalia Oreiro
          </p>
        </div>

        <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#FFD166]">
          Tiradas: {spinCount}
        </div>
      </div>

      {/* Wheel Stage */}
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#2F0619] to-[#1A030E] rounded-2xl border-2 border-[#FFD166] relative overflow-hidden">
        {/* Indicator arrow */}
        <div className="absolute top-2 z-20 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-[#FFD166] drop-shadow-md" />
        </div>

        {/* SVG Wheel */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
          }}
          className="w-64 h-64 sm:w-80 sm:h-80 rounded-full shadow-2xl relative border-4 border-[#FFD166]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {SECTORS.map((sector, idx) => {
              const count = SECTORS.length;
              const angle = 360 / count;
              const startAngle = idx * angle;
              const endAngle = startAngle + angle;

              // Arc path coordinates
              const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

              const textAngle = startAngle + angle / 2;
              const tx = 50 + 32 * Math.cos((Math.PI * (textAngle - 90)) / 180);
              const ty = 50 + 32 * Math.sin((Math.PI * (textAngle - 90)) / 180);

              return (
                <g key={idx}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                    fill={sector.color}
                    stroke="#FFD166"
                    strokeWidth="0.8"
                  />
                  <text
                    x={tx}
                    y={ty}
                    fill={sector.textCol}
                    fontSize="3.2"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                  >
                    {sector.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Center Hub */}
          <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#FFD166] text-[#650D32] border-4 border-white font-black text-xs flex items-center justify-center shadow-lg">
            CALA
          </div>
        </div>

        {/* Spin button */}
        <div className="mt-6 z-10">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`px-8 py-3.5 rounded-2xl font-black text-base uppercase tracking-wider shadow-xl transition-all cursor-pointer ${
              isSpinning
                ? 'bg-white/20 text-white/40 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FFD166] via-[#FF922B] to-[#E63946] text-[#650D32] hover:brightness-110 active:scale-95 shadow-orange-500/20'
            }`}
          >
            {isSpinning ? 'GIRANDO...' : '¡GIRAR LA RUEDA!'}
          </button>
        </div>
      </div>

      {/* Resulting Task Challenge */}
      {activeTask && (
        <div className="bg-[#250311] p-5 rounded-2xl border-2 border-[#FFD166] space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF922B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FFD166]" />
              Sector obtenido: {activeSector}
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD166]">
              +20 Puntos
            </span>
          </div>

          <div className="bg-[#650D32] p-4 rounded-xl border border-[#990F32] flex items-start justify-between gap-3">
            <div>
              <p className="text-base sm:text-lg font-bold text-white">
                {activeTask.promptEs}
              </p>
              <p className="text-xs text-[#FFD166] mt-1 font-medium">
                «{activeTask.promptHy}»
              </p>
            </div>
            <TranslateButton
              textEs={activeTask.promptEs}
              textHy={activeTask.promptHy}
              label="Թարգմանել"
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            {activeTask.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              let style = 'bg-[#38061B] border-white/10 hover:border-white/30 text-white';

              if (isAnswered) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-900/60 border-emerald-400 text-white';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-[#E63946]/30 border-[#E63946] text-white';
                }
              } else if (isSelected) {
                style = 'bg-[#FFD166]/20 border-[#FFD166] text-white shadow-md';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${style}`}
                >
                  <div>
                    <span className="font-bold text-sm sm:text-base">{opt.textEs}</span>
                    <span className="text-xs text-[#FFD166]/70 block">{opt.textHy}</span>
                  </div>

                  {!isAnswered && (
                    <button
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        isSelected ? 'bg-[#FFD166] text-[#650D32]' : 'bg-white/10 text-white'
                      }`}
                    >
                      {isSelected ? 'Elegido ✓' : 'Elegir'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {isAnswered && selectedOpt !== null && (
            <div
              className={`p-4 rounded-xl border animate-in fade-in space-y-1 ${
                activeTask.options[selectedOpt].isCorrect
                  ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
                  : 'bg-[#E63946]/20 border-[#E63946] text-white'
              }`}
            >
              <p className="font-bold text-sm">{activeTask.explanationEs}</p>
              <p className="text-xs text-[#FFD166]">{activeTask.explanationHy}</p>
            </div>
          )}

          {/* Confirm Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-white/50">
              Selecciona tu opción y confirma
            </span>

            {!isAnswered ? (
              <button
                onClick={handleConfirmTask}
                disabled={selectedOpt === null}
                className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
                  selectedOpt !== null
                    ? 'bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar respuesta</span>
              </button>
            ) : (
              <button
                onClick={spinWheel}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
              >
                <span>¡Girar de nuevo!</span>
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
