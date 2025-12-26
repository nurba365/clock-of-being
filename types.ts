
export interface GameStats {
  matter: number;    
  relations: number; 
  meaning: number;   
  happiness: number; 
  energy: number;    
}

export type MaslowLevel = 'physiology' | 'safety' | 'belonging' | 'esteem' | 'actualization';

export interface Choice {
  id: string;
  text: string;
  category: MaslowLevel;
  effect: Partial<GameStats>;
  // Fix: Added optional flavor property to resolve "Property 'flavor' does not exist on type 'Choice'" errors in UI components
  flavor?: string;
}

export interface Scene {
  hour: number;
  title: string;
  description: string;
  choices: Choice[];
  backgroundKeyword: string;
  tone: string;
}

export type Gender = 'male' | 'female' | 'other';

export interface PlayerProfile {
  name: string;
  age: number;
  gender: Gender;
}

export type GamePhase = 
  | 'CINEMATIC_INTRO' 
  | 'BIRTH_MOMENT' 
  | 'PRE_CONSENT_INTRO'
  | 'CONSENT' 
  | 'PROFILE' 
  | 'PLAYING' 
  | 'ACT_SUMMARY' 
  | 'GAME_OVER_SEQUENCE';

export interface ChoiceRecord {
  hour: number;
  sceneTitle: string;
  choiceText: string;
  category: MaslowLevel;
}
