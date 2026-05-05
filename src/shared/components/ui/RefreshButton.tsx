import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`flex items-center justify-center gap-2 h-10 px-5 bg-white border border-blue-600 text-blue-600 text-sm font-medium rounded-[6px] transition-all hover:bg-blue-50 active:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={isDisabled}
      {...props}
    >
      <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
      Nạp dữ liệu
    </button>
  );
};
