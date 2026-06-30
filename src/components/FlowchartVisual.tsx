import React from 'react';
import { FLOWCHART_STEPS } from '../data/learningData';
import { ArrowDown, CheckCircle, HelpCircle, AlertTriangle, Play, ShieldAlert } from 'lucide-react';

interface FlowchartVisualProps {
  selectedStep: number | null;
  onSelectStep: (stepId: number) => void;
}

const renderStepGraphic = (stepId: number) => {
  switch (stepId) {
    case 1: // Terima bahan mentah
      return (
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 border border-blue-200">
          <span className="text-2xl">🚚</span>
        </div>
      );
    case 2: // Simpan bahan mentah
      return (
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 border border-blue-200">
          <span className="text-2xl">🗄️</span>
        </div>
      );
    case 3: // Rebus telur
      return (
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 border border-amber-200">
          <span className="text-2xl animate-bounce" style={{ animationDuration: '3s' }}>🍳</span>
        </div>
      );
    case 4: // Sejukkan telur
      return (
        <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center shrink-0 border border-cyan-200">
          <span className="text-2xl">💧</span>
        </div>
      );
    case 5: // Campur inti
      return (
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 border border-emerald-200">
          <span className="text-2xl">🥣</span>
        </div>
      );
    case 6: // Sapu inti pada roti
      return (
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 border border-amber-200">
          <span className="text-2xl">🥪</span>
        </div>
      );
    case 7: // Bungkus sandwich
      return (
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 border border-slate-200">
          <span className="text-2xl">🛍️</span>
        </div>
      );
    case 8: // Simpan sejuk
      return (
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 border border-blue-200">
          <span className="text-2xl">❄️</span>
        </div>
      );
    case 9: // Edar / jual
      return (
        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0 border border-teal-200">
          <span className="text-2xl">🏪</span>
        </div>
      );
    default:
      return null;
  }
};

export const FlowchartVisual: React.FC<FlowchartVisualProps> = ({
  selectedStep,
  onSelectStep,
}) => {
  return (
    <div className="w-full space-y-6">
      <div className="text-center md:text-left mb-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium bg-blue-50 text-blue-800 border border-blue-100">
          Klik pada mana-mana kotak proses untuk menganalisis bahaya &amp; kawalan!
        </span>
      </div>

      {/* Visual Flowchart Grid/Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 shadow-2xs">
        {FLOWCHART_STEPS.map((step, idx) => {
          const isSelected = selectedStep === step.id;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Card Box */}
              <button
                id={`flowchart-step-${step.id}`}
                onClick={() => onSelectStep(step.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 relative group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-2 ring-blue-500/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-2xs'
                }`}
              >
                {/* Badge Number */}
                <div className="absolute top-2 right-2 text-base font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  Langkah {step.id}
                </div>

                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1.5 rounded-lg ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700'
                  }`}>
                    {step.id === 1 ? <Play size={16} /> : step.category.includes('CCP') ? <ShieldAlert size={16} /> : <CheckCircle size={16} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-lg leading-relaxed pr-6">
                      {step.title}
                    </h4>
                    <p className="text-base text-slate-500 mt-1">
                      Kategori: <span className="font-medium text-blue-600">{step.category}</span>
                    </p>
                  </div>
                </div>

                {/* Animated Indicator line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-300 ${isSelected ? 'w-full' : 'w-0'}`} />
              </button>

              {/* Connecting Arrow (Only on Desktop between grid columns or below) */}
              {idx < FLOWCHART_STEPS.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-slate-300 pointer-events-none col-span-3 my-1">
                  {/* We are in 3-column layout, so let's draw subtle horizontal or vertical connection */}
                  {(idx + 1) % 3 === 0 ? (
                    <div className="flex flex-col items-center">
                      <ArrowDown size={18} className="text-slate-400 animate-bounce" />
                    </div>
                  ) : null}
                </div>
              )}

              {/* Mobile Separator Arrow (Always stacked) */}
              {idx < FLOWCHART_STEPS.length - 1 && (
                <div className="md:hidden flex justify-center text-slate-400 py-1">
                  <ArrowDown size={18} className="animate-bounce" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Details Panel */}
      <div className="transition-all duration-300">
        {selectedStep ? (
          (() => {
            const current = FLOWCHART_STEPS.find((s) => s.id === selectedStep)!;
            return (
              <div className="bg-blue-50/40 border-l-4 border-blue-600 p-6 rounded-r-xl shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {renderStepGraphic(current.id)}
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-base font-mono">
                          {current.id}
                        </span>
                        {current.title}
                      </h4>
                      <p className="text-base text-slate-500">Analisis Aliran Bahan Makanan</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-base font-mono font-semibold self-start sm:self-auto ${
                    current.category.includes('CCP')
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {current.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hazard Column */}
                  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-2xs">
                    <div className="flex items-center gap-2 text-rose-600 font-semibold text-lg mb-1.5">
                      <AlertTriangle size={16} />
                      Bahaya Mungkin Berlaku (Hazard)
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {current.hazard}
                    </p>
                  </div>

                  {/* Control Column */}
                  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-2xs">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg mb-1.5">
                      <CheckCircle size={16} />
                      Langkah Kawalan Cadangan
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {current.control}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-100/50 p-3 rounded-lg text-base text-slate-500 italic">
                  *Nota: Keputusan sama ada langkah ini menjadi CCP atau CP bergantung kepada analisis risiko dan kewujudan langkah kawalan memasak atau pendinginan lain di dalam proses.
                </div>
              </div>
            );
          })()
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-300 p-8 rounded-xl text-center text-slate-500 flex flex-col items-center justify-center gap-2">
            <HelpCircle size={28} className="text-slate-400" />
            <p className="text-lg font-medium">Sila klik salah satu kotak carta alir di atas untuk melihat analisis bahaya dan langkah kawalan terperinci.</p>
          </div>
        )}
      </div>
    </div>
  );
};
