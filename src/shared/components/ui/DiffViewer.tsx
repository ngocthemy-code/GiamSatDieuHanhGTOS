import React from 'react';

export interface DiffChange {
  field: string;
  oldValue: string | number | null | undefined;
  newValue: string | number | null | undefined;
}

interface DiffViewerProps {
  changes: DiffChange[];
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ changes }) => {
  if (!changes || changes.length === 0) {
    return <div className="text-sm text-slate-500 italic p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">Không có dữ liệu thay đổi chi tiết.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#3b82f6] border-b border-[#2563eb]">
            <th className="px-4 py-3 text-[12px] font-bold text-white uppercase w-1/3 border-r border-blue-500/50">Trường dữ liệu</th>
            <th className="px-4 py-3 text-[12px] font-bold text-white uppercase w-1/3 border-r border-blue-500/50">Dữ liệu cũ</th>
            <th className="px-4 py-3 text-[12px] font-bold text-white uppercase w-1/3">Dữ liệu mới</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {changes.map((change, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5 text-[12px] font-bold text-slate-700 border-r border-slate-200 align-top">
                {change.field}
              </td>
              <td className="px-4 py-3.5 text-[13px] text-slate-600 font-medium whitespace-pre-wrap break-words border-r border-slate-200 align-top">
                {change.oldValue === null || change.oldValue === undefined || change.oldValue === '' ? (
                  <span className="text-slate-400 italic">Trống</span>
                ) : (
                  String(change.oldValue)
                )}
              </td>
              <td className="px-4 py-3.5 text-[13px] text-slate-800 font-bold whitespace-pre-wrap break-words align-top">
                {change.newValue === null || change.newValue === undefined || change.newValue === '' ? (
                  <span className="text-slate-400 italic">Trống</span>
                ) : (
                  String(change.newValue)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
