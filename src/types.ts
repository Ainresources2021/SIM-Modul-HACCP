export type ScreenId = number; // 1 to 27

export interface UserAnswers {
  // Screen 3: Kesediaan
  readyToLearn: boolean;
  knowOutput: boolean;
  readyToStart: boolean;
  
  // Screen 5: Aktivasi Pengetahuan Sedia Ada
  priorProduct: string;
  priorHazard: string;
  priorStep: string;
  priorControl: string;
  priorRevealed: boolean;

  // Screen 7: MCQ Maksud HACCP
  mcqGoalAnswer: string; // 'A' | 'B' | 'C' | 'D' | null
  
  // Screen 9: Matching Activity
  matchingAnswers: { [key: string]: string }; // itemId -> hazardType
  matchingSubmitted: boolean;

  // Screen 11: Pasukan HACCP Checklist
  teamSelection: { [key: string]: boolean };

  // Screen 12: Penerangan Produk
  productName: string;
  productIngredients: string;
  productAllergens: string;
  productStorage: string;
  productTarget: string;
  productRevealed: boolean;

  // Screen 13: Selected Flowchart Step
  selectedFlowchartStep: number | null;

  // Screen 14: Reordered Flowchart Steps
  reorderedFlowchart: string[];
  flowchartReorderSuccess: boolean | null;

  // Screen 15: Selected Principle
  selectedPrinciple: number | null;

  // Screen 16: Reordered Principles
  reorderedPrinciples: string[];
  principlesReorderSuccess: boolean | null;

  // Screen 17: Mitos vs Fakta
  misconceptionAnswer: boolean | null; // True or False

  // Screen 20: Scenario Quiz Answers
  scenarioAnswers: { [key: number]: string }; // scenarioIndex -> selectedOption
  scenariosSubmitted: boolean;

  // Screen 21: Pemantauan CCP Fill-in
  monitorWhat: string;
  monitorWhere: string;
  monitorWho: string;
  monitorWhen: string;
  monitorHow: string;
  monitorRecord: string;
  monitorRevealed: boolean;

  // Screen 22: Mini Worksheet
  worksheetRows: WorksheetRow[];
  worksheetSubmitted: boolean;

  // Screen 24: Final Quiz Answers
  quizAnswers: { [key: number]: string }; // questionId -> answer
  quizSubmitted: boolean;
  quizScore: number;

  // Screen 25: Refleksi
  reflection1: string;
  reflection2: string;
  reflection3: string;
  reflection4: string;
  reflection5: string;
  reflectionSubmitted: boolean;
}

export interface WorksheetRow {
  step: string;
  hazard: string;
  control: string;
  decision: string; // 'PRP/GMP' | 'CP' | 'CCP' | 'Bergantung' | ''
  reason: string;
}

export interface Scenario {
  id: number;
  title: string;
  product: string;
  step: string;
  hazard: string;
  options: { key: string; label: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: { key: string; label: string }[];
  correctAnswer: string;
  explanation: string;
}
