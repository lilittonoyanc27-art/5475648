import {
  Chapter,
  SubtitleLine,
  TrueFalseQuestion,
  WhoSaidQuestion,
  FillBlankQuestion,
  OrderWordsQuestion,
  InterviewDialog,
  ChooseResponseQuestion,
  WhatIfPrompt,
  PasapalabraLetter,
  GrammarErrorQuestion,
  ListenRespondQuestion,
  GrandContestQuestion,
  ExpressionItem,
  Achievement
} from './types.ts';

export const YOUTUBE_VIDEO_ID = 'ExTw2a65kFU';
export const DEFAULT_START_TIME = 15; // Starts at 00:15 with Cala's tango intro

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    titleEs: 'Capítulo 1 — El valor del silencio',
    titleHy: 'Գլուխ 1 — Լռության արժեքը',
    start: 15,
    end: 240,
    timeLabel: '00:15 – 04:00',
    descriptionEs: 'Bienvenida, tango, la reflexión sobre el silencio, Palermo Viejo y el campo en Carmelo.',
    descriptionHy: 'Ողջույն, տանգո, խոհեր լռության մասին, Պալերմո Վիեխո և գյուղական տուն Կարմելոյում։',
    topicsEs: ['Tango', 'El silencio', 'Palermo Viejo', 'Carmelo', 'Saber escuchar'],
    topicsHy: ['Տանգո', 'Լռություն', 'Պալերմո Վիեխո', 'Կարմելո', 'Լսելու արվեստ'],
    icon: '🤫'
  },
  {
    id: 2,
    titleEs: 'Capítulo 2 — Uruguay, Argentina y el fútbol',
    titleHy: 'Գլուխ 2 — Ուրուգվայը, Արգենտինան և ֆուտբոլը',
    start: 241,
    end: 460,
    timeLabel: '04:01 – 07:40',
    descriptionEs: 'Lynch en Colombia, Julio Bocca, 20 años en Argentina, Protocolo Celeste con Forlán y el fútbol.',
    descriptionHy: '«Lynch» սերիալը Կոլումբիայում, Խուլիո Բոկա, 20 տարի Արգենտինայում, «Protocolo Celeste» և ֆուտբոլ։',
    topicsEs: ['Lynch en Colombia', 'UNICEF', 'Mundial 2030', 'Protocolo Celeste', 'Fútbol'],
    topicsHy: ['Lynch', 'ՅՈՒՆԻՍԵՖ', 'Մունդիալ 2030', 'Protocolo Celeste', 'Ֆուտբոլ'],
    icon: '🇺🇾'
  },
  {
    id: 3,
    titleEs: 'Capítulo 3 — Los sueños de Natalia',
    titleHy: 'Գլուխ 3 — Նատալիայի մանկությունն ու երազանքները',
    start: 461,
    end: 518,
    timeLabel: '07:41 – 08:38',
    descriptionEs: 'Estudiar teatro a los 8 años, salir en los diarios, maquillaje de la tía y televisión a los 12 años.',
    descriptionHy: 'Թատրոն 8 տարեկանից, հայտնվել թերթերում, մորաքրոջ դիմահարդարումն ու հեռուստատեսություն 12 տարեկանում։',
    topicsEs: ['Teatro a los 8 años', 'El diario', 'Maquillaje infantil', 'Comerciales a los 12'],
    topicsHy: ['Թատրոն 8 տարեկանից', 'Թերթեր', 'Դիմահարդարում', 'Գովազդներ 12 տարեկանում'],
    icon: '✨'
  },
  {
    id: 4,
    titleEs: 'Capítulo 4 — ¡El dinero en el congelador!',
    titleHy: 'Գլուխ 4 — Գումարը սառեցված հավի մեջ',
    start: 519,
    end: 573,
    timeLabel: '08:39 – 09:33',
    descriptionEs: '¡La gran anécdota! Patitas de pollo en el freezer con 3.000 a 4.000 dólares y el rescate de la basura.',
    descriptionHy: 'Ամենահայտնի պատմությունը․ հավի տոտիկները սառցախցիկում 3.000-4.000 դոլարով և փրկությունը աղբից։',
    topicsEs: ['Pollo congelado', 'Freezer', 'Vegetariana', '4.000 dólares', 'Basura'],
    topicsHy: ['Սառեցված հավ', 'Սառցախցիկ', 'Բուսակեր', '4.000 դոլար', 'Աղբ'],
    icon: '🍗'
  },
  {
    id: 5,
    titleEs: 'Capítulo 5 — El primer casting y perseverancia',
    titleHy: 'Գլուխ 5 — Առաջին անհաջող քասթինգը',
    start: 574,
    end: 674,
    timeLabel: '09:34 – 11:14',
    descriptionEs: 'Wakolda, premio Cóndor de Plata, el director que le dijo «dedícate a otra cosa» y ser Tauro cabezadura.',
    descriptionHy: '«Wakolda» ֆիլմը, Cóndor de Plata, ռեժիսորը, որն ասաց «ուրիշ գործով զբաղվիր» և Ցուլի համառությունը։',
    topicsEs: ['Wakolda', 'Cóndor de Plata', 'Dedícate a otra cosa', 'Tauro perseverante'],
    topicsHy: ['Wakolda', 'Cóndor de Plata', 'Ուրիշ գործով զբաղվիր', 'Համառ Ցուլ'],
    icon: '💪'
  },
  {
    id: 6,
    titleEs: 'Capítulo 6 — El poder de la mente y los deseos',
    titleHy: 'Գլուխ 6 — Մտքի ուժը և երազանքները',
    start: 675,
    end: 739,
    timeLabel: '11:15 – 12:19',
    descriptionEs: 'Visualizar las metas, la historia real de Raffaella Carrà y el cuidado con lo que uno proyecta.',
    descriptionHy: 'Նպատակների վիզուալիզացիան, Ռաֆայելա Կառայի իրական պատմությունն ու մտքերի ուժը։',
    topicsEs: ['Poder de la mente', 'Raffaella Carrà', 'Cantar en Italia', 'Deseos hechos realidad'],
    topicsHy: ['Մտքի ուժ', 'Ռաֆայելա Կառա', 'Երգել Իտալիայում', 'Իրականացող երազանքներ'],
    icon: '🌟'
  },
  {
    id: 7,
    titleEs: 'Capítulo 7 — Belleza, estilo y sin techo',
    titleHy: 'Գլուխ 7 — Գեղեցկությունը, ոճն ու անսահման հնարավորությունները',
    start: 740,
    end: 800,
    timeLabel: '12:20 – 13:20',
    descriptionEs: '¿Símbolo sexual? Madre peluquera, cambiar looks, no encasillarse: «Nosotros no tenemos techo».',
    descriptionHy: 'Սեքս-խորհրդանի՞շ։ Վարսահարդար մայրիկ, կերպարանափոխություններ․ «Մեր հնարավորություններն անսահման են»։',
    topicsEs: ['¿Símbolo sexual?', 'Madre peluquera', 'Cambios de look', 'No tener techo'],
    topicsHy: ['Սեքս-խորհրդանիշ', 'Վարսահարդար մայրիկ', 'Ոճային փոփոխություններ', 'Անսահմանություն'],
    icon: '🎭'
  }
];

