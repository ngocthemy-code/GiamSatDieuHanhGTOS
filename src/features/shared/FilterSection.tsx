import React from 'react'
import { Calendar, Search, User } from 'lucide-react';
import { RefreshButton } from '../../shared/components/ui/RefreshButton';

interface FilterSectionProps {
  filterDateFrom: string;
  setFilterDateFrom: (val: string) => void;
  filterDateTo: string;
  setFilterDateTo: (val: string) => void;
  onRefresh?: () => void;
  showUserFilter?: boolean;
  userFilter?: string;
  setUserFilter?: (val: string) => void;
  showTacNghiepFilter?: boolean;
  tacNghiepFilter?: string;
  setTacNghiepFilter?: (val: string) => void;
  children?: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  onRefresh,
  showUserFilter = false,
  userFilter = 'ALL',
  setUserFilter,
  showTacNghiepFilter = false,
  tacNghiepFilter = 'ALL',
  setTacNghiepFilter,
  children
}) => {
  return (
    <div className="px-8 py-4 border-b border-slate-100 bg-white">
      <div className="flex flex-col gap-4 w-full">
        {/* Row 1: Time range, Vessel & Main Actions */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Từ ngày:</span>
              <input
                type="datetime-local"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Đến ngày:</span>
              <input
                type="datetime-local"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Tên tàu:</span>
              <select className="h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-w-[180px] cursor-pointer">
                <option>Tất cả tàu</option>
                <option>PACIFIC WAVE</option>
                <option>WOLFSBURG</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {children}
            <RefreshButton onClick={onRefresh} />
          </div>
        </div>

        {/* Row 2: Detail Filters & Search */}
        <div className="flex flex-row items-center justify-start gap-4 w-full">
          {showUserFilter && (
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Người thực hiện:</span>
              <div className="relative">
                <input
                  type="text"
                  list="user-list"
                  placeholder="Chọn người thực hiện..."
                  value={userFilter === 'ALL' ? '' : userFilter}
                  onChange={(e) => setUserFilter?.(e.target.value || 'ALL')}
                  className="h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-w-[200px]"
                />
                <datalist id="user-list">
                  <option value="Administrator" />
                  <option value="Operator 01" />
                  <option value="Operator 02" />
                  <option value="Nguyễn Văn A" />
                  <option value="Trần Thị B" />
                </datalist>
              </div>
            </div>
          )}

          {showTacNghiepFilter && (
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Tác nghiệp:</span>
              <select
                value={tacNghiepFilter}
                onChange={(e) => setTacNghiepFilter?.(e.target.value)}
                className="h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-w-[160px] cursor-pointer"
              >
                <option value="ALL">Tất cả</option>
                <option value="NHẬP BÃI">NHẬP BÃI</option>
                <option value="XUẤT BÃI">XUẤT BÃI</option>
                <option value="NHẬP GIAO THẲNG">NHẬP GIAO THẲNG</option>
                <option value="XUẤT GIAO THẲNG">XUẤT GIAO THẲNG</option>
              </select>
            </div>
          )}

          <div className="flex items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2 whitespace-nowrap">Tìm kiếm:</span>
            <div className="relative w-[450px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm Số xe / Lệnh / Thiết bị / Vị trí..."
                className="w-full h-10 pl-10 pr-4 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
