import React from 'react';
import { MATCHING_ITEMS, HAZARDS } from '../data/learningData';
import { Check, X, ShieldAlert, Award, HelpCircle } from 'lucide-react';

const getItemEmoji = (id: string) => {
  switch (id) {
    case "m1": return "🍗🦠";
    case "m2": return "🧼🧴";
    case "m3": return "🍾🔍";
    case "m4": return "☢️💧";
    case "m5": return "🥜⚠️";
    case "m6": return "🍲💇";
    case "m7": return "🐟🐛";
    default: return "📦";
  }
};

interface MatchingActivityProps {
  answers: { [key: string]: string };
  submitted: boolean;
  onSelectPair: (itemId: string, category: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const MatchingActivity: React.FC<MatchingActivityProps> = ({
  answers,
  submitted,
  onSelectPair,
  onSubmit,
  onReset,
}) => {
  // Count correct answers
  const correctCount = MATCHING_ITEMS.reduce((count, item) => {
    return count + (answers[item.id] === item.correctCategory ? 1 : 0);
  }, 0);

  const isAllAnswered = MATCHING_ITEMS.every((item) => answers[item.id]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="text-blue-600 animate-pulse" />
        <div>
          <h4 className="font-bold text-slate-800 text-lg">Arahan:</h4>
          <p className="text-base text-slate-500">
            Pilih jenis bahaya yang paling tepat bagi setiap situasi di bawah dengan menekan butang pilihan kategori.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {MATCHING_ITEMS.map((item) => {
          const selected = answers[item.id];
          const isCorrect = selected === item.correctCategory;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Situation text */}
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xl bg-slate-100 p-1.5 rounded-lg border border-slate-200/50 shrink-0 select-none">
                    {getItemEmoji(item.id)}
                  </span>
                  <p className="text-lg font-semibold text-slate-800 leading-relaxed">
                    {item.label}
                  </p>
                </div>

                {/* Category Pills Choice */}
                <div className="flex flex-wrap gap-2 items-center">
                  {HAZARDS.map((hazard) => {
                    const isActive = selected === hazard.id;
                    let pillStyle = "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50";

                    if (isActive) {
                      if (submitted) {
                        pillStyle = isCorrect
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                          : "bg-rose-600 border-rose-600 text-white shadow-sm";
                      } else {
                        pillStyle = "bg-blue-600 border-blue-600 text-white shadow-sm";
                      }
                    }

                    return (
                      <button
                        key={hazard.id}
                        disabled={submitted}
                        onClick={() => onSelectPair(item.id, hazard.id)}
                        className={`px-3 py-1.5 rounded-lg border text-base font-medium transition-all active:scale-95 disabled:pointer-events-none ${pillStyle}`}
                      >
                        {hazard.title.replace('Bahaya ', '')}
                      </button>
                    );
                  })}

                  {/* Icon indicator after submission */}
                  {submitted && (
                    <div className="ml-2 flex items-center justify-center">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-base font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                          <Check size={14} /> Betul
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-base font-bold text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full">
                          <X size={14} /> Salah
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Show explanatory correction if submitted and wrong */}
              {submitted && !isCorrect && (
                <div className="mt-2 text-base text-rose-700 font-medium">
                  Jawapan betul: <span className="underline font-bold capitalize">{item.correctCategory}</span>.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons and Result Panel */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {!submitted ? (
          <>
            <p className="text-base text-slate-500 italic">
              {!isAllAnswered ? "Sila pilih kategori bagi semua situasi terlebih dahulu." : "Semua situasi telah ditandakan. Sedia untuk semak?"}
            </p>
            <button
              onClick={onSubmit}
              disabled={!isAllAnswered}
              className={`px-6 py-2.5 rounded-full font-bold text-base transition-all duration-300 shadow-2xs cursor-pointer ${
                isAllAnswered
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-98'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              Semak Jawapan
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${correctCount === MATCHING_ITEMS.length ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {correctCount === MATCHING_ITEMS.length ? <Award size={24} /> : <ShieldAlert size={24} />}
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-lg">
                  Skor Padanan: {correctCount} / {MATCHING_ITEMS.length}
                </h5>
                <p className="text-base text-slate-500">
                  {correctCount === MATCHING_ITEMS.length
                    ? 'Tahniah! Anda telah memadankan semua jenis bahaya dengan tepat sekali!'
                    : 'Cuba semak dan baca semula penjelasan bahaya yang ditunjukkan di atas.'}
                </p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="px-5 py-2 border border-slate-300 rounded-full font-bold text-base hover:bg-slate-50 transition-all text-slate-700 cursor-pointer active:scale-95"
            >
              Cuba Semula
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
