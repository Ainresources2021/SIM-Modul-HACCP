import React, { useState } from 'react';
import { HelpCircle, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const DecisionTreeVisual: React.FC = () => {
  const [q1, setQ1] = useState<boolean | null>(null);
  const [q2, setQ2] = useState<boolean | null>(null);
  const [q3, setQ3] = useState<boolean | null>(null);

  const resetTree = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
  };

  // Compute current decision path
  let decision = "Sila jawab soalan untuk memulakan analisis...";
  let decisionType: 'none' | 'not-ccp' | 'prp' | 'cp' | 'ccp' = 'none';

  if (q1 === false) {
    decision = "BUKAN CCP (Tumpukan pada PRP/GMP biasa)";
    decisionType = 'not-ccp';
  } else if (q1 === true) {
    if (q2 === true) {
      decision = "MUNGKIN CCP (Langkah ini direka khas untuk menghapuskan/mengurangkan bahaya)";
      decisionType = 'ccp';
    } else if (q2 === false) {
      if (q3 === true) {
        decision = "MUNGKIN CP (Ada langkah lain selepas ini yang boleh mengawal bahaya)";
        decisionType = 'cp';
      } else if (q3 === false) {
        decision = "MUNGKIN CCP (Tiada langkah lain selepas ini untuk mengawal bahaya - Last Chance!)";
        decisionType = 'ccp';
      }
    }
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="text-blue-600 animate-pulse" />
          Simulator Formula 3 Soalan CCP
        </h4>
        <button
          onClick={resetTree}
          className="flex items-center gap-1 text-base font-semibold text-blue-600 hover:text-blue-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-all active:scale-95 cursor-pointer"
        >
          <RefreshCw size={12} />
          Uji Semula
        </button>
      </div>

      <p className="text-base text-slate-500">
        Klik butang <strong>Ya</strong> atau <strong>Tidak</strong> pada setiap soalan di bawah untuk mengikuti jalan keputusan logik HACCP.
      </p>

      {/* Questions Stack */}
      <div className="space-y-4">
        {/* Question 1 */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          q1 === null ? 'border-slate-200 bg-white' : q1 ? 'border-emerald-300 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-base font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Soalan 1
              </span>
              <p className="text-lg font-semibold text-slate-800">
                Adakah terdapat bahaya signifikan di langkah proses ini?
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setQ1(true); setQ2(null); setQ3(null); }}
                className={`px-4 py-1.5 text-base font-bold rounded-lg border transition-all ${
                  q1 === true
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                Ya
              </button>
              <button
                onClick={() => { setQ1(false); setQ2(null); setQ3(null); }}
                className={`px-4 py-1.5 text-base font-bold rounded-lg border transition-all ${
                  q1 === false
                    ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        {q1 === true && (
          <div className={`p-4 rounded-xl border transition-all duration-300 animate-fadeIn ${
            q2 === null ? 'border-slate-200 bg-white' : q2 ? 'border-emerald-300 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-base font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Soalan 2
                </span>
                <p className="text-lg font-semibold text-slate-800">
                  Adakah langkah ini direka khas untuk menghapuskan ATAU mengurangkan bahaya ke tahap selamat?
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setQ2(true); setQ3(null); }}
                  className={`px-4 py-1.5 text-base font-bold rounded-lg border transition-all ${
                    q2 === true
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Ya
                </button>
                <button
                  onClick={() => { setQ2(false); setQ3(null); }}
                  className={`px-4 py-1.5 text-base font-bold rounded-lg border transition-all ${
                    q2 === false
                      ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Question 3 */}
        {q1 === true && q2 === false && (
          <div className={`p-4 rounded-xl border transition-all duration-300 animate-fadeIn ${
            q3 === null ? 'border-slate-200 bg-white' : q3 ? 'border-emerald-300 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-base font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Soalan 3
                </span>
                <p className="text-lg font-semibold text-slate-800">
                  Jika kawalan di sini gagal, adakah masih ada langkah proses selepas ini yang boleh mengawal bahaya tersebut?
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setQ3(true)}
                  className={`px-4 py-1.5 text-base font-bold rounded-lg border transition-all ${
                    q3 === true
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Ya
                </button>
                <button
                  onClick={() => setQ3(false)}
                  className={`px-4 py-1.5 text-base font-bold rounded-lg border transition-all ${
                    q3 === false
                      ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decision Results Box */}
      <div className="mt-4 transition-all duration-300">
        <div className={`p-5 rounded-xl border flex items-start gap-3 ${
          decisionType === 'none'
            ? 'bg-slate-100 border-slate-200 text-slate-600'
            : decisionType === 'not-ccp'
            ? 'bg-rose-50 border-rose-200 text-rose-800'
            : decisionType === 'cp'
            ? 'bg-blue-50 border-blue-200 text-blue-800'
            : 'bg-blue-50/50 border-blue-200 text-blue-850'
        }`}>
          <div className="mt-0.5">
            {decisionType === 'ccp' ? (
              <AlertTriangle className="text-blue-600" />
            ) : decisionType === 'none' ? (
              <HelpCircle className="text-slate-400" />
            ) : (
              <CheckCircle2 className="text-blue-600" />
            )}
          </div>
          <div>
            <h5 className="font-bold text-base uppercase tracking-wider text-slate-500">
              Hasil Analisis Keputusan
            </h5>
            <p className="text-lg font-bold mt-1">
              {decision}
            </p>
            {decisionType !== 'none' && (
              <p className="text-base text-slate-500 mt-2">
                {decisionType === 'not-ccp' && "Langkah ini tidak mempunyai bahaya yang signifikan kepada pengguna, maka ia dilabel di bawah Program Prasyarat Kebersihan (PRP/GMP)."}
                {decisionType === 'cp' && "Kerana terdapat langkah pemprosesan berikutnya yang akan bertindak sebagai penghapus bahaya (contoh: pemanasan akhir). Langkah semasa hanyalah Titik Kawalan biasa (CP)."}
                {decisionType === 'ccp' && "Langkah ini sangat penting kerana tiada jaring keselamatan seterusnya. Ia adalah satu kemestian bagi mengekalkan keselamatan produk makanan."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
