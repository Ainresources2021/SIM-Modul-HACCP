import React from 'react';
import { WorksheetRow } from '../types';
import { WORKSHEET_MODEL_ANSWERS } from '../data/learningData';
import { Check, Edit3, HelpCircle, Save } from 'lucide-react';

interface WorksheetTableProps {
  rows: WorksheetRow[];
  submitted: boolean;
  onUpdateRow: (index: number, field: keyof WorksheetRow, value: string) => void;
  onSubmit: () => void;
  onRevealModel: () => void;
}

export const WorksheetTable: React.FC<WorksheetTableProps> = ({
  rows,
  submitted,
  onUpdateRow,
  onSubmit,
  onRevealModel,
}) => {
  return (
    <div className="space-y-6">
      {/* Scrollable Container to ensure beautiful rendering across all viewports */}
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3.5 text-base font-bold text-slate-700 uppercase tracking-wider w-1/4">
                Langkah Proses
              </th>
              <th scope="col" className="px-4 py-3.5 text-base font-bold text-slate-700 uppercase tracking-wider w-1/4">
                Bahaya &amp; Kawalan Cadangan
              </th>
              <th scope="col" className="px-4 py-3.5 text-base font-bold text-slate-700 uppercase tracking-wider w-1/5">
                Keputusan
              </th>
              <th scope="col" className="px-4 py-3.5 text-base font-bold text-slate-700 uppercase tracking-wider">
                Sebab / Justifikasi Anda
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                {/* Step title */}
                <td className="px-4 py-4 align-top">
                  <div className="font-semibold text-lg text-slate-900">
                    {row.step}
                  </div>
                </td>

                {/* Prepopulated context (to make it engaging and not too tedious) */}
                <td className="px-4 py-4 align-top space-y-2">
                  <div>
                    <span className="text-base font-mono font-bold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">
                      Bahaya
                    </span>
                    <p className="text-base text-slate-600 mt-1">
                      {row.hazard}
                    </p>
                  </div>
                  <div>
                    <span className="text-base font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
                      Kawalan
                    </span>
                    <p className="text-base text-slate-600 mt-1">
                      {row.control}
                    </p>
                  </div>
                </td>

                {/* Dropdown Select Decision */}
                <td className="px-4 py-4 align-top">
                  <select
                    disabled={submitted}
                    value={row.decision}
                    onChange={(e) => onUpdateRow(idx, 'decision', e.target.value)}
                    className={`w-full text-base font-semibold rounded-lg border p-2 bg-white transition-all shadow-2xs ${
                      row.decision === ''
                        ? 'border-slate-300 text-slate-400 focus:border-blue-500'
                        : row.decision === 'CCP'
                        ? 'border-rose-400 text-rose-700 bg-rose-50/20'
                        : row.decision === 'CP'
                        ? 'border-blue-400 text-blue-700 bg-blue-50/20'
                        : row.decision === 'PRP/GMP'
                        ? 'border-emerald-400 text-emerald-700 bg-emerald-50/20'
                        : 'border-amber-400 text-amber-700 bg-amber-50/20'
                    }`}
                  >
                    <option value="">-- Pilih --</option>
                    <option value="PRP/GMP">PRP / GMP</option>
                    <option value="CP">CP (Control Point)</option>
                    <option value="CCP">CCP (Critical Control Point)</option>
                    <option value="Bergantung">Bergantung Risiko</option>
                  </select>
                </td>

                {/* Text justification reason */}
                <td className="px-4 py-4 align-top">
                  <textarea
                    disabled={submitted}
                    value={row.reason}
                    onChange={(e) => onUpdateRow(idx, 'reason', e.target.value)}
                    placeholder="Contoh: langkah ini penting kerana..."
                    rows={2}
                    className="w-full text-base p-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-300 transition-all shadow-2xs disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit / Action Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2.5">
          <Edit3 size={20} className="text-blue-600 shrink-0" />
          <p className="text-base text-slate-500">
            {!submitted
              ? "Isi keputusan dan justifikasi anda bagi setiap baris di atas, kemudian klik 'Simpan Jawapan'."
              : "Kerja anda telah direkodkan. Klik 'Lihat Model Jawapan' di sebelah kanan untuk menyemak."}
          </p>
        </div>
        <div className="flex gap-2">
          {!submitted ? (
            <button
              onClick={onSubmit}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-full transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <Save size={16} />
              Simpan Jawapan
            </button>
          ) : (
            <button
              onClick={onRevealModel}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-900 hover:bg-black text-white font-bold text-base rounded-full transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <Check size={16} />
              Lihat Model Jawapan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
