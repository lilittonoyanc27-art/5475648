export type GameTab = 
  | 'video'
  | 'games_hub'
  | 'chicken_mystery'
  | 'true_false'
  | 'who_said'
  | 'fill_blank'
  | 'order_words'
  | 'interview'
  | 'choose_reply'
  | 'what_if'
  | 'pasapalabra'
  | 'grammar_detective'
  | 'wheel'
  | 'listen_respond'
  | 'grand_contest'
  | 'expressions'
  | 'achievements';

export interface WordBreakdown {
  word: string;
  cleanWord: string;
  translationHy: string;
  partOfSpeech: string; // e.g., 'Գոյական' (Sustantivo), 'Բայ' (Verbo), 'Ածական' (Adjetivo)
  exampleEs: string;
  exampleHy: string;
}

export interface SubtitleLine {
  id: string;
  start: number; // in seconds
  end: number;
  speaker: 'Natalia' | 'Presentador' | 'Ambos';
  textEs: string;
  textHy: string;
  chapterId: number;
  words?: WordBreakdown[];
}

export interface Chapter {
  id: number;
  titleEs: string;
  titleHy: string;
  start: number;
  end: number;
  timeLabel: string;
  descriptionEs: string;
  descriptionHy: string;
  topicsEs: string[];
  topicsHy: string[];
  icon: string;
}

export interface TrueFalseQuestion {
  id: number;
  statementEs: string;
  statementHy: string;
  isTrue: boolean;
  explanationEs: string;
  explanationHy: string;
  chapterRef?: number;
}

export interface WhoSaidQuestion {
  id: number;
  quoteEs: string;
  quoteHy: string;
  speaker: 'Natalia' | 'Presentador';
  contextEs: string;
  contextHy: string;
}

export interface FillBlankQuestion {
  id: number;
  sentenceEs: string; // contains '________'
  sentenceHy: string;
  options: {
    textEs: string;
    textHy: string;
  }[];
  correctIndex: number;
  explanationEs: string;
  explanationHy: string;
}

export interface OrderWordsQuestion {
  id: number;
  scrambledWords: string[];
  correctSentence: string;
  translationHy: string;
  hintEs: string;
  hintHy: string;
}

export interface InterviewDialog {
  id: number;
  questionEs: string;
  questionHy: string;
  responseEs: string;
  responseHy: string;
  categoryEs: string;
  categoryHy: string;
  videoTimestamp?: number;
}

export interface ChooseResponseQuestion {
  id: number;
  situationEs: string;
  situationHy: string;
  options: {
    textEs: string;
    textHy: string;
    isCorrect: boolean;
    feedbackEs: string;
    feedbackHy: string;
  }[];
}

export interface WhatIfPrompt {
  id: number;
  promptEs: string;
  promptHy: string;
  suggestedStarters: {
    textEs: string;
    textHy: string;
  }[];
  sampleAnswers: {
    textEs: string;
    textHy: string;
    humorous?: boolean;
  }[];
  grammarTipEs: string;
  grammarTipHy: string;
}

export interface PasapalabraLetter {
  letter: string;
  type: 'starts_with' | 'contains';
  definitionEs: string;
  definitionHy: string;
  answer: string;
  hintEs: string;
  hintHy: string;
}

export interface GrammarErrorQuestion {
  id: number;
  incorrectSentenceEs: string;
  incorrectSentenceHy: string;
  correctSentenceEs: string;
  correctSentenceHy: string;
  errorWord: string;
  correctionWord: string;
  ruleEs: string;
  ruleHy: string;
}

export interface ListenRespondQuestion {
  id: number;
  timestamp: number;
  duration: number;
  promptEs: string;
  promptHy: string;
  options: {
    textEs: string;
    textHy: string;
  }[];
  correctIndex: number;
  explanationEs: string;
  explanationHy: string;
}

export interface GrandContestQuestion {
  id: number;
  level: 'facil' | 'medio' | 'dificil';
  questionEs: string;
  questionHy: string;
  options: {
    textEs: string;
    textHy: string;
  }[];
  correctIndex: number;
  explanationEs: string;
  explanationHy: string;
}

export interface ExpressionItem {
  id: number;
  phraseEs: string;
  phraseHy: string;
  literalHy: string;
  usageContextEs: string;
  usageContextHy: string;
  exampleEs: string;
  exampleHy: string;
}

export interface Achievement {
  id: string;
  titleEs: string;
  titleHy: string;
  descriptionEs: string;
  descriptionHy: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  points: number;
  streak: number;
  stars: number;
  completedChapters: number[];
  completedGames: string[];
  achievements: string[];
  savedWords: string[];
  lastActiveDate: string;
}
