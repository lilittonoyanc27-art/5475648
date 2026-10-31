import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Search, 
  HelpCircle, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Play,
  Languages,
  Eye,
  Trash2,
  Phone,
  Refrigerator
} from 'lucide-react';
import { soundManager } from './soundEffects.ts';
import { ClickToTranslate, TranslateButton } from './ClickToTranslate.tsx';

interface ChickenMysteryGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameId: string) => void;
  onSeekVideo?: (seconds: number) => void;
}

interface KitchenItem {
  id: string;
  nameEs: string;
  nameHy: string;
  icon: string;
  descriptionEs: string;
  descriptionHy: string;
  coords: { x: number; y: number }; // Percentage for cartoon kitchen placement
}

export const ChickenMysteryGame: React.FC<ChickenMysteryGameProps> = ({
  onAddPoints,
  onCompleteGame,
  onSeekVideo
}) => {
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; messageEs: string; messageHy: string } | null>(null);

  // Level 1: Quiz state
  const [l1SelectedOption, setL1SelectedOption] = useState<number | null>(null);
  const [l1Submitted, setL1Submitted] = useState(false);

  // Level 2: Freezer items state
  const [freezerOpen, setFreezerOpen] = useState(false);
  const [l2ItemInspected, setL2ItemInspected] = useState<string | null>(null);

  // Level 3: Cards ordering state
  const initialCards = [
    { id: 'c3', textEs: 'Lo tiró a la basura.', textHy: 'Դեն նետեց այն աղբամանը։', correctPos: 3 },
    { id: 'c1', textEs: 'Vio la bolsa de pollo.', textHy: 'Տեսավ հավի տոպրակը։', correctPos: 1 },
    { id: 'c4', textEs: 'Su pareja buscó el dinero desesperadamente.', textHy: 'Նրա զուգընկերը հուսահատ փնտրեց գումարը։', correctPos: 4 },
    { id: 'c2', textEs: 'Pensó que estaba vencido.', textHy: 'Կարծեց, որ ժամկետանց է։', correctPos: 2 },
  ];
  const [cardsOrder, setCardsOrder] = useState(initialCards);

  // Level 4: Final questions state
  const [l4Answers, setL4Answers] = useState<{ q1?: number; q2?: number; q3?: number }>({});
  const [l4Complete, setL4Complete] = useState(false);

  // Interactive cartoon kitchen items
  const kitchenItems: KitchenItem[] = [
    {
      id: 'refrigerator',
      nameEs: 'El frigorífico (Heladera)',
      nameHy: 'Սառնարան',
      icon: '🧊',
      descriptionEs: 'La heladera de la cocina donde guardan alimentos frescos.',
      descriptionHy: 'Խոհանոցի սառնարանը, որտեղ պահվում են թարմ մթերքները։',
      coords: { x: 22, y: 35 }
    },
    {
      id: 'freezer',
      nameEs: 'El congelador (Freezer)',
      nameHy: 'Սառցախցիկ',
      icon: '❄️',
      descriptionEs: 'El compartimento superior bajo cero donde estaba el paquete misterioso.',
      descriptionHy: 'Զրոյից ցածր վերին խցիկը, որտեղ թաքնված էր խորհրդավոր փաթեթը։',
      coords: { x: 22, y: 18 }
    },
    {
      id: 'table',
      nameEs: 'La mesa de cocina',
      nameHy: 'Խոհանոցի սեղան',
      icon: '🍽️',
      descriptionEs: 'Una mesa acogedora de madera donde se prepara la comida.',
      descriptionHy: 'Հարմարավետ փայտե սեղան, որտեղ պատրաստվում է սնունդը։',
      coords: { x: 55, y: 65 }
    },
    {
      id: 'trash',
      nameEs: 'El cubo de la basura',
      nameHy: 'Աղբաման',
      icon: '🗑️',
      descriptionEs: 'El cubo donde Natalia arrojó el pollo caducado.',
      descriptionHy: 'Աղբամանը, որտեղ Նատալիան նետեց ժամկետանց հավը։',
      coords: { x: 80, y: 70 }
    },
    {
      id: 'phone',
      nameEs: 'El teléfono',
      nameHy: 'Հեռախոս',
      icon: '☎️',
      descriptionEs: 'El teléfono para llamar y averiguar si el camión de la basura ya pasó.',
      descriptionHy: 'Հեռախոսը՝ զանգելու և ճշտելու, թե արդյոք աղբատարը եկել է։',
      coords: { x: 65, y: 30 }
    }
  ];

  const freezerItems = [
    { id: 'ice', nameEs: 'Cubitos de hielo', nameHy: 'Սառույցի խորանարդիկներ', icon: '🧊', isTarget: false },
    { id: 'icecream', nameEs: 'Helado de dulce de leche', nameHy: 'Դուլսե դե լեչե պաղպաղակ', icon: '🍨', isTarget: false },
    { id: 'veggies', nameEs: 'Verduras congeladas', nameHy: 'Սառեցված բանջարեղեն', icon: '🥦', isTarget: false },
    { id: 'chicken', nameEs: '¡Bolsa de patitas de pollo con dólares!', nameHy: 'Հավի ոտքերի տոպրակը դոլարներով', icon: '🍗', isTarget: true },
    { id: 'fish', nameEs: 'Filete de pescado', nameHy: 'Ձկան ֆիլե', icon: '🐟', isTarget: false },
  ];

  // LEVEL 1: Submission
  const handleL1Submit = () => {
    soundManager.playClick();
    if (l1SelectedOption === null) return;

    if (l1SelectedOption === 1) { // B is correct
      soundManager.playCorrect();
      confetti({ particleCount: 50, spread: 60 });
      onAddPoints(20);
      setFeedback({
        type: 'success',
        messageEs: '¡Correcto! El dinero estaba escondido en la bolsa de patitas de pollo congelado.',
        messageHy: 'Ճիշտ է։ Գումարը թաքցված էր սառեցված հավի ոտքերի տոպրակում։'
      });
      setL1Submitted(true);
    } else {
      soundManager.playWrong();
      setFeedback({
        type: 'error',
        messageEs: '¡Incorrecto! Escucha de nuevo la anécdota en el video (08:39).',
        messageHy: 'Սխալ է։ Կրկին լսիր պատմությունը տեսանյութում (08:39)։'
      });
    }
  };

  // LEVEL 2: Inspect item
  const handleInspectFreezerItem = (item: typeof freezerItems[0]) => {
    soundManager.playClick();
    setL2ItemInspected(item.id);
    if (item.isTarget) {
      soundManager.playCorrect();
      confetti({ particleCount: 80, spread: 80 });
      onAddPoints(25);
      setFeedback({
        type: 'success',
        messageEs: '¡Excelente! ¡Has encontrado la bolsa de pollo con los dólares!',
        messageHy: 'Հիանալի է։ Դու գտար հավի տոպրակը դոլարներով։'
      });
    } else {
      soundManager.playWrong();
      setFeedback({
        type: 'error',
        messageEs: `¡Inténtalo otra vez! Esto es ${item.nameEs}. Busca el pollo.`,
        messageHy: `Կրկին փորձիր։ Սա ${item.nameHy} է։ Փնտրիր հավը։`
      });
    }
  };

  // LEVEL 3: Move card
  const moveCard = (index: number, direction: 'up' | 'down') => {
    soundManager.playClick();
    const newOrder = [...cardsOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setCardsOrder(newOrder);
  };

  const handleCheckL3 = () => {
    soundManager.playClick();
    const isCorrect = cardsOrder.every((card, idx) => card.correctPos === idx + 1);
    if (isCorrect) {
      soundManager.playCorrect();
      confetti({ particleCount: 80, spread: 90 });
      onAddPoints(30);
      setFeedback({
        type: 'success',
        messageEs: '¡Perfecto orden cronológico! Natalia vio el pollo, pensó que estaba vencido, lo tiró y su pareja buscó el dinero.',
        messageHy: 'Կատարյալ ժամանակագրական կարգ։ Նատալիան տեսավ հավը, կարծեց ժամկետանց է, դեն նետեց, իսկ զուգընկերը փնտրեց գումարը։'
      });
    } else {
      soundManager.playWrong();
      setFeedback({
        type: 'error',
        messageEs: 'El orden todavía no es correcto. Recuerda la secuencia de los hechos.',
        messageHy: 'Կարգը դեռ ճիշտ չէ։ Վերհիշիր դեպքերի հաջորդականությունը։'
      });
    }
  };

  // LEVEL 4: Check final questions
  const handleCheckL4 = () => {
    soundManager.playClick();
    if (l4Answers.q1 === 0 && l4Answers.q2 === 0 && l4Answers.q3 === 0) {
      soundManager.playFanfare();
      confetti({ particleCount: 150, spread: 100 });
      onAddPoints(50);
      onCompleteGame('chicken_mystery');
      setL4Complete(true);
      setLevel(5); // Mystery solved screen
    } else {
      soundManager.playWrong();
      setFeedback({
        type: 'error',
        messageEs: 'Revisa tus respuestas. Recuerda que había entre 3.000 y 4.000 dólares.',
        messageHy: 'Ստուգիր պատասխաններդ։ Հիշիր, որ այնտեղ 3000-ից 4000 դոլար կար։'
      });
    }
  };

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#FFD166] p-5 shadow-2xl space-y-6 text-left">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-[#650D32] via-[#990F32] to-[#FF922B]/20 p-5 rounded-xl border border-[#FFD166]/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍗</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#FFD166] tracking-wide">
                ¿DÓNDE ESTÁ EL DINERO?
              </h1>
              <p className="text-sm font-semibold text-white/90">
                ¡Un misterio en la cocina de Natalia! (Առեղծված Նատալիայի խոհանոցում)
              </p>
            </div>
          </div>
        </div>

        {/* Level indicator pills */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10">
          {[1, 2, 3, 4].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundManager.playClick();
                setLevel(lvl as 1 | 2 | 3 | 4);
                setFeedback(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                level === lvl
                  ? 'bg-[#FFD166] text-[#650D32] shadow-md scale-105'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Nivel {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Cartoon Kitchen Visual Board */}
      <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#4A0E2E] via-[#2F0619] to-[#1A030E] rounded-2xl border-2 border-[#990F32] overflow-hidden shadow-inner flex flex-col justify-between p-4">
        {/* Kitchen background elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#FFD166_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Upper cabinets & window decoration */}
        <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-2 z-10">
          <span className="font-bold text-[#FFD166] flex items-center gap-1">
            <span>🍳</span>
            <span>Cocina de Natalia • Խոհանոցային ինտերակտիվ սենյակ</span>
          </span>
          <span className="text-[11px] text-white/70">
            Toca cualquier objeto para explorarlo en español y armenio
          </span>
        </div>

        {/* Interactive items placed in the cartoon kitchen */}
        <div className="relative w-full h-full my-2">
          {kitchenItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                soundManager.playClick();
                if (item.id === 'freezer') setFreezerOpen(true);
              }}
              style={{ left: `${item.coords.x}%`, top: `${item.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            >
              <div className="p-3 bg-[#650D32]/90 hover:bg-[#990F32] border-2 border-[#FFD166] rounded-2xl shadow-xl flex flex-col items-center group-hover:scale-110 transition-transform active:scale-95">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-[11px] font-bold text-[#FFD166] mt-1 whitespace-nowrap bg-black/60 px-2 py-0.5 rounded-md">
                  {item.nameEs.split(' ')[1] || item.nameEs}
                </span>
              </div>
              <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black/90 text-white text-[11px] p-2 rounded-lg border border-[#FFD166] z-30 whitespace-nowrap shadow-xl">
                <p className="font-bold text-[#FFD166]">{item.nameEs}</p>
                <p className="text-white/80">{item.nameHy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom floor line */}
        <div className="border-t border-[#FFD166]/20 pt-2 flex items-center justify-between text-[11px] text-white/60 z-10">
          <span>Piso de baldosas de la cocina</span>
          <span className="text-[#FFD166] font-semibold">
            {freezerOpen ? '❄️ Congelador abierto' : '❄️ Toca el congelador para abrir'}
          </span>
        </div>
      </div>

      {/* FEEDBACK BANNER */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
              : 'bg-[#E63946]/20 border-[#E63946] text-white'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#FFD166] flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="font-bold text-sm">{feedback.messageEs}</p>
            <p className="text-xs text-[#FFD166]">{feedback.messageHy}</p>
          </div>
        </div>
      )}

      {/* ================= LEVEL 1 ================= */}
      {level === 1 && (
        <div className="bg-[#250311] p-5 rounded-xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FF922B] uppercase tracking-wider">
              Nivel 1 • ¿Qué pasó? (Ի՞նչ պատահեց)
            </span>
            {onSeekVideo && (
              <button
                onClick={() => onSeekVideo(519)}
                className="px-2.5 py-1 rounded-lg bg-[#650D32] hover:bg-[#990F32] text-[#FFD166] text-xs font-bold border border-white/10 flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Ver clip 08:39</span>
              </button>
            )}
          </div>

          <div className="flex items-start justify-between gap-2 bg-[#650D32] p-4 rounded-xl border border-[#990F32]">
            <div>
              <p className="text-lg font-bold text-white">
                ¿Dónde estaba escondido el dinero?
              </p>
              <p className="text-xs text-[#FFD166] mt-0.5">
                «Որտե՞ղ էր թաքցված գումարը»
              </p>
            </div>
            <TranslateButton
              textEs="¿Dónde estaba escondido el dinero?"
              textHy="Որտե՞ղ էր թաքցված գումարը"
            />
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {[
              { id: 0, textEs: 'A) Debajo de la cama.', textHy: 'Ա) Անկողնու տակ։' },
              { id: 1, textEs: 'B) Dentro de una bolsa de pollo congelado.', textHy: 'Բ) Սառեցված հավի մսի տոպրակի մեջ։' },
              { id: 2, textEs: 'C) En el bolso de Natalia.', textHy: 'Գ) Նատալիայի պայուսակում։' },
              { id: 3, textEs: 'D) En el jardín.', textHy: 'Դ) Այգում։' }
            ].map((opt) => (
              <div
                key={opt.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  l1SelectedOption === opt.id
                    ? 'bg-[#FFD166]/20 border-[#FFD166] text-white shadow-md'
                    : 'bg-[#38061B] border-white/10 hover:border-white/30 text-white/90'
                }`}
              >
                <div 
                  onClick={() => setL1SelectedOption(opt.id)}
                  className="flex-1 cursor-pointer"
                >
                  <p className="font-semibold text-sm sm:text-base">{opt.textEs}</p>
                </div>

                <div className="flex items-center gap-2">
                  <TranslateButton
                    textEs={opt.textEs}
                    textHy={opt.textHy}
                    label="Թարգմանել"
                  />
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setL1SelectedOption(opt.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      l1SelectedOption === opt.id
                        ? 'bg-[#FFD166] text-[#650D32]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {l1SelectedOption === opt.id ? 'Seleccionado ✓' : 'Elegir'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-white/50">
              Usa el botón "Elegir" para seleccionar tu respuesta
            </span>
            {l1Submitted ? (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setLevel(2);
                  setFeedback(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg flex items-center gap-2 hover:brightness-110 cursor-pointer"
              >
                <span>Siguiente: Nivel 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleL1Submit}
                disabled={l1SelectedOption === null}
                className={`px-5 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all flex items-center gap-2 ${
                  l1SelectedOption !== null
                    ? 'bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 cursor-pointer'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar respuesta</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= LEVEL 2 ================= */}
      {level === 2 && (
        <div className="bg-[#250311] p-5 rounded-xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FF922B] uppercase tracking-wider">
              Nivel 2 • Abre el congelador (Բացի՛ր սառցախցիկը)
            </span>
            <span className="text-xs text-[#FFD166] font-mono">
              +25 Puntos
            </span>
          </div>

          <div className="bg-[#650D32] p-4 rounded-xl border border-[#990F32] flex items-start justify-between gap-3">
            <div>
              <p className="text-base sm:text-lg font-bold text-white">
                Busca la bolsa de pollo congelado entre los alimentos.
              </p>
              <p className="text-xs text-[#FFD166] mt-0.5">
                «Գտի՛ր հավի մսով տոպրակը սառեցված մթերքների մեջ»
              </p>
            </div>
            <TranslateButton
              textEs="Busca la bolsa de pollo."
              textHy="Գտի՛ր հավի մսով տոպրակը"
            />
          </div>

          {/* Freezer items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {freezerItems.map((item) => {
              const isInspected = l2ItemInspected === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleInspectFreezerItem(item)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 ${
                    isInspected && item.isTarget
                      ? 'bg-[#FFD166]/20 border-[#FFD166] shadow-lg scale-105'
                      : isInspected && !item.isTarget
                      ? 'bg-[#E63946]/20 border-[#E63946]'
                      : 'bg-[#38061B] border-white/10 hover:border-[#FFD166]'
                  }`}
                >
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{item.nameEs}</p>
                    <p className="text-xs text-[#FFD166]/80 mt-0.5">{item.nameHy}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                    Inspeccionar
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setLevel(1);
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 cursor-pointer"
            >
              ← Volver al Nivel 1
            </button>
            {l2ItemInspected === 'chicken' && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setLevel(3);
                  setFeedback(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg flex items-center gap-2 hover:brightness-110 cursor-pointer"
              >
                <span>Avanzar al Nivel 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= LEVEL 3 ================= */}
      {level === 3 && (
        <div className="bg-[#250311] p-5 rounded-xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FF922B] uppercase tracking-wider">
              Nivel 3 • ¿Qué hizo Natalia? (Ի՞նչ արեց Նատալիան)
            </span>
            <span className="text-xs text-[#FFD166] font-mono">
              +30 Puntos
            </span>
          </div>

          <div className="bg-[#650D32] p-4 rounded-xl border border-[#990F32] flex items-start justify-between gap-3">
            <div>
              <p className="text-base sm:text-lg font-bold text-white">
                Ordena las cuatro tarjetas cronológicamente usando las flechas.
              </p>
              <p className="text-xs text-[#FFD166] mt-0.5">
                «Դասավորի՛ր չորս քարտերը ճիշտ ժամանակագրական հերթականությամբ»
              </p>
            </div>
            <TranslateButton
              textEs="Ordena los eventos en orden cronológico."
              textHy="Դասավորի՛ր իրադարձությունները ճիշտ հերթականությամբ"
            />
          </div>

          {/* Cards to order */}
          <div className="space-y-2.5">
            {cardsOrder.map((card, idx) => (
              <div
                key={card.id}
                className="p-3.5 bg-[#38061B] rounded-xl border border-white/20 flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#FFD166] text-[#650D32] font-black flex items-center justify-center text-xs flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-white text-sm sm:text-base">{card.textEs}</p>
                    <p className="text-xs text-[#FFD166] mt-0.5">{card.textHy}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <TranslateButton
                    textEs={card.textEs}
                    textHy={card.textHy}
                    label="Թարգմանել"
                  />
                  <button
                    onClick={() => moveCard(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                    title="Mover arriba"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveCard(idx, 'down')}
                    disabled={idx === cardsOrder.length - 1}
                    className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                    title="Mover abajo"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setLevel(2);
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 cursor-pointer"
            >
              ← Volver al Nivel 2
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckL3}
                className="px-5 py-2.5 rounded-xl bg-[#FFD166] text-[#650D32] font-black text-sm shadow-lg hover:bg-[#FFD166]/90 cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Comprobar orden</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setLevel(4);
                  setFeedback(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-lg flex items-center gap-1 cursor-pointer"
              >
                <span>Nivel 4</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LEVEL 4 ================= */}
      {level === 4 && (
        <div className="bg-[#250311] p-5 rounded-xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FF922B] uppercase tracking-wider">
              Nivel 4 • ¡El dinero ha desaparecido! (Գումարն անհետացել է)
            </span>
            <span className="text-xs text-[#FFD166] font-mono">
              +50 Puntos y Trofeo
            </span>
          </div>

          <div className="bg-[#650D32] p-4 rounded-xl border border-[#990F32]">
            <p className="text-base sm:text-lg font-bold text-white">
              Resuelve las 3 preguntas finales para encontrar el tesoro en la basura.
            </p>
            <p className="text-xs text-[#FFD166] mt-0.5">
              «Պատասխանի՛ր վերջին 3 հարցերին՝ գանձը աղբի մեջ գտնելու համար»
            </p>
          </div>

          {/* 3 Questions */}
          <div className="space-y-4">
            {/* Q1 */}
            <div className="p-4 bg-[#38061B] rounded-xl border border-white/10 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-white">1. ¿Dónde está la basura?</p>
                  <p className="text-xs text-[#FFD166]">«Որտե՞ղ է աղբը»</p>
                </div>
                <TranslateButton textEs="¿Dónde está la basura?" textHy="Որտե՞ղ է աղբը" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  { id: 0, textEs: 'En el cubo de la cocina / camión recolector', textHy: 'Խոհանոցի աղբամանում / աղբատարում' },
                  { id: 1, textEs: 'En la caja de zapatos', textHy: 'Կոշիկի տուփում' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      soundManager.playClick();
                      setL4Answers({ ...l4Answers, q1: opt.id });
                    }}
                    className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-left cursor-pointer ${
                      l4Answers.q1 === opt.id
                        ? 'bg-[#FFD166] text-[#650D32] border-[#FFD166]'
                        : 'bg-black/30 text-white border-white/10 hover:border-white/30'
                    }`}
                  >
                    {opt.textEs}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="p-4 bg-[#38061B] rounded-xl border border-white/10 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-white">2. ¿Qué tiró Natalia?</p>
                  <p className="text-xs text-[#FFD166]">«Ի՞նչ նետեց Նատալիան»</p>
                </div>
                <TranslateButton textEs="¿Qué tiró Natalia?" textHy="Ի՞նչ նետեց Նատալիան" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  { id: 0, textEs: 'La bolsa de patitas de pollo congelado con dinero', textHy: 'Սառեցված հավի տոպրակը՝ գումարով' },
                  { id: 1, textEs: 'Un par de zapatos viejos', textHy: 'Հին կոշիկներ' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      soundManager.playClick();
                      setL4Answers({ ...l4Answers, q2: opt.id });
                    }}
                    className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-left cursor-pointer ${
                      l4Answers.q2 === opt.id
                        ? 'bg-[#FFD166] text-[#650D32] border-[#FFD166]'
                        : 'bg-black/30 text-white border-white/10 hover:border-white/30'
                    }`}
                  >
                    {opt.textEs}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div className="p-4 bg-[#38061B] rounded-xl border border-white/10 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-white">3. ¿Cuánto dinero había aproximadamente?</p>
                  <p className="text-xs text-[#FFD166]">«Մոտավորապես որքա՞ն գումար կար»</p>
                </div>
                <TranslateButton textEs="¿Cuánto dinero había aproximadamente?" textHy="Մոտավորապես որքա՞ն գումար կար" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  { id: 0, textEs: 'Aproximadamente entre 3.000 y 4.000 dólares', textHy: 'Մոտավորապես 3.000 - 4.000 դոլար' },
                  { id: 1, textEs: 'Solo cincuenta pesos', textHy: 'Միայն հիսուն պեսո' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      soundManager.playClick();
                      setL4Answers({ ...l4Answers, q3: opt.id });
                    }}
                    className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-left cursor-pointer ${
                      l4Answers.q3 === opt.id
                        ? 'bg-[#FFD166] text-[#650D32] border-[#FFD166]'
                        : 'bg-black/30 text-white border-white/10 hover:border-white/30'
                    }`}
                  >
                    {opt.textEs}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setLevel(3);
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 cursor-pointer"
            >
              ← Volver al Nivel 3
            </button>
            <button
              onClick={handleCheckL4}
              disabled={l4Answers.q1 === undefined || l4Answers.q2 === undefined || l4Answers.q3 === undefined}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD166] via-[#FF922B] to-[#E63946] text-[#650D32] font-black text-sm shadow-xl hover:brightness-110 disabled:opacity-40 cursor-pointer flex items-center gap-2"
            >
              <Trophy className="w-5 h-5 fill-current" />
              <span>¡Resolver el misterio y rescatar el dinero!</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= LEVEL 5: VICTORY SCREEN ================= */}
      {level === 5 && (
        <div className="bg-gradient-to-b from-[#650D32] via-[#4A0E2E] to-[#250311] p-8 rounded-2xl border-4 border-[#FFD166] text-center space-y-5 animate-in zoom-in-95 shadow-2xl">
          <div className="text-6xl animate-bounce">🎉</div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFD166] tracking-wide">
            ¡MISTERIO RESUELTO!
          </h2>
          <p className="text-xl font-bold text-white">
            ¡Has recuperado los 4.000 dólares con éxito!
          </p>
          <p className="text-sm text-[#FFD166] max-w-lg mx-auto font-medium">
            «Առեղծվածը լուծված է։ Դու հաջողությամբ վերադարձրիր 4000 դոլարը»։ Նատալիայի և նրա զուգընկերոջ պատմությունը սովորեցնում է մեզ ուշադիր լինել և երբեք չհանձնվել։
          </p>

          <div className="inline-flex items-center gap-3 bg-black/40 px-6 py-3 rounded-2xl border border-[#FFD166]/50">
            <span className="text-3xl">🏆</span>
            <div className="text-left">
              <span className="text-xs uppercase font-bold text-[#FF922B]">Recompensa obtenida</span>
              <p className="text-lg font-black text-[#FFD166]">+125 Puntos totales y Trofeo desbloqueado</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                setLevel(1);
                setL1SelectedOption(null);
                setL1Submitted(false);
                setL2ItemInspected(null);
                setL4Answers({});
                setFeedback(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar de nuevo</span>
            </button>
            {onSeekVideo && (
              <button
                onClick={() => onSeekVideo(519)}
                className="px-5 py-2.5 rounded-xl bg-[#FFD166] text-[#650D32] hover:bg-[#FFD166]/90 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Revivir el video (08:39)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
