import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  isChild?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick, isChild }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mb-1 ${active
      ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20'
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      } ${isChild ? 'ml-6 w-[calc(100%-24px)]' : 'w-full'}`}
  >
    <Icon size={isChild ? 16 : 18} className={active ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
    <span className={`tracking-tight ${isChild ? 'text-[12px]' : 'text-[13px] font-semibold'}`}>{label}</span>
  </button>
);

interface SidebarParentProps {
  icon: any;
  label: string;
  expanded: boolean;
  onClick: () => void;
}

export const SidebarParent: React.FC<SidebarParentProps> = ({ icon: Icon, label, expanded, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800/50 transition-colors group rounded-lg mb-1"
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-slate-500 group-hover:text-slate-300" />
      <span className="text-[13px] font-bold tracking-wide uppercase opacity-80">{label}</span>
    </div>
    {expanded ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
  </button>
);
