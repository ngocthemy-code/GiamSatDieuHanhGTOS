import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap opacity-60">
          {label}
        </span>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={`h-10 ${icon ? 'pl-9' : 'px-3'} pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
