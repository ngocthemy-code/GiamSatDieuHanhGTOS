import React from 'react';
import { Bell, User } from 'lucide-react';

export const UserHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="h-8 w-px bg-slate-100 mx-2"></div>
      <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition-all">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-slate-700">Nguyễn Văn A</p>
          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Trưởng ca</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
          <User size={20} />
        </div>
      </button>
    </div>
  );
};
