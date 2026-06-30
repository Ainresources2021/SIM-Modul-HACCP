import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, ChevronLeft, ChevronRight, Home, Menu, X, 
  HelpCircle, CheckCircle, AlertTriangle, Play, Award, 
  RefreshCw, Layers, CheckSquare, Sparkles, ShieldCheck, Shield,
  User, CheckCircle2, ChevronDown, ListCollapse, BookmarkCheck, ArrowRight
} from 'lucide-react';

import { ScreenId, UserAnswers, WorksheetRow } from './types';
import { 
  SCREEN_TITLES, SECTIONS, HAZARDS, MATCHING_ITEMS, 
  FLOWCHART_STEPS, PRINCIPLES, SCENARIOS, QUIZ_QUESTIONS, 
  WORKSHEET_MODEL_ANSWERS, INITIAL_USER_ANSWERS 
} from './data/learningData';

import { FlowchartVisual } from './components/FlowchartVisual';
import { DecisionTreeVisual } from './components/DecisionTreeVisual';
import { MatchingActivity } from './components/MatchingActivity';
import { ReorderActivity } from './components/ReorderActivity';
import { WorksheetTable } from './components/WorksheetTable';

const heroBanner = "https://lh3.googleusercontent.com/d/1jqGOYXPDrvWt_5hLHd8FB5SVy1tvdDPh";
const flowchartIntroImage = "https://lh3.googleusercontent.com/d/1JCsCGK5hPQVT2fYyP0K361i6urYKxj6M";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(INITIAL_USER_ANSWERS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [generalFeedback, setGeneralFeedback] = useState<string | null>(null);

  // Helper to trigger temporary toast / inline feedback
  const triggerFeedback = (message: string) => {
    setGeneralFeedback(message);
    setTimeout(() => {
      setGeneralFeedback(null);
    }, 4000);
  };

  // Safe navigation handlers
  const handleNext = () => {
    if (currentScreen < 27) {
      setCurrentScreen((prev) => (prev + 1) as ScreenId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentScreen > 1) {
      setCurrentScreen((prev) => (prev - 1) as ScreenId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setCurrentScreen(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderScenarioGraphic = (id: number) => {
    switch (id) {
      case 1: // Memasak Ayam
        return (
          <div className="flex items-center gap-3 p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl my-2.5">
            <div className="relative w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 shadow-2xs overflow-hidden select-none">
              <span className="text-2xl">🍗</span>
            </div>
            <div className="text-left text-base">
              <span className="font-bold text-amber-800 flex items-center gap-1">
                Grafik Aliran Haba (Memasak)
              </span>
              <p className="text-base text-amber-700 leading-relaxed">Penggorengan suhu tinggi memastikan bakteria patogen berbahaya dinyahaktifkan sepenuhnya.</p>
            </div>
          </div>
        );
      case 2: // Mencuci Tangan Pekerja
        return (
          <div className="flex items-center gap-3 p-3 bg-sky-50/80 border border-sky-200/60 rounded-xl my-2.5">
            <div className="relative w-11 h-11 bg-sky-100 rounded-lg flex items-center justify-center shrink-0 shadow-2xs overflow-hidden select-none">
              <span className="text-2xl animate-pulse">🧼</span>
            </div>
            <div className="text-left text-base">
              <span className="font-bold text-sky-800 flex items-center gap-1">
                Sanitasi & Kebersihan Pekerja (PRP)
              </span>
              <p className="text-base text-sky-700 leading-relaxed">Amalan prasyarat asas bagi melindungi integriti produk daripada cemaran silang kuku/tangan.</p>
            </div>
          </div>
        );
      case 3: // Sos Cili
        return (
          <div className="flex items-center gap-3 p-3 bg-rose-50/80 border border-rose-200/60 rounded-xl my-2.5">
            <div className="relative w-11 h-11 bg-rose-100 rounded-lg flex items-center justify-center shrink-0 shadow-2xs overflow-hidden select-none">
              <span className="text-2xl">🍾</span>
            </div>
            <div className="text-left text-base">
              <span className="font-bold text-rose-800 flex items-center gap-1">
                Bahaya Serpihan Fizikal (Kaca)
              </span>
              <p className="text-base text-rose-700 leading-relaxed">Risiko pecah pada bahagian talian bungkusan botol kaca perlu dianalisis dengan teliti.</p>
            </div>
          </div>
        );
      case 4: // Penyimpanan Sejuk Beku
        return (
          <div className="flex items-center gap-3 p-3 bg-blue-50/80 border border-blue-200/60 rounded-xl my-2.5">
            <div className="relative w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 shadow-2xs overflow-hidden select-none">
              <span className="text-2xl">❄️</span>
            </div>
            <div className="text-left text-base">
              <span className="font-bold text-blue-800 flex items-center gap-1">
                Rantaian Sejuk Beku (-18°C)
              </span>
              <p className="text-base text-blue-700 leading-relaxed">Penyimpanan di bawah beku melumpuhkan pembiakan kulat/bakteria secara meluas.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderHazardGraphic = (id: string) => {
    switch (id) {
      case "biologi":
        return (
          <div className="relative w-full h-24 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center overflow-hidden mb-2 select-none">
            <div className="absolute inset-0 bg-radial-gradient from-emerald-100/30 to-emerald-50" />
            <div className="w-16 h-16 rounded-full border-2 border-emerald-300 bg-white/80 relative flex items-center justify-center">
              <span className="absolute top-2 left-3 w-3 h-3 bg-emerald-500 rounded-full opacity-80 animate-pulse" />
              <span className="absolute bottom-3 right-3 w-2.5 h-2.5 bg-teal-500 rounded-full opacity-70" />
              <span className="absolute top-6 right-2 w-2 h-2 bg-green-500 rounded-full opacity-60 animate-ping" />
              <span className="text-base font-mono font-bold text-emerald-800">Bakteria</span>
            </div>
          </div>
        );
      case "kimia":
        return (
          <div className="relative w-full h-24 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center overflow-hidden mb-2 select-none">
            <div className="absolute inset-0 bg-radial-gradient from-blue-100/30 to-blue-50" />
            <div className="flex gap-2 items-center">
              <span className="text-3xl animate-bounce">🧴</span>
              <div className="flex flex-col">
                <span className="text-base font-mono font-extrabold text-blue-700 bg-blue-100 px-1 rounded">Bahan Kimia</span>
                <span className="text-base font-semibold text-blue-500">Sisa Racun / Alergen</span>
              </div>
            </div>
          </div>
        );
      case "fizikal":
        return (
          <div className="relative w-full h-24 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-center overflow-hidden mb-2 select-none">
            <div className="absolute inset-0 bg-radial-gradient from-amber-100/30 to-amber-50" />
            <div className="flex gap-2 items-center">
              <span className="text-3xl rotate-12">🔩</span>
              <div className="flex flex-col">
                <span className="text-base font-mono font-extrabold text-amber-700 bg-amber-100 px-1 rounded">Bendasing Fizikal</span>
                <span className="text-base font-semibold text-amber-500">Serpihan Kaca / Logam</span>
              </div>
            </div>
          </div>
        );
      case "radioaktif":
        return (
          <div className="relative w-full h-24 bg-rose-50 rounded-xl border border-rose-100 flex items-center justify-center overflow-hidden mb-2 select-none">
            <div className="absolute inset-0 bg-radial-gradient from-rose-100/30 to-rose-50" />
            <div className="flex gap-2 items-center">
              <span className="text-3xl animate-spin" style={{ animationDuration: '6s' }}>☢️</span>
              <div className="flex flex-col">
                <span className="text-base font-mono font-extrabold text-rose-700 bg-rose-100 px-1 rounded">Radioaktif</span>
                <span className="text-base font-semibold text-rose-500">Radionuklid Industri</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Screen 2: Expandable card handler
  const [expandedSectionCard, setExpandedSectionCard] = useState<number | null>(null);

  // Screen 3: Checklist state handlers
  const handleChecklistChange = (field: 'readyToLearn' | 'knowOutput' | 'readyToStart') => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [field]: !prev[field] };
      if (updated.readyToLearn && updated.knowOutput && updated.readyToStart) {
        triggerFeedback("Bagus! Anda bersedia untuk memulakan pengembaraan pembelajaran ini.");
      }
      return updated;
    });
  };

  // Screen 5: Prior knowledge handlers
  const handlePriorInput = (field: keyof UserAnswers, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // Screen 9: Matching handlers
  const handleMatchingPair = (itemId: string, category: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      matchingAnswers: {
        ...prev.matchingAnswers,
        [itemId]: category,
      },
    }));
  };

  const handleMatchingSubmit = () => {
    setUserAnswers((prev) => ({ ...prev, matchingSubmitted: true }));
    triggerFeedback("Aktiviti padanan dinilai! Sila semak jawapan anda di bawah.");
  };

  const handleMatchingReset = () => {
    setUserAnswers((prev) => ({ ...prev, matchingAnswers: {}, matchingSubmitted: false }));
  };

  // Screen 11: Team selection checklist handler
  const handleTeamChecklist = (option: string) => {
    setUserAnswers((prev) => {
      const updated = {
        ...prev,
        teamSelection: {
          ...prev.teamSelection,
          [option]: !prev.teamSelection[option],
        },
      };
      return updated;
    });
  };

  // Screen 12: Product details form handler
  const handleProductForm = (field: 'productName' | 'productIngredients' | 'productAllergens' | 'productStorage' | 'productTarget', value: string) => {
    setUserAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // Screen 14: Reorder Flowchart handler
  const handleFlowchartReorderSubmit = (finalOrder: string[], isCorrect: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      reorderedFlowchart: finalOrder,
      flowchartReorderSuccess: isCorrect,
    }));
  };

  const handleFlowchartReorderReset = () => {
    setUserAnswers((prev) => ({
      ...prev,
      flowchartReorderSuccess: null,
    }));
  };

  // Screen 16: Reorder Principles handler
  const handlePrinciplesReorderSubmit = (finalOrder: string[], isCorrect: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      reorderedPrinciples: finalOrder,
      principlesReorderSuccess: isCorrect,
    }));
  };

  const handlePrinciplesReorderReset = () => {
    setUserAnswers((prev) => ({
      ...prev,
      principlesReorderSuccess: null,
    }));
  };

  // Screen 17: Misconception True/False
  const handleMisconception = (val: boolean) => {
    setUserAnswers((prev) => ({ ...prev, misconceptionAnswer: val }));
  };

  // Screen 20: Scenario Quiz handlers
  const handleScenarioSelect = (scenarioId: number, optionKey: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      scenarioAnswers: {
        ...prev.scenarioAnswers,
        [scenarioId]: optionKey,
      },
    }));
  };

  const handleScenariosSubmit = () => {
    setUserAnswers((prev) => ({ ...prev, scenariosSubmitted: true }));
    triggerFeedback("Jawapan situasi anda direkodkan! Mari lihat ulasan maklum balas.");
  };

  const handleScenariosReset = () => {
    setUserAnswers((prev) => ({ ...prev, scenarioAnswers: {}, scenariosSubmitted: false }));
  };

  // Screen 21: Monitor form handler
  const handleMonitorForm = (field: 'monitorWhat' | 'monitorWhere' | 'monitorWho' | 'monitorWhen' | 'monitorHow' | 'monitorRecord', value: string) => {
    setUserAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // Screen 22: Worksheet Grid update handler
  const handleWorksheetUpdate = (index: number, field: keyof WorksheetRow, value: string) => {
    setUserAnswers((prev) => {
      const updatedRows = [...prev.worksheetRows];
      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value,
      };
      return {
        ...prev,
        worksheetRows: updatedRows,
      };
    });
  };

  const handleWorksheetSubmit = () => {
    setUserAnswers((prev) => ({ ...prev, worksheetSubmitted: true }));
    triggerFeedback("Lembaran Kerja berjaya disimpan! Sila teruskan ke skrin seterusnya untuk model jawapan.");
  };

  // Screen 24: Final Quiz handlers
  const handleQuizAnswer = (questionId: number, answerKey: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: answerKey,
      },
    }));
  };

  const handleQuizSubmit = () => {
    // Calculate Score
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers.quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    setUserAnswers((prev) => ({
      ...prev,
      quizSubmitted: true,
      quizScore: score,
    }));
    triggerFeedback(`Kuiz Akhir Selesai! Skor anda: ${score}/5`);
  };

  const handleQuizReset = () => {
    setUserAnswers((prev) => ({ ...prev, quizAnswers: {}, quizSubmitted: false, quizScore: 0 }));
  };

  // Screen 25: Reflection input handlers
  const handleReflectionInput = (field: 'reflection1' | 'reflection2' | 'reflection3' | 'reflection4' | 'reflection5', value: string) => {
    setUserAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleReflectionSubmit = () => {
    setUserAnswers((prev) => ({ ...prev, reflectionSubmitted: true }));
    triggerFeedback("Refleksi pembelajaran anda berjaya disimpan!");
  };

  // Reset entire SIM to initial
  const resetEntireSIM = () => {
    setUserAnswers(INITIAL_USER_ANSWERS);
    setCurrentScreen(1);
    setExpandedSectionCard(null);
    triggerFeedback("Modul pembelajaran telah berjaya diuji semula sepenuhnya!");
  };

  // Find active section details
  const activeSection = SECTIONS.find((sec) => sec.screens.includes(currentScreen)) || SECTIONS[0];
  const progressPercent = currentScreen === 1 ? 0 : Math.round(((currentScreen - 1) / 26) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased text-slate-800">
      
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {generalFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg border border-emerald-500 flex items-center gap-2"
          >
            <Sparkles size={18} className="shrink-0 animate-spin" />
            <p className="text-base font-bold">{generalFeedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoHome}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Kembali ke Laman Utama"
            >
              <Home size={18} />
            </button>
            <div className="hidden sm:block border-l border-slate-200 h-6" />
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-relaxed">
                Sistem HACCP
              </h1>
              <p className="text-sm md:text-base text-slate-500 font-medium hidden sm:block">
                Modul Interaktif Keselamatan Makanan
              </p>
            </div>
          </div>

          {/* Progress Pill Indicator */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <span className="text-sm md:text-base font-mono font-bold uppercase tracking-wider text-blue-600">
                {activeSection.title}
              </span>
              <p className="text-sm md:text-base font-bold text-slate-700">
                Langkah {currentScreen} daripada 27
              </p>
            </div>
            
            {/* Circular Progress Gauge */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="14" stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="14" 
                  stroke="#2563eb" 
                  strokeWidth="3" 
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 14}
                  strokeDashoffset={2 * Math.PI * 14 * (1 - progressPercent / 100)}
                />
              </svg>
              <span className="absolute text-base font-mono font-bold text-slate-700">
                {progressPercent}%
              </span>
            </div>

            {/* Menu Drawer Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-full border border-slate-200 hover:border-slate-350 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Menu Kandungan"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100 relative">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Sidebar/Drawer Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Layers className="text-blue-600" size={18} />
                  <span className="font-extrabold text-lg text-slate-900">Kandungan Modul</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {SECTIONS.map((sec) => (
                  <div key={sec.id} className="space-y-2">
                    <h4 className="text-base font-extrabold text-slate-400 uppercase tracking-wider pl-1">
                      {sec.title}
                    </h4>
                    <div className="space-y-1">
                      {sec.screens.map((scrId) => {
                        const isCurrent = currentScreen === scrId;
                        const isPassed = currentScreen > scrId;

                        return (
                          <button
                            key={scrId}
                            onClick={() => {
                              setCurrentScreen(scrId as ScreenId);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl text-base font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
                              isCurrent
                                ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                                : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-base font-mono ${
                              isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {scrId}
                            </span>
                            <span className="truncate flex-1">{SCREEN_TITLES[scrId]}</span>
                            {isPassed && !isCurrent && (
                              <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer controls */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
                <p className="text-base text-slate-500 text-center font-medium">
                  Uji Semula Modul Pembelajaran Kendiri
                </p>
                <button
                  onClick={() => {
                    if(confirm("Adakah anda mahu menetapkan semula semua jawapan & kemajuan pembelajaran anda?")) {
                      resetEntireSIM();
                      setIsMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-full text-base font-bold transition-all active:scale-95 cursor-pointer"
                >
                  <RefreshCw size={12} />
                  Mula Semula Modul
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 flex flex-col justify-center">
        
        {/* Animated Wrapper for Screens */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-5 sm:p-12 md:p-14 shadow-sm min-h-[500px] flex flex-col justify-between relative text-lg md:text-xl leading-relaxed space-y-8">
          
          {/* Subtle Decorative Background Safe Badge */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50/45 rounded-full -z-0 opacity-40 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-slate-100/50 rounded-full -z-0 opacity-40 pointer-events-none" />

          <div className="relative z-10 space-y-8 md:space-y-10 flex-1">
            
            {/* SCREEN 1: INTRODUCTION */}
            {currentScreen === 1 && (
              <div className="space-y-6 py-2">
                
                {/* Hero Banner Image */}
                <div className="w-full overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm bg-white hover:shadow-md transition-all duration-300">
                  <img
                    src={heroBanner}
                    alt="Sistem HACCP: Memahami Bahaya Makanan dan Mengenal Pasti CCP"
                    className="hero-banner w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Main Hero Banner Container mimicking the user's uploaded banner */}
                <div className="w-full bg-slate-50 border border-slate-200/80 rounded-3xl p-4 sm:p-8 md:p-10 shadow-sm relative flex flex-col lg:flex-row items-stretch gap-8">
                  {/* Glowing background shapes to mimic the light blue gradient */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-50/30 rounded-full blur-2xl pointer-events-none -z-0" />
                  
                  {/* Left Column: Title, Description, and Icon Badges */}
                  <div className="flex-1 space-y-6 relative z-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Dark Green Pill Badge */}
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-base font-bold tracking-wide uppercase bg-teal-700 text-white shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Bahan Pembelajaran Kendiri Interaktif
                      </span>
                      
                      {/* Brand Title Header */}
                      <div className="space-y-2">
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] uppercase">
                          Sistem HACCP:
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-teal-800 tracking-tight leading-relaxed">
                          MEMAHAMI BAHAYA MAKANAN DAN MENGENAL PASTI CCP
                        </h2>
                      </div>
                      
                      {/* Sub-description */}
                      <p className="text-base sm:text-lg font-medium text-slate-500 max-w-xl leading-relaxed">
                        Terokai konsep asas HACCP secara interaktif. Kenal pasti bahaya makanan, fahami langkah kawalan, dan tentukan Titik Kawalan Kritikal (CCP) dengan yakin.
                      </p>
                    </div>

                    {/* Features Row - Circular badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-2">
                      <div className="flex flex-col items-center text-center p-2.5 bg-white border border-slate-100 rounded-2xl shadow-3xs hover:translate-y-[-2px] transition-transform">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                          <Shield size={18} />
                        </div>
                        <span className="text-base font-extrabold text-slate-800 leading-relaxed">Kenal Pasti Bahaya</span>
                      </div>
                      <div className="flex flex-col items-center text-center p-2.5 bg-white border border-slate-100 rounded-2xl shadow-3xs hover:translate-y-[-2px] transition-transform">
                        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2">
                          <Layers size={18} />
                        </div>
                        <span className="text-base font-extrabold text-slate-800 leading-relaxed">Analisis & Kawalan</span>
                      </div>
                      <div className="flex flex-col items-center text-center p-2.5 bg-white border border-slate-100 rounded-2xl shadow-3xs hover:translate-y-[-2px] transition-transform">
                        <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-2">
                          <CheckSquare size={18} />
                        </div>
                        <span className="text-base font-extrabold text-slate-800 leading-relaxed">Tentukan CCP</span>
                      </div>
                      <div className="flex flex-col items-center text-center p-2.5 bg-white border border-slate-100 rounded-2xl shadow-3xs hover:translate-y-[-2px] transition-transform">
                        <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-2">
                          <ShieldCheck size={18} />
                        </div>
                        <span className="text-base font-extrabold text-slate-800 leading-relaxed">Kepatuhan Keselamatan</span>
                      </div>
                    </div>

                    {/* Mula Pembelajaran Button */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          triggerFeedback("Mari mulakan modul keselamatan makanan HACCP.");
                          setCurrentScreen(6); // Go to Module 1
                        }}
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white font-extrabold rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 text-base cursor-pointer flex items-center gap-2"
                      >
                        MULA PEMBELAJARAN
                        <span className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center">
                          <ArrowRight size={11} className="stroke-[3]" />
                        </span>
                      </button>
                      <button
                        onClick={() => setCurrentScreen(2)}
                        className="px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-full transition-all text-base cursor-pointer"
                      >
                        Struktur Modul
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Dark Blue Banner with 4 Pills matching the uploaded design */}
                <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-white relative">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-slate-800 rounded-lg text-teal-400">
                      <Shield size={16} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base uppercase tracking-wider text-teal-300">Selamat</h4>
                      <p className="text-base text-slate-300">Pengurusan risiko yang berkesan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-slate-800 rounded-lg text-blue-400">
                      <Layers size={16} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base uppercase tracking-wider text-blue-300">Konsisten</h4>
                      <p className="text-base text-slate-300">Proses terkawal, kualiti terjamin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-slate-800 rounded-lg text-amber-400">
                      <CheckSquare size={16} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base uppercase tracking-wider text-amber-300">Patuh</h4>
                      <p className="text-base text-slate-300">Memenuhi standard keselamatan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-slate-800 rounded-lg text-emerald-400">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base uppercase tracking-wider text-emerald-300">Tanggungjawab</h4>
                      <p className="text-base text-slate-300">Melindungi pengguna & industri</p>
                    </div>
                  </div>
                </div>

                {/* Brief introductory paragraph below the banner */}
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl max-w-3xl mx-auto text-left space-y-4">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Selamat datang ke <strong>modul interaktif keselamatan makanan</strong> bagi sistem Hazard Analysis Critical Control Points — HACCP. Modul pembelajaran kendiri ini membantu anda memahami asas keselamatan makanan secara berperingkat, interaktif dan tersusun.
                  </p>
                  <p className="text-lg font-semibold text-teal-800 leading-relaxed text-center">
                    “Fokus utama modul ini adalah membantu anda memahami bahaya makanan & mengenal pasti CCP.”
                  </p>
                </div>

              </div>
            )}

            {/* SCREEN 2: STRUKTUR SIM */}
            {currentScreen === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Bahagian Pembelajaran
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Struktur Modul Pembelajaran
                  </h2>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  Modul interaktif keselamatan makanan ini mempunyai beberapa bahagian pembelajaran ringkas. Setiap bahagian mengandungi penerangan konsep, aktiviti interaktif dan semakan kendiri. Klik pada mana-mana kad di bawah untuk melihat ringkasan aktiviti &amp; fokus:
                </p>

                {/* Grid cards pathway */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SECTIONS.map((sec) => {
                    const isExpanded = expandedSectionCard === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => setExpandedSectionCard(isExpanded ? null : sec.id)}
                        className={`text-left p-4 rounded-2xl border transition-all duration-300 relative group ${sec.color} ${
                          isExpanded ? 'ring-2 ring-teal-400 shadow-md' : 'shadow-xs hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-base font-mono font-bold bg-white/60 px-2 py-0.5 rounded">
                            Bahagian {sec.id}
                          </span>
                          <ChevronDown size={14} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                        <h4 className="font-extrabold text-slate-900 mt-2 text-lg">
                          {sec.title}
                        </h4>
                        <p className="text-base text-slate-700 mt-1 line-clamp-2">
                          {sec.desc}
                        </p>
                        
                        {/* Expandable info */}
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-slate-900/10 text-base space-y-1.5 text-slate-800 animate-fadeIn">
                            <p><strong>Fokus:</strong> {sec.title.includes('CCP') ? 'Menentukan PRP, CP, dan CCP menggunakan 3-Soalan' : 'Penerangan Konsep asas & latihan praktikal'}</p>
                            <p><strong>Aktiviti:</strong> Interactive quizzes, sorting exercises, &amp; case worksheets</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-base text-slate-500">
                  <strong>Cadangan Laluan Pembelajaran:</strong><br />
                  Mula Di Sini → Apa Itu HACCP → Bahaya Makanan → Langkah Permulaan HACCP → Carta Alir Proses → Tujuh Prinsip HACCP → CCP atau Bukan? → Aktiviti Kes → Kuiz Akhir → Refleksi → Tamat
                </div>
              </div>
            )}

            {/* SCREEN 3: SIAPA SESUAI */}
            {currentScreen === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Kumpulan Sasaran
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Siapa Sesuai Mengikuti Modul Ini?
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Modul ini sesuai untuk anda jika anda:
                </p>

                {/* Target cards tags */}
                <div className="flex flex-wrap gap-2">
                  {['Pelajar', 'Pengendali makanan', 'Staf dapur', 'Pengusaha makanan', 'QA/QC', 'Trainer', 'Individu umum'].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-800 font-bold text-base rounded-xl border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Anda tidak perlu menjadi pakar HACCP untuk mengikuti modul ini. Modul ini akan membimbing anda langkah demi langkah.
                </p>

                {/* Checklist Kesediaan */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="font-bold text-lg text-slate-800">
                    Sila semak kesediaan anda sebelum meneruskan pembelajaran:
                  </h4>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={userAnswers.readyToLearn}
                        onChange={() => handleChecklistChange('readyToLearn')}
                        className="mt-1 rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                      />
                      <span className="text-base text-slate-700 font-medium">Saya ingin memahami asas HACCP.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={userAnswers.knowOutput}
                        onChange={() => handleChecklistChange('knowOutput')}
                        className="mt-1 rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                      />
                      <span className="text-base text-slate-700 font-medium">Saya ingin tahu cara mengenal pasti CCP dengan tepat.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={userAnswers.readyToStart}
                        onChange={() => handleChecklistChange('readyToStart')}
                        className="mt-1 rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                      />
                      <span className="text-base text-slate-700 font-medium">Saya bersedia untuk mencuba aktiviti kendiri secara aktif.</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 4: HASIL PEMBELAJARAN */}
            {currentScreen === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Objektif Modul
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Hasil Pembelajaran
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Selepas melengkapkan modul ini, anda akan dapat:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Menerangkan maksud HACCP.",
                    "Menjelaskan kepentingan HACCP.",
                    "Mengenal pasti jenis bahaya makanan.",
                    "Menyusun langkah permulaan HACCP.",
                    "Membaca dan memahami carta alir proses.",
                    "Menghubungkaitkan tujuh prinsip HACCP.",
                    "Membezakan PRP/GMP, CP dan CCP.",
                    "Menentukan sama ada sesuatu langkah proses ialah CCP atau bukan berdasarkan situasi.",
                    "Melengkapkan mini worksheet HACCP.",
                    "Membuat refleksi kendiri tentang pembelajaran."
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-100 hover:border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-center w-5 h-5 rounded-md bg-teal-50 text-teal-600 font-bold text-base shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-base text-slate-700 font-semibold">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Checklist to ensure ready */}
                <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-teal-600 shrink-0" size={16} />
                    <span className="text-base font-bold text-teal-900">Perakuan Hasil Pembelajaran</span>
                  </div>
                  <div className="space-y-2 pl-6">
                    <label className="flex items-center gap-2 cursor-pointer text-base text-teal-950 font-semibold">
                      <input type="checkbox" defaultChecked className="rounded border-teal-300 text-teal-600" />
                      Saya faham apa yang akan dipelajari dalam modul ini.
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-base text-teal-950 font-semibold">
                      <input type="checkbox" defaultChecked className="rounded border-teal-300 text-teal-600" />
                      Saya tahu output akhir dan hasil tugasan saya.
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-base text-teal-950 font-semibold">
                      <input type="checkbox" defaultChecked className="rounded border-teal-300 text-teal-600" />
                      Saya bersedia meneruskan pembelajaran.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 5: SEBELUM BERMULA */}
            {currentScreen === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Penilaian Awal
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Aktifkan Pengetahuan Sedia Ada
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Sebelum belajar tentang HACCP, fikirkan satu produk makanan yang biasa anda makan, beli, proses atau jual.
                </p>

                <div className="p-4 bg-slate-100 rounded-xl text-base text-slate-600 space-y-1">
                  <strong>Contoh produk makanan:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {['Sandwich telur', 'Nasi lemak bungkus', 'Ayam masak siap dimakan', 'Sos cili botol', 'Makanan sejuk beku', 'Susu kotak'].map((ex) => (
                      <span key={ex} className="bg-white px-2 py-1 rounded text-base font-semibold border border-slate-200">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Form Fields inputs */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Tulis idea kasar anda berdasarkan produk kegemaran anda:
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Produk pilihan saya:</label>
                      <input 
                        type="text" 
                        value={userAnswers.priorProduct}
                        onChange={(e) => handlePriorInput('priorProduct', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Apakah bahaya yang mungkin berlaku?</label>
                      <input 
                        type="text" 
                        value={userAnswers.priorHazard}
                        onChange={(e) => handlePriorInput('priorHazard', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Langkah proses yang paling berisiko:</label>
                      <input 
                        type="text" 
                        value={userAnswers.priorStep}
                        onChange={(e) => handlePriorInput('priorStep', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Langkah kawalan yang boleh dibuat:</label>
                      <input 
                        type="text" 
                        value={userAnswers.priorControl}
                        onChange={(e) => handlePriorInput('priorControl', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        setUserAnswers((prev) => ({ ...prev, priorRevealed: !prev.priorRevealed }));
                        triggerFeedback("Model jawapan diaktifkan!");
                      }}
                      className="px-4 py-2 border border-teal-500 text-teal-700 hover:bg-teal-50 rounded-xl text-base font-bold transition-all active:scale-95"
                    >
                      {userAnswers.priorRevealed ? 'Sembunyi Contoh' : 'Lihat Contoh Jawapan'}
                    </button>
                  </div>
                </div>

                {/* Conditional show example answer */}
                {userAnswers.priorRevealed && (
                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl animate-fadeIn space-y-2">
                    <h4 className="font-bold text-base text-emerald-800 uppercase tracking-wider">
                      Contoh Model Rujukan (Sandwich Telur):
                    </h4>

                    {/* Beautiful visual sandwich layers graphic */}
                    <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-emerald-100 shadow-3xs my-3">
                      <div className="relative w-28 h-24 flex flex-col items-center justify-center shrink-0 select-none">
                        {/* Upper Bread Slice */}
                        <div className="w-24 h-4 bg-amber-100 border border-amber-300 rounded-t-xl shadow-2xs transform rotate-2 translate-y-1 z-10 flex items-center justify-center text-base font-bold text-amber-800">
                          Roti Atas
                        </div>
                        {/* Mayo & Egg Filling */}
                        <div className="w-20 h-5 bg-yellow-200 border border-yellow-400 rounded-md shadow-3xs z-20 flex items-center justify-center text-base font-extrabold text-yellow-800 relative -translate-y-0.5">
                          🥚 Inti Telur & Mayonis
                          <span className="absolute -right-2 w-3 h-3 bg-red-400 rounded-full animate-pulse text-base flex items-center justify-center text-white" title="Bahaya Salmonella!">⚠️</span>
                        </div>
                        {/* Lettuce layer */}
                        <div className="w-22 h-2 bg-emerald-400 rounded-md z-10 -translate-y-1" />
                        {/* Lower Bread Slice */}
                        <div className="w-24 h-4 bg-amber-100 border border-amber-300 rounded-b-xl shadow-2xs -translate-y-1.5 flex items-center justify-center text-base font-bold text-amber-800">
                          Roti Bawah
                        </div>
                      </div>

                      <div className="flex-1 space-y-1 text-base text-slate-600">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-base uppercase tracking-wider">
                          Peta Bahaya & Kawalan
                        </span>
                        <p className="text-base leading-relaxed text-slate-600">
                          <strong className="text-emerald-800">Suhu Kritikal:</strong> Chiller paparan jualan mestilah berada di bawah <strong className="text-blue-600">&lt;5°C</strong> bagi menyekat pertumbuhan bakteria Salmonella.
                        </p>
                      </div>
                    </div>

                    <p className="text-base text-slate-700">
                      <strong>Produk:</strong> Sandwich Telur Siap Dimakan
                    </p>
                    <p className="text-base text-slate-700">
                      <strong>Bahaya:</strong> Pertumbuhan bakteria Salmonella yang boleh mengakibatkan keracunan makanan.
                    </p>
                    <p className="text-base text-slate-700">
                      <strong>Langkah Berisiko:</strong> Penyimpanan selepas disediakan (jika diletak pada suhu bilik melebihi 2 jam).
                    </p>
                    <p className="text-base text-slate-700">
                      <strong>Langkah Kawalan:</strong> Simpan sandwich dalam chiller sejuk (<span className="font-semibold text-emerald-700">&lt;5°C</span>) dan pantau suhu paparan jualan.
                    </p>
                    <div className="p-2 bg-emerald-100/50 rounded text-base text-emerald-950 font-medium mt-2">
                      *Nota: Tiga soalan di atas adalah merupakan intipati dan asas utama kepada pembentukan minda/pemikiran analisis bahaya HACCP.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 6: MODUL 1: APA ITU HACCP */}
            {currentScreen === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 1 • Pengenalan
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Apa Itu HACCP?
                  </h2>
                </div>

                {/* Metadata details header */}
                <div className="flex flex-wrap gap-2 text-base font-mono bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-700 font-bold">Tempoh: 15 minit</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Fokus: Maksud dan kepentingan HACCP</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Aktiviti: Flip Card &amp; MCQ</span>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    HACCP ialah singkatan kepada <strong>Hazard Analysis Critical Control Point</strong>.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Secara ringkas, ia merupakan satu sistem kawalan keselamatan makanan yang saintifik, sistematik dan proaktif untuk mengenal pasti, menilai dan mengawal bahaya yang signifikan.
                  </p>
                </div>

                {/* Flip Cards interaction layout */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Sila Klik Pada Kad Singkatan Berikut Untuk Belajar Maksudnya:
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { l: "H", t: "Hazard", f: "Bahaya", d: "Sesuatu ejen yang boleh mencemari makanan." },
                      { l: "A", t: "Analysis", f: "Analisis", d: "Proses mengenal pasti & menilai risiko bahaya." },
                      { l: "C", t: "Critical", f: "Kritikal", d: "Langkah terpenting bagi keselamatan." },
                      { l: "C", t: "Control", f: "Kawalan", d: "Tindakan pencegahan/penghapusan bahaya." },
                      { l: "P", t: "Point", f: "Point (Titik)", d: "Langkah proses khusus dalam carta alir." }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 p-4 rounded-xl text-center space-y-2 transition-all cursor-pointer group shadow-2xs active:scale-95"
                        onClick={() => triggerFeedback(`Huruf ${item.l}: ${item.t} melambangkan "${item.f}" - ${item.d}`)}
                      >
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-black mx-auto text-lg">
                          {item.l}
                        </div>
                        <h5 className="font-extrabold text-base text-slate-800 group-hover:text-teal-900 truncate">
                          {item.t}
                        </h5>
                        <p className="text-base font-bold text-teal-600">
                          {item.f}
                        </p>
                        <p className="text-base text-slate-500 leading-relaxed hidden group-hover:block animate-fadeIn">
                          {item.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process generic flowchart visual */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 text-center">
                  <span className="text-base font-mono font-bold uppercase text-slate-400">Rangkaian Aliran Keselamatan Makanan</span>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 text-base font-bold text-slate-700">
                    <span>Bahan Mentah</span> <ArrowRight size={12} className="text-slate-400" />
                    <span>Pemprosesan</span> <ArrowRight size={12} className="text-slate-400" />
                    <span>Pembungkusan</span> <ArrowRight size={12} className="text-slate-400" />
                    <span>Penyimpanan</span> <ArrowRight size={12} className="text-slate-400" />
                    <span>Pengedaran</span> <ArrowRight size={12} className="text-slate-400" />
                    <span className="text-teal-700">Pengguna Selamat</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 7: KEPENTINGAN HACCP */}
            {currentScreen === 7 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 1 • Kepentingan
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Mengapa HACCP Penting?
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    HACCP penting kerana keselamatan makanan perlu dikawal secara sistematik. Matlamatnya bukan hanya mengesan masalah selepas berlaku, tetapi mencegah bahaya sebelum makanan dimakan oleh pengguna.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Mengurangkan risiko pencemaran makanan & keracunan.",
                      "Mengenal pasti bahaya kesihatan dengan lebih awal.",
                      "Menentukan langkah kawalan pencegahan yang spesifik.",
                      "Menyediakan bukti bertulis yang lengkap (rekod).",
                      "Meningkatkan keyakinan pengguna & pasaran global.",
                      "Membantu organisasi mengawal proses kualiti makanan."
                    ].map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <CheckCircle size={14} className="text-teal-600 shrink-0 mt-0.5" />
                        <span className="text-base text-slate-600 font-semibold">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multiple choice question */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="text-teal-600" />
                    <h4 className="font-bold text-slate-800 text-lg">Kuiz Semak Kendiri:</h4>
                  </div>
                  <p className="text-base font-semibold text-slate-700">
                    Apakah matlamat utama sistem HACCP?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { key: 'A', label: 'A. Mencantikkan pembungkusan & label jualan' },
                      { key: 'B', label: 'B. Mengawal & mencegah bahaya keselamatan makanan secara sistematik' },
                      { key: 'C', label: 'C. Menentukan harga pasaran tertinggi produk' },
                      { key: 'D', label: 'D. Menambah jualan dan diskaun pemasaran' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setUserAnswers((prev) => ({ ...prev, mcqGoalAnswer: opt.key }));
                        }}
                        className={`text-left p-3 rounded-xl border text-base font-semibold transition-all ${
                          userAnswers.mcqGoalAnswer === opt.key
                            ? opt.key === 'B'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-rose-600 border-rose-600 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Feedback on selection */}
                  {userAnswers.mcqGoalAnswer && (
                    <div className={`p-4 rounded-xl text-base font-semibold animate-fadeIn ${
                      userAnswers.mcqGoalAnswer === 'B'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {userAnswers.mcqGoalAnswer === 'B'
                        ? "Betul. HACCP memberi tumpuan sepenuhnya kepada pencegahan, kawalan dan analisis bahaya keselamatan makanan secara sistematik."
                        : "Cuba fikir semula. HACCP bukan tentang reka bentuk botol, harga atau urusan jualan. Matlamatnya adalah keselamatan kesihatan makanan."}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN 8: MODUL 2: BAHAYA DALAM MAKANAN */}
            {currentScreen === 8 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 2 • Bahaya Makanan
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Bahaya dalam Makanan
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-base font-mono bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-700 font-bold">Tempoh: 15 minit</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Fokus: Jenis bahaya makanan</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Aktiviti: Kad interaktif click-to-reveal</span>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Dalam HACCP, bahaya makanan merujuk kepada sesuatu ejen biologikal, kimia, fizikal atau radioaktif dalam makanan yang boleh menyebabkan kemudaratan atau penyakit kepada pengguna.
                </p>

                {/* Click-to-reveal hazard cards */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Sila Klik Mana-mana Kad Bahaya Untuk Melihat Contoh:
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {HAZARDS.map((hz) => (
                      <button
                        key={hz.id}
                        onClick={() => triggerFeedback(`Ejen ${hz.title}: ${hz.examples}`)}
                        className="text-left p-4 rounded-2xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-md transition-all space-y-3 group cursor-pointer shadow-2xs"
                      >
                        {renderHazardGraphic(hz.id)}
                        <div className="flex items-center gap-2 pt-1">
                          <div className={`w-7 h-7 shrink-0 rounded-lg bg-gradient-to-br ${hz.color} text-white flex items-center justify-center font-extrabold text-base shadow-xs`}>
                            {hz.title.split(' ')[1][0]}
                          </div>
                          <h4 className="font-bold text-slate-900 text-base group-hover:text-teal-600">
                            {hz.title}
                          </h4>
                        </div>
                        <div>
                          <p className="text-base text-slate-500 mt-1 line-clamp-3">
                            {hz.desc}
                          </p>
                        </div>
                        <div className="text-base text-teal-600 font-bold uppercase tracking-wider pt-1 border-t border-slate-100 group-hover:underline">
                          Lihat Contoh &rarr;
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-base text-slate-500">
                  Setiap jenis bahaya memerlukan kaedah pencegahan, had masa dan darjah suhu memasak yang berbeza. Oleh itu, klasifikasi yang tepat adalah langkah kritikal utama.
                </div>
              </div>
            )}

            {/* SCREEN 9: AKTIVITI PADANKAN JENIS BAHAYA */}
            {currentScreen === 9 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Aktiviti Modul 2
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Padankan Jenis Bahaya
                  </h2>
                </div>

                <MatchingActivity 
                  answers={userAnswers.matchingAnswers}
                  submitted={userAnswers.matchingSubmitted}
                  onSelectPair={handleMatchingPair}
                  onSubmit={handleMatchingSubmit}
                  onReset={handleMatchingReset}
                />
              </div>
            )}

            {/* SCREEN 10: MODUL 3: LANGKAH PERMULAAN HACCP */}
            {currentScreen === 10 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 3 • Langkah Permulaan
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Langkah Permulaan HACCP
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-base font-mono bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-700 font-bold">Tempoh: 20 minit</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Fokus: Pra-pelaksanaan HACCP</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Aktiviti: Accordion interaktif</span>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Sebelum tujuh prinsip utama HACCP boleh dilaksanakan, organisasi perlu menyediakan data asas yang betul terlebih dahulu. Ini membantu memastikan analisis bahaya dibuat berdasarkan maklumat yang sahih.
                </p>

                {/* Vertical visual layout timeline */}
                <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between text-base font-bold text-slate-600 gap-1 overflow-x-auto">
                  <span>Pasukan HACCP</span> <ArrowRight size={10} />
                  <span>Penerangan Produk</span> <ArrowRight size={10} />
                  <span>Kegunaan Produk</span> <ArrowRight size={10} />
                  <span>Carta Alir Proses</span> <ArrowRight size={10} />
                  <span>Pengesahan Carta Alir</span>
                </div>

                {/* Accordion List for 5 steps */}
                <div className="space-y-2">
                  {[
                    { id: 1, title: "1. Membentuk Pasukan HACCP (HACCP Team)", desc: "Pasukan HACCP perlu mempunyai gabungan individu pelbagai bidang (cross-functional) yang memahami seluk-belok proses produk, bahan mentah, kebersihan, kawalan kualiti, dan mekanikal." },
                    { id: 2, title: "2. Menerangkan Produk (Product Description)", desc: "Menyediakan dokumen penerangan lengkap produk merangkumi nama makanan, bahan utama, alergen, pembungkusan, jangka hayat simpanan, kaedah logistik dan suhu penyimpanan." },
                    { id: 3, title: "3. Mengenal Pasti Kegunaan Produk (Intended Use)", desc: "Menjelaskan bagaimana produk akan digunakan/dimakan oleh pengguna akhir (contohnya dimasak dahulu atau terus dimakan) serta mengenal pasti jika terdapat kumpulan pengguna berisiko tinggi (bayi, warga tua, pesakit)." },
                    { id: 4, title: "4. Melakar Carta Alir Proses (Process Flowchart)", desc: "Membina lakaran rajah kotak proses yang tersusun mengikut urutan kronologi sebenar, bermula daripada penerimaan bahan di pintu gudang sehinggalah produk sedia dimakan diedarkan." },
                    { id: 5, title: "5. Mengesahkan Carta Alir Proses (On-site Verification)", desc: "Pasukan HACCP wajib turun ke tapak operasi sebenar untuk menyemak dan mengesahkan rajah proses yang dilakar bagi memastikan tiada langkah atau operasi kecil yang tercicir." }
                  ].map((step) => {
                    const isExpanded = expandedSectionCard === step.id;
                    return (
                      <div key={step.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                        <button
                          onClick={() => setExpandedSectionCard(isExpanded ? null : step.id)}
                          className="w-full text-left p-3.5 font-bold text-base sm:text-lg text-slate-800 hover:bg-slate-50 flex items-center justify-between"
                        >
                          <span>{step.title}</span>
                          <ChevronDown size={16} className={`transform transition-transform text-slate-400 ${isExpanded ? 'rotate-180 text-teal-600' : ''}`} />
                        </button>
                        {isExpanded && (
                          <div className="p-4 bg-teal-50/20 text-base text-slate-600 border-t border-slate-100 animate-slideDown leading-relaxed">
                            {step.desc}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SCREEN 11: PASUKAN HACCP */}
            {currentScreen === 11 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Langkah Permulaan 1
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Siapa Perlu Ada dalam Pasukan HACCP?
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Pasukan HACCP tidak sepatutnya terdiri daripada seorang individu sahaja. Keselamatan makanan melibatkan pelbagai aspek rantaian operasi.
                </p>

                {/* Team check list */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Tandakan peranan yang sesuai berada dalam Pasukan HACCP:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Wakil Pengurusan Kanan (Sokongan kewangan/sumber)",
                      "Pegawai Jaminan Kualiti (QA / QC)",
                      "Penyelia Operasi Pengeluaran (Faham proses fizikal)",
                      "Jurutera / Penyelenggaraan Mesin (Faham alatan & lubang karat)",
                      "Penyelia Sanitasi / Kebersihan dapur",
                      "Pegawai Stor / Pembelian Bahan Mentah",
                      "Eksekutif Pemasaran sahaja (Tiada latar belakang teknikal)"
                    ].map((opt) => {
                      const isChecked = !!userAnswers.teamSelection[opt];
                      return (
                        <label 
                          key={opt}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isChecked 
                              ? opt.includes('Pemasaran sahaja') 
                                ? 'bg-rose-50 border-rose-300 text-rose-900' 
                                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleTeamChecklist(opt)}
                            className="mt-0.5 rounded text-teal-600 border-slate-300"
                          />
                          <span className="text-base font-semibold">{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Feedback guide */}
                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-base text-slate-600 leading-relaxed">
                    <strong>Panduan Pasukan HACCP:</strong> Semua jawatan di atas amat sesuai berada dalam pasukan kecuali <em>“Eksekutif Pemasaran sahaja”</em> (jika tiada latihan teknikal makanan), kerana pasukan HACCP memerlukan pemahaman operasi jaminan kualiti fizikal dan sains makanan yang tinggi.
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 12: PENERANGAN & KEGUNAAN PRODUK */}
            {currentScreen === 12 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Langkah Permulaan 2 &amp; 3
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Penerangan Produk dan Kegunaan Produk
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Sebelum kita mula menganalisis bahaya, kita perlu memperincikan dokumen penerangan produk dengan jelas. Lengkapkan borang simulasi di bawah bagi produk <strong>Sandwich Telur</strong>:
                </p>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Dokumen Penerangan Produk:
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Nama Produk:</label>
                      <input 
                        type="text" 
                        disabled
                        value="Sandwich Telur Siap Dimakan (Ready-to-Eat)"
                        className="w-full text-base p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Bahan Utama (Egg, Roti, Mayonis):</label>
                      <input 
                        type="text" 
                        value={userAnswers.productIngredients}
                        onChange={(e) => handleProductForm('productIngredients', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Bahan Alergen Makanan:</label>
                      <input 
                        type="text" 
                        value={userAnswers.productAllergens}
                        onChange={(e) => handleProductForm('productAllergens', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Kaedah Penyimpanan:</label>
                      <input 
                        type="text" 
                        value={userAnswers.productStorage}
                        onChange={(e) => handleProductForm('productStorage', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-base font-bold text-slate-600">Kumpulan Pengguna Sasaran:</label>
                      <input 
                        type="text" 
                        value={userAnswers.productTarget}
                        onChange={(e) => handleProductForm('productTarget', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        setUserAnswers((prev) => ({ ...prev, productRevealed: !prev.productRevealed }));
                        triggerFeedback("Model jawapan penerangan produk dipaparkan.");
                      }}
                      className="px-4 py-2 border border-teal-500 text-teal-700 hover:bg-teal-50 rounded-xl text-base font-bold transition-all active:scale-95"
                    >
                      {userAnswers.productRevealed ? 'Sembunyi Model' : 'Lihat Model Jawapan'}
                    </button>
                  </div>
                </div>

                {/* Conditional show model answer */}
                {userAnswers.productRevealed && (
                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl animate-fadeIn space-y-2">
                    <h4 className="font-bold text-base text-emerald-800 uppercase tracking-wider">
                      Model Jawapan Penerangan Produk:
                    </h4>
                    <p className="text-base text-slate-700"><strong>Bahan Utama:</strong> Roti putih/gandum, telur rebus, mayonis, garam &amp; lada sulah.</p>
                    <p className="text-base text-slate-700"><strong>Alergen:</strong> Mengandungi Telur dan Gluten (daripada tepung roti).</p>
                    <p className="text-base text-slate-700"><strong>Penyimpanan:</strong> Wajib disimpan di dalam chiller paparan sejuk beku (<span className="font-semibold text-emerald-700">&lt;5°C</span>).</p>
                    <p className="text-base text-slate-700"><strong>Pengguna Sasaran:</strong> Orang awam (semua peringkat umur) kecuali golongan yang mempunyai alahan spesifik terhadap telur atau gluten gandum.</p>
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 13: MODUL 4: CARTA ALIR PROSES */}
            {currentScreen === 13 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 4 • Aliran Proses
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Carta Alir Proses
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-base font-mono bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-700 font-bold">Tempoh: 15 minit</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Fokus: Aliran proses makanan</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Aktiviti: Clickable visual flowchart</span>
                </div>

                <p className="text-lg sm:text-base text-slate-600 leading-relaxed">
                  Carta alir proses mempamerkan rantaian pergerakan bahan mentah dari mula tiba sehinggalah jualan akhir produk siap dimakan. Klik setiap kotak proses di bawah untuk melihat potensi bahaya, langkah kawalan, serta kategorinya:
                </p>

                {/* Example Flowchart Learning Visual */}
                <div className="flex flex-col items-center justify-center space-y-3 bg-slate-50 border border-slate-200/80 p-5 sm:p-8 rounded-2xl my-4">
                  <img
                    src={flowchartIntroImage}
                    alt="Contoh visual carta alir proses HACCP"
                    className="flowchart-intro-image w-full max-w-3xl h-auto object-contain rounded-xl shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-base md:text-lg text-slate-600 font-semibold text-center mt-2 leading-relaxed max-w-2xl">
                    Contoh visual carta alir proses sebagai panduan sebelum menjalankan analisis bahaya.
                  </p>
                </div>
                <FlowchartVisual 
                  selectedStep={userAnswers.selectedFlowchartStep}
                  onSelectStep={(stepId) => {
                    setUserAnswers((prev) => ({ ...prev, selectedFlowchartStep: stepId }));
                  }}
                />
              </div>
            )}

            {/* SCREEN 14: AKTIVITI SUSUN CARTA ALIR */}
            {currentScreen === 14 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Aktiviti Modul 4
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Susun Carta Alir Proses
                  </h2>
                </div>

                <ReorderActivity 
                  initialItems={[
                    "Bungkus sandwich",
                    "Terima bahan mentah",
                    "Simpan bahan mentah",
                    "Rebus telur",
                    "Campur inti",
                    "Simpan sejuk",
                    "Edar / jual"
                  ]}
                  correctOrder={[
                    "Terima bahan mentah",
                    "Simpan bahan mentah",
                    "Rebus telur",
                    "Campur inti",
                    "Bungkus sandwich",
                    "Simpan sejuk",
                    "Edar / jual"
                  ]}
                  success={userAnswers.flowchartReorderSuccess}
                  onSubmit={(finalOrder, isCorrect) => {
                    handleFlowchartReorderSubmit(finalOrder, isCorrect);
                  }}
                  onReset={handleFlowchartReorderReset}
                  activityTitle="Carta Alir Sandwich Telur"
                />
              </div>
            )}

            {/* SCREEN 15: MODUL 5: TUJUH PRINSIP HACCP */}
            {currentScreen === 15 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 5 • 7 Prinsip
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Tujuh Prinsip HACCP
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-base font-mono bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-700 font-bold">Tempoh: 20 minit</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Fokus: Konsep prinsip asas</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Aktiviti: Visual staircase click-to-reveal</span>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Selepas langkah permulaan disediakan, sistem HACCP dilaksanakan secara berkesan menerusi <strong>Tujuh Prinsip Utama</strong> yang diiktiraf di peringkat antarabangsa:
                </p>

                {/* Staircase representation of the 7 principles */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Klik Pada Setiap Anak Tangga Prinsip Untuk Penjelasan:
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                    {PRINCIPLES.map((pr, idx) => {
                      const isSelected = userAnswers.selectedPrinciple === pr.id;
                      return (
                        <button
                          key={pr.id}
                          onClick={() => {
                            setUserAnswers((prev) => ({ ...prev, selectedPrinciple: pr.id }));
                          }}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-base mx-auto mb-1 ${
                            isSelected ? 'bg-white text-teal-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            P{pr.id}
                          </div>
                          <p className="text-base font-bold leading-relaxed">
                            {pr.title.split(' ')[0]} {pr.title.split(' ').slice(1, 3).join(' ')}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Principle Detail Box */}
                  <div className="transition-all duration-300 min-h-[100px] mt-4">
                    {userAnswers.selectedPrinciple ? (
                      (() => {
                        const currentPr = PRINCIPLES.find((p) => p.id === userAnswers.selectedPrinciple)!;
                        return (
                          <div className="p-5 bg-teal-50/50 border border-teal-200 rounded-2xl animate-fadeIn space-y-2">
                            <span className="text-base font-mono font-bold bg-teal-200 text-teal-800 px-2.5 py-0.5 rounded-full">
                              Prinsip {currentPr.id}
                            </span>
                            <h4 className="text-lg font-bold text-slate-900">{currentPr.title}</h4>
                            <p className="text-base text-slate-600 leading-relaxed">{currentPr.desc}</p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-base text-slate-500">
                        Klik pada mana-mana anak tangga prinsip di atas untuk membaca fungsi terperinci.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 16: AKTIVITI SUSUN 7 PRINSIP HACCP */}
            {currentScreen === 16 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Aktiviti Modul 5
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Susun 7 Prinsip HACCP
                  </h2>
                </div>

                <ReorderActivity 
                  initialItems={[
                    "Sistem penyimpanan rekod",
                    "Menentukan had kritikal",
                    "Menjalankan analisis hazard",
                    "Menyediakan tindakan pembetulan",
                    "Mengenal pasti CCP",
                    "Prosedur pengesahan",
                    "Sistem pemantauan setiap CCP"
                  ]}
                  correctOrder={[
                    "Menjalankan analisis hazard",
                    "Mengenal pasti CCP",
                    "Menentukan had kritikal",
                    "Sistem pemantauan setiap CCP",
                    "Tindakan pembetulan",
                    "Prosedur pengesahan",
                    "Sistem penyimpanan rekod"
                  ]}
                  success={userAnswers.principlesReorderSuccess}
                  onSubmit={(finalOrder, isCorrect) => {
                    handlePrinciplesReorderSubmit(finalOrder, isCorrect);
                  }}
                  onReset={handlePrinciplesReorderReset}
                  activityTitle="Tujuh Prinsip Utama HACCP"
                />
              </div>
            )}

            {/* SCREEN 17: MODUL 6: FOKUS KHAS — CCP ATAU BUKAN? */}
            {currentScreen === 17 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 6 • Fokus Utama
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Fokus Khas — CCP atau Bukan?
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-base font-mono bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-700 font-bold">Tempoh: 25 minit</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Fokus: Membezakan PRP, CP, &amp; CCP</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Aktiviti: Mitos vs Fakta &amp; Decision Tree</span>
                </div>

                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-950 font-medium text-base leading-relaxed rounded-r-xl">
                  <strong>Salah faham lazim:</strong> Ramai pengamal makanan keliru dan berfikir: <br />
                  <span className="italic font-bold">“Kalau ada bahaya keselamatan dikesan di langkah proses, langkah itu mesti diisytihar sebagai CCP.”</span>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Sebenarnya, tidak semua bahaya menjadikan langkah itu sebagai CCP. CCP hanya wujud apabila:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-800">1. Bahaya Signifikan</span>
                    <p className="text-slate-500">Ada bahaya keselamatan makanan yang amat signifikan &amp; tinggi risiko berlaku.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-800">2. Kawalan Khusus</span>
                    <p className="text-slate-500">Langkah semasa diletakkan kawalan spesifik untuk menghentikannya.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-800">3. Kegagalan Kritikal</span>
                    <p className="text-slate-500">Jika kawalan ini gagal, produk tersebut sah tercemar &amp; tidak selamat dimakan.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-800">4. Last Chance (Tiada Langkah Seterusnya)</span>
                    <p className="text-slate-500">Tiada lagi langkah proses selepas ini yang boleh mengurangkan atau mematikan bahaya tersebut.</p>
                  </div>
                </div>

                {/* Myth vs Fact True/False interaction */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <h4 className="font-bold text-base text-slate-500 uppercase tracking-wider">
                    Uji Pemahaman Asas Anda:
                  </h4>
                  <p className="text-base font-semibold text-slate-800">
                    Betul atau Salah: &ldquo;Semua langkah proses yang mengandungi bahaya mikroorganisma mesti dijadikan CCP.&rdquo;
                  </p>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleMisconception(true)}
                      className={`px-5 py-2 rounded-xl text-base font-bold border transition-all ${
                        userAnswers.misconceptionAnswer === true
                          ? 'bg-rose-600 border-rose-600 text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Betul
                    </button>
                    <button
                      onClick={() => handleMisconception(false)}
                      className={`px-5 py-2 rounded-xl text-base font-bold border transition-all ${
                        userAnswers.misconceptionAnswer === false
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Salah
                    </button>
                  </div>

                  {userAnswers.misconceptionAnswer !== null && (
                    <div className={`p-4 rounded-xl text-base font-medium animate-fadeIn ${
                      userAnswers.misconceptionAnswer === false
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}>
                      {userAnswers.misconceptionAnswer === false ? (
                        <strong>Betul sekali!</strong>
                      ) : (
                        <strong>Tidak tepat.</strong>
                      )}
                      {" Tidak semua bahaya bermaksud CCP. Banyak bahaya yang dikesan boleh dikawal memadai menggunakan program kebersihan umum (PRP/GMP) atau Titik Kawalan biasa (CP) tanpa perlu membebankan dokumentasi pemantauan had kritikal CCP."}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN 18: BEZA PRP/GMP, CP DAN CCP */}
            {currentScreen === 18 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 6 • Perbandingan
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Beza PRP/GMP, CP dan CCP
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Bagi membezakan tiga kaedah ini dengan jelas, mari kita lihat takrifan dan perbandingan analogi lampu isyarat keselamatan:
                </p>

                {/* Traffic Light Analogy Visual */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PRP */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2 text-center shadow-2xs">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-base mx-auto animate-pulse">
                       hijau
                    </div>
                    <h4 className="font-extrabold text-base text-emerald-900 uppercase">
                      PRP / GMP
                    </h4>
                    <span className="text-base bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Asas Jalan Selamat
                    </span>
                    <p className="text-base text-slate-600 leading-relaxed pt-2">
                      Kebersihan umum seluruh premis seperti mencuci tangan, kawalan tikus/lalat, dan pensterilan lantai.
                    </p>
                  </div>

                  {/* CP */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2 text-center shadow-2xs">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base mx-auto animate-pulse">
                      biru
                    </div>
                    <h4 className="font-extrabold text-base text-blue-900 uppercase">
                      Control Point (CP)
                    </h4>
                    <span className="text-base bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                      Kawalan Biasa
                    </span>
                    <p className="text-base text-slate-600 leading-relaxed pt-2">
                      Langkah operasi untuk mengawal kualiti, kesegaran bahan atau visual (seperti menyingkirkan roti kemek).
                    </p>
                  </div>

                  {/* CCP */}
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-2 text-center shadow-2xs">
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-base mx-auto animate-pulse">
                      merah
                    </div>
                    <h4 className="font-extrabold text-base text-rose-900 uppercase">
                      CCP (Kritikal)
                    </h4>
                    <span className="text-base bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                      Palang Keselamatan
                    </span>
                    <p className="text-base text-slate-600 leading-relaxed pt-2">
                      Titik <strong>Terakhir</strong> yang kritikal untuk mengawal bahaya serius (contohnya haba tinggi rebus telur membunuh Salmonella).
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-teal-900 text-teal-100 text-base text-center font-bold rounded-2xl shadow-sm">
                  Formula Emas: CCP ialah &ldquo;Last Chance&rdquo; (peluang terakhir) jaring keselamatan untuk menyekat kuman patogen sebelum produk dilepaskan kepada pengguna.
                </div>
              </div>
            )}

            {/* SCREEN 19: FORMULA 3 SOALAN */}
            {currentScreen === 19 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 6 • Formula
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Formula 3 Soalan untuk Kenal Pasti CCP
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Lakukan simulasi penentuan menggunakan mini pohon keputusan (decision tree) di bawah. Pilih alternatif untuk menguji rujukan logic anda:
                </p>

                <DecisionTreeVisual />

                {/* Worked example */}
                <div className="bg-teal-50/50 border border-teal-200 p-5 rounded-2xl space-y-2">
                  <h4 className="font-bold text-base text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle size={14} /> Contoh Aplikasi Berjaya:
                  </h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    <strong>Produk:</strong> Ayam Masak Siap Dimakan<br />
                    <strong>Langkah Proses:</strong> Menggoreng Ayam Mentah • <strong>Bahaya:</strong> Bakteria Salmonella hidup.<br />
                    <strong>Keputusan CCP:</strong><br />
                    S1 (Bahaya signifikan?) &rarr; <span className="font-semibold text-teal-700">Ya</span> • S2 (Langkah direka mematikan kuman?) &rarr; <span className="font-semibold text-teal-700">Ya</span> &rarr; <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Sah CCP!</span>
                  </p>
                </div>
              </div>
            )}

            {/* SCREEN 20: SCENARIO QUIZ */}
            {currentScreen === 20 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Aktiviti Modul 6
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Aktiviti Interaktif: CCP atau Bukan?
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Sila baca dengan teliti empat senario situasi keselamatan berikut. Pilih klasifikasi paling tepat berasaskan justifikasi logik analisis anda:
                </p>

                {/* Scenarios Stack */}
                <div className="space-y-6">
                  {SCENARIOS.map((scen, index) => {
                    const selected = userAnswers.scenarioAnswers[scen.id];
                    const isCorrect = selected === scen.correctAnswer;

                    return (
                      <div 
                        key={scen.id} 
                        className={`p-5 rounded-2xl border transition-all ${
                          userAnswers.scenariosSubmitted
                            ? isCorrect
                              ? 'border-emerald-300 bg-emerald-50/10'
                              : 'border-rose-300 bg-rose-50/10'
                            : 'border-slate-200 bg-white shadow-2xs'
                        }`}
                      >
                        <span className="text-base font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {scen.title}
                        </span>
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-2.5">
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-lg">
                              {scen.step} ({scen.product})
                            </h4>
                            <p className="text-base text-slate-500 mt-1">
                              <strong>Bahaya:</strong> {scen.hazard}
                            </p>
                          </div>
                          <div className="w-full md:w-80 shrink-0">
                            {renderScenarioGraphic(scen.id)}
                          </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                          {scen.options.map((opt) => {
                            const isOptActive = selected === opt.key;
                            let btnStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-700";

                            if (isOptActive) {
                              if (userAnswers.scenariosSubmitted) {
                                btnStyle = isCorrect
                                  ? "bg-emerald-600 border-emerald-600 text-white"
                                  : "bg-rose-600 border-rose-600 text-white";
                              } else {
                                btnStyle = "bg-teal-600 border-teal-600 text-white shadow-xs";
                              }
                            }

                            return (
                              <button
                                key={opt.key}
                                disabled={userAnswers.scenariosSubmitted}
                                onClick={() => handleScenarioSelect(scen.id, opt.key)}
                                className={`text-left p-3 rounded-xl border text-base font-semibold transition-all ${btnStyle}`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation panel after submission */}
                        {userAnswers.scenariosSubmitted && (
                          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-base leading-relaxed">
                            <span className={`font-bold flex items-center gap-1.5 mb-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {isCorrect ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                              {isCorrect ? 'Tepat Sekali' : 'Kurang Tepat'} (Jawapan Betul: {scen.correctAnswer})
                            </span>
                            <p className="text-slate-600 font-medium">{scen.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {!userAnswers.scenariosSubmitted ? (
                    <>
                      <p className="text-base text-slate-500 italic">
                        Pastikan anda telah memilih satu keputusan untuk kesemua 4 situasi di atas.
                      </p>
                      <button
                        onClick={handleScenariosSubmit}
                        disabled={Object.keys(userAnswers.scenarioAnswers).length < 4}
                        className={`px-6 py-2.5 rounded-xl font-bold text-lg transition-all cursor-pointer ${
                          Object.keys(userAnswers.scenarioAnswers).length === 4
                            ? 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                      >
                        Hantar &amp; Semak Situasi
                      </button>
                    </>
                  ) : (
                    <div className="w-full flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-base font-bold text-slate-700">
                        Skor Keputusan Situasi: {
                          SCENARIOS.reduce((sum, s) => sum + (userAnswers.scenarioAnswers[s.id] === s.correctAnswer ? 1 : 0), 0)
                        } / 4
                      </p>
                      <button
                        onClick={handleScenariosReset}
                        className="px-4 py-1.5 border border-slate-300 text-base font-bold rounded-lg hover:bg-slate-100 bg-white"
                      >
                        Reset &amp; Uji Semula
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN 21: PEMANTAUAN CCP */}
            {currentScreen === 21 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Langkah Seterusnya
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Jika Sesuatu Langkah Ialah CCP, Apa Seterusnya?
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Sekiranya satu titik kawalan sah dinobatkan sebagai CCP, kawalan mestilah jelas dan boleh dipantau berpandukan <strong>Formula 5W + 1H + 1R</strong>:
                </p>

                {/* Form fields */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Rancangan Pemantauan CCP (Sandwich Telur - Penyimpanan Sejuk):
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">What (Apa yang dipantau?):</label>
                      <input 
                        type="text" 
                        value={userAnswers.monitorWhat}
                        onChange={(e) => handleMonitorForm('monitorWhat', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Where (Di mana dipantau?):</label>
                      <input 
                        type="text" 
                        value={userAnswers.monitorWhere}
                        onChange={(e) => handleMonitorForm('monitorWhere', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Who (Siapa bertanggungjawab?):</label>
                      <input 
                        type="text" 
                        value={userAnswers.monitorWho}
                        onChange={(e) => handleMonitorForm('monitorWho', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">When (Berapa kerap/bila?):</label>
                      <input 
                        type="text" 
                        value={userAnswers.monitorWhen}
                        onChange={(e) => handleMonitorForm('monitorWhen', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">How (Bagaimana dipantau?):</label>
                      <input 
                        type="text" 
                        value={userAnswers.monitorHow}
                        onChange={(e) => handleMonitorForm('monitorHow', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-600">Record (Borang rekod apa digunakan?):</label>
                      <input 
                        type="text" 
                        value={userAnswers.monitorRecord}
                        onChange={(e) => handleMonitorForm('monitorRecord', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        className="w-full text-base p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        setUserAnswers((prev) => ({ ...prev, monitorRevealed: !prev.monitorRevealed }));
                        triggerFeedback("Rujukan model maklum balas dihidupkan.");
                      }}
                      className="px-4 py-2 border border-teal-500 text-teal-700 hover:bg-teal-50 rounded-xl text-base font-bold transition-all active:scale-95"
                    >
                      {userAnswers.monitorRevealed ? 'Sembunyi Model' : 'Lihat Model Jawapan'}
                    </button>
                  </div>
                </div>

                {/* Conditional show model */}
                {userAnswers.monitorRevealed && (
                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl animate-fadeIn space-y-2">
                    <h4 className="font-bold text-base text-emerald-800 uppercase tracking-wider">
                      Model Pengurusan Had Kritikal &amp; Pemantauan:
                    </h4>
                    <p className="text-base text-slate-700"><strong>What:</strong> Suhu dalaman chiller paparan sandwich siap dimakan.</p>
                    <p className="text-base text-slate-700"><strong>Where:</strong> Chiller pameran jualan bernombor CH-02.</p>
                    <p className="text-base text-slate-700"><strong>Who:</strong> Penyelia dapur atau staf kualiti (QC) bertugas.</p>
                    <p className="text-base text-slate-700"><strong>When:</strong> Rekod berjadual setiap 4 jam (sekurang-kurangnya 3 kali sehari).</p>
                    <p className="text-base text-slate-700"><strong>How:</strong> Semak bacaan termometer paparan luar chiller yang berkalibrasi.</p>
                    <p className="text-base text-slate-700"><strong>Record:</strong> Log bertulis pada &ldquo;Borang Rekod Pemantauan Suhu Chiller Harian&rdquo;.</p>
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 22: MODUL 7: AKTIVITI KES HACCP */}
            {currentScreen === 22 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Modul 7 • Aplikasi Latihan
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Modul 7: Aktiviti Kes HACCP
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-base font-mono bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-700 font-bold">Tempoh: 20 minit</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Fokus: Aplikasi konsep analisis</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Aktiviti: Mini Worksheet HACCP</span>
                </div>

                <div className="space-y-2 text-slate-600 text-lg leading-relaxed">
                  <p>
                    Sekarang, mari aplikasikan pengetahuan berharga anda untuk melengkapkan pelan kawalan makanan bagi produk <strong>Sandwich Telur Siap Dimakan</strong>.
                  </p>
                  <p className="text-base text-slate-500 italic">
                    Gunakan formula 3 soalan: (S1) Adakah ada bahaya signifikan? (S2) Direka khas mencegah bahaya? (S3) Ada langkah proses seterusnya?
                  </p>
                </div>

                <WorksheetTable 
                  rows={userAnswers.worksheetRows}
                  submitted={userAnswers.worksheetSubmitted}
                  onUpdateRow={handleWorksheetUpdate}
                  onSubmit={handleWorksheetSubmit}
                  onRevealModel={() => {
                    setCurrentScreen(23); // Go to model answers
                  }}
                />
              </div>
            )}

            {/* SCREEN 23: MODEL JAWAPAN AKTIVITI KES */}
            {currentScreen === 23 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Hasil Latihan Modul 7
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Model Jawapan Mini Worksheet HACCP
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Bandingkan keputusan dan justifikasi anda dengan model rujukan rasmi di bawah. Ambil perhatian terhadap logik pensijilan (sebab), bukan semata-mata jawapan:
                </p>

                {/* Side-by-side or stacked grid layout comparison for learning */}
                <div className="space-y-4">
                  {WORKSHEET_MODEL_ANSWERS.map((modelRow, idx) => {
                    const userRow = userAnswers.worksheetRows[idx];
                    
                    return (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-2xs">
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                          <h4 className="font-bold text-slate-800 text-base sm:text-lg">
                            {modelRow.step}
                          </h4>
                          <div className="flex gap-1.5">
                            <span className="text-base font-mono font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                              Anda: {userRow?.decision || 'Belum diisi'}
                            </span>
                            <span className="text-base font-mono font-bold bg-teal-600 text-white px-2 py-0.5 rounded">
                              Model: {modelRow.decision}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                          {/* User input reflection */}
                          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                            <p className="font-semibold text-slate-500 mb-1">Justifikasi Anda:</p>
                            <p className="text-slate-700 italic">
                              &ldquo;{userRow?.reason || 'Tiada justifikasi ditaip'}&rdquo;
                            </p>
                          </div>

                          {/* Model answer explanation */}
                          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                            <p className="font-semibold text-emerald-800 mb-1">Penerangan Model:</p>
                            <p className="text-emerald-950 font-medium leading-relaxed">
                              {modelRow.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-base text-slate-600">
                  <strong>Peringatan Penting:</strong> Alasan yang logik dan faham tentang bahaya &amp; kawalan adalah lebih utama berbanding jawapan yang tepat sama 100%. Jangan sesekali memilih langkah sebagai CCP hanya kerana ia kelihatan penting.
                </div>
              </div>
            )}

            {/* SCREEN 24: KUIZ AKHIR */}
            {currentScreen === 24 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Penilaian Utama
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Kuiz Akhir
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Sila jawab kesemua 5 soalan aneka pilihan di bawah untuk menguji pemahaman keseluruhan anda terhadap sistem HACCP:
                </p>

                {/* Questions Stack */}
                <div className="space-y-6">
                  {QUIZ_QUESTIONS.map((q) => {
                    const selected = userAnswers.quizAnswers[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div 
                        key={q.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          userAnswers.quizSubmitted
                            ? isCorrect
                              ? 'border-emerald-300 bg-emerald-50/10'
                              : 'border-rose-300 bg-rose-50/10'
                            : 'border-slate-200 bg-white shadow-2xs'
                        }`}
                      >
                        <span className="text-base font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          Soalan {q.id} daripada 5
                        </span>
                        <h4 className="font-bold text-slate-800 text-lg mt-2 leading-relaxed">
                          {q.text}
                        </h4>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-2 mt-3">
                          {q.options.map((opt) => {
                            const isOptActive = selected === opt.key;
                            let btnStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-700";

                            if (isOptActive) {
                              if (userAnswers.quizSubmitted) {
                                btnStyle = isCorrect
                                  ? "bg-emerald-600 border-emerald-600 text-white"
                                  : "bg-rose-600 border-rose-600 text-white";
                              } else {
                                btnStyle = "bg-teal-600 border-teal-600 text-white shadow-xs";
                              }
                            }

                            return (
                              <button
                                key={opt.key}
                                disabled={userAnswers.quizSubmitted}
                                onClick={() => handleQuizAnswer(q.id, opt.key)}
                                className={`text-left p-3.5 rounded-xl border text-base font-semibold transition-all ${btnStyle}`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation panel */}
                        {userAnswers.quizSubmitted && (
                          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-base">
                            <span className={`font-bold flex items-center gap-1.5 mb-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {isCorrect ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                              {isCorrect ? 'Tahniah, Tepat!' : 'Belum Tepat'} (Jawapan Betul: {q.correctAnswer})
                            </span>
                            <p className="text-slate-600 font-medium">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {!userAnswers.quizSubmitted ? (
                    <>
                      <p className="text-base text-slate-500 italic">
                        Sila jawab kesemua 5 soalan kuiz sebelum menekan butang hantar.
                      </p>
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(userAnswers.quizAnswers).length < 5}
                        className={`px-6 py-2.5 rounded-xl font-bold text-lg transition-all cursor-pointer ${
                          Object.keys(userAnswers.quizAnswers).length === 5
                            ? 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                      >
                        Hantar Jawapan Kuiz
                      </button>
                    </>
                  ) : (
                    <div className="w-full space-y-4 animate-fadeIn">
                      <div className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                        userAnswers.quizScore >= 4
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : userAnswers.quizScore >= 2
                          ? 'bg-amber-50 border-amber-200 text-amber-800'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${
                            userAnswers.quizScore >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            <Award size={28} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">
                              Skor Diperoleh: {userAnswers.quizScore} / 5
                            </h4>
                            <p className="text-base text-slate-500 mt-0.5 font-medium leading-relaxed">
                              {userAnswers.quizScore >= 4 && "Tahniah! Anda menunjukkan kefahaman yang cemerlang tentang asas HACCP!"}
                              {userAnswers.quizScore === 3 || userAnswers.quizScore === 2 && "Anda memahami sebahagian besar konsep. Sila semak semula bahagian perbezaan CCP."}
                              {userAnswers.quizScore <= 1 && "Jangan risau. Cuba ulang semula modul. Fokus kepada takrifan HACCP, bahaya biologi dan penentuan CCP."}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleQuizReset}
                          className="px-4 py-2 border border-slate-300 text-base font-bold rounded-lg hover:bg-slate-100 bg-white shadow-xs shrink-0"
                        >
                          Cuba Semula
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN 25: REFLEKSI PEMBELAJARAN */}
            {currentScreen === 25 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Metakognisi
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Refleksi Pembelajaran
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Refleksi membantu anda menilai setakat mana anda menguasai konsep dan cara menggunakan kefahaman baru ini di tempat kerja atau situasi sebenar:
                </p>

                {/* Form fields reflections */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                  <h4 className="font-bold text-slate-800 text-lg">
                    Tulis maklum balas ringkas anda sendiri:
                  </h4>

                  <div className="space-y-4 text-base">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">1. Apakah satu perkara baharu yang anda faham tentang HACCP?</label>
                      <textarea
                        disabled={userAnswers.reflectionSubmitted}
                        value={userAnswers.reflection1}
                        onChange={(e) => handleReflectionInput('reflection1', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        rows={2}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">2. Mengapa tidak semua bahaya dikategorikan sebagai CCP?</label>
                      <textarea
                        disabled={userAnswers.reflectionSubmitted}
                        value={userAnswers.reflection2}
                        onChange={(e) => handleReflectionInput('reflection2', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        rows={2}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">3. Bagaimana decision tree boleh membantu anda membuat keputusan CCP?</label>
                      <textarea
                        disabled={userAnswers.reflectionSubmitted}
                        value={userAnswers.reflection3}
                        onChange={(e) => handleReflectionInput('reflection3', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        rows={2}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">4. Apakah contoh CCP yang mungkin wujud dalam produk makanan siap dimakan?</label>
                      <textarea
                        disabled={userAnswers.reflectionSubmitted}
                        value={userAnswers.reflection4}
                        onChange={(e) => handleReflectionInput('reflection4', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        rows={2}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">5. Apakah bahagian yang masih mengelirukan anda?</label>
                      <textarea
                        disabled={userAnswers.reflectionSubmitted}
                        value={userAnswers.reflection5}
                        onChange={(e) => handleReflectionInput('reflection5', e.target.value)}
                        placeholder="Tulis jawapan anda di sini..."
                        rows={2}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    {!userAnswers.reflectionSubmitted ? (
                      <button
                        onClick={handleReflectionSubmit}
                        className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-base rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        Simpan Refleksi
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-base text-emerald-700 font-bold bg-emerald-100 px-3 py-1.5 rounded-xl">
                        <CheckCircle size={14} /> Refleksi Disimpan
                      </div>
                    )}
                  </div>
                </div>

                {userAnswers.reflectionSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-base text-emerald-900 rounded-xl leading-relaxed">
                    <strong>Maklum Balas Pengajar:</strong> Syabas! Penulisan refleksi membantu meningkatkan daya kefahaman mendalam (metakognitif) bagi memastikan teori keselamatan HACCP dapat disemat kukuh dalam amalan industri sebenar.
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 26: RINGKASAN PEMBELAJARAN */}
            {currentScreen === 26 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-teal-600 uppercase tracking-widest mb-1">
                    Kesimpulan Modul
                  </h3>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                    Ringkasan Pembelajaran
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Dalam modul interaktif keselamatan makanan ini, anda telah meneroka dan menguasai prinsip berikut:
                </p>

                {/* 10 bullet points summarized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "HACCP ialah sistem keselamatan makanan berasaskan analisis & kawalan bahaya.",
                    "Bahaya makanan terbahagi kepada 4 jenis (Biologi, Kimia, Fizikal, Radioaktif).",
                    "Lima langkah permulaan wajib diselesaikan sebelum melakar 7 prinsip.",
                    "Carta alir proses memandu lokasi di mana bahaya boleh wujud.",
                    "Tujuh prinsip HACCP bertindak sebagai kawalan bersiri yang sistematik.",
                    "CCP bukan sekadar langkah yang penting dalam pengeluaran.",
                    "CCP ialah titik kawalan kritikal terakhir untuk bahaya yang signifikan.",
                    "PRP/GMP, CP dan CCP perlu dibezakan dengan tepat agar sistem efisien.",
                    "Setiap keputusan label CCP mesti disokong dengan alasan justifikasi logik.",
                    "Setiap CCP wajib dilengkapi had kritikal, pelan pemantauan, dan rekod."
                  ].map((sum, idx) => (
                    <div key={idx} className="flex gap-2.5 p-2 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="font-mono font-bold text-base text-teal-600 shrink-0 mt-0.5">
                        {idx + 1}.
                      </span>
                      <span className="text-base text-slate-700 font-semibold leading-relaxed">{sum}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-teal-900 text-teal-100 text-base text-center font-bold rounded-2xl shadow-sm">
                  Ingat: Bukan semua kawalan ialah CCP. CCP ialah &ldquo;last chance&rdquo; benteng keselamatan terakhir bagi produk makanan sedia dimakan sebelum dinikmati pengguna!
                </div>

                <div className="flex gap-3 justify-center pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      triggerFeedback("Sila semak mana-mana bahagian rujukan.");
                      setCurrentScreen(2); // Jump back to Structure
                    }}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-base hover:bg-slate-50 shadow-xs"
                  >
                    Semak Semula Modul
                  </button>
                  <button
                    onClick={() => setCurrentScreen(27)} // Go to final completion page
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-base shadow-md active:scale-95"
                  >
                    Tamat Modul
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 27: COMPLETION PAGE */}
            {currentScreen === 27 && (
              <div className="space-y-6 text-center py-8">
                <div className="inline-flex p-4 bg-emerald-100 text-emerald-800 rounded-full border-4 border-white shadow-md animate-bounce mb-2">
                  <ShieldCheck size={48} />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-relaxed">
                  Tahniah! Anda Telah Melengkapkan Modul Ini
                </h2>
                
                <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />

                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-base text-slate-400 uppercase tracking-widest font-bold">Modul Pembelajaran Kendiri Selesai</p>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-lg text-center">
                      Sistem Hazard Analysis Critical Control Points — HACCP
                    </h4>
                    <p className="text-base text-slate-500 text-center font-semibold italic">
                      Memahami Bahaya Makanan dan Cara Mengenal Pasti CCP
                    </p>
                    
                    <div className="pt-3 border-t border-slate-100 text-base text-slate-600 space-y-2.5 pl-4">
                      <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0" /> Menerangkan maksud &amp; kepentingan HACCP</p>
                      <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0" /> Mengelaskan 4 jenis bahaya keselamatan makanan</p>
                      <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0" /> Menyusun langkah permulaan &amp; 7 prinsip utama</p>
                      <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0" /> Membezakan PRP/GMP, CP, dan CCP menggunakan formula 3 soalan</p>
                    </div>
                  </div>

                  {/* Mandated note statement */}
                  <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-base font-bold rounded-2xl">
                    &ldquo;Ini ialah pengesahan penyelesaian kendiri dan bukan sijil rasmi.&rdquo;
                  </div>

                  <div className="p-4 bg-slate-100 rounded-xl space-y-1 text-base">
                    <p className="text-slate-400 font-bold uppercase tracking-wider">Status Pembelajaran</p>
                    <p className="font-bold text-slate-800">Lengkap Sepenuhnya</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                  <button
                    onClick={handleGoHome}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-2xs text-base cursor-pointer active:scale-95"
                  >
                    Kembali ke Homepage
                  </button>
                  <button
                    onClick={resetEntireSIM}
                    className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-full transition-all shadow-2xs text-base cursor-pointer active:scale-95"
                  >
                    Set Semula &amp; Cuba Lagi
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Navigation Panel */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4 relative z-10">
            {/* Previous button */}
            <button
              onClick={handlePrev}
              disabled={currentScreen === 1}
              className={`flex items-center gap-1 px-5 py-2 text-base font-bold rounded-full border transition-all ${
                currentScreen === 1
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-400 cursor-pointer active:scale-95'
              }`}
            >
              <ChevronLeft size={14} />
              Kembali
            </button>

            {/* Quick Progress Summary */}
            <div className="text-center font-mono text-base text-slate-400 font-extrabold hidden sm:block">
              SKRIN {currentScreen} / 27
            </div>

            {/* Next button */}
            {currentScreen < 27 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-6 py-2 text-base font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                Seterusnya
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleGoHome}
                className="flex items-center gap-1 px-6 py-2 text-base font-bold rounded-full bg-slate-800 hover:bg-slate-900 text-white shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                Kembali ke Utama
                <Home size={14} />
              </button>
            )}
          </div>

        </div>

        {/* Minimalist Footer */}
        <footer className="mt-8 text-center space-y-1 pb-6 px-4">
          <p className="text-[10px] text-[#02070e] font-normal tracking-normal" style={{ fontFamily: 'system-ui' }}>
            Modul Interaktif Keselamatan Makanan • Untuk kegunaan pembelajaran sahaja.
          </p>
          <p className="text-[10px] text-[#02070e] font-normal tracking-normal" style={{ fontFamily: 'system-ui' }}>
            Idea, kandungan dan reka bentuk pembelajaran oleh <span className="font-semibold text-[#02070e]">Ts. Siti Nurul Ain Saipullizan</span>
          </p>
        </footer>

      </main>
    </div>
  );
}