// Full synchronized subtitles with Armenian translation verbatim as provided by the user
export const SUBTITLES_DATA: SubtitleLine[] = [
  {
    id: 'sub_01',
    start: 15,
    end: 23,
    speaker: 'Presentador',
    textEs: 'Qué rico ese tango, a lo mejor podemos bailar tango con Natalia Oreiro que ya está en nuestra mesa. Saludos, bienvenidos a esta edición de Cala desde Buenos Aires.',
    textHy: 'Ի՜նչ հաճելի տանգո էր։ Գուցե կարողանանք տանգո պարել Նատալիա Օրեյրոյի հետ, որն արդեն այստեղ է՝ մեր սեղանի շուրջ։ Ողջույն բոլորին։ Բարի գալուստ «Cala» հաղորդման այս թողարկմանը՝ Բուենոս Այրեսից։',
    chapterId: 1,
    words: [
      { word: 'rico', cleanWord: 'rico', translationHy: 'հաճելի, համեղ, հիանալի', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Qué rico tango.', exampleHy: 'Ի՜նչ հաճելի տանգո է։' },
      { word: 'bailar', cleanWord: 'bailar', translationHy: 'պարել', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Podemos bailar tango.', exampleHy: 'Կարող ենք տանգո պարել։' },
      { word: 'mesa', cleanWord: 'mesa', translationHy: 'սեղան', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'En nuestra mesa.', exampleHy: 'Մեր սեղանի շուրջ։' },
      { word: 'bienvenidos', cleanWord: 'bienvenidos', translationHy: 'բարի գալուստ', partOfSpeech: 'Ողջույն / Saludo', exampleEs: 'Bienvenidos a todos.', exampleHy: 'Բարի գալուստ բոլորին։' }
    ]
  },
  {
    id: 'sub_02',
    start: 24,
    end: 28,
    speaker: 'Presentador',
    textEs: 'Natalia, por lo menos la mano acá en la mesa, que es linda y hermosa que estás como siempre.',
    textHy: 'Նատալիա, գոնե ձեռքդ այստեղ՝ սեղանին դիր, ինչքա՜ն գեղեցիկ ես, ինչպես միշտ։',
    chapterId: 1,
    words: [
      { word: 'mano', cleanWord: 'mano', translationHy: 'ձեռք', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Dame la mano.', exampleHy: 'Տուր ինձ ձեռքդ։' },
      { word: 'hermosa', cleanWord: 'hermosa', translationHy: 'գեղեցիկ', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Estás muy hermosa.', exampleHy: 'Դու շատ գեղեցիկ ես։' },
      { word: 'siempre', cleanWord: 'siempre', translationHy: 'միշտ', partOfSpeech: 'Մակբայ / Adverbio', exampleEs: 'Hermosa como siempre.', exampleHy: 'Գեղեցիկ, ինչպես միշտ։' }
    ]
  },
  {
    id: 'sub_03',
    start: 29,
    end: 32,
    speaker: 'Natalia',
    textEs: 'Muchas gracias, encantada de estar en tu programa.',
    textHy: 'Շատ շնորհակալ եմ։ Շատ ուրախ եմ քո հաղորդմանը մասնակցելու համար։',
    chapterId: 1,
    words: [
      { word: 'gracias', cleanWord: 'gracias', translationHy: 'շնորհակալություն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Muchas gracias.', exampleHy: 'Շատ շնորհակալություն։' },
      { word: 'encantada', cleanWord: 'encantada', translationHy: 'ուրախ եմ, հիացած եմ', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Encantada de conocerte.', exampleHy: 'Ուրախ եմ ծանոթանալու համար։' },
      { word: 'programa', cleanWord: 'programa', translationHy: 'հաղորդում, ծրագիր', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Tu programa es genial.', exampleHy: 'Քո հաղորդումը հիանալի է։' }
    ]
  },
  {
    id: 'sub_04',
    start: 33,
    end: 48,
    speaker: 'Presentador',
    textEs: 'Un placer tenerte con nosotros, es una hora interactiva, significa que usted nada más no nos va a ver pasivamente, escucharnos, nos va a hablar, nos puede conversar a través de nuestra cuenta de Twitter y Facebook Cala CNN.',
    textHy: 'Մեզ համար մեծ հաճույք է քեզ հյուրընկալելը։ Սա ինտերակտիվ հաղորդում է։ Այսինքն՝ հեռուստադիտողները ոչ միայն դիտելու և լսելու են մեզ, այլև կարող են շփվել մեզ հետ Twitter-ի և Facebook-ի մեր էջերի միջոցով։',
    chapterId: 1,
    words: [
      { word: 'placer', cleanWord: 'placer', translationHy: 'հաճույք', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Es un placer.', exampleHy: 'Հաճույք է։' },
      { word: 'interactiva', cleanWord: 'interactiva', translationHy: 'ինտերակտիվ', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Hora interactiva.', exampleHy: 'Ինտերակտիվ ժամ։' },
      { word: 'conversar', cleanWord: 'conversar', translationHy: 'զրուցել, շփվել', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Podemos conversar.', exampleHy: 'Կարող ենք զրուցել։' }
    ]
  },
  {
    id: 'sub_05',
    start: 49,
    end: 63,
    speaker: 'Presentador',
    textEs: 'Natalia, antes de la conversación, siempre hay una reflexión de inicio de programa, es un rompehielos, aunque contigo ya estamos derretidos todos, y la reflexión de hoy se llama el valor del silencio, te invito a escucharla, y luego conversamos, ¿qué parece?',
    textHy: 'Նատալիա, զրույցից առաջ մենք միշտ մի փոքր մտորում ենք ներկայացնում։ Դա օգնում է ավելի ազատ մթնոլորտ ստեղծել։ Չնայած քո ներկայությամբ մենք բոլորս արդեն հալվել ենք։ Այսօրվա մտորումը կոչվում է «Լռության արժեքը»։ Առաջարկում եմ լսել այն, հետո կզրուցենք։ Ի՞նչ կասես։',
    chapterId: 1,
    words: [
      { word: 'reflexión', cleanWord: 'reflexión', translationHy: 'մտորում, խոհ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Una reflexión profunda.', exampleHy: 'Խորը մտորում։' },
      { word: 'rompehielos', cleanWord: 'rompehielos', translationHy: 'լարվածությունը կոտրող (սառցահատ)', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Un juego rompehielos.', exampleHy: 'Լարվածությունը կոտրող խաղ։' },
      { word: 'silencio', cleanWord: 'silencio', translationHy: 'լռություն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'El valor del silencio.', exampleHy: 'Լռության արժեքը։' }
    ]
  },
  {
    id: 'sub_06',
    start: 64,
    end: 88,
    speaker: 'Presentador',
    textEs: 'El valor del silencio. Con el paso de los años he aprendido que el silencio es el mejor aliado cuando no tengo nada relevante que decir, muchas veces en el silencio es cuando las respuestas más difíciles aparecen, es la forma quizás más realista de encontrarnos a nosotros mismos.',
    textHy: 'Տարիների ընթացքում ես հասկացել եմ, որ լռությունը լավագույն դաշնակիցն է, երբ ասելու կարևոր բան չունեմ։ Եվ դա հասկանալու համար ինձ շատ ժամանակ է պահանջվել։ Շատ հաճախ հենց լռության մեջ են հայտնվում ամենադժվար հարցերի պատասխանները։ Գուցե դա ինքներս մեզ ճանաչելու ամենաիրական ճանապարհն է։',
    chapterId: 1,
    words: [
      { word: 'aprendido', cleanWord: 'aprendido', translationHy: 'սովորել եմ, հասկացել եմ', partOfSpeech: 'Հարակատար դերբայ / Participio', exampleEs: 'He aprendido mucho.', exampleHy: 'Ես շատ բան եմ սովորել։' },
      { word: 'aliado', cleanWord: 'aliado', translationHy: 'դաշնակից', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'El mejor aliado.', exampleHy: 'Լավագույն դաշնակիցը։' },
      { word: 'respuestas', cleanWord: 'respuestas', translationHy: 'պատասխաններ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Buscar respuestas.', exampleHy: 'Փնտրել պատասխաններ։' }
    ]
  },
  {
    id: 'sub_07',
    start: 89,
    end: 114,
    speaker: 'Presentador',
    textEs: 'Por ello yo insisto en la importancia de meditar, la importancia de escucharnos a nosotros mismos, escuchar esa vocecita que siempre está diciéndonos la verdad, aun cuando no la queremos escuchar, se hace notar, siempre nos pone cara a cara con la realidad.',
    textHy: 'Ահա թե ինչու եմ ես ընդգծում մեդիտացիայի կարևորությունը։ Կարևոր է լսել ինքներս մեզ, մեր ներսի այն փոքրիկ ձայնը, որը միշտ ճշմարտությունն է ասում, նույնիսկ երբ չենք ցանկանում լսել այն։ Այդ ձայնը մեզ միշտ կանգնեցնում է իրականության առաջ, որքան էլ այն դաժան լինի։',
    chapterId: 1,
    words: [
      { word: 'meditar', cleanWord: 'meditar', translationHy: 'մեդիտացիա անել, մտորել', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Es bueno meditar.', exampleHy: 'Լավ է մեդիտացիա անել։' },
      { word: 'vocecita', cleanWord: 'vocecita', translationHy: 'փոքրիկ ձայն, ձայնիկ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Esa vocecita interior.', exampleHy: 'Այդ ներքին փոքրիկ ձայնը։' },
      { word: 'verdad', cleanWord: 'verdad', translationHy: 'ճշմարտություն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Decir la verdad.', exampleHy: 'Ասել ճշմարտությունը։' }
    ]
  },
  {
    id: 'sub_08',
    start: 115,
    end: 137,
    speaker: 'Presentador',
    textEs: 'Como comunicador también he aprendido el valor de mantener silencio para escuchar a otros, dar una opinión cuando se me solicita, y quedarme callado cuando lo considero más prudente. ¿Valora usted el silencio? ¿Cuál ha sido el consejo más sabio que el silencio le ha dado en su vida?',
    textHy: 'Որպես հաղորդավար՝ ես նույնպես սովորել եմ լռել՝ ուրիշներին լսելու համար։ Սովորել եմ կարծիք հայտնել, երբ ինձ հարցնում են, և լռել, երբ դա ավելի խելամիտ է։ Իսկ դուք գնահատո՞ւմ եք լռությունը։ Ո՞րն է ամենաիմաստուն խորհուրդը, որ լռությունը տվել է ձեզ կյանքում։',
    chapterId: 1,
    words: [
      { word: 'callado', cleanWord: 'callado', translationHy: 'լուռ', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Quedarme callado.', exampleHy: 'Լուռ մնալ։' },
      { word: 'prudente', cleanWord: 'prudente', translationHy: 'խոհեմ, խելամիտ', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Es más prudente.', exampleHy: 'Ավելի խոհեմ է։' },
      { word: 'sabio', cleanWord: 'sabio', translationHy: 'իմաստուն', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Un consejo sabio.', exampleHy: 'Իմաստուն խորհուրդ։' }
    ]
  },
  {
    id: 'sub_09',
    start: 138,
    end: 149,
    speaker: 'Presentador',
    textEs: 'Y justamente con estas preguntas, vamos a dar un fuerte aplauso a esta hermosa cantante y actriz, Natalia Oreiro.',
    textHy: 'Եվ հիմա այս հարցերով, բուռն ծափահարություններով ողջունենք գեղեցիկ երգչուհուն և դերասանուհուն՝ Նատալիա Օրեյրոյին։',
    chapterId: 1,
    words: [
      { word: 'aplauso', cleanWord: 'aplauso', translationHy: 'ծափահարություն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Un fuerte aplauso.', exampleHy: 'Բուռն ծափահարություններ։' },
      { word: 'cantante', cleanWord: 'cantante', translationHy: 'երգչուհի / երգիչ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Gran cantante.', exampleHy: 'Մեծ երգչուհի։' },
      { word: 'actriz', cleanWord: 'actriz', translationHy: 'դերասանուհի', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Actriz talentosa.', exampleHy: 'Տաղանդավոր դերասանուհի։' }
    ]
  },
  {
    id: 'sub_10',
    start: 150,
    end: 165,
    speaker: 'Natalia',
    textEs: 'Alguien me comentó que uno tarda dos años en aprender a hablar y 60 en aprender a callarse.',
    textHy: 'Մի անգամ ինչ-որ մեկն ինձ ասաց, որ մարդուն երկու տարի է պետք խոսել սովորելու համար, իսկ վաթսուն տարի՝ լռել սովորելու համար։',
    chapterId: 1,
    words: [
      { word: 'tarda', cleanWord: 'tarda', translationHy: 'պահանջվում է, տևում է', partOfSpeech: 'Բայ / Verbo (tardar)', exampleEs: 'Tarda dos años.', exampleHy: 'Երկու տարի է տևում։' },
      { word: 'hablar', cleanWord: 'hablar', translationHy: 'խոսել', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Aprender a hablar.', exampleHy: 'Սովորել խոսել։' },
      { word: 'callarse', cleanWord: 'callarse', translationHy: 'լռել', partOfSpeech: 'Բայ / Verbo reflexivo', exampleEs: 'Aprender a callarse.', exampleHy: 'Սովորել լռել։' }
    ]
  },
  {
    id: 'sub_11',
    start: 166,
    end: 179,
    speaker: 'Natalia',
    textEs: 'Me lo dijeron a mí luego de haber dicho algo que estaba fuera de lugar, y por lo tanto me voy a quedar callada toda la noche, para no meter la pata.',
    textHy: 'Դա ինձ ասացին այն բանից հետո, երբ ես անտեղի բան էի ասել։ Եվ դա իսկապես ճիշտ է։ Այդ պատճառով այսօր ամբողջ երեկո լուռ կմնամ, որպեսզի որևէ հիմար բան չասեմ (չսխալվեմ)։',
    chapterId: 1,
    words: [
      { word: 'fuera de lugar', cleanWord: 'fuera de lugar', translationHy: 'անտեղի, տեղին չեղած', partOfSpeech: 'Արտահայտություն / Locución', exampleEs: 'Un comentario fuera de lugar.', exampleHy: 'Անտեղի մեկնաբանություն։' },
      { word: 'meter la pata', cleanWord: 'meter la pata', translationHy: 'սխալվել, հիմարություն անել', partOfSpeech: 'Դարձվածք / Modismo', exampleEs: 'Para no meter la pata.', exampleHy: 'Սխալ չանելու համար։' }
    ]
  },
  {
    id: 'sub_12',
    start: 180,
    end: 199,
    speaker: 'Presentador',
    textEs: 'No es el caso porque ahora tú vienes a hablar. Pero yo digo, en tu vida cotidiana, ¿te gusta el silencio? Porque me han dicho que tú vives en el campo, que no vives en el centro de Buenos Aires.',
    textHy: 'Բայց դու այսօր եկել ես խոսելու։ Ասա՝ առօրյա կյանքում սիրո՞ւմ ես լռությունը։ Ինձ ասել են, որ դու գյուղական վայրում ես ապրում, ոչ թե Բուենոս Այրեսի կենտրոնում։',
    chapterId: 1,
    words: [
      { word: 'cotidiana', cleanWord: 'cotidiana', translationHy: 'առօրյա', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Vida cotidiana.', exampleHy: 'Առօրյա կյանք։' },
      { word: 'campo', cleanWord: 'campo', translationHy: 'գյուղական վայր, դաշտ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Vivir en el campo.', exampleHy: 'Ապրել գյուղում։' },
      { word: 'centro', cleanWord: 'centro', translationHy: 'կենտրոն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'En el centro.', exampleHy: 'Կենտրոնում։' }
    ]
  },
  {
    id: 'sub_13',
    start: 200,
    end: 225,
    speaker: 'Natalia',
    textEs: 'En realidad yo tengo mi casa aquí en Buenos Aires, en el corazón de Palermo Viejo, y también vivo mucho tiempo en el campo en Uruguay, en Carmelo, donde tengo mi huerta, mis plantas, y es donde encuentro paz, y me gusta mucho el silencio.',
    textHy: 'Իրականում ես տուն ունեմ Բուենոս Այրեսում՝ Պալերմո Վիեխոյում։ Բայց նաև շատ ժամանակ եմ անցկացնում Ուրուգվայում՝ Կարմելոյում, որտեղ ունեմ իմ բանջարանոցն ու բույսերը։ Հենց այնտեղ եմ գտնում խաղաղություն։ Ես շատ եմ սիրում լռությունը։',
    chapterId: 1,
    words: [
      { word: 'corazón', cleanWord: 'corazón', translationHy: 'սիրտ, կենտրոն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'En el corazón de Palermo.', exampleHy: 'Պալերմոյի սրտում։' },
      { word: 'huerta', cleanWord: 'huerta', translationHy: 'բանջարանոց', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Cuidar mi huerta.', exampleHy: 'Խնամել բանջարանոցս։' },
      { word: 'plantas', cleanWord: 'plantas', translationHy: 'բույսեր', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Mis plantas verdes.', exampleHy: 'Իմ կանաչ բույսերը։' },
      { word: 'paz', cleanWord: 'paz', translationHy: 'խաղաղություն, անդորր', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Encontrar paz.', exampleHy: 'Գտնել խաղաղություն։' }
    ]
  },
  {
    id: 'sub_14',
    start: 226,
    end: 245,
    speaker: 'Natalia',
    textEs: 'Paradójicamente soy una persona que habla bastante, soy charlatana, pero lo necesito para encontrarme, para descansar, y también para mi profesión es muy importante saber escuchar.',
    textHy: 'Թեև բավականին շատախոս մարդ եմ, լռությունն ինձ անհրաժեշտ է ինքս ինձ հասկանալու և հանգստանալու համար։ Իմ մասնագիտության մեջ նույնպես շատ կարևոր է լսել կարողանալը։',
    chapterId: 1,
    words: [
      { word: 'charlatana', cleanWord: 'charlatana', translationHy: 'շատախոս (իգական)', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Soy charlatana.', exampleHy: 'Ես շատախոս եմ։' },
      { word: 'descansar', cleanWord: 'descansar', translationHy: 'հանգստանալ', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Necesito descansar.', exampleHy: 'Ինձ հարկավոր է հանգստանալ։' },
      { word: 'escuchar', cleanWord: 'escuchar', translationHy: 'լսել', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Saber escuchar.', exampleHy: 'Լսել իմանալ։' }
    ]
  },
  {
    id: 'sub_15',
    start: 246,
    end: 265,
    speaker: 'Natalia',
    textEs: 'Los mejores directores me han enseñado eso justamente, que a veces no es tan importante cuando uno está en toma hablando, sino cuando uno está en toma escuchando lo que dice el otro, y reaccionando.',
    textHy: 'Լավագույն ռեժիսորներն ինձ սովորեցրել են, որ նկարահանման ժամանակ երբեմն ավելի կարևոր է դիմացինիդ լսելն ու արձագանքելը, քան սեփական խոսքն ասելը։',
    chapterId: 1,
    words: [
      { word: 'directores', cleanWord: 'directores', translationHy: 'ռեժիսորներ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Los mejores directores.', exampleHy: 'Լավագույն ռեժիսորները։' },
      { word: 'reaccionando', cleanWord: 'reaccionando', translationHy: 'արձագանքելով', partOfSpeech: 'Դերբայ / Gerundio', exampleEs: 'Escuchando y reaccionando.', exampleHy: 'Լսելով և արձագանքելով։' }
    ]
  },
  {
    id: 'sub_16',
    start: 266,
    end: 285,
    speaker: 'Presentador',
    textEs: 'Exactamente, y es lo más difícil también para la interpretación, para un actor o una actriz, a lo mejor lo más difícil no es cuando se prepara para hacer entrega de una línea, sino para escuchar y reaccionar al otro.',
    textHy: 'Ճիշտ այդպես։ Դա դերասանական աշխատանքի ամենադժվար մասերից է։ Գուցե դերասանի համար ավելի դժվար է լսել և արձագանքել դիմացինին, քան արտասանել սեփական խոսքը։',
    chapterId: 1,
    words: [
      { word: 'interpretación', cleanWord: 'interpretación', translationHy: 'դերասանական խաղ, մեկնաբանում', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Una gran interpretación.', exampleHy: 'Հիանալի խաղ։' },
      { word: 'línea', cleanWord: 'línea', translationHy: 'ռեպլիկ, տեքստի տող', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Su línea de diálogo.', exampleHy: 'Իր խոսքի տողը։' }
    ]
  },
  {
    id: 'sub_17',
    start: 286,
    end: 305,
    speaker: 'Natalia',
    textEs: 'Es que uno generalmente se precipita, ahora viene mi línea y ahora tengo que hablar, y en realidad lo más interesante para el espectador, por lo menos en mi caso, es ver en los ojos del otro, lo que está diciendo y lo que está sintiendo el compañero.',
    textHy: 'Մենք հաճախ շտապում ենք՝ մտածելով. «Հիմա իմ հերթն է, հիմա ես պետք է խոսեմ»։ Բայց հանդիսատեսի համար շատ հետաքրքիր է տեսնել, թե դերասանն ինչպես է աչքերով արտահայտում այն, ինչ զգում է իր խաղընկերը։',
    chapterId: 1,
    words: [
      { word: 'espectador', cleanWord: 'espectador', translationHy: 'հանդիսատես', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Para el espectador.', exampleHy: 'Հանդիսատեսի համար։' },
      { word: 'ojos', cleanWord: 'ojos', translationHy: 'աչքեր', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'En los ojos del otro.', exampleHy: 'Դիմացինի աչքերում։' },
      { word: 'sintiendo', cleanWord: 'sintiendo', translationHy: 'զգալով', partOfSpeech: 'Դերբայ / Gerundio', exampleEs: 'Lo que está sintiendo.', exampleHy: 'Այն, ինչ նա զգում է։' }
    ]
  },
  {
    id: 'sub_18',
    start: 306,
    end: 325,
    speaker: 'Presentador',
    textEs: 'Y así nos pasa en la vida real, donde estamos siempre esperando nuestro turno para hablar en vez de escuchar a los otros. Hablemos de ti, porque nosotros hicimos una temporada en Tu Natal, Uruguay, y te enviamos el libro «El poder de escuchar», ¿te llegó?',
    textHy: 'Նույնը տեղի է ունենում իրական կյանքում։ Մենք հաճախ սպասում ենք մեր խոսելու հերթին՝ ուրիշներին իսկապես լսելու փոխարեն։ Մենք մի ամբողջ եթերաշրջան անցկացրինք քո հայրենի Ուրուգվայում և քեզ ուղարկել էինք «Լսելու ուժը» գիրքը։ Ստացե՞լ էիր այն։',
    chapterId: 2,
    words: [
      { word: 'turno', cleanWord: 'turno', translationHy: 'հերթ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Esperar nuestro turno.', exampleHy: 'Սպասել մեր հերթին։' },
      { word: 'libro', cleanWord: 'libro', translationHy: 'գիրք', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'El libro te llegó.', exampleHy: 'Գիրքը քեզ հասա՞վ։' }
    ]
  },
  {
    id: 'sub_19',
    start: 326,
    end: 335,
    speaker: 'Natalia',
    textEs: 'Sí, sí, a mí me lo mandaron.',
    textHy: 'Այո՛, այո՛, ինձ ուղարկել էին։',
    chapterId: 2,
    words: [
      { word: 'mandaron', cleanWord: 'mandaron', translationHy: 'ուղարկեցին', partOfSpeech: 'Բայ / Verbo (mandar)', exampleEs: 'Me lo mandaron.', exampleHy: 'Ինձ այն ուղարկեցին։' }
    ]
  },
  {
    id: 'sub_20',
    start: 336,
    end: 355,
    speaker: 'Natalia',
    textEs: 'Estaba filmando para Movie City Lynch, que fue un proyecto que filmamos en Colombia, hermoso, con un equipo completamente latinoamericano de técnicos y de actores, fue una muy buena experiencia, hicimos tres temporadas.',
    textHy: 'Ես նկարահանվում էի «Lynch» նախագծում, որը նկարահանել ենք Կոլումբիայում։ Դա հրաշալի փորձառություն էր։ Մեր թիմը բաղկացած էր լատինաամերիկյան տարբեր երկրների դերասաններից և տեխնիկական մասնագետներից։ Մենք նկարահանեցինք երեք եթերաշրջան։',
    chapterId: 2,
    words: [
      { word: 'filmando', cleanWord: 'filmando', translationHy: 'նկարահանվելով', partOfSpeech: 'Դերբայ / Gerundio', exampleEs: 'Estaba filmando una serie.', exampleHy: 'Սերիալում էի նկարահանվում։' },
      { word: 'equipo', cleanWord: 'equipo', translationHy: 'թիմ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Un gran equipo.', exampleHy: 'Մեծ թիմ։' },
      { word: 'temporadas', cleanWord: 'temporadas', translationHy: 'եթերաշրջաններ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Tres temporadas.', exampleHy: 'Երեք եթերաշրջան։' }
    ]
  },
  {
    id: 'sub_21',
    start: 356,
    end: 375,
    speaker: 'Presentador',
    textEs: 'En Uruguay tuvimos la oportunidad de entrevistar a Julio Bocca, argentino, radicado en este momento en Uruguay, y aquí en Buenos Aires, entonces ahora es el proceso inverso, qué honor, Natalia Oreiro, uruguaya radicada.',
    textHy: 'Ուրուգվայում մենք հնարավորություն ունեցանք հարցազրույց վերցնելու Խուլիո Բոկայից՝ արգենտինացուց, որն այժմ ապրում է Ուրուգվայում։ Իսկ հիմա Բուենոս Այրեսում զրուցում ենք ուրուգվայցի Նատալիա Օրեյրոյի հետ։',
    chapterId: 2,
    words: [
      { word: 'oportunidad', cleanWord: 'oportunidad', translationHy: 'հնարավորություն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Tener la oportunidad.', exampleHy: 'Հնարավորություն ունենալ։' },
      { word: 'radicado', cleanWord: 'radicado', translationHy: 'բնակություն հաստատած', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Radicado en Uruguay.', exampleHy: 'Ուրուգվայում բնակվող։' }
    ]
  },
  {
    id: 'sub_22',
    start: 376,
    end: 395,
    speaker: 'Natalia',
    textEs: 'Hace 20 años, sí, hace más años que vivo en la Argentina de lo que viví en Uruguay, porque yo también cuando era pequeña viví en España. Claramente yo soy uruguaya, pero hoy me siento rioplatense, de hecho soy embajadora de Buena Voluntad para UNICEF para dos países.',
    textHy: 'Արդեն քսան տարի է, ինչ ապրում եմ Արգենտինայում։ Իրականում այստեղ ավելի երկար եմ ապրել, քան Ուրուգվայում։ Փոքր ժամանակ ապրել եմ նաև Իսպանիայում։ Իհարկե, ես ուրուգվայցի եմ, բայց այսօր ինձ Ռիո դե լա Պլատայի տարածաշրջանի մարդ եմ զգում։ Ես նաև ՅՈՒՆԻՍԵՖ-ի բարի կամքի դեսպան եմ երկու երկրների համար։',
    chapterId: 2,
    words: [
      { word: 'rioplatense', cleanWord: 'rioplatense', translationHy: 'Ռիո դե լա Պլատայի բնակիչ / մշակույթի կրող', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Cultura rioplatense.', exampleHy: 'Ռիոպլատենսե մշակույթ։' },
      { word: 'embajadora', cleanWord: 'embajadora', translationHy: 'դեսպան (իգական)', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Embajadora de Buena Voluntad.', exampleHy: 'Բարի կամքի դեսպան։' }
    ]
  },
  {
    id: 'sub_23',
    start: 396,
    end: 415,
    speaker: 'Natalia',
    textEs: 'Tengo mi familia, mis padres viviendo allí, mi amiga de toda la vida, viajo constantemente y además tengo mi casa en el campo.',
    textHy: 'Իհարկե ո՛չ։ Այնտեղ ապրում են իմ ծնողները, ընտանիքս և մանկության ընկերուհիս։ Ես անընդհատ այցելում եմ Ուրուգվայ։ Բացի այդ, այնտեղ գյուղական տուն ունեմ։',
    chapterId: 2,
    words: [
      { word: 'familia', cleanWord: 'familia', translationHy: 'ընտանիք', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Amo a mi familia.', exampleHy: 'Սիրում եմ ընտանիքիս։' },
      { word: 'padres', cleanWord: 'padres', translationHy: 'ծնողներ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Mis queridos padres.', exampleHy: 'Իմ սիրելի ծնողները։' },
      { word: 'constantemente', cleanWord: 'constantemente', translationHy: 'անընդհատ, մշտապես', partOfSpeech: 'Մակբայ / Adverbio', exampleEs: 'Viajo constantemente.', exampleHy: 'Անընդհատ ճամփորդում եմ։' }
    ]
  },
  {
    id: 'sub_24',
    start: 416,
    end: 440,
    speaker: 'Natalia',
    textEs: 'Hicimos un corto con Diego Forlán justamente para mostrar el Uruguay como sede del Mundial 2030 que se cumplen 100 años del primer mundial que se hizo en el Estadio Centenario en el Uruguay, con el director Martín Sastre, se llama Protocolo Celeste.',
    textHy: 'Մենք կարճամետրաժ ֆիլմ ենք նկարահանել Դիեգո Ֆորլանի հետ։ Նպատակն էր ներկայացնել Ուրուգվայը որպես 2030 թվականի ֆուտբոլի աշխարհի առաջնության հյուրընկալող երկիր։ Այդ թվականին լրանում է Ուրուգվայում անցկացված առաջին աշխարհի առաջնության հարյուրամյակը։ Ֆիլմը կոչվում է «Protocolo Celeste»։',
    chapterId: 2,
    words: [
      { word: 'corto', cleanWord: 'corto', translationHy: 'կարճամետրաժ ֆիլմ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Hicimos un corto.', exampleHy: 'Կարճամետրաժ ֆիլմ նկարահանեցինք։' },
      { word: 'sede', cleanWord: 'sede', translationHy: 'հյուրընկալող վայր, կենտրոնատեղի', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Sede del Mundial.', exampleHy: 'Առաջնության անցկացման վայր։' }
    ]
  },
  {
    id: 'sub_25',
    start: 441,
    end: 460,
    speaker: 'Natalia',
    textEs: 'Yo con el fútbol no me llevo mucho, no entiendo nada, he llegado a decir, pero ¿cuántos juegan, 11, 12? Fui madrina de la selección Uruguaya en el Mundial, ahí entendí un poquito más, pero no soy buena mirando fútbol.',
    textHy: 'Ես ֆուտբոլից այնքան էլ լավ չեմ հասկանում։ Նույնիսկ մի անգամ հարցրել եմ՝ քանի՞ հոգի են խաղում՝ տասնմե՞կ, թե՞ տասներկու։ Մի ժամանակ եղել եմ Ուրուգվայի հավաքականի կնքամայրը աշխարհի առաջնության ժամանակ։ Այդ ժամանակ մի փոքր ավելի լավ սկսեցի հասկանալ ֆուտբոլը, բայց, միևնույն է, լավ չեմ կողմնորոշվում։',
    chapterId: 2,
    words: [
      { word: 'fútbol', cleanWord: 'fútbol', translationHy: 'ֆուտբոլ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Mirando fútbol.', exampleHy: 'Ֆուտբոլ դիտելով։' },
      { word: 'madrina', cleanWord: 'madrina', translationHy: 'կնքամայր', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Fui madrina.', exampleHy: 'Կնքամայր էի։' }
    ]
  },
  {
    id: 'sub_26',
    start: 461,
    end: 480,
    speaker: 'Natalia',
    textEs: 'Cuando juega Uruguay, por Uruguay. Y luego si Uruguay ya está fuera, por Argentina, por supuesto. Mi hijo tiene bastantes problemas porque es argentino, y cuando está el partido, con su camiseta de Uruguay grita: ¡vamos Argentina!',
    textHy: 'Երբ Ուրուգվայն է խաղում, ես Ուրուգվային եմ երկրպագում։ Իսկ եթե Ուրուգվայն արդեն դուրս է մնացել մրցաշարից, ապա, իհարկե, Արգենտինային։ Իմ որդու համար դա մի փոքր բարդ է, որովհետև նա արգենտինացի է։ Երբ խաղը սկսվում է, նա Ուրուգվայի մարզաշապիկով գոռում է. «Առա՜ջ, Արգենտինա»։',
    chapterId: 2,
    words: [
      { word: 'camiseta', cleanWord: 'camiseta', translationHy: 'մարզաշապիկ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'La camiseta celeste.', exampleHy: 'Երկնագույն մարզաշապիկը։' },
      { word: 'grita', cleanWord: 'grita', translationHy: 'գոռում է', partOfSpeech: 'Բայ / Verbo (gritar)', exampleEs: 'Grita con pasión.', exampleHy: 'Կրքով գոռում է։' }
    ]
  },
  {
    id: 'sub_27',
    start: 481,
    end: 500,
    speaker: 'Natalia',
    textEs: 'No existen en el mundo dos países más hermanos que el Uruguay y la Argentina. Nos amamos, nos queremos, nos apoyamos, a los uruguayos nos han dado muchísimas oportunidades en la Argentina siempre.',
    textHy: 'Կարծում եմ՝ աշխարհում չկան երկու ավելի եղբայրական երկրներ, քան Ուրուգվայն ու Արգենտինան։ Մենք սիրում ենք միմյանց, աջակցում ենք իրար։ Արգենտինան միշտ շատ հնարավորություններ է տվել ուրուգվայցիներին, իսկ մշակութային առումով մենք շատ նման ենք։',
    chapterId: 2,
    words: [
      { word: 'hermanos', cleanWord: 'hermanos', translationHy: 'եղբայրական, եղբայրներ', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Países hermanos.', exampleHy: 'Եղբայրական երկրներ։' },
      { word: 'apoyamos', cleanWord: 'apoyamos', translationHy: 'աջակցում ենք', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Nos apoyamos siempre.', exampleHy: 'Միշտ աջակցում ենք իրար։' }
    ]
  },
  {
    id: 'sub_28',
    start: 501,
    end: 518,
    speaker: 'Natalia',
    textEs: 'Comencé a estudiar teatro en la escuela cuando tenía ocho años, y un día con el diario en la mano le digo a mi madre: un día voy a salir acá. Y a los doce años comencé a trabajar en televisión en Uruguay haciendo publicidades.',
    textHy: 'Ես սկսել եմ թատրոն սովորել դպրոցում, երբ ութ տարեկան էի։ Մի օր թերթը ձեռքիս մոտեցա մայրիկիս և ասացի. «Մի օր ես այստեղ կհայտնվեմ»։ Իսկ տասներկու տարեկանում սկսեցի աշխատել Ուրուգվայի հեռուստատեսությունում՝ նկարահանվելով գովազդներում։',
    chapterId: 3,
    words: [
      { word: 'teatro', cleanWord: 'teatro', translationHy: 'թատրոն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Estudiar teatro.', exampleHy: 'Թատրոն ուսումնասիրել։' },
      { word: 'diario', cleanWord: 'diario', translationHy: 'թերթ, օրաթերթ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Salir en el diario.', exampleHy: 'Հայտնվել թերթում։' },
      { word: 'publicidades', cleanWord: 'publicidades', translationHy: 'գովազդներ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Haciendo publicidades.', exampleHy: 'Գովազդներ նկարահանվելով։' }
    ]
  },
  {
    id: 'sub_29',
    start: 519,
    end: 540,
    speaker: 'Natalia',
    textEs: '¿La anécdota del dinero en el pollo congelado? En realidad no era mi dinero, yo estaba en pareja y mi compañero sí guardó el dinero, pero sin avisarme, en una bolsa de patitas de pollo en el freezer.',
    textHy: 'Սառեցված հավի մեջ գումարի պատմությո՞ւնը։ Իրականում դա իմ գումարը չէր։ Այդ ժամանակ ես զուգընկեր ունեի, և նա իր գումարը պահել էր սառցախցիկում՝ հավի տոտիկներով տոպրակի մեջ, բայց ինձ ոչինչ չէր ասել։',
    chapterId: 4,
    words: [
      { word: 'pareja', cleanWord: 'pareja', translationHy: 'զուգընկեր, զույգ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Estar en pareja.', exampleHy: 'Զուգընկեր ունենալ։' },
      { word: 'freezer', cleanWord: 'freezer', translationHy: 'սառցախցիկ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Guardar en el freezer.', exampleHy: 'Պահել սառցախցիկում։' },
      { word: 'patitas', cleanWord: 'patitas', translationHy: 'ոտքեր, տոտիկներ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Patitas de pollo.', exampleHy: 'Հավի տոտիկներ։' }
    ]
  },
  {
    id: 'sub_30',
    start: 541,
    end: 558,
    speaker: 'Natalia',
    textEs: 'Bueno, yo soy vegetariana, hace muchísimos años, entonces vi las patitas de pollo y dije: «Esto está vencido». Y lo tiré.',
    textHy: 'Եվ քանի որ ես երկար տարիներ բուսակեր եմ, երբ տեսա հավի տոտիկները, մտածեցի. «Սրա պիտանելիության ժամկետն անցել է»։ Եվ դեն նետեցի։',
    chapterId: 4,
    words: [
      { word: 'vegetariana', cleanWord: 'vegetariana', translationHy: 'բուսակեր (իգական)', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Yo soy vegetariana.', exampleHy: 'Ես բուսակեր եմ։' },
      { word: 'vencido', cleanWord: 'vencido', translationHy: 'ժամկետանց', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Esto está vencido.', exampleHy: 'Սրա ժամկետն անցել է։' },
      { word: 'tiré', cleanWord: 'tiré', translationHy: 'դեն նետեցի', partOfSpeech: 'Բայ / Verbo (tirar)', exampleEs: 'Lo tiré a la basura.', exampleHy: 'Ես դա նետեցի աղբամանը։' }
    ]
  },
  {
    id: 'sub_31',
    start: 559,
    end: 573,
    speaker: 'Natalia',
    textEs: 'A la noche se le dio por revisar sus ahorros, vino blanco y me dijo: Natalia, ¿las patitas? Las tiré. ¡Tenían 3.000 o 4.000 dólares adentro y salió desesperado a buscarlo a la basura! Sí, y se recuperaron.',
    textHy: 'Բարեբախտաբար, այդ երեկո նա որոշեց ստուգել իր խնայողությունները։ Գունատված եկավ ու հարցրեց. «Նատալիա, իսկ հավի տոտիկնե՞րը...»։ Ես ասացի. «Դեն եմ նետել»։ Եվ այդ պահին նա ասաց, որ տոպրակի մեջ մոտ երեք կամ չորս հազար դոլար կար։ Նա խուճապահար վազեց դրանք փնտրելու աղբում, և գումարը գտանք։',
    chapterId: 4,
    words: [
      { word: 'ahorros', cleanWord: 'ahorros', translationHy: 'խնայողություններ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Revisar sus ahorros.', exampleHy: 'Ստուգել խնայողությունները։' },
      { word: 'desesperado', cleanWord: 'desesperado', translationHy: 'հուսահատ, խուճապահար', partOfSpeech: 'Ածական / Adjetivo', exampleEs: 'Salió desesperado.', exampleHy: 'Խուճապահար դուրս վազեց։' },
      { word: 'recuperaron', cleanWord: 'recuperaron', translationHy: 'հետ բերեցին, գտան', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Se recuperaron a tiempo.', exampleHy: 'Ժամանակին գտնվեցին։' }
    ]
  },
  {
    id: 'sub_32',
    start: 574,
    end: 610,
    speaker: 'Natalia',
    textEs: 'Gané el Cóndor de Plata a Mejor Actriz por Wakolda de Lucía Puenzo. Y recordé mi primer casting en la Argentina donde el director me preguntó: ¿de qué vas a vivir? Le digo: quiero ser actriz. «Dedícate a otra cosa», me contestó.',
    textHy: 'Ես առաջադրված էի լավագույն դերասանուհու անվանակարգում և հաղթեցի Լուսիա Պուենսոյի «Wakolda» ֆիլմում կատարած դերի համար։ Եվ հիշեցի իմ առաջին քասթինգը, երբ ռեժիսորն ինձ հարցրեց. «Ինչո՞վ ես ապրուստ վաստակելու»։ Ես ասացի. «Ուզում եմ դերասանուհի դառնալ»։ Նա ինձ պատասխանեց. «Ուրիշ գործով զբաղվիր»։',
    chapterId: 5,
    words: [
      { word: 'casting', cleanWord: 'casting', translationHy: 'քասթինգ, փորձ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Mi primer casting.', exampleHy: 'Իմ առաջին քասթինգը։' },
      { word: 'dedícate', cleanWord: 'dedícate', translationHy: 'զբաղվի՛ր (հրամայական)', partOfSpeech: 'Բայ / Verbo imperativo', exampleEs: 'Dedícate a otra cosa.', exampleHy: 'Ուրիշ գործով զբաղվիր։' }
    ]
  },
  {
    id: 'sub_33',
    start: 611,
    end: 645,
    speaker: 'Natalia',
    textEs: 'Le agradecí a todos los directores que vinieron después que sí confiaron en mí, porque es muy difícil crecer sin la confianza del otro. Lo más importante es la confianza de uno, la fuerza, la valentía y la decisión.',
    textHy: 'Շնորհակալություն հայտնեցի բոլոր այն ռեժիսորներին, որոնք հետագայում հավատացին ինձ։ Որովհետև շատ դժվար է աճել, երբ ուրիշները քեզ չեն վստահում։ Իհարկե, ամենակարևորը սեփական ուժերին հավատալն է, քաջությունը, ուժը և վճռականությունը։',
    chapterId: 5,
    words: [
      { word: 'confianza', cleanWord: 'confianza', translationHy: 'վստահություն, հավատ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'La confianza en uno mismo.', exampleHy: 'Ինքնավստահություն։' },
      { word: 'valentía', cleanWord: 'valentía', translationHy: 'քաջություն, արիություն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Tener valentía.', exampleHy: 'Քաջություն ունենալ։' }
    ]
  },
  {
    id: 'sub_34',
    start: 646,
    end: 674,
    speaker: 'Natalia',
    textEs: 'Soy Tauro con ascendente en Tauro, soy súper cabeza dura. Todo lo que te has propuesto lo has ido consiguiendo con mucha determinación.',
    textHy: 'Ես Ցուլ եմ, և իմ ասցենդենտը նույնպես Ցուլ է։ Այնպես որ շատ համառ եմ։ Այն ամենին, ինչ նպատակ ես դրել քո առջև, հասել ես մեծ վճռականությամբ։',
    chapterId: 5,
    words: [
      { word: 'cabeza dura', cleanWord: 'cabeza dura', translationHy: 'համառ, գլխակորույս նպատակասլաց', partOfSpeech: 'Արտահայտություն / Modismo', exampleEs: 'Soy muy cabeza dura.', exampleHy: 'Ես շատ համառ եմ։' },
      { word: 'determinación', cleanWord: 'determinación', translationHy: 'վճռականություն', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Con gran determinación.', exampleHy: 'Մեծ վճռականությամբ։' }
    ]
  },
  {
    id: 'sub_35',
    start: 675,
    end: 710,
    speaker: 'Natalia',
    textEs: 'Yo creo mucho en el poder de la mente. Si uno piensa claramente lo que quiere y se ve en ese lugar, si lo visualiza, con el tiempo eso sucede. Me pasó con Raffaella Carrà: canté jugando en vacaciones con amigas, y al mes exacto me llamó su productor para grabar con ella en Italia.',
    textHy: 'Ես շատ եմ հավատում մտքի ուժին։ Եթե մարդը հստակ պատկերացնում է իր ցանկությունը և մտովի տեսնում իրեն այդ իրավիճակում, ժամանակի ընթացքում այն կարող է իրականություն դառնալ։ Օրինակ՝ Ռաֆայելա Կառայի հետ․ արձակուրդում ընկերուհիներիս հետ երգեցի, իսկ ուղիղ մեկ ամիս անց ինձ զանգահարեց նրա պրոդյուսերը՝ Իտալիայում նրա հետ ձայնագրվելու համար։',
    chapterId: 6,
    words: [
      { word: 'mente', cleanWord: 'mente', translationHy: 'միտք', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'El poder de la mente.', exampleHy: 'Մտքի ուժը։' },
      { word: 'visualiza', cleanWord: 'visualiza', translationHy: 'պատկերացնում է, տեսնում է', partOfSpeech: 'Բայ / Verbo', exampleEs: 'Visualizar tus sueños.', exampleHy: 'Պատկերացնել երազանքները։' }
    ]
  },
  {
    id: 'sub_36',
    start: 711,
    end: 739,
    speaker: 'Natalia',
    textEs: 'Hay que tener cuidado con lo que uno dice y proyecta, porque las palabras tienen una fuerza muy importante. Los deseos se te pueden convertir en realidad.',
    textHy: 'Պետք է զգույշ լինել, թե ինչ ես ասում և մտովի պատկերացնում, որովհետև խոսքերը մեծ ուժ ունեն։ Ցանկությունները կարող են իրականություն դառնալ։',
    chapterId: 6,
    words: [
      { word: 'fuerza', cleanWord: 'fuerza', translationHy: 'ուժ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'La fuerza de la palabra.', exampleHy: 'Խոսքի ուժը։' },
      { word: 'deseos', cleanWord: 'deseos', translationHy: 'ցանկություններ, երազանքներ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Los deseos se cumplen.', exampleHy: 'Ցանկությունները կատարվում են։' }
    ]
  },
  {
    id: 'sub_37',
    start: 740,
    end: 770,
    speaker: 'Natalia',
    textEs: '¿Símbolo sexual? A mí me gusta jugar, me gusta disfrazarme, cambiarme el look de pelo. Hija de madre peluquera, ya experimentaba conmigo de pequeña. Pero en lo personal me siento una chica común.',
    textHy: 'Սեքս-խորհրդանի՞շ։ Ես պարզապես սիրում եմ խաղալ տարբեր կերպարների հետ, կերպարանափոխվել, փոխել մազերիս տեսքը։ Մայրս վարսահարդար է, դեռ փոքր ժամանակ փորձարկում էր ինձ վրա։ Բայց անձնական կյանքում ես ինձ սովորական աղջիկ եմ զգում։',
    chapterId: 7,
    words: [
      { word: 'disfrazarme', cleanWord: 'disfrazarme', translationHy: 'կերպարանափոխվել, հագուստս փոխել', partOfSpeech: 'Բայ / Verbo reflexivo', exampleEs: 'Me gusta disfrazarme.', exampleHy: 'Ինձ դուր է գալիս կերպարանափոխվել։' },
      { word: 'peluquera', cleanWord: 'peluquera', translationHy: 'վարսահարդար', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Madre peluquera.', exampleHy: 'Վարսահարդար մայրիկ։' }
    ]
  },
  {
    id: 'sub_38',
    start: 771,
    end: 800,
    speaker: 'Natalia',
    textEs: 'Lo bueno para un actor es no ser siempre los mismos personajes, si no uno se termina copiando a uno mismo y te quedas instalado. Creo que las esposas se las pone uno mismo. Nosotros no tenemos techo.',
    textHy: 'Դերասանի համար կարևոր է միշտ նույն կերպարը չխաղալը։ Հակառակ դեպքում սկսում ես կրկնել ինքդ քեզ և մնում ես նույն սահմաններում։ Կարծում եմ՝ մարդն ինքն է իր համար սահմանափակումներ ստեղծում։ Ես հավատում եմ, որ մեր հնարավորություններն անսահման են։',
    chapterId: 7,
    words: [
      { word: 'personajes', cleanWord: 'personajes', translationHy: 'կերպարներ', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'Nuevos personajes.', exampleHy: 'Նոր կերպարներ։' },
      { word: 'techo', cleanWord: 'techo', translationHy: 'առաստաղ, սահմանափակում', partOfSpeech: 'Գոյական / Sustantivo', exampleEs: 'No tenemos techo.', exampleHy: 'Մենք սահմանափակումներ (առաստաղ) չունենք։' }
    ]
  }
];

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 1,
    statementEs: 'Natalia es vegetariana.',
    statementHy: 'Նատալիան բուսակեր է։',
    isTrue: true,
    explanationEs: 'Verdadero. Natalia lo explica claramente al hablar de por qué no revisó el paquete de pollo.',
    explanationHy: 'Ճիշտ է։ Նատալիան դա պարզ նշում է՝ բացատրելով, թե ինչու չէր ստուգել հավի տոպրակը։',
    chapterRef: 4
  },
  {
    id: 2,
    statementEs: 'Natalia guardó personalmente el dinero en el congelador.',
    statementHy: 'Նատալիան անձամբ էր պահել գումարը սառցախցիկում։',
    isTrue: false,
    explanationEs: 'Falso. Fue su pareja quien guardó el dinero allí sin decirle nada.',
    explanationHy: 'Սխալ է։ Նրա զուգընկերն էր գումարը պահել այնտեղ՝ առանց նրան ասելու։',
    chapterRef: 4
  },
  {
    id: 3,
    statementEs: 'Su pareja escondió el dinero sin avisarle.',
    statementHy: 'Նրա զուգընկերը թաքցրել էր գումարը՝ առանց նրան զգուշացնելու։',
    isTrue: true,
    explanationEs: 'Verdadero. Ella no tenía idea de que había dinero en esa bolsa.',
    explanationHy: 'Ճիշտ է։ Նա գաղափար չուներ, որ այդ տոպրակում գումար կա։',
    chapterRef: 4
  },
  {
    id: 4,
    statementEs: 'Natalia sabía que había dinero en la bolsa.',
    statementHy: 'Նատալիան գիտեր, որ տոպրակի մեջ գումար կա։',
    isTrue: false,
    explanationEs: 'Falso. Si lo hubiera sabido, jamás la habría tirado a la basura.',
    explanationHy: 'Սխալ է։ Եթե իմանար, երբեք այն աղբամանը չէր նետի։',
    chapterRef: 4
  },
  {
    id: 5,
    statementEs: 'Natalia tiró la bolsa porque pensó que el pollo estaba vencido.',
    statementHy: 'Նատալիան նետեց տոպրակը, քանի որ կարծեց, որ հավի ժամկետն անցել է։',
    isTrue: true,
    explanationEs: 'Verdadero. Al ver la fecha y el estado, pensó que estaba caducado.',
    explanationHy: 'Ճիշտ է։ Տեսնելով վիճակը՝ նա կարծեց, որ այն ժամկետանց է։',
    chapterRef: 4
  },
  {
    id: 6,
    statementEs: 'Natalia recuperó el dinero.',
    statementHy: 'Նատալիան վերադարձրեց (գտավ) գումարը։',
    isTrue: true,
    explanationEs: 'Verdadero. Afortunadamente fueron a buscar la bolsa antes de que pasara el camión de la basura.',
    explanationHy: 'Ճիշտ է։ Բարեբախտաբար նրանք գտան տոպրակը նախքան աղբատար մեքենայի գալը։',
    chapterRef: 4
  },
  {
    id: 7,
    statementEs: 'Natalia empezó a trabajar en televisión a los doce años.',
    statementHy: 'Նատալիան սկսել է հեռուստատեսությունում աշխատել տասներկու տարեկանում։',
    isTrue: true,
    explanationEs: 'Verdadero. Comenzó haciendo comerciales publicitarios a los 12 años.',
    explanationHy: 'Ճիշտ է։ Նա 12 տարեկանում սկսել է նկարահանվել գովազդներում։',
    chapterRef: 3
  },
  {
    id: 8,
    statementEs: 'Natalia nació en Argentina.',
    statementHy: 'Նատալիան ծնվել է Արգենտինայում։',
    isTrue: false,
    explanationEs: 'Falso. Natalia nació en Montevideo, Uruguay.',
    explanationHy: 'Սխալ է։ Նատալիան ծնվել է Ուրուգվայի մայրաքաղաք Մոնտեվիդեոյում։',
    chapterRef: 2
  },
  {
    id: 9,
    statementEs: 'Natalia tiene una casa en Uruguay.',
    statementHy: 'Նատալիան տուն ունի Ուրուգվայում։',
    isTrue: true,
    explanationEs: 'Verdadero. Conserva su casa en Carmelo, Uruguay, con su huerta y sus plantas.',
    explanationHy: 'Ճիշտ է։ Տուն ունի Կարմելոյում (Ուրուգվայ)՝ բանջարանոցով ու բույսերով։',
    chapterRef: 2
  },
  {
    id: 10,
    statementEs: 'Natalia entiende perfectamente el fútbol.',
    statementHy: 'Նատալիան կատարյալ հասկանում է ֆուտբոլը։',
    isTrue: false,
    explanationEs: 'Falso. Confiesa con humor que no entiende nada y llegó a preguntar si jugaban 11 o 12.',
    explanationHy: 'Սխալ է։ Նա հումորով խոստովանում է, որ ոչինչ չի հասկանում և հարցրել էր՝ 11, թե 12 հոգի են խաղում։',
    chapterRef: 2
  },
  {
    id: 11,
    statementEs: 'A Natalia le gusta el silencio y la tranquilidad.',
    statementHy: 'Նատալիային դուր է գալիս լռությունն ու հանգստությունը։',
    isTrue: true,
    explanationEs: 'Verdadero. Explica que necesita el silencio para encontrarse y descansar.',
    explanationHy: 'Ճիշտ է։ Նա նշում է, որ լռությունն իրեն պետք է ինքն իրեն գտնելու և հանգստանալու համար։',
    chapterRef: 1
  },
  {
    id: 12,
    statementEs: 'En el congelador había alrededor de cien dólares.',
    statementHy: 'Սառցախցիկում մոտավորապես հարյուր դոլար կար։',
    isTrue: false,
    explanationEs: 'Falso. Había una suma de 3.000 a 4.000 dólares.',
    explanationHy: 'Սխալ է։ Այնտեղ 3.000-ից 4.000 դոլար կար։',
    chapterRef: 4
  },
  {
    id: 13,
    statementEs: 'El presentador de la entrevista se llama Cala.',
    statementHy: 'Հարցազրույցի վարողի անունը Կալա է (Իսմայել Կալա)։',
    isTrue: true,
    explanationEs: 'Verdadero. El programa es el célebre show de Ismael Cala en CNN en Español.',
    explanationHy: 'Ճիշտ է։ Հաղորդումը Իսմայել Կալայի հայտնի շոուն է։',
    chapterRef: 1
  },
  {
    id: 14,
    statementEs: 'El director de su primer casting le dijo que se dedicara a otra cosa.',
    statementHy: 'Նրա առաջին քասթինգի ռեժիսորը նրան ասաց, որ ուրիշ գործով զբաղվի։',
    isTrue: true,
    explanationEs: 'Verdadero. El director le dijo: «Dedícate a otra cosa», pero ella nunca bajó los brazos.',
    explanationHy: 'Ճիշտ է։ Ռեժիսորն ասաց․ «Dedícate a otra cosa», բայց նա երբեք չհանձնվեց։',
    chapterRef: 5
  },
  {
    id: 15,
    statementEs: 'Natalia cantó con Raffaella Carrà en Italia un mes después de grabarse en vacaciones.',
    statementHy: 'Նատալիան երգեց Ռաֆայելա Կառայի հետ Իտալիայում՝ արձակուրդում իրեն ձայնագրելուց 1 ամիս անց։',
    isTrue: true,
    explanationEs: 'Verdadero. Narra la sincronía de cómo su deseo y juego se hizo realidad.',
    explanationHy: 'Ճիշտ է։ Պատմում է այն մասին, թե ինչպես նրա ցանկությունն ու կատակն իրականացան։',
    chapterRef: 6
  },
  {
    id: 16,
    statementEs: 'Natalia afirma que los actores no tienen techo.',
    statementHy: 'Նատալիան պնդում է, որ դերասանների հնարավորություններն անսահման են («no tienen techo»)։',
    isTrue: true,
    explanationEs: 'Verdadero. Concluye la entrevista diciendo: «Creo que nosotros no tenemos techo».',
    explanationHy: 'Ճիշտ է։ Հարցազրույցն ավարտում է ասելով․ «Կարծում եմ՝ մեր հնարավորություններն անսահման են»։',
    chapterRef: 7
  },
  {
    id: 17,
    statementEs: 'Natalia considera a Argentina y Uruguay como países hermanos.',
    statementHy: 'Նատալիան Արգենտինան և Ուրուգվայը համարում է եղբայրական երկրներ։',
    isTrue: true,
    explanationEs: 'Verdadero. Explica el vínculo estrecho y el cariño compartido a ambos lados del río.',
    explanationHy: 'Ճիշտ է։ Նա նկարագրում է երկու ափերի սերտ կապն ու փոխադարձ սերը։',
    chapterRef: 2
  },
  {
    id: 18,
    statementEs: 'La comida congelada que Natalia tiró era pescado fresco.',
    statementHy: 'Սառեցված սնունդը, որ Նատալիան դեն նետեց, թարմ ձուկ էր։',
    isTrue: false,
    explanationEs: 'Falso. Eran patitas de pollo congeladas.',
    explanationHy: 'Սխալ է։ Դա սառեցված հավի ոտքեր էին։',
    chapterRef: 4
  },
  {
    id: 19,
    statementEs: 'Natalia es Tauro y se describe como muy cabeza dura.',
    statementHy: 'Նատալիան Ցուլ է և իրեն նկարագրում է որպես շատ համառ («cabeza dura»)։',
    isTrue: true,
    explanationEs: 'Verdadero. Dice con humor: «Soy Tauro con ascendente en Tauro, soy súper cabeza dura».',
    explanationHy: 'Ճիշտ է։ Հումորով ասում է՝ «Soy Tauro con ascendente en Tauro, soy súper cabeza dura»։',
    chapterRef: 5
  },
  {
    id: 20,
    statementEs: 'La madre de Natalia era peluquera.',
    statementHy: 'Նատալիայի մայրիկը վարսահարդար էր։',
    isTrue: true,
    explanationEs: 'Verdadero. Siendo hija de madre peluquera, experimentaba con sus cortes y colores desde chica.',
    explanationHy: 'Ճիշտ է։ Մայրիկը վարսահարդար էր, ուստի դեռ մանկուց փորձարկումներ էր անում իր մազերի վրա։',
    chapterRef: 7
  }
];

export const WHO_SAID_QUESTIONS: WhoSaidQuestion[] = [
  {
    id: 1,
    quoteEs: '«Qué rico ese tango, a lo mejor podemos bailar tango con Natalia Oreiro.»',
    quoteHy: '«Ի՜նչ հաճելի տանգո էր։ Գուցե կարողանանք տանգո պարել Նատալիա Օրեյրոյի հետ։»',
    speaker: 'Presentador',
    contextEs: 'Apertura del programa Cala desde Buenos Aires.',
    contextHy: 'Հաղորդման բացումը Բուենոս Այրեսից։'
  },
  {
    id: 2,
    quoteEs: '«Uno tarda dos años en aprender a hablar y 60 en aprender a callarse.»',
    quoteHy: '«Մարդուն երկու տարի է պետք խոսել սովորելու համար, իսկ վաթսուն տարի՝ լռել սովորելու համար։»',
    speaker: 'Natalia',
    contextEs: 'Cita que le dijeron tras haber dicho algo fuera de lugar.',
    contextHy: 'Այն խոսքերը, որ նրան ասել էին անտեղի բան ասելուց հետո։'
  },
  {
    id: 3,
    quoteEs: '«Yo soy vegetariana, hace muchísimos años.»',
    quoteHy: '«Ես բուսակեր եմ, արդեն երկար տարիներ։»',
    speaker: 'Natalia',
    contextEs: 'Explicando por qué tiró las patitas de pollo.',
    contextHy: 'Բացատրելով, թե ինչու դեն նետեց հավի տոտիկները։'
  },
  {
    id: 4,
    quoteEs: '«Dedícate a otra cosa.»',
    quoteHy: '«Ուրիշ գործով զբաղվիր։»',
    speaker: 'Presentador',
    contextEs: 'Palabras del director del primer casting citadas en la entrevista.',
    contextHy: 'Առաջին քասթինգի ռեժիսորի խոսքերը, որոնք մեջբերվում են հարցազրույցում։'
  },
  {
    id: 5,
    quoteEs: '«Creo que nosotros no tenemos techo.»',
    quoteHy: '«Ես հավատում եմ, որ մեր հնարավորություններն անսահման են։»',
    speaker: 'Natalia',
    contextEs: 'Reflexión final sobre el crecimiento actoral y no ponerse límites.',
    contextHy: 'Եզրափակիչ խոհ դերասանական աճի և սահմանափակումներ չդնելու մասին։'
  },
  {
    id: 6,
    quoteEs: '«¿Y es cierto la anécdota de que llegaste a guardar el dinero dentro de un pollo congelado?»',
    quoteHy: '«Ճի՞շտ է այն պատմությունը, որ գումար ես պահել սառեցված հավի մեջ։»',
    speaker: 'Presentador',
    contextEs: 'Cala preguntando por la famosa historia del freezer.',
    contextHy: 'Կալան հարցնում է սառցախցիկի հայտնի պատմության մասին։'
  },
  {
    id: 7,
    quoteEs: '«Soy Tauro con ascendente en Tauro, soy súper cabeza dura.»',
    quoteHy: '«Ես Ցուլ եմ, և իմ ասցենդենտը նույնպես Ցուլ է։ Այնպես որ շատ համառ եմ։»',
    speaker: 'Natalia',
    contextEs: 'Hablando de su perseverancia y constancia.',
    contextHy: 'Խոսելով իր համառության և հաստատակամության մասին։'
  },
  {
    id: 8,
    quoteEs: '«En realidad yo tengo mi casa aquí en Buenos Aires y también vivo mucho tiempo en el campo en Carmelo.»',
    quoteHy: '«Իրականում ես տուն ունեմ Բուենոս Այրեսում, բայց նաև շատ ժամանակ եմ անցկացնում Կարմելոյի գյուղական տանս։»',
    speaker: 'Natalia',
    contextEs: 'Ubicación de sus hogares en Argentina y Uruguay.',
    contextHy: 'Նրա բնակության վայրերը Արգենտինայում և Ուրուգվայում։'
  },
  {
    id: 9,
    quoteEs: '«China Zorrilla era el ejemplo más claro de la unión cultural de estos dos países.»',
    quoteHy: '«Չինա Սոռիլյան այդ երկու երկրների մշակութային միասնության ամենավառ օրինակներից էր։»',
    speaker: 'Presentador',
    contextEs: 'Homenajeando el puente cultural entre Uruguay y Argentina.',
    contextHy: 'Մեծարելով երկու երկրների միջև մշակութային կապը։'
  },
  {
    id: 10,
    quoteEs: '«Yo con el fútbol no me llevo mucho, no entiendo nada, he llegado a decir: ¿cuántos juegan, 11, 12?»',
    quoteHy: '«Ես ֆուտբոլից այնքան էլ լավ չեմ հասկանում, նույնիսկ հարցրել եմ՝ քանի՞ հոգի են խաղում՝ 11, թե՞ 12։»',
    speaker: 'Natalia',
    contextEs: 'Reconociendo con gracia sus conocimientos futbolísticos.',
    contextHy: 'Հումորով խոստովանելով ֆուտբոլային գիտելիքները։'
  },
  {
    id: 11,
    quoteEs: '«¿Tú te ves como un símbolo sexual?»',
    quoteHy: '«Դու քեզ սեքսուալության խորհրդանի՞շ ես համարում։»',
    speaker: 'Presentador',
    contextEs: 'Preguntando sobre las producciones fotográficas.',
    contextHy: 'Հարցնելով ֆոտոշարքերի և իմիջի մասին։'
  },
  {
    id: 12,
    quoteEs: '«A mí me gusta jugar, en realidad trabajo en esto desde que tengo 12 años.»',
    quoteHy: '«Ես պարզապես սիրում եմ խաղալ, այս ոլորտում աշխատում եմ 12 տարեկանից։»',
    speaker: 'Natalia',
    contextEs: 'Explicando su enfoque lúdico y profesional.',
    contextHy: 'Բացատրելով խաղային և մասնագիտական մոտեցումը։'
  },
  {
    id: 13,
    quoteEs: '«Natalia, las patitas... ¡tenían 4.000 dólares adentro!»',
    quoteHy: '«Նատալիա, իսկ հավի տոտիկնե՞րը... մեջը 4000 դոլար կար։»',
    speaker: 'Natalia',
    contextEs: 'Imitando la reacción asustada de su compañero.',
    contextHy: 'Նմանակելով զուգընկերոջ վախեցած արձագանքը։'
  },
  {
    id: 14,
    quoteEs: '«Yo creo mucho en el poder de la mente.»',
    quoteHy: '«Ես շատ եմ հավատում մտքի ուժին։»',
    speaker: 'Natalia',
    contextEs: 'Filosofía sobre cómo los deseos se convierten en realidad.',
    contextHy: 'Փիլիսոփայություն այն մասին, թե ինչպես են երազանքներն իրականանում։'
  },
  {
    id: 15,
    quoteEs: '«Muchas gracias, encantada de estar en tu programa.»',
    quoteHy: '«Շատ շնորհակալ եմ։ Շատ ուրախ եմ քո հաղորդմանը մասնակցելու համար։»',
    speaker: 'Natalia',
    contextEs: 'El saludo inicial a Cala.',
    contextHy: 'Սկզբնական ողջույնը Կալային։'
  }
];

export const FILL_BLANK_QUESTIONS: FillBlankQuestion[] = [
  {
    id: 1,
    sentenceEs: 'Yo soy ________.',
    sentenceHy: 'Ես ________ եմ։',
    options: [
      { textEs: 'vegetariana', textHy: 'բուսակեր (իգական)' },
      { textEs: 'futbolista', textHy: 'ֆուտբոլիստ' },
      { textEs: 'profesora', textHy: 'ուսուցչուհի' },
      { textEs: 'directora', textHy: 'ռեժիսոր / տնօրեն' }
    ],
    correctIndex: 0,
    explanationEs: 'Natalia dice: «Yo soy vegetariana, hace muchísimos años».',
    explanationHy: 'Նատալիան ասում է․ «Yo soy vegetariana» (Ես բուսակեր եմ)։'
  },
  {
    id: 2,
    sentenceEs: 'Yo tengo mi casa en Carmelo, en ________.',
    sentenceHy: 'Ես տուն ունեմ Կարմելոյում՝ ________-ում։',
    options: [
      { textEs: 'Madrid', textHy: 'Մադրիդ' },
      { textEs: 'París', textHy: 'Փարիզ' },
      { textEs: 'Uruguay', textHy: 'Ուրուգվայ' },
      { textEs: 'Londres', textHy: 'Լոնդոն' }
    ],
    correctIndex: 2,
    explanationEs: 'Natalia mantiene su hogar con huerta y plantas en Carmelo, Uruguay.',
    explanationHy: 'Նատալիան տուն ունի Կարմելոյում (Ուրուգվայ)։'
  },
  {
    id: 3,
    sentenceEs: 'Me gusta mucho el ________.',
    sentenceHy: 'Ինձ շատ է դուր գալիս ________-ը։',
    options: [
      { textEs: 'ruido', textHy: 'աղմուկ' },
      { textEs: 'silencio', textHy: 'լռություն' },
      { textEs: 'tráfico', textHy: 'երթևեկություն' },
      { textEs: 'frío', textHy: 'ցուրտ' }
    ],
    correctIndex: 1,
    explanationEs: 'Natalia expresa: «Me gusta mucho el silencio».',
    explanationHy: 'Նատալիան ասում է․ «Me gusta mucho el silencio» (Ինձ շատ է դուր գալիս լռությունը)։'
  },
  {
    id: 4,
    sentenceEs: 'El dinero estaba dentro de una bolsa de patitas de ________ congelado.',
    sentenceHy: 'Գումարը սառեցված ________-ի տոտիկների տոպրակում էր։',
    options: [
      { textEs: 'pan', textHy: 'հաց' },
      { textEs: 'pollo', textHy: 'հավ' },
      { textEs: 'helado', textHy: 'պաղպաղակ' },
      { textEs: 'arroz', textHy: 'բրինձ' }
    ],
    correctIndex: 1,
    explanationEs: 'El dinero estaba escondido en patitas de pollo congelado.',
    explanationHy: 'Գումարը թաքցված էր սառեցված հավի տոտիկների տոպրակում։'
  },
  {
    id: 5,
    sentenceEs: 'Natalia pensó que la comida estaba ________.',
    sentenceHy: 'Նատալիան կարծեց, որ սնունդը ________ էր։',
    options: [
      { textEs: 'vencida', textHy: 'ժամկետանց' },
      { textEs: 'caliente', textHy: 'տաք' },
      { textEs: 'deliciosa', textHy: 'համեղ' },
      { textEs: 'dorada', textHy: 'ոսկեզօծ' }
    ],
    correctIndex: 0,
    explanationEs: 'Natalia vio la bolsa y dijo: «Esto está vencido».',
    explanationHy: 'Նատալիան տեսավ տոպրակն ու ասաց․ «Սրա ժամկետն անցել է»։'
  },
  {
    id: 6,
    sentenceEs: 'Natalia empezó a hacer comerciales a los ________ años.',
    sentenceHy: 'Նատալիան սկսեց գովազդներ նկարահանվել ________ տարեկանում։',
    options: [
      { textEs: 'cinco', textHy: 'հինգ' },
      { textEs: 'doce', textHy: 'տասներկու' },
      { textEs: 'veinte', textHy: 'քսան' },
      { textEs: 'dieciocho', textHy: 'տասնութ' }
    ],
    correctIndex: 1,
    explanationEs: 'Comenzó su carrera publicitaria a los doce años.',
    explanationHy: 'Նա սկսեց իր գովազդային կարիերան 12 տարեկանում։'
  },
  {
    id: 7,
    sentenceEs: 'En el primer casting el director le dijo: «Dedícate a otra ________».',
    sentenceHy: 'Առաջին քասթինգի ժամանակ ռեժիսորն ասաց․ «Զբաղվիր ուրիշ ________-ով»։',
    options: [
      { textEs: 'cosa', textHy: 'բանով / գործով' },
      { textEs: 'fiesta', textHy: 'երեկույթով' },
      { textEs: 'canción', textHy: 'երգով' },
      { textEs: 'comida', textHy: 'սննդով' }
    ],
    correctIndex: 0,
    explanationEs: 'Le dijeron: «Dedícate a otra cosa», pero no se rindió.',
    explanationHy: 'Նրան ասացին՝ «Dedícate a otra cosa», բայց նա չհանձնվեց։'
  },
  {
    id: 8,
    sentenceEs: 'Natalia es Tauro y se considera muy cabeza ________.',
    sentenceHy: 'Նատալիան Ցուլ է և իրեն համարում է շատ cabeza ________ (համառ)։',
    options: [
      { textEs: 'dura', textHy: 'պինդ / համառ (dura)' },
      { textEs: 'blanda', textHy: 'փափուկ' },
      { textEs: 'fría', textHy: 'սառը' },
      { textEs: 'rápida', textHy: 'արագ' }
    ],
    correctIndex: 0,
    explanationEs: '«Cabeza dura» es ser terco o muy perseverante.',
    explanationHy: '«Cabeza dura» նշանակում է համառ, նպատակասլաց։'
  },
  {
    id: 9,
    sentenceEs: 'En la bolsa había aproximadamente ________ mil dólares.',
    sentenceHy: 'Տոպրակում մոտավորապես ________ հազար դոլար կար։',
    options: [
      { textEs: 'cien', textHy: 'հարյուր' },
      { textEs: 'cuatro', textHy: 'չորս' },
      { textEs: 'cincuenta', textHy: 'հիսուն' },
      { textEs: 'dos', textHy: 'երկու' }
    ],
    correctIndex: 1,
    explanationEs: 'Menciona que había alrededor de 3.000 a 4.000 dólares.',
    explanationHy: 'Նա նշում է, որ այնտեղ մոտ 3000 - 4000 դոլար կար։'
  },
  {
    id: 10,
    sentenceEs: 'Natalia grabó en Italia con su ídolo Raffaella ________.',
    sentenceHy: 'Նատալիան Իտալիայում ձայնագրվեց իր կուռք Ռաֆայելա ________-ի հետ։',
    options: [
      { textEs: 'Carrà', textHy: 'Կառա' },
      { textEs: 'Pavía', textHy: 'Պավիա' },
      { textEs: 'Rossi', textHy: 'Ռոսի' },
      { textEs: 'Loren', textHy: 'Լորեն' }
    ],
    correctIndex: 0,
    explanationEs: 'Grabó con la gran Raffaella Carrà.',
    explanationHy: 'Նա ձայնագրվեց Ռաֆայելա Կառայի հետ։'
  },
  {
    id: 11,
    sentenceEs: 'Natalia tiene su casa porteña en el barrio de Palermo ________.',
    sentenceHy: 'Նատալիայի տունը Բուենոս Այրեսում գտնվում է Պալերմո ________ թաղամասում։',
    options: [
      { textEs: 'Viejo', textHy: 'Վիեխո (Palermo Viejo)' },
      { textEs: 'Nuevo', textHy: 'Նուևո' },
      { textEs: 'Chico', textHy: 'Չիկո' },
      { textEs: 'Norte', textHy: 'Նորտե' }
    ],
    correctIndex: 0,
    explanationEs: 'Vive en el corazón de Palermo Viejo.',
    explanationHy: 'Ապրում է Պալերմո Վիեխոյում։'
  },
  {
    id: 12,
    sentenceEs: 'La madre de Natalia trabajaba como ________.',
    sentenceHy: 'Նատալիայի մայրիկն աշխատում էր որպես ________։',
    options: [
      { textEs: 'peluquera', textHy: 'վարսահարդար' },
      { textEs: 'médica', textHy: 'բժշկուհի' },
      { textEs: 'abogada', textHy: 'փաստաբան' },
      { textEs: 'azafata', textHy: 'ուղեկցորդուհի' }
    ],
    correctIndex: 0,
    explanationEs: 'Hija de madre peluquera, experimentaba con cortes y peinados.',
    explanationHy: 'Մայրը վարսահարդար էր, ուստի փորձարկումներ էր անում նրա մազերի վրա։'
  },
  {
    id: 13,
    sentenceEs: 'Natalia concluye diciendo que nosotros no tenemos ________.',
    sentenceHy: 'Նատալիան եզրափակում է՝ ասելով, որ մենք չունենք ________ (սահմանափակում)։',
    options: [
      { textEs: 'techo', textHy: 'առաստաղ / սահման (techo)' },
      { textEs: 'sueño', textHy: 'քուն' },
      { textEs: 'tiempo', textHy: 'ժամանակ' },
      { textEs: 'miedo', textHy: 'վախ' }
    ],
    correctIndex: 0,
    explanationEs: '«No tener techo» significa tener potencial infinito.',
    explanationHy: '«No tener techo» նշանակում է անսահման հնարավորություններ ունենալ։'
  },
  {
    id: 14,
    sentenceEs: 'Natalia tiró el pollo al cubo de la ________.',
    sentenceHy: 'Նատալիան հավը նետեց ________-ի դույլի մեջ։',
    options: [
      { textEs: 'basura', textHy: 'աղբ' },
      { textEs: 'leche', textHy: 'կաթ' },
      { textEs: 'pintura', textHy: 'ներկ' },
      { textEs: 'harina', textHy: 'ալյուր' }
    ],
    correctIndex: 0,
    explanationEs: 'Lo tiró a la basura pensando que no servía.',
    explanationHy: 'Նետեց աղբամանը (basura)՝ կարծելով, որ պիտանի չէ։'
  },
  {
    id: 15,
    sentenceEs: 'A los ocho años comenzó a estudiar ________ en la escuela.',
    sentenceHy: 'Ութ տարեկանում նա դպրոցում սկսեց սովորել ________։',
    options: [
      { textEs: 'teatro', textHy: 'թատրոն' },
      { textEs: 'francés', textHy: 'ֆրանսերեն' },
      { textEs: 'ballet', textHy: 'բալետ' },
      { textEs: 'piano', textHy: 'դաշնամուր' }
    ],
    correctIndex: 0,
    explanationEs: 'Comenzó sus estudios de teatro a los 8 años.',
    explanationHy: 'Սկսեց թատրոն սովորել 8 տարեկանում։'
  },
  {
    id: 16,
    sentenceEs: 'Uno tarda dos años en aprender a hablar y sesenta en aprender a ________.',
    sentenceHy: 'Մարդուն երկու տարի է պետք խոսել սովորելու համար, իսկ վաթսուն տարի՝ ________ սովորելու համար։',
    options: [
      { textEs: 'callarse', textHy: 'լռել' },
      { textEs: 'correr', textHy: 'վազել' },
      { textEs: 'bailar', textHy: 'պարել' },
      { textEs: 'escribir', textHy: 'գրել' }
    ],
    correctIndex: 0,
    explanationEs: 'Sabio dicho popular que cita Natalia.',
    explanationHy: 'Իմաստուն ասացվածք, որը մեջբերում է Նատալիան։'
  },
  {
    id: 17,
    sentenceEs: 'El cortometraje con Diego Forlán se titula Protocolo ________.',
    sentenceHy: 'Դիեգո Ֆորլանի հետ կարճամետրաժ ֆիլմը կոչվում է Protocolo ________։',
    options: [
      { textEs: 'Celeste', textHy: 'Սելեստե (Երկնագույն)' },
      { textEs: 'Verde', textHy: 'Վերդե' },
      { textEs: 'Dorado', textHy: 'Դորադո' },
      { textEs: 'Rojo', textHy: 'Ռոխո' },
    ],
    correctIndex: 0,
    explanationEs: '«Protocolo Celeste» fue dirigido por Martín Sastre.',
    explanationHy: 'Ֆիլմը կոչվում է «Protocolo Celeste»։'
  },
  {
    id: 18,
    sentenceEs: 'Cuando deseas algo con el corazón, los deseos se pueden convertir en ________.',
    sentenceHy: 'Երբ ինչ-որ բան սրտով ես ցանկանում, ցանկությունները կարող են վերածվել ________-ի։',
    options: [
      { textEs: 'realidad', textHy: 'իրականություն' },
      { textEs: 'humo', textHy: 'ծուխ' },
      { textEs: 'arena', textHy: 'ավազ' },
      { textEs: 'sombra', textHy: 'ստվեր' }
    ],
    correctIndex: 0,
    explanationEs: 'Los deseos se convierten en realidad.',
    explanationHy: 'Ցանկությունները վերածվում են իրականության։'
  },
  {
    id: 19,
    sentenceEs: 'Ella fue al camión de la basura para ________ el dinero.',
    sentenceHy: 'Նրանք գնացին աղբի մոտ գումարը ________ համար։',
    options: [
      { textEs: 'recuperar', textHy: 'վերադարձնելու / գտնելու' },
      { textEs: 'olvidar', textHy: 'մոռանալու' },
      { textEs: 'romper', textHy: 'պատռելու' },
      { textEs: 'regalar', textHy: 'նվիրելու' }
    ],
    correctIndex: 0,
    explanationEs: 'Lograron rescatar los dólares a tiempo.',
    explanationHy: 'Հաջողվեց ժամանակին փրկել դոլարները։'
  },
  {
    id: 20,
    sentenceEs: 'Natalia filmó tres temporadas de la serie Lynch en ________.',
    sentenceHy: 'Նատալիան «Lynch» սերիալի երեք եթերաշրջան նկարահանեց ________-ում։',
    options: [
      { textEs: 'Colombia', textHy: 'Կոլումբիա' },
      { textEs: 'Chile', textHy: 'Չիլի' },
      { textEs: 'Perú', textHy: 'Պերու' },
      { textEs: 'Brasil', textHy: 'Բրազիլիա' }
    ],
    correctIndex: 0,
    explanationEs: 'La serie Lynch fue filmada en Colombia.',
    explanationHy: '«Lynch» սերիալը նկարահանվել է Կոլումբիայում։'
  }
];

export const ORDER_WORDS_QUESTIONS: OrderWordsQuestion[] = [
  {
    id: 1,
    scrambledWords: ['vegetariana', 'soy', 'Yo'],
    correctSentence: 'Yo soy vegetariana',
    translationHy: 'Ես բուսակեր եմ։',
    hintEs: 'Sujeto + Verbo + Adjetivo',
    hintHy: 'Ենթակա + Բայ + Ածական'
  },
  {
    id: 2,
    scrambledWords: ['mucho', 'silencio', 'el', 'gusta', 'Me'],
    correctSentence: 'Me gusta mucho el silencio',
    translationHy: 'Ինձ շատ է դուր գալիս լռությունը։',
    hintEs: 'Expresión con el verbo gustar',
    hintHy: 'Արտահայտություն gustar բայով'
  },
  {
    id: 3,
    scrambledWords: ['dinero', 'el', 'tiré', 'No'],
    correctSentence: 'No tiré el dinero',
    translationHy: 'Ես գումարը դեն չնետեցի։',
    hintEs: 'Negación + Verbo + Objeto',
    hintHy: 'Ժխտում + Բայ + Ուղիղ խնդիր'
  },
  {
    id: 4,
    scrambledWords: ['casa', 'tengo', 'en', 'mi', 'Uruguay', 'Yo'],
    correctSentence: 'Yo tengo mi casa en Uruguay',
    translationHy: 'Ես ունեմ իմ տունը Ուրուգվայում։',
    hintEs: 'Ubicación de su hogar',
    hintHy: 'Նրա տան գտնվելու վայրը'
  },
  {
    id: 5,
    scrambledWords: ['está', 'Esto', 'vencido'],
    correctSentence: 'Esto está vencido',
    translationHy: 'Սրա ժամկետն անցել է։',
    hintEs: 'Frase que dijo al mirar la bolsa',
    hintHy: 'Այն արտահայտությունը, որ նա ասաց տոպրակին նայելիս'
  },
  {
    id: 6,
    scrambledWords: ['a', 'Empecé', 'años', 'los', 'doce'],
    correctSentence: 'Empecé a los doce años',
    translationHy: 'Ես սկսեցի տասներկու տարեկանում։',
    hintEs: 'Edad en que comenzó a actuar',
    hintHy: 'Տարիքը, երբ սկսեց նկարահանվել'
  },
  {
    id: 7,
    scrambledWords: ['congelador', 'el', 'Abro'],
    correctSentence: 'Abro el congelador',
    translationHy: 'Ես բացում եմ սառցախցիկը։',
    hintEs: 'Acción en la cocina',
    hintHy: 'Գործողություն խոհանոցում'
  },
  {
    id: 8,
    scrambledWords: ['escondido', 'dinero', 'estaba', 'El'],
    correctSentence: 'El dinero estaba escondido',
    translationHy: 'Գումարը թաքցված էր։',
    hintEs: '¿Dónde estaban los dólares?',
    hintHy: 'Որտե՞ղ էին դոլարները'
  },
  {
    id: 9,
    scrambledWords: ['actriz', 'ser', 'Quiero'],
    correctSentence: 'Quiero ser actriz',
    translationHy: 'Ես ուզում եմ դերասանուհի լինել։',
    hintEs: 'El sueño infantil de Natalia',
    hintHy: 'Նատալիայի մանկության երազանքը'
  },
  {
    id: 10,
    scrambledWords: ['la', 'tiró', 'Ella', 'bolsa'],
    correctSentence: 'Ella tiró la bolsa',
    translationHy: 'Նա դեն նետեց տոպրակը։',
    hintEs: 'Lo que ocurrió con el pollo',
    hintHy: 'Ինչ տեղի ունեցավ հավի հետ'
  },
  {
    id: 11,
    scrambledWords: ['techo', 'tenemos', 'no', 'Nosotros'],
    correctSentence: 'Nosotros no tenemos techo',
    translationHy: 'Մեր հնարավորություններն անսահման են։',
    hintEs: 'Frase final de la entrevista',
    hintHy: 'Հարցազրույցի եզրափակիչ արտահայտությունը'
  },
  {
    id: 12,
    scrambledWords: ['en', 'vivo', 'Buenos', 'Aires', 'Yo'],
    correctSentence: 'Yo vivo en Buenos Aires',
    translationHy: 'Ես ապրում եմ Բուենոս Այրեսում։',
    hintEs: 'Ciudad donde reside',
    hintHy: 'Քաղաքը, որտեղ բնակվում է'
  },
  {
    id: 13,
    scrambledWords: ['pollo', 'El', 'congelado', 'estaba'],
    correctSentence: 'El pollo estaba congelado',
    translationHy: 'Հավը սառեցված էր։',
    hintEs: 'Estado del paquete en el freezer',
    hintHy: 'Փաթեթի վիճակը սառցախցիկում'
  },
  {
    id: 14,
    scrambledWords: ['dólares', 'cuatro', 'mil', 'Había'],
    correctSentence: 'Había cuatro mil dólares',
    translationHy: 'Կար չորս հազար դոլար։',
    hintEs: 'La cantidad exacta aproximada',
    hintHy: 'Ճշգրիտ մոտավոր գումարը'
  },
  {
    id: 15,
    scrambledWords: ['dinero', 'recuperamos', 'el', 'Afortunadamente'],
    correctSentence: 'Afortunadamente recuperamos el dinero',
    translationHy: 'Բարեբախտաբար մենք վերադարձրինք գումարը։',
    hintEs: 'Final feliz de la anécdota',
    hintHy: 'Պատմության երջանիկ ավարտը'
  }
];

export const INTERVIEW_QUESTIONS: InterviewDialog[] = [
  {
    id: 1,
    questionEs: '¿Dónde naciste y cómo te sientes hoy respecto a tus dos tierras?',
    questionHy: 'Որտե՞ղ ես ծնվել և այսօր ինչպե՞ս ես քեզ զգում քո երկու երկրների նկատմամբ։',
    responseEs: 'Nací en Montevideo, Uruguay, pero vivo hace más de 20 años en la Argentina. Hoy me siento profundamente rioplatense y soy embajadora de UNICEF para ambos países.',
    responseHy: 'Ծնվել եմ Մոնտեվիդեոյում, Ուրուգվայ, բայց ավելի քան 20 տարի ապրում եմ Արգենտինայում։ Այսօր ինձ խորապես ռիոպլատենսե եմ զգում և ՅՈՒՆԻՍԵՖ-ի դեսպան եմ երկու երկրների համար։',
    categoryEs: 'Orígenes',
    categoryHy: 'Ծագում',
    videoTimestamp: 376
  },
  {
    id: 2,
    questionEs: '¿A qué edad empezaste a trabajar en televisión?',
    questionHy: 'Քանի՞ տարեկանում սկսեցիր աշխատել հեռուստատեսությունում։',
    responseEs: 'A los doce años comencé a trabajar en televisión en Uruguay haciendo publicidades. A los 8 ya estudiaba teatro en la escuela.',
    responseHy: 'Տասներկու տարեկանում սկսեցի աշխատել Ուրուգվայի հեռուստատեսությունում՝ գովազդներ նկարահանվելով։ Իսկ 8 տարեկանում արդեն թատրոն էի սովորում։',
    categoryEs: 'Carrera',
    categoryHy: 'Կարիերա',
    videoTimestamp: 501
  },
  {
    id: 3,
    questionEs: '¿Te gusta el silencio en tu vida cotidiana?',
    questionHy: 'Քեզ դո՞ւր է գալիս լռությունը քո առօրյա կյանքում։',
    responseEs: 'Me gusta mucho el silencio. Paradójicamente soy charlatana, pero lo necesito para encontrarme, para descansar y para escuchar al otro en mi profesión.',
    responseHy: 'Ինձ շատ է դուր գալիս լռությունը։ Թեև շատախոս եմ, բայց այն ինձ պետք է ինքս ինձ գտնելու, հանգստանալու և դերասանության մեջ դիմացինիս լսելու համար։',
    categoryEs: 'Filosofía de vida',
    categoryHy: 'Կյանքի փիլիսոփայություն',
    videoTimestamp: 200
  },
  {
    id: 4,
    questionEs: '¿Dónde vives actualmente y dónde encuentras paz?',
    questionHy: 'Որտե՞ղ ես ապրում ներկայումս և որտե՞ղ ես խաղաղություն գտնում։',
    responseEs: 'Tengo mi casa en Buenos Aires, en el corazón de Palermo Viejo, y también vivo mucho en el campo en Carmelo, Uruguay, con mi huerta y mis plantas.',
    responseHy: 'Տուն ունեմ Բուենոս Այրեսում՝ Պալերմո Վիեխոյում, ինչպես նաև շատ ժամանակ եմ ապրում Կարմելոյի (Ուրուգվայ) գյուղական տանս՝ բանջարանոցիս ու բույսերիս հետ։',
    categoryEs: 'Hogar',
    categoryHy: 'Տուն',
    videoTimestamp: 200
  },
  {
    id: 5,
    questionEs: '¿Cómo te llevas con el fútbol?',
    questionHy: 'Ինչպե՞ս են քո հարաբերությունները ֆուտբոլի հետ։',
    responseEs: 'Con el fútbol no me llevo mucho, no entiendo nada. Una vez pregunté si jugaban 11 o 12. Pero cuando juega Uruguay, ¡apoyo a la Celeste!',
    responseHy: 'Ֆուտբոլից այնքան էլ լավ չեմ հասկանում, ոչինչ չեմ հասկանում։ Մի անգամ հարցրել էի՝ 11, թե 12 հոգի են խաղում։ Բայց երբ Ուրուգվայն է խաղում, Ուրուգվային եմ երկրպագում։',
    categoryEs: 'Pasiones',
    categoryHy: 'Հետաքրքրություններ',
    videoTimestamp: 441
  },
  {
    id: 6,
    questionEs: '¿Qué le dijiste a tu madre cuando tenías 8 años con el diario en la mano?',
    questionHy: 'Ի՞նչ ասացիր մայրիկիդ 8 տարեկանում՝ թերթը ձեռքիդ։',
    responseEs: 'Le llevé el diario a mi madre y le dije: «Un día voy a salir acá». Y mi mamá siempre me lo recuerda.',
    responseHy: 'Թերթը ձեռքիս մոտեցա մայրիկիս ու ասացի․ «Մի օր ես այստեղ կհայտնվեմ»։ Եվ մայրս միշտ հիշեցնում է դա։',
    categoryEs: 'Infancia',
    categoryHy: 'Մանկություն',
    videoTimestamp: 501
  },
  {
    id: 7,
    questionEs: '¿Por qué tiraste la bolsa del congelador con el dinero?',
    questionHy: 'Ինչո՞ւ դեն նետեցիր սառցախցիկի տոպրակը գումարի հետ։',
    responseEs: 'Porque soy vegetariana hace muchísimos años. Vi las patitas de pollo congeladas, pensé que estaban vencidas y las tiré a la basura sin saber que contenían los ahorros de mi compañero.',
    responseHy: 'Որովհետև երկար տարիներ բուսակեր եմ։ Տեսա սառեցված հավի տոտիկները, մտածեցի ժամկետանց են ու նետեցի աղբամանը՝ չիմանալով, որ զուգընկերոջս խնայողություններն էին մեջը։',
    categoryEs: 'Anécdota del pollo',
    categoryHy: 'Հավի պատմությունը',
    videoTimestamp: 541
  },
  {
    id: 8,
    questionEs: '¿Cuánto dinero había escondido en el pollo?',
    questionHy: 'Որքա՞ն գումար էր թաքցված հավի մեջ։',
    responseEs: 'Tenían alrededor de tres mil o cuatro mil dólares. Se salió desesperado a buscarlo y por suerte lo recuperamos.',
    responseHy: 'Մոտ 3000 կամ 4000 դոլար կար։ Նա խուճապահար վազեց փնտրելու և բարեբախտաբար գտանք։',
    categoryEs: 'Anécdota del pollo',
    categoryHy: 'Հավի պատմությունը',
    videoTimestamp: 559
  },
  {
    id: 9,
    questionEs: '¿Qué te dijo el director de tu primer casting en Argentina?',
    questionHy: 'Ի՞նչ ասաց քեզ քո առաջին քասթինգի ռեժիսորն Արգենտինայում։',
    responseEs: 'Me preguntó de dónde era y de qué iba a vivir. Le dije que quería ser actriz y me contestó: «Dedícate a otra cosa».',
    responseHy: 'Հարցրեց, թե որտեղից եմ և ինչով եմ ապրուստ վաստակելու։ Ասացի, որ ուզում եմ դերասանուհի դառնալ, և նա պատասխանեց․ «Ուրիշ գործով զբաղվիր»։',
    categoryEs: 'Superación',
    categoryHy: 'Հաղթահարում',
    videoTimestamp: 574
  },
  {
    id: 10,
    questionEs: '¿Cómo defines tu carácter ante los obstáculos?',
    questionHy: 'Ինչպե՞ս ես բնորոշում քո բնավորությունը խոչընդոտների առջև։',
    responseEs: 'Soy Tauro con ascendente en Tauro, soy súper cabeza dura. Todo lo que me he propuesto lo he ido consiguiendo con mucha determinación.',
    responseHy: 'Ես Ցուլ եմ, և իմ ասցենդենտը նույնպես Ցուլ է։ Այնպես որ շատ համառ եմ։ Այն ամենին, ինչ նպատակ եմ դրել իմ առջև, հասել եմ մեծ վճռականությամբ։',
    categoryEs: 'Personalidad',
    categoryHy: 'Բնավորություն',
    videoTimestamp: 646
  },
  {
    id: 11,
    questionEs: '¿Qué pasó con Raffaella Carrà y el poder de la mente?',
    questionHy: 'Ի՞նչ պատահեց Ռաֆայելա Կառայի հետ և ինչո՞ւ ես հավատում մտքի ուժին։',
    responseEs: 'Canté jugando su canción en vacaciones con tres amigas y al mes exacto me llamó su productor para viajar a Italia y grabar en el disco con ella.',
    responseHy: 'Արձակուրդում ընկերուհիներիս հետ կատակով երգեցի նրա երգը, և ուղիղ մեկ ամիս անց ինձ զանգահարեց նրա պրոդյուսերը՝ Իտալիա մեկնելու և նրա հետ երգ ձայնագրելու համար։',
    categoryEs: 'Sincronías',
    categoryHy: 'Պատահականություններ',
    videoTimestamp: 675
  },
  {
    id: 12,
    questionEs: '¿Por qué dices que hay que tener cuidado con lo que uno proyecta?',
    questionHy: 'Ինչո՞ւ ես ասում, որ պետք է զգույշ լինել մտքերի հետ։',
    responseEs: 'Porque las palabras tienen una fuerza muy importante y los deseos se te pueden convertir en realidad, tanto para bien como para mal.',
    responseHy: 'Որովհետև խոսքերը մեծ ուժ ունեն, և ցանկությունները կարող են իրականություն դառնալ՝ թե՛ լավ, թե՛ վատ իմաստով։',
    categoryEs: 'Filosofía',
    categoryHy: 'Փիլիսոփայություն',
    videoTimestamp: 711
  },
  {
    id: 13,
    questionEs: '¿Te ves como un símbolo sexual?',
    questionHy: 'Քեզ սեքսուալության խորհրդանի՞շ ես համարում։',
    responseEs: 'A mí me gusta jugar y disfrazarme. Hija de madre peluquera, experimentaba desde chica. Pero en lo personal me siento una chica común.',
    responseHy: 'Ես պարզապես սիրում եմ խաղալ տարբեր կերպարների հետ։ Մայրս վարսահարդար էր, ուստի փոքրուց փորձարկումներ էի անում։ Բայց անձնականում ինձ սովորական աղջիկ եմ զգում։',
    categoryEs: 'Imagen y Belleza',
    categoryHy: 'Կերպար և Գեղեցկություն',
    videoTimestamp: 740
  },
  {
    id: 14,
    questionEs: '¿Por qué eliges personajes que se corren de ese lugar?',
    questionHy: 'Ինչո՞ւ ես ընտրում դերեր, որոնք տարբերվում են այդ կերպարից։',
    responseEs: 'Porque para un actor lo bueno es no ser siempre los mismos personajes, si no uno se termina copiando a uno mismo y te quedas instalado.',
    responseHy: 'Որովհետև դերասանի համար կարևոր է միշտ նույն կերպարը չխաղալը, այլապես սկսում ես կրկնել ինքդ քեզ։',
    categoryEs: 'Actuación',
    categoryHy: 'Դերասանական արվեստ',
    videoTimestamp: 771
  },
  {
    id: 15,
    questionEs: '¿Qué significa para ti la frase «Nosotros no tenemos techo»?',
    questionHy: 'Ի՞նչ է նշանակում քեզ համար «Մենք առաստաղ չունենք» («Nosotros no tenemos techo») արտահայտությունը։',
    responseEs: 'Significa que las únicas limitaciones son las que uno mismo se pone. Con pasión y entrega, el potencial humano es infinito.',
    responseHy: 'Դա նշանակում է, որ միակ սահմանափակումներն այն են, որոնք մարդն ինքն է իր համար ստեղծում։ Կրքով ու նվիրումով մարդկային ներուժն անսահման է։',
    categoryEs: 'Inspiración',
    categoryHy: 'Ոգեշնչում',
    videoTimestamp: 771
  }
];

export const CHOOSE_RESPONSE_QUESTIONS: ChooseResponseQuestion[] = [
  {
    id: 1,
    situationEs: 'Tu amigo te pregunta: «¿Te gusta el silencio?»',
    situationHy: 'Ընկերդ հարցնում է քեզ․ «Սիրո՞ւմ ես լռությունը»։',
    options: [
      {
        textEs: 'Sí, me ayuda a descansar y pensar con claridad.',
        textHy: 'Այո, դա օգնում է ինձ հանգստանալ և հստակ մտածել։',
        isCorrect: true,
        feedbackEs: '¡Excelente respuesta natural y reflexiva!',
        feedbackHy: 'Հիանալի, բնական և խոհուն պատասխան։'
      },
      {
        textEs: 'Tengo doce zapatos en mi maleta.',
        textHy: 'Ես տասներկու կոշիկ ունեմ ճամպրուկումս։',
        isCorrect: false,
        feedbackEs: 'No tiene sentido en esta conversación.',
        feedbackHy: 'Այս խոսակցության մեջ իմաստ չունի։'
      },
      {
        textEs: 'El congelador está jugando al fútbol.',
        textHy: 'Սառցախցիկը ֆուտբոլ է խաղում։',
        isCorrect: false,
        feedbackEs: '¡Los electrodomésticos no juegan fútbol!',
        feedbackHy: 'Կենցաղային տեխնիկան ֆուտբոլ չի խաղում։'
      },
      {
        textEs: 'Mi mesa sabe cantar tangos.',
        textHy: 'Իմ սեղանը կարողանում է տանգո երգել։',
        isCorrect: false,
        feedbackEs: 'Divertido, pero completamente ilógico.',
        feedbackHy: 'Զվարճալի է, բայց անտրամաբանական։'
      }
    ]
  },
  {
    id: 2,
    situationEs: 'Tu amigo ha perdido dinero. ¿Qué le dices?',
    situationHy: 'Ընկերդ գումար է կորցրել։ Ի՞նչ ես ասում նրան։',
    options: [
      {
        textEs: '¡Vamos a buscarlo ahora mismo con calma!',
        textHy: 'Եկ միասին փնտրենք հենց հիմա՝ հանգիստ։',
        isCorrect: true,
        feedbackEs: '¡Muy solidario y correcto en español!',
        feedbackHy: 'Շատ կարեկից և ճիշտ իսպաներեն։'
      },
      {
        textEs: '¡Qué bonito está el pollo!',
        textHy: 'Ինչ գեղեցիկ է հավը։',
        isCorrect: false,
        feedbackEs: 'No consuela a nadie que perdió dinero.',
        feedbackHy: 'Դա չի մխիթարի նրան, ով փող է կորցրել։'
      },
      {
        textEs: 'Mi bicicleta está muy cansada hoy.',
        textHy: 'Իմ հեծանիվն այսօր շատ հոգնած է։',
        isCorrect: false,
        feedbackEs: 'Una bicicleta no siente cansancio.',
        feedbackHy: 'Հեծանիվը չի հոգնում։'
      },
      {
        textEs: 'El dinero está estudiando gramática.',
        textHy: 'Գումարը քերականություն է ուսումնասիրում։',
        isCorrect: false,
        feedbackEs: '¡Ojalá el dinero estudiara solo!',
        feedbackHy: 'Երանի գումարն ինքն իրեն սովորեր։'
      }
    ]
  },
  {
    id: 3,
    situationEs: 'Ves una comida dudosa en la nevera y no sabes si comerla. ¿Qué dices?',
    situationHy: 'Սառնարանում կասկածելի ուտելիք ես տեսնում և չգիտես՝ ուտե՞լ։ Ի՞նչ ես ասում։',
    options: [
      {
        textEs: 'Mejor no la como, creo que está vencida.',
        textHy: 'Ավելի լավ է չուտեմ, կարծում եմ՝ ժամկետանց է։',
        isCorrect: true,
        feedbackEs: '¡Uso perfecto del verbo estar con «vencido»!',
        feedbackHy: 'Կատարյալ կիրառություն estar + vencido կառույցի։'
      },
      {
        textEs: 'El tomate es presidente de la ciudad.',
        textHy: 'Լոլիկը քաղաքի նախագահն է։',
        isCorrect: false,
        feedbackEs: 'Completamente disparatado.',
        feedbackHy: 'Լրիվ անհեթեթություն։'
      },
      {
        textEs: 'Bailo salsa con la sartén.',
        textHy: 'Թավայի հետ սալսա եմ պարում։',
        isCorrect: false,
        feedbackEs: 'No responde a la situación higiénica.',
        feedbackHy: 'Չի համապատասխանում իրավիճակին։'
      },
      {
        textEs: 'Tengo tres refrigeradores en el bolsillo.',
        textHy: 'Գրպանումս երեք սառնարան ունեմ։',
        isCorrect: false,
        feedbackEs: 'Físicamente imposible.',
        feedbackHy: 'Ֆիզիկապես անհնար է։'
      }
    ]
  },
  {
    id: 4,
    situationEs: 'Alguien te felicita por hablar bien español. ¿Cómo respondes con humildad?',
    situationHy: 'Ինչ-որ մեկը քեզ գովում է լավ իսպաներենի համար։ Ինչպե՞ս ես համեստորեն պատասխանում։',
    options: [
      {
        textEs: 'Muchas gracias, todavía sigo practicando cada día.',
        textHy: 'Շատ շնորհակալություն, ես դեռ ամեն օր պարապում եմ։',
        isCorrect: true,
        feedbackEs: '¡Respuesta cortés, natural y elegante!',
        feedbackHy: 'Քաղաքավարի, բնական և էլեգանտ պատասխան։'
      },
      {
        textEs: 'Soy el rey de todos los diccionarios.',
        textHy: 'Ես բոլոր բառարանների արքան եմ։',
        isCorrect: false,
        feedbackEs: 'Demasiado presumido y raro.',
        feedbackHy: 'Չափազանց պարծենկոտ և տարօրինակ է։'
      },
      {
        textEs: 'Las manzanas vuelan en invierno.',
        textHy: 'Խնձորները թռչում են ձմռանը։',
        isCorrect: false,
        feedbackEs: 'No tiene relación alguna.',
        feedbackHy: 'Ոչ մի կապ չունի։'
      },
      {
        textEs: 'Apaga la lámpara del jardín.',
        textHy: 'Անջատի՛ր այգու լամպը։',
        isCorrect: false,
        feedbackEs: 'Una orden sin contexto.',
        feedbackHy: 'Առանց համատեքստի հրաման։'
      }
    ]
  },
  {
    id: 5,
    situationEs: 'Te invitan a un asado pero no comes carne. ¿Qué dices amablemente?',
    situationHy: 'Քեզ խորովածի են հրավիրում, բայց դու միս չես ուտում։ Ի՞նչ ես ասում քաղաքավարի։',
    options: [
      {
        textEs: 'Muchas gracias por la invitación, pero soy vegetariana.',
        textHy: 'Շատ շնորհակալություն հրավերի համար, բայց ես բուսակեր եմ։',
        isCorrect: true,
        feedbackEs: '¡Idéntico a la filosofía de Natalia!',
        feedbackHy: 'Ճիշտ Նատալիայի փիլիսոփայության պես։'
      },
      {
        textEs: 'Odio a todos los que comen en platos.',
        textHy: 'Ատում եմ բոլոր նրանց, ովքեր ափսեից են ուտում։',
        isCorrect: false,
        feedbackEs: 'Muy grosero y fuera de lugar.',
        feedbackHy: 'Շատ կոպիտ է և տեղին չէ։'
      },
      {
        textEs: 'La vaca está leyendo un periódico.',
        textHy: 'Կովը թերթ է կարդում։',
        isCorrect: false,
        feedbackEs: 'Una escena cómica e irreal.',
        feedbackHy: 'Ծիծաղելի և անիրական պատկեր։'
      },
      {
        textEs: 'Mi zapato izquierdo no tiene hambre.',
        textHy: 'Իմ ձախ կոշիկը քաղցած չէ։',
        isCorrect: false,
        feedbackEs: 'Sin sentido en la conversación.',
        feedbackHy: 'Իմաստազուրկ է խոսակցության մեջ։'
      }
    ]
  }
];

export const WHAT_IF_PROMPTS: WhatIfPrompt[] = [
  {
    id: 1,
    promptEs: '¿Qué harías si encontraras 4.000 dólares en el congelador?',
    promptHy: 'Ի՞նչ կանեիր, եթե սառցախցիկում 4000 դոլար գտնեիր։',
    suggestedStarters: [
      { textEs: 'Yo buscaría a...', textHy: 'Ես կփնտրեի․․․' },
      { textEs: 'Yo guardaría el dinero en...', textHy: 'Ես գումարը կպահեի․․․' },
      { textEs: 'Yo viajaría a...', textHy: 'Ես կճամփորդեի դեպի․․․' }
    ],
    sampleAnswers: [
      { textEs: 'Buscaría de inmediato al dueño del dinero para devolverlo.', textHy: 'Անմիջապես կփնտրեի գումարի տիրոջը՝ այն վերադարձնելու համար։' },
      { textEs: 'Compraría cien helados y viajaría a Montevideo.', textHy: 'Հարյուր հատ պաղպաղակ կգնեի ու կմեկնեի Մոնտեվիդեո։', humorous: true },
      { textEs: 'Abriría una cuenta bancaria especial para emergencias.', textHy: 'Հատուկ բանկային հաշիվ կբացեի անսպասելի դեպքերի համար։' }
    ],
    grammarTipEs: 'Usa el condicional simple: «Yo buscaría», «Yo compraría», «Yo viajaría».',
    grammarTipHy: 'Օգտագործի՛ր պայմանական եղանակը (Condicional simple)՝ «Yo buscaría», «Yo viajaría»։'
  },
  {
    id: 2,
    promptEs: '¿Qué harías si conocieras a Natalia Oreiro en persona?',
    promptHy: 'Ի՞նչ կանեիր, եթե անձամբ հանդիպեիր Նատալիա Օրեյրոյին։',
    suggestedStarters: [
      { textEs: 'Yo le pediría...', textHy: 'Ես նրանից կխնդրեի․․․' },
      { textEs: 'Yo le diría que...', textHy: 'Ես նրան կասեի, որ․․․' },
      { textEs: 'Cantaríamos juntos...', textHy: 'Միասին կերգեինք․․․' }
    ],
    sampleAnswers: [
      { textEs: 'Le diría cuánto admiro su calidez humana y su talento como actriz.', textHy: 'Կասեի, թե որքան եմ հիանում նրա մարդկային ջերմությամբ և դերասանական տաղանդով։' },
      { textEs: 'Le pediría un autógrafo y bailaríamos tango en San Telmo.', textHy: 'Ինքնագիր կխնդրեի և տանգո կպարեինք Սան Տելմոյում։', humorous: true }
    ],
    grammarTipEs: 'Si + subjuntivo imperfecto (conocieras) → condicional simple (diría, pediría).',
    grammarTipHy: 'Եթե + անցյալի ըղձական (conocieras) → պայմանական եղանակ (diría, pediría)։'
  }
];

export const PASAPALABRA_DATA: PasapalabraLetter[] = [
  {
    letter: 'A',
    type: 'starts_with',
    definitionEs: 'Profesión de una persona que interpreta papeles en el cine, teatro o televisión.',
    definitionHy: 'Մարդու մասնագիտություն, ով դերեր է խաղում կինոյում, թատրոնում կամ հեռուստատեսությունում։',
    answer: 'ACTRIZ',
    hintEs: 'Natalia es una famosa...',
    hintHy: 'Նատալիան հայտնի ․․․ է։'
  },
  {
    letter: 'B',
    type: 'starts_with',
    definitionEs: 'Cubo o lugar donde arrojamos los desperdicios y las cosas que no sirven.',
    definitionHy: 'Դույլ կամ տեղ, որտեղ նետում ենք թափոններն ու անպետք իրերը։',
    answer: 'BASURA',
    hintEs: 'Donde terminó el pollo congelado con el dinero.',
    hintHy: 'Որտեղ հայտնվեց սառեցված հավը գումարի հետ։'
  },
  {
    letter: 'C',
    type: 'starts_with',
    definitionEs: 'Aparato electrodoméstico que mantiene alimentos a muy baja temperatura bajo cero.',
    definitionHy: 'Էլեկտրական կենցաղային սարք, որը սնունդը պահում է զրոյից ցածր շատ ցածր ջերմաստիճանում։',
    answer: 'CONGELADOR',
    hintEs: 'Sinónimo de freezer.',
    hintHy: 'Freezer բառի հոմանիշը (սառցախցիկ)։'
  },
  {
    letter: 'D',
    type: 'starts_with',
    definitionEs: 'Monedas o billetes que usamos para comprar cosas y pagar servicios.',
    definitionHy: 'Մետաղադրամներ կամ թղթադրամներ, որոնք օգտագործում ենք իրեր գնելու և վճարելու համար։',
    answer: 'DINERO',
    hintEs: 'Había miles dentro de la bolsa de pollo.',
    hintHy: 'Հազարավորներ կային հավի տոպրակում։'
  },
  {
    letter: 'E',
    type: 'starts_with',
    definitionEs: 'Firmeza, perseverancia y dedicación constante para lograr una meta difícil.',
    definitionHy: 'Հաստատակամություն, համառություն և մշտական նվիրում՝ դժվար նպատակին հասնելու համար։',
    answer: 'ESFUERZO',
    hintEs: 'Lo que Natalia necesitó desde los 12 años.',
    hintHy: 'Այն, ինչ պետք էր Նատալիային 12 տարեկանից (ջանք)։'
  },
  {
    letter: 'F',
    type: 'starts_with',
    definitionEs: 'Término tomado del inglés que se usa comúnmente en el Río de la Plata para el congelador.',
    definitionHy: 'Անգլերենից վերցված տերմին, որը Ռիո դե լա Պլատայում լայնորեն օգտագործվում է սառցախցիկի համար։',
    answer: 'FREEZER',
    hintEs: 'Natalia dijo: «Abro el...»',
    hintHy: 'Նատալիան ասաց․ «Abro el...»'
  },
  {
    letter: 'G',
    type: 'starts_with',
    definitionEs: 'Sentimiento de agradecimiento hacia la vida o hacia los demás.',
    definitionHy: 'Երախտագիտության զգացում կյանքի կամ ուրիշների հանդեպ։',
    answer: 'GRATITUD',
    hintEs: 'Lo que Natalia siente por su público.',
    hintHy: 'Այն, ինչ Նատալիան զգում է իր հանդիսատեսի հանդեպ։'
  },
  {
    letter: 'H',
    type: 'starts_with',
    definitionEs: 'Lugar con plantas, flores y verduras que Natalia tiene en su casa de campo en Carmelo.',
    definitionHy: 'Բանջարանոց, որը Նատալիան ունի Կարմելոյի իր գյուղական տանը։',
    answer: 'HUERTA',
    hintEs: 'Tengo mi... en Carmelo.',
    hintHy: 'Բանջարանոց (huerta)։'
  },
  {
    letter: 'I',
    type: 'starts_with',
    definitionEs: 'Etapa temprana de la vida humana, desde el nacimiento hasta la pubertad.',
    definitionHy: 'Մարդկային կյանքի վաղ փուլը՝ ծնունդից մինչև պատանեկություն (մանկություն)։',
    answer: 'INFANCIA',
    hintEs: 'Los primeros recuerdos de Montevideo.',
    hintHy: 'Մոնտեվիդեոյի առաջին հիշողությունները։'
  },
  {
    letter: 'J',
    type: 'starts_with',
    definitionEs: 'Actividad divertida y entretenida con reglas, como la que estamos haciendo ahora.',
    definitionHy: 'Զվարճալի և հետաքրքիր գործունեություն կանոններով, ինչպիսին մենք հիմա անում ենք (խաղ)։',
    answer: 'JUEGO',
    hintEs: 'Aprende español jugando.',
    hintHy: 'Սովորի՛ր իսպաներեն խաղալով։'
  },
  {
    letter: 'K',
    type: 'contains',
    definitionEs: 'Contiene la K: Medida de peso equivalente a mil gramos.',
    definitionHy: 'Պարունակում է K. Քաշի չափման միավոր, որը հավասար է հազար գրամի (կիլոգրամ)։',
    answer: 'KILO',
    hintEs: 'Un... de pollo congelado.',
    hintHy: 'Մեկ ․․․ սառեցված հավ։'
  },
  {
    letter: 'L',
    type: 'starts_with',
    definitionEs: 'Serie que Natalia filmó en Colombia durante tres temporadas.',
    definitionHy: 'Սերիալ, որը Նատալիան նկարահանել է Կոլումբիայում 3 եթերաշրջանով։',
    answer: 'LYNCH',
    hintEs: 'Movie City...',
    hintHy: 'Lynch սերիալը։'
  },
  {
    letter: 'M',
    type: 'starts_with',
    definitionEs: 'Capital y ciudad más poblada de Uruguay, lugar de nacimiento de Natalia.',
    definitionHy: 'Ուրուգվայի մայրաքաղաքը և ամենամեծ քաղաքը, Նատալիայի ծննդավայրը։',
    answer: 'MONTEVIDEO',
    hintEs: 'La ciudad natal de Natalia Oreiro.',
    hintHy: 'Նատալիա Օրեյրոյի հայրենի քաղաքը։'
  },
  {
    letter: 'N',
    type: 'starts_with',
    definitionEs: 'Nombre de pila de la celebridad uruguaya protagonista de esta aplicación.',
    definitionHy: 'Այս հավելվածի գլխավոր հերոսուհու անունը։',
    answer: 'NATALIA',
    hintEs: '... Oreiro.',
    hintHy: 'Նատալիա։'
  },
  {
    letter: 'Ñ',
    type: 'contains',
    definitionEs: 'Contiene la Ñ: Imagen, ilusión o anhelo que tenemos mientras dormimos o en el corazón.',
    definitionHy: 'Պարունակում է Ñ. Պատկերացում, երազանք կամ իղձ, որն ունենք քնած ժամանակ կամ սրտում։',
    answer: 'SUEÑO',
    hintEs: 'Natalia luchó por cumplir su...',
    hintHy: 'Նատալիան պայքարեց իր ․․․-ն իրականացնելու համար (երազանք)։'
  },
  {
    letter: 'O',
    type: 'starts_with',
    definitionEs: 'Apellido de la célebre estrella uruguaya protagonista de esta aplicación.',
    definitionHy: 'Այս հավելվածի գլխավոր հերոսուհի ուրուգվայցի հայտնի աստղի ազգանունը։',
    answer: 'OREIRO',
    hintEs: 'Natalia...',
    hintHy: 'Նատալիա ․․․'
  },
  {
    letter: 'P',
    type: 'starts_with',
    definitionEs: 'Ave de corral cuya carne estaba en la bolsa donde se escondió el dinero.',
    definitionHy: 'Ընտանի թռչուն, որի միսը գտնվում էր այն տոպրակում, որտեղ թաքցված էր գումարը (հավ)։',
    answer: 'POLLO',
    hintEs: 'Patitas de... congelado.',
    hintHy: 'Սառեցված ․․․-ի ոտքեր։'
  },
  {
    letter: 'Q',
    type: 'starts_with',
    definitionEs: 'Alimento sólido elaborado a partir de la leche cuajada, muy popular en la cocina.',
    definitionHy: 'Կաթից պատրաստված պինդ սննդամթերք, շատ տարածված խոհանոցում (պանիր)։',
    answer: 'QUESO',
    hintEs: 'Acompañamiento común en las empanadas.',
    hintHy: 'Տարածված բաղադրիչ էմպանադաներում։'
  },
  {
    letter: 'R',
    type: 'starts_with',
    definitionEs: 'Cantante italiana muy admirada por Natalia con quien grabó en Italia.',
    definitionHy: 'Իտալացի երգչուհի, ումով Նատալիան հիանում էր և ում հետ երգեց Իտալիայում։',
    answer: 'RAFFAELLA',
    hintEs: '... Carrà.',
    hintHy: 'Ռաֆայելա Կառա։'
  },
  {
    letter: 'S',
    type: 'starts_with',
    definitionEs: 'Ausencia total de sonido o ruido que Natalia aprecia enormemente para reflexionar.',
    definitionHy: 'Ձայնի կամ աղմուկի լիակատար բացակայություն, որը Նատալիան խորապես գնահատում է (լռություն)։',
    answer: 'SILENCIO',
    hintEs: 'Me gusta mucho el...',
    hintHy: 'Ինձ շատ է դուր գալիս ․․․-ը։'
  },
  {
    letter: 'T',
    type: 'starts_with',
    definitionEs: 'Baile rioplatense tradicional que bailan en Buenos Aires y Montevideo.',
    definitionHy: 'Ռիոպլատենսե ավանդական պար, որը պարում են Բուենոս Այրեսում և Մոնտեվիդեոյում (տանգո)։',
    answer: 'TANGO',
    hintEs: 'Qué rico ese...',
    hintHy: 'Տանգո։'
  },
  {
    letter: 'U',
    type: 'starts_with',
    definitionEs: 'País sudamericano bañado por el Río de la Plata y el Atlántico, donde nació Natalia.',
    definitionHy: 'Հարավամերիկյան երկիր, որտեղ ծնվել է Նատալիան։',
    answer: 'URUGUAY',
    hintEs: 'Tierra natal de Natalia Oreiro.',
    hintHy: 'Նատալիա Օրեյրոյի հայրենի երկիրը։'
  },
  {
    letter: 'V',
    type: 'starts_with',
    definitionEs: 'Dicho de un producto o alimento: que ha expirado o cumplido su fecha límite.',
    definitionHy: 'Ապրանքի կամ սննդի մասին՝ ժամկետանց, որի պիտանելիության ժամկետն անցել է։',
    answer: 'VENCIDO',
    hintEs: '«Esto está...» dijo Natalia.',
    hintHy: '«Սրա ժամկետն անցել է» (ժամկետանց)։'
  },
  {
    letter: 'W',
    type: 'starts_with',
    definitionEs: 'Película de Lucía Puenzo protagonizada por Natalia que ganó el Cóndor de Plata.',
    definitionHy: 'Լուսիա Պուենսոյի ֆիլմը՝ Նատալիայի գլխավոր դերակատարմամբ, որը շահեց Cóndor de Plata մրցանակը։',
    answer: 'WAKOLDA',
    hintEs: 'La película...',
    hintHy: '«Wakolda» ֆիլմը։'
  },
  {
    letter: 'X',
    type: 'contains',
    definitionEs: 'Contiene la X: Gran triunfo, resultado favorable y reconocimiento público.',
    definitionHy: 'Պարունակում է X. Մեծ հաղթանակ, բարեհաջող արդյունք և հանրային ճանաչում (հաջողություն)։',
    answer: 'EXITO',
    hintEs: 'El gran... internacional.',
    hintHy: 'Մեծ հաջողություն (éxito)։'
  },
  {
    letter: 'Y',
    type: 'starts_with',
    definitionEs: 'Pronombre personal de primera persona del singular en español.',
    definitionHy: 'Առաջին դեմքի եզակի թվի անձնական դերանունը իսպաներենում (ես)։',
    answer: 'YO',
    hintEs: '«... soy vegetariana».',
    hintHy: '«... soy vegetariana» (Ես)։'
  },
  {
    letter: 'Z',
    type: 'contains',
    definitionEs: 'Contiene la Z: Órgano vital del cuerpo y símbolo del amor y los sentimientos.',
    definitionHy: 'Պարունակում է Z. Մարմնի կենսական օրգան և սիրո ու զգացմունքների խորհրդանիշ (սիրտ)։',
    answer: 'CORAZON',
    hintEs: 'Desea algo con todo el...',
    hintHy: 'Ինչ-որ բան ցանկացիր ողջ ․․․-ով (սիրտ)։'
  }
];

export const GRAMMAR_ERROR_QUESTIONS: GrammarErrorQuestion[] = [
  {
    id: 1,
    incorrectSentenceEs: 'Yo soy vegetariano.',
    incorrectSentenceHy: 'Ես բուսակեր (արական) եմ։',
    correctSentenceEs: 'Yo soy vegetariana.',
    correctSentenceHy: 'Ես բուսակեր (իգական) եմ։',
    errorWord: 'vegetariano',
    correctionWord: 'vegetariana',
    ruleEs: 'Concordancia de género: Como Natalia es mujer, el adjetivo debe ser femenino terminando en -a.',
    ruleHy: 'Սեռի համաձայնեցում․ Քանի որ Նատալիան կին է, ածականը պետք է լինի իգական՝ ավարտվելով -a-ով։'
  },
  {
    id: 2,
    incorrectSentenceEs: 'Me gusta mucho los silencios.',
    incorrectSentenceHy: 'Ինձ շատ են դուր գալիս լռությունները (սխալ թվով բայ)։',
    correctSentenceEs: 'Me gusta mucho el silencio.',
    correctSentenceHy: 'Ինձ շատ է դուր գալիս լռությունը։',
    errorWord: 'los silencios',
    correctionWord: 'el silencio',
    ruleEs: 'Si el verbo está en singular «gusta», el sujeto que produce el agrado debe ser singular: «el silencio».',
    ruleHy: 'Եթե gusta բայը եզակի թվով է, ապա առարկան պետք է լինի եզակի՝ el silencio։'
  },
  {
    id: 3,
    incorrectSentenceEs: 'Yo tiene una casa en Uruguay.',
    incorrectSentenceHy: 'Ես ունի տուն Ուրուգվայում (սխալ դեմքով բայ)։',
    correctSentenceEs: 'Yo tengo una casa en Uruguay.',
    correctSentenceHy: 'Ես տուն ունեմ Ուրուգվայում։',
    errorWord: 'tiene',
    correctionWord: 'tengo',
    ruleEs: 'Conjugación del verbo tener en primera persona del presente: Yo tengo (no tiene).',
    ruleHy: 'Tener բայի խոնարհումը առաջին դեմքում (ներկա)՝ Yo tengo (ոչ թե tiene)։'
  }
];

export const LISTEN_RESPOND_QUESTIONS: ListenRespondQuestion[] = [
  {
    id: 1,
    timestamp: 15,
    duration: 10,
    promptEs: 'Escucha el fragmento inicial (00:15). ¿Cómo saluda Ismael Cala a la audiencia?',
    promptHy: 'Լսի՛ր սկզբնական հատվածը (00:15)։ Ինչպե՞ս է Իսմայել Կալան ողջունում լսարանին։',
    options: [
      { textEs: 'Qué rico ese tango, a lo mejor podemos bailar tango con Natalia Oreiro.', textHy: 'Ի՜նչ հաճելի տանգո էր, գուցե կարողանանք տանգո պարել Նատալիա Օրեյրոյի հետ։' },
      { textEs: 'Buenas noches a todos desde Madrid.', textHy: 'Բարի երեկո բոլորին Մադրիդից։' },
      { textEs: 'Terminamos el programa por hoy.', textHy: 'Այսօրվա համար ավարտում ենք հաղորդումը։' },
      { textEs: 'No me gusta la música de fondo.', textHy: 'Ինձ դուր չի գալիս ֆոնային երաժշտությունը։' }
    ],
    correctIndex: 0,
    explanationEs: 'Cala comienza con humor elogiando el tango.',
    explanationHy: 'Կալան հումորով սկսում է տանգոյի գովասանքով։'
  },
  {
    id: 2,
    timestamp: 150,
    duration: 12,
    promptEs: 'Escucha el fragmento (02:30). ¿Qué frase célebre dice Natalia?',
    promptHy: 'Լսի՛ր հատվածը (02:30)։ Ի՞նչ հայտնի արտահայտություն է ասում Նատալիան։',
    options: [
      { textEs: 'Uno tarda dos años en aprender a hablar y 60 en aprender a callarse.', textHy: 'Մարդուն 2 տարի է պետք խոսել սովորելու համար, իսկ 60՝ լռել սովորելու։' },
      { textEs: 'Nunca quiero hablar con nadie.', textHy: 'Երբեք չեմ ուզում որևէ մեկի հետ խոսել։' },
      { textEs: 'Aprender a hablar toma 100 años.', textHy: 'Խոսել սովորելը 100 տարի է տևում։' },
      { textEs: 'El silencio no sirve para nada.', textHy: 'Լռությունը ոչ մի բանի պետք չէ։' }
    ],
    correctIndex: 0,
    explanationEs: 'Natalia comparte esta divertida y sabia lección.',
    explanationHy: 'Նատալիան կիսվում է այս իմաստուն և զվարճալի մտքով։'
  },
  {
    id: 3,
    timestamp: 541,
    duration: 10,
    promptEs: 'Escucha el fragmento (09:01). ¿Qué pensó Natalia al ver las patitas de pollo?',
    promptHy: 'Լսի՛ր հատվածը (09:01)։ Ի՞նչ մտածեց Նատալիան հավի տոտիկները տեսնելիս։',
    options: [
      { textEs: 'Esto está vencido.', textHy: 'Սրա ժամկետն անցել է։' },
      { textEs: 'Esto huele a flores.', textHy: 'Սա ծաղիկների հոտ ունի։' },
      { textEs: 'Voy a cocinarlas ahora mismo.', textHy: 'Հենց հիմա դրանք կեփեմ։' },
      { textEs: 'Aquí hay un tesoro.', textHy: 'Այստեղ գանձ կա։' }
    ],
    correctIndex: 0,
    explanationEs: 'Siendo vegetariana, vio el paquete y pensó que estaba caducado.',
    explanationHy: 'Լինելով բուսակեր՝ նա կարծեց, որ փաթեթը ժամկետանց է։'
  }
];

export const GRAND_CONTEST_QUESTIONS: GrandContestQuestion[] = [
  {
    id: 1,
    level: 'facil',
    questionEs: '¿Cómo se llama la protagonista de la entrevista?',
    questionHy: 'Ի՞նչ է հարցազրույցի գլխավոր հերոսուհու անունը։',
    options: [
      { textEs: 'Natalia Oreiro', textHy: 'Նատալիա Օրեյրո' },
      { textEs: 'Penélope Cruz', textHy: 'Պենելոպե Կրուս' },
      { textEs: 'Shakira', textHy: 'Շակիրա' },
      { textEs: 'Thalía', textHy: 'Թալիա' }
    ],
    correctIndex: 0,
    explanationEs: 'La célebre actriz y cantante uruguaya es Natalia Oreiro.',
    explanationHy: 'Հայտնի ուրուգվայցի դերասանուհին և երգչուհին Նատալիա Օրեյրոն է։'
  },
  {
    id: 2,
    level: 'facil',
    questionEs: '¿Dónde estaba escondido el dinero en la anécdota?',
    questionHy: 'Որտե՞ղ էր թաքցված գումարը պատմության մեջ։',
    options: [
      { textEs: 'En una bolsa de patitas de pollo congelado', textHy: 'Սառեցված հավի տոտիկների տոպրակի մեջ' },
      { textEs: 'Debajo de la alfombra', textHy: 'Գորգի տակ' },
      { textEs: 'Dentro de un libro de poemas', textHy: 'Բանաստեղծությունների գրքի մեջ' },
      { textEs: 'En el maletero del auto', textHy: 'Մեքենայի բեռնախցիկում' }
    ],
    correctIndex: 0,
    explanationEs: 'Estaba en el congelador, dentro de una bolsa de patitas de pollo.',
    explanationHy: 'Սառցախցիկում էր՝ հավի տոտիկների տոպրակում։'
  },
  {
    id: 3,
    level: 'medio',
    questionEs: '¿Qué le contestó el director de su primer casting en Argentina cuando ella dijo que quería ser actriz?',
    questionHy: 'Ի՞նչ պատասխանեց նրա առաջին քասթինգի ռեժիսորը, երբ նա ասաց, որ ուզում է դերասանուհի դառնալ։',
    options: [
      { textEs: '«Dedícate a otra cosa»', textHy: '«Ուրիշ գործով զբաղվիր»' },
      { textEs: '«Eres la mejor del mundo»', textHy: '«Դու աշխարհի լավագույնն ես»' },
      { textEs: '«Te contrato hoy mismo»', textHy: '«Հենց այսօր քեզ աշխատանքի եմ վերցնում»' },
      { textEs: '«Vuelve en diez minutos»', textHy: '«Վերադարձիր 10 րոպեից»' }
    ],
    correctIndex: 0,
    explanationEs: 'Le dijo con dureza: «Dedícate a otra cosa».',
    explanationHy: 'Նա կոպտորեն ասաց՝ «Ուրիշ գործով զբաղվիր»։'
  },
  {
    id: 4,
    level: 'dificil',
    questionEs: '¿Con qué famosa estrella italiana grabó un disco en Italia tras haberlo visualizado un mes antes?',
    questionHy: 'Ո՞ր հայտնի իտալացի աստղի հետ նա Իտալիայում երգ ձայնագրեց՝ դա մեկ ամիս առաջ պատկերացնելուց հետո։',
    options: [
      { textEs: 'Raffaella Carrà', textHy: 'Ռաֆայելա Կառա' },
      { textEs: 'Laura Pausini', textHy: 'Լաուրա Պաուզինի' },
      { textEs: 'Mina Mazzini', textHy: 'Մինա Մացինի' },
      { textEs: 'Eros Ramazzotti', textHy: 'Էրոս Ռամազոտի' }
    ],
    correctIndex: 0,
    explanationEs: 'Grabó con la legendaria Raffaella Carrà la canción «0303456».',
    explanationHy: 'Ձայնագրվեց լեգենդար Ռաֆայելա Կառայի հետ։'
  }
];

export const EXPRESSIONS_DATA: ExpressionItem[] = [
  {
    id: 1,
    phraseEs: 'No bajar los brazos',
    phraseHy: 'Երբեք չհանձնվել (ձեռքերը վայր չդնել)',
    literalHy: 'Ձեռքերը չիջեցնել',
    usageContextEs: 'Se utiliza para motivar a alguien a seguir luchando a pesar de los fracasos o el cansancio.',
    usageContextHy: 'Օգտագործվում է մարդուն ոգեշնչելու համար՝ շարունակել պայքարը չնայած ձախողումներին։',
    exampleEs: 'Aunque el primer director le dijo que se dedicara a otra cosa, Natalia nunca bajó los brazos.',
    exampleHy: 'Թեև առաջին ռեժիսորն ասաց ուրիշ գործով զբաղվել, Նատալիան երբեք ձեռքերը վայր չդրեց։'
  },
  {
    id: 2,
    phraseEs: 'Meter la pata',
    phraseHy: 'Սխալվել, հիմարություն անել, անտեղի բան ասել',
    literalHy: 'Թաթը ներս մտցնել',
    usageContextEs: 'Cometer un error o decir algo inapropiado en una conversación.',
    usageContextHy: 'Սխալվել կամ անտեղի բան ասել զրույցի ընթացքում։',
    exampleEs: 'Me quedo callada para no meter la pata.',
    exampleHy: 'Լուռ եմ մնում, որպեսզի սխալ բան չասեմ։'
  },
  {
    id: 3,
    phraseEs: 'Estar en pareja',
    phraseHy: 'Զուգընկեր ունենալ, զույգ կազմել',
    literalHy: 'Լինել զույգի մեջ',
    usageContextEs: 'Modismo común para referirse a tener un compañero sentimental estable.',
    usageContextHy: 'Տարածված արտահայտություն՝ կայուն սիրային զուգընկեր ունենալու մասին։',
    exampleEs: 'En ese momento yo estaba en pareja.',
    exampleHy: 'Այդ ժամանակ ես զուգընկեր ունեի։'
  },
  {
    id: 4,
    phraseEs: 'Estar vencido / vencida',
    phraseHy: 'Ժամկետանց լինել (սնունդ, փաստաթուղթ)',
    literalHy: 'Պարտված / ժամկետը լրացած լինել',
    usageContextEs: 'Se aplica a alimentos o documentos cuya fecha de vigencia ha expirado.',
    usageContextHy: 'Կիրառվում է սննդի կամ փաստաթղթերի համար, որոնց պիտանելիության ժամկետն անցել է։',
    exampleEs: 'Vi la bolsa en el freezer y pensé: «Esto está vencido».',
    exampleHy: 'Տեսա տոպրակը սառցախցիկում ու մտածեցի․ «Սրա ժամկետն անցել է»։'
  },
  {
    id: 5,
    phraseEs: 'No tener techo',
    phraseHy: 'Անսահման հնարավորություններ ունենալ, առաստաղ չունենալ',
    literalHy: 'Առաստաղ չունենալ',
    usageContextEs: 'Expresar que el crecimiento o el potencial de alguien no tiene límites.',
    usageContextHy: 'Արտահայտել, որ մարդու աճն ու ներուժը չունի սահմաններ։',
    exampleEs: 'Nosotros no tenemos techo.',
    exampleHy: 'Մեր հնարավորություններն անսահման են։'
  },
  {
    id: 6,
    phraseEs: 'Ser cabeza dura',
    phraseHy: 'Շատ համառ, նպատակասլաց լինել',
    literalHy: 'Պինդ գլուխ ունենալ',
    usageContextEs: 'Ser obstinado y luchar firmemente por lo que se desea.',
    usageContextHy: 'Համառորեն պայքարել սեփական ցանկությունների համար։',
    exampleEs: 'Soy Tauro, soy súper cabeza dura.',
    exampleHy: 'Ես Ցուլ եմ, շատ համառ եմ։'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    titleEs: 'Primeros pasos',
    titleHy: 'Առաջին քայլեր',
    descriptionEs: 'Explora la entrevista de Natalia Oreiro.',
    descriptionHy: 'Ուսումնասիրիր Նատալիա Օրեյրոյի հարցազրույցը։',
    icon: '🌱',
    unlocked: true
  },
  {
    id: 'chicken_master',
    titleEs: 'El misterio resuelto',
    titleHy: 'Լուծված առեղծված',
    descriptionEs: 'Completa los 4 niveles del juego del pollo congelado.',
    descriptionHy: 'Ավարտիր սառեցված հավի խաղի բոլոր 4 մակարդակները։',
    icon: '🍗',
    unlocked: false
  },
  {
    id: 'true_detective',
    titleEs: 'Detective de la verdad',
    titleHy: 'Ճշմարտության դետեկտիվ',
    descriptionEs: 'Completa las 20 afirmaciones de Verdadero o Falso.',
    descriptionHy: 'Ավարտիր «Ճիշտ թե Սխալ»-ի բոլոր 20 պնդումները։',
    icon: '🔍',
    unlocked: false
  },
  {
    id: 'pasapalabra_hero',
    titleEs: 'Maestro del Rosco',
    titleHy: 'Այբուբենի վարպետ',
    descriptionEs: 'Completa el juego de Pasapalabra.',
    descriptionHy: 'Ավարտիր Պասապալաբրա խաղը։',
    icon: '🔤',
    unlocked: false
  },
  {
    id: 'grand_contest_star',
    titleEs: 'Gran Estrella de Cala',
    titleHy: 'Կալայի Մեծ Աստղ',
    descriptionEs: 'Supera El Gran Concurso de preguntas.',
    descriptionHy: 'Հաղթահարիր հարցերի «Մեծ Մրցույթը»։',
    icon: '⭐',
    unlocked: false
  }
];
