import React from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Trophy, 
  HelpCircle, 
  Layers,
  Flame,
  Volume2
} from 'lucide-react';
import { GameTab } from './types.ts';
import { soundManager } from './soundEffects.ts';
import { TranslateButton } from './ClickToTranslate.tsx';

interface GamesHubProps {
  onSelectGame: (tab: GameTab) => void;
  completedGames: string[];
}

export const GamesHub: React.FC<GamesHubProps> = ({ onSelectGame, completedGames }) => {
  const gamesList = [
    {
      id: 'chicken_mystery' as GameTab,
      key: 'chicken_mystery',
      titleEs: '¿Dónde está el dinero?',
      titleHy: 'Որտե՞ղ է գումարը (Սառեցված հավի առեղծվածը)',
      subtitleEs: '¡El misterio del pollo congelado en 4 niveles!',
      subtitleHy: 'Սառեցված հավի զվարճալի առեղծվածը 4 մակարդակով',
      icon: '🍗',
      points: '+125 Puntos',
      featured: true,
      category: 'Historia Principal'
    },
    {
      id: 'pasapalabra' as GameTab,
      key: 'pasapalabra',
      titleEs: 'El Rosco de Pasapalabra',
      titleHy: 'Պասապալաբրա այբուբենի անիվը (27 տառ)',
      subtitleEs: 'Todas las 27 letras del alfabeto de Natalia Oreiro',
      subtitleHy: 'Նատալիա Օրեյրոյի իսպաներեն այբուբենի բոլոր 27 տառերը',
      icon: '🔤',
      points: '+100 Puntos',
      featured: true,
      category: 'Juego de Palabras'
    },
    {
      id: 'wheel' as GameTab,
      key: 'wheel',
      titleEs: 'La Rueda de la Suerte',
      titleHy: 'Բախտի անիվ',
      subtitleEs: 'Gira la ruleta mágica y responde desafíos aleatorios',
      subtitleHy: 'Պտտիր կախարդական անիվն ու լուծիր պատահական առաջադրանքներ',
      icon: '🎡',
      points: '+20 Puntos/giro',
      featured: false,
      category: 'Minijuegos'
    },
    {
      id: 'true_false' as GameTab,
      key: 'true_false',
      titleEs: '¿Verdadero o Falso?',
      titleHy: 'Ճի՞շտ է, թե՞ սխալ',
      subtitleEs: '20 afirmaciones sobre la entrevista y la vida de Natalia',
      subtitleHy: '20 պնդում Նատալիայի հարցազրույցի և կյանքի մասին',
      icon: '❓',
      points: '+10 Puntos c/u',
      featured: false,
      category: 'Comprensión'
    },
    {
      id: 'who_said' as GameTab,
      key: 'who_said',
      titleEs: '¿Quién dijo eso?',
      titleHy: 'Ո՞վ ասաց դա',
      subtitleEs: 'Distingue entre la voz de Natalia y el presentador Cala',
      subtitleHy: 'Տարբերակիր Նատալիայի և հաղորդավար Կալայի խոսքերը',
      icon: '🎙️',
      points: '+10 Puntos c/u',
      featured: false,
      category: 'Audición'
    },
    {
      id: 'order_words' as GameTab,
      key: 'order_words',
      titleEs: 'Ordena las Palabras',
      titleHy: 'Դասավորի՛ր բառերը',
      subtitleEs: 'Reconstruye las 15 oraciones españolas auténticas',
      subtitleHy: 'Վերականգնիր 15 իրական իսպաներեն նախադասությունները',
      icon: '🧩',
      points: '+10 Puntos c/u',
      featured: false,
      category: 'Gramática'
    },
    {
      id: 'interview' as GameTab,
      key: 'interview',
      titleEs: 'Entrevista a Natalia',
      titleHy: 'Հարցազրույց Նատալիայի հետ',
      subtitleEs: 'Sé periodista y dialoga con la gran estrella de Cala',
      subtitleHy: 'Եղիր լրագրող և զրուցիր աստղի հետ ստուդիայում',
      icon: '📺',
      points: '+10 Puntos c/u',
      featured: false,
      category: 'Conversación'
    },
    {
      id: 'grammar_detective' as GameTab,
      key: 'grammar_detective',
      titleEs: 'Detective de Errores',
      titleHy: 'Սխալների դետեկտիվ',
      subtitleEs: 'Detecta y corrige 15 errores gramaticales comunes',
      subtitleHy: 'Գտիր և ուղղիր 15 տարածված քերականական սխալներ',
      icon: '🕵️‍♂️',
      points: '+15 Puntos c/u',
      featured: false,
      category: 'Gramática'
    },
    {
      id: 'what_if' as GameTab,
      key: 'what_if',
      titleEs: '¿Qué pasaría si...?',
      titleHy: 'Ի՞նչ կլիներ, եթե․․․',
      subtitleEs: '15 situaciones hipotéticas para hablar y pensar en modo condicional',
      subtitleHy: '15 ենթադրական իրավիճակներ պայմանական եղանակով խոսելու համար',
      icon: '💡',
      points: '+15 Puntos c/u',
      featured: false,
      category: 'Expresión'
    },
    {
      id: 'choose_reply' as GameTab,
      key: 'choose_reply',
      titleEs: 'Elige tu Respuesta',
      titleHy: 'Ընտրի՛ր քո պատասխանը',
      subtitleEs: '20 situaciones cotidianas con respuestas naturales e ingeniosas',
      subtitleHy: '20 առօրյա իրավիճակներ բնական և հնարամիտ պատասխաններով',
      icon: '💬',
      points: '+10 Puntos c/u',
      featured: false,
      category: 'Conversación'
    },
    {
      id: 'listen_respond' as GameTab,
      key: 'listen_respond',
      titleEs: 'Escucha y Responde',
      titleHy: 'Լսի՛ր և պատասխանի՛ր',
      subtitleEs: '15 fragmentos directos del video de Cala con comprobación',
      subtitleHy: '15 ուղիղ հատվածներ տեսանյութից՝ ունկնդրման ստուգմամբ',
      icon: '🎧',
      points: '+10 Puntos c/u',
      featured: false,
      category: 'Comprensión Auditiva'
    },
    {
      id: 'fill_blank' as GameTab,
      key: 'fill_blank',
      titleEs: 'Completa la Frase',
      titleHy: 'Լրացրո՛ւ նախադասությունը',
      subtitleEs: '20 ejercicios de vocabulario y frases reales del video',
      subtitleHy: '20 վարժություն իրական բառապաշարով և նախադասություններով',
      icon: '📝',
      points: '+10 Puntos c/u',
      featured: false,
      category: 'Vocabulario'
    },
    {
      id: 'grand_contest' as GameTab,
      key: 'grand_contest',
      titleEs: 'El Gran Concurso Final',
      titleHy: 'Մեծ եզրափակիչ մրցույթ',
      subtitleEs: '30 preguntas: Fácil, Medio y Difícil con copa dorada',
      subtitleHy: '30 հարցեր՝ Հեշտ, Միջին և Դժվար ոսկե գավաթով',
      icon: '🏆',
      points: '+300 Puntos',
      featured: true,
      category: 'Examen de Oro'
    }
  ];

  return (
    <div className="w-full space-y-6 text-left">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <span>Centro de Juegos Interactivos</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40 font-mono">
            {gamesList.length} Juegos
          </span>
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Aprende español jugando con la anécdota del congelador, el rosco y desafíos reales
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamesList.map((game) => {
          const isDone = completedGames.includes(game.key);

          return (
            <div
              key={game.id}
              onClick={() => {
                soundManager.playClick();
                onSelectGame(game.id);
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group shadow-xl ${
                game.featured
                  ? 'bg-gradient-to-br from-[#650D32] via-[#990F32] to-[#FF922B]/20 border-[#FFD166] ring-2 ring-[#FFD166]/30 hover:scale-102'
                  : 'bg-[#38061B] border-[#990F32] hover:border-[#FFD166] hover:bg-[#450720]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-xl bg-black/30 border border-white/10 group-hover:scale-110 transition-transform">
                    {game.icon}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#FFD166] bg-black/40 px-2 py-0.5 rounded-md border border-white/10 font-mono">
                      {game.points}
                    </span>
                    {isDone && (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Listo</span>
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold text-[#FF922B] tracking-wider block">
                  {game.category}
                </span>
                <h3 className="text-lg font-black text-white group-hover:text-[#FFD166] transition-colors mt-0.5">
                  {game.titleEs}
                </h3>
                <p className="text-xs text-[#FFD166] font-semibold mt-0.5">
                  {game.titleHy}
                </p>

                <p className="text-xs text-white/80 mt-2 line-clamp-2">
                  {game.subtitleEs}
                </p>
                <p className="text-[11px] text-[#FF922B]/90 mt-0.5 line-clamp-1">
                  {game.subtitleHy}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <TranslateButton
                  textEs={game.titleEs + '. ' + game.subtitleEs}
                  textHy={game.titleHy + '։ ' + game.subtitleHy}
                  label="Թարգմանել"
                />

                <span className="inline-flex items-center gap-1 text-xs font-black text-[#FFD166] group-hover:translate-x-1 transition-transform">
                  <span>JUGAR AHORA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
