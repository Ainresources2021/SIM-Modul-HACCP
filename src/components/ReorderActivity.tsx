import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Check, X, ShieldAlert, Award, Info } from 'lucide-react';

interface ReorderActivityProps {
  initialItems: string[];
  correctOrder: string[];
  success: boolean | null;
  onSubmit: (finalOrder: string[], isCorrect: boolean) => void;
  onReset: () => void;
  activityTitle: string;
}

export const ReorderActivity: React.FC<ReorderActivityProps> = ({
  initialItems,
  correctOrder,
  success,
  onSubmit,
  onReset,
  activityTitle,
}) => {
  const [currentList, setCurrentList] = useState<string[]>([]);

  useEffect(() => {
    // If the list is empty, initialize it by shuffling or copy initial
    if (currentList.length === 0 || success === null) {
      setCurrentList([...initialItems]);
    }
  }, [initialItems, success]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (success !== null) return; // Prevent edits after submission

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const newList = [...currentList];
    // Swap
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;

    setCurrentList(newList);
  };

  const handleCheck = () => {
    // Check if current list exactly matches correct order
    const isCorrect = currentList.every((item, idx) => item === correctOrder[idx]);
    onSubmit(currentList, isCorrect);
  };

  const handleResetClick = () => {
    setCurrentList([...initialItems]);
    onReset();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Info className="text-blue-600 shrink-0" />
        <div>
          <h4 className="font-bold text-slate-800 text-lg">Arahan:</h4>
          <p className="text-base text-slate-500">
            Gunakan butang anak panah ke atas <strong className="text-blue-600">▲</strong> atau ke bawah <strong className="text-blue-600">▼</strong> di sebelah kanan setiap baris untuk menyusun semula langkah-langkah ke dalam urutan logik yang betul.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {currentList.map((item, index) => {
          // Check if slot matches correct order (only when submitted)
          const isSlotCorrect = success !== null && item === correctOrder[index];
          const isFirst = index === 0;
          const isLast = index === currentList.length - 1;

          return (
            <div
              key={item}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all duration-300 ${
                success !== null
                  ? isSlotCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Visual Rank Tag */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-base ${
                  success !== null
                    ? isSlotCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {index + 1}
                </div>
                <p className="text-lg font-semibold text-slate-800 leading-relaxed">
                  {item}
                </p>
              </div>

              {/* Move Buttons */}
              {success === null && (
                <div className="flex gap-1.5 shrink-0">
                  <button
                    disabled={isFirst}
                    onClick={() => moveItem(index, 'up')}
                    className={`p-2 rounded-lg border transition-all ${
                      isFirst
                        ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                        : 'border-slate-200 bg-white text-blue-600 hover:border-blue-300 hover:bg-blue-50 active:scale-95 cursor-pointer'
                    }`}
                    title="Pindah ke Atas"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    disabled={isLast}
                    onClick={() => moveItem(index, 'down')}
                    className={`p-2 rounded-lg border transition-all ${
                      isLast
                        ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                        : 'border-slate-200 bg-white text-blue-600 hover:border-blue-300 hover:bg-blue-50 active:scale-95 cursor-pointer'
                    }`}
                    title="Pindah ke Bawah"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              )}

              {/* Visual checkmark or cross when submitted */}
              {success !== null && (
                <div className="shrink-0">
                  {isSlotCorrect ? (
                    <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-800">
                      <Check size={14} />
                    </span>
                  ) : (
                    <span className="inline-flex p-1 rounded-full bg-rose-100 text-rose-800">
                      <X size={14} />
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {success === null ? (
          <>
            <p className="text-base text-slate-500 italic">
              Susun dan pastikan semua urutan adalah mengikut logik keselamatan makanan.
            </p>
            <button
              onClick={handleCheck}
              className="px-6 py-2.5 rounded-full font-bold text-base bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              Semak Urutan
            </button>
          </>
        ) : (
          <div className="w-full space-y-4 animate-fadeIn">
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
              success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${success ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {success ? <Award size={24} /> : <ShieldAlert size={24} />}
                </div>
                <div>
                  <h5 className="font-bold text-lg">
                    {success ? 'Tahniah! Susunan Anda Tepat!' : 'Susunan Kurang Tepat'}
                  </h5>
                  <p className="text-base text-slate-500 mt-0.5">
                    {success
                      ? `Semua langkah bagi "${activityTitle}" berada di tempat yang betul!`
                      : 'Beberapa langkah masih terkeluar daripada urutan logik yang sebenar.'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetClick}
                className="px-5 py-2 border border-slate-300 rounded-full font-bold text-base hover:bg-slate-50 transition-all text-slate-700 shrink-0 bg-white shadow-2xs cursor-pointer active:scale-95"
              >
                Cuba Semula
              </button>
            </div>

            {/* If incorrect, show the model list as educational guidance */}
            {!success && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                <h5 className="text-base font-bold text-slate-700 uppercase tracking-wider">
                  Rujukan Susunan Model Betul:
                </h5>
                <ol className="list-decimal pl-5 text-base text-slate-600 space-y-1">
                  {correctOrder.map((step, idx) => (
                    <li key={step}>
                      <span className="font-semibold text-slate-800">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
