import React from 'react';
import { Calendar, Ship, X, RefreshCw, Filter, Search, Truck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GateOperation, Option } from '../../shared/types';
import { UserHeader } from '../../shared/components/ui/UserHeader';
import { RefreshButton } from '../../shared/components/ui/RefreshButton';

interface GateMonitoringProps {
  filteredData: GateOperation[];
  mockData: GateOperation[];
  filterDateFrom: string;
  setFilterDateFrom: (val: string) => void;
  filterDateTo: string;
  setFilterDateTo: (val: string) => void;
  filterVesselGlobal: string;
  setFilterVesselGlobal: (val: string) => void;
  activeTacNghiep: string;
  setActiveTacNghiep: (val: string) => void;
  searchSoLenh: string;
  setSearchSoLenh: (val: string) => void;
  searchVehicle: string;
  setSearchVehicle: (val: string) => void;
  isFilterApplied: boolean;
  onRefresh: () => void;
  allVessels: string[];
  tacNghiepOptions: Option[];
}

export const GateMonitoring: React.FC<GateMonitoringProps> = ({
  filteredData,
  mockData,
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  filterVesselGlobal,
  setFilterVesselGlobal,
  activeTacNghiep,
  setActiveTacNghiep,
  searchSoLenh,
  setSearchSoLenh,
  searchVehicle,
  setSearchVehicle,
  isFilterApplied,
  onRefresh,
  allVessels,
  tacNghiepOptions
}) => {
  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50/50">
      <h3 className="text-slate-800 font-bold text-lg mb-2">Chưa tìm thấy dữ liệu</h3>
      <p className="text-slate-500 text-sm max-w-md text-center">
        Vui lòng chọn các tiêu chí lọc ở phía trên và bấm nút <strong>Nạp dữ liệu</strong> để hiển thị chi tiết dữ liệu.
      </p>
    </div>
  );

  return (
    <>
      {/* Content Header & Filters */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Giám sát cổng</h1>

          </div>
          <UserHeader />
        </div>

        <div className="px-8 py-4 flex flex-col gap-4 w-full border-t border-slate-100">
          {/* Row 1: Time range & Vessel & Refresh */}
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Từ ngày:</span>
                <input
                  type="datetime-local"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Đến ngày:</span>
                <input
                  type="datetime-local"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Tên tàu:</span>
                <div className="relative">
                  <select
                    value={filterVesselGlobal}
                    onChange={(e) => setFilterVesselGlobal(e.target.value)}
                    className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[180px]"
                  >
                    <option value="">Tất cả tàu</option>
                    {allVessels.map(tau => (
                      <option key={tau} value={tau}>{tau}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              {(filterDateFrom || filterDateTo || filterVesselGlobal) && (
                <button
                  onClick={() => { setFilterDateFrom(''); setFilterDateTo(''); setFilterVesselGlobal(''); }}
                  className="h-10 px-4 flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X size={16} /> Xóa lọc
                </button>
              )}
            </div>
            <RefreshButton onClick={onRefresh} />
          </div>

          {/* Row 2: Sub Filters & Search */}
          <div className="flex flex-row items-center justify-start gap-4 w-full">
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Tác nghiệp:</span>
              <div className="relative">
                <select
                  value={activeTacNghiep}
                  onChange={(e) => setActiveTacNghiep(e.target.value)}
                  className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[160px]"
                >
                  {tacNghiepOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <Filter size={16} />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Số lệnh:</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập số lệnh..."
                  value={searchSoLenh}
                  onChange={(e) => setSearchSoLenh(e.target.value)}
                  className="h-10 pl-10 pr-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all w-40"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2 whitespace-nowrap">Số xe/Romooc:</span>
              <div className="relative w-[450px]">
                <input
                  type="text"
                  placeholder="Nhập số xe hoặc rơ moóc..."
                  value={searchVehicle}
                  onChange={(e) => setSearchVehicle(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Grid Table */}
      {!isFilterApplied ? renderEmptyState() : (
        <div className="flex-1 py-8 px-4 overflow-hidden flex flex-col w-full">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden w-full">
          <div className="overflow-x-auto max-h-full w-full block custom-scrollbar">
            <table className="w-full min-w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#dae6f3] border-y border-gray-300">
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">STT</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Số lệnh</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Số xe</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Rơ moóc</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Tác nghiệp</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Tên hàng</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-right">Trọng lượng</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-right">Số lượng</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Tàu</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Vị trí/Kho</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Tờ khai</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Vận đơn</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Người thực hiện</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] whitespace-nowrap align-middle text-left">Thời gian xe vào</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout" initial={false}>
                  {filteredData.map((row, idx) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                      layout
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center border-r border-slate-100">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm font-normal text-gray-700">{row.soLenh}</td>
                      <td className="px-4 py-3 text-sm font-medium text-sky-600 font-mono">{row.soXe}</td>
                      <td className="px-4 py-3 text-sm font-normal text-gray-500 font-mono">{row.soRomooc}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-1.5 py-0.5 rounded-md text-sm font-medium normal-case transition-all ${row.tacNghiep.includes('BÃI') ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          row.tacNghiep.includes('GIAO THẲNG') ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            'bg-slate-50 text-slate-500 border border-slate-100'
                          }`}>
                          {row.tacNghiep}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.tenHang}</td>
                      <td className="px-4 py-3 text-sm font-normal text-gray-700 text-right">{row.trongLuong}</td>
                      <td className="px-4 py-3 text-sm font-normal text-gray-700 text-right">{row.soLuong}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.tau}</td>
                      <td className="px-4 py-3 text-sm font-normal text-gray-700">{row.viTriKho}</td>
                      <td className="px-4 py-3 text-sm font-normal text-indigo-600">
                        {row.soToKhai || '---'}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal text-amber-600">
                        {row.soVanDon || '---'}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal text-gray-700">
                        {(row as any).user || 'Administrator'}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal text-gray-700">{row.xeVao}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredData.length > 0 && (
                  <tr className="bg-slate-50 border-t-2 border-slate-200">
                    <td colSpan={2} className="px-4 py-3 text-right text-slate-500 uppercase text-xs font-bold">Tổng cộng:</td>
                    <td className="px-4 py-3"></td>
                    <td colSpan={3} className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-right font-black text-red-600 text-base">
                      {filteredData.reduce((sum, row) => sum + (parseFloat(row.trongLuong.replace(/[^\d.]/g, '')) || 0), 0).toFixed(1)} Tấn
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-700 text-base">
                      {filteredData.reduce((sum, row) => sum + (parseInt(row.soLuong.match(/\d+/)?.[0] || '0')), 0)} Qty
                    </td>
                    <td colSpan={6} className="px-4 py-3"></td>
                  </tr>
                )}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={14} className="py-12 text-center text-slate-400 font-medium">
                      Không tìm thấy dữ liệu phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}
    </>
  );
};
