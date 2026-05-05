import React from 'react';
import { Calendar, Search, Filter, Warehouse, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YardGroup, Option } from '../../shared/types';
import { RefreshButton } from '../../shared/components/ui/RefreshButton';
import { UserHeader } from '../../shared/components/ui/UserHeader';

interface YardMonitoringProps {
  yardGroups: YardGroup[];
  filterDateFrom: string;
  setFilterDateFrom: (val: string) => void;
  filterDateTo: string;
  setFilterDateTo: (val: string) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  yardVesselFilter: string;
  setYardVesselFilter: (val: string) => void;
  yardPhuongAnFilter: string;
  setYardPhuongAnFilter: (val: string) => void;
  yardCargoFilter: string;
  setYardCargoFilter: (val: string) => void;
  yardViTriFilter: string;
  setYardViTriFilter: (val: string) => void;
  expandedRows: string[];
  toggleRow: (id: string) => void;
  allVessels: string[];
  cargoTypeOptions: Option[];
  isFilterApplied: boolean;
  onRefresh?: () => void;
}

export const YardMonitoring: React.FC<YardMonitoringProps> = ({
  yardGroups,
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  searchTerm,
  setSearchTerm,
  yardVesselFilter,
  setYardVesselFilter,
  yardPhuongAnFilter,
  setYardPhuongAnFilter,
  yardCargoFilter,
  setYardCargoFilter,
  yardViTriFilter,
  setYardViTriFilter,
  expandedRows,
  toggleRow,
  allVessels,
  cargoTypeOptions,
  isFilterApplied,
  onRefresh
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Content Header & Main Filters */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Giám sát bãi</h1>
            <div className="flex items-center gap-2">

            </div>
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
                    value={yardVesselFilter}
                    onChange={(e) => setYardVesselFilter(e.target.value)}
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
            </div>
            <RefreshButton onClick={onRefresh} />
          </div>

          {/* Row 2: Detail Filters & Search */}
          <div className="flex flex-row items-center justify-start gap-4 w-full">
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Phương án:</span>
              <div className="relative">
                <select
                  value={yardPhuongAnFilter}
                  onChange={(e) => setYardPhuongAnFilter(e.target.value)}
                  className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[200px]"
                >
                  <option value="ALL">Tất cả phương án</option>
                  <option value="Nhập tàu - bãi">Nhập tàu - bãi</option>
                  <option value="Nhập giao thẳng qua xe chủ hàng">Nhập giao thẳng</option>
                  <option value="Giao hàng bãi - xe">Giao hàng bãi - xe</option>
                  <option value="Hạ tập kết">Hạ tập kết</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2 whitespace-nowrap">Tìm nhanh:</span>
              <div className="relative w-[450px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Số xe, tên hàng, vị trí..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Data Table */}
      {!isFilterApplied ? renderEmptyState() : (
        <div className="flex-1 py-8 px-4 overflow-y-auto w-full">
        <div className="space-y-4 w-full">
          {yardGroups
            .filter(group => {
              const matchesPhuongAn = yardPhuongAnFilter === 'ALL' || group.phuongAn === yardPhuongAnFilter;
              return matchesPhuongAn;
            })
            .map((group) => {
              const filteredItems = group.items.filter(item => {
                const matchesVessel = yardVesselFilter === '' || item.tau === yardVesselFilter;
                const matchesCargo = yardCargoFilter === 'ALL' || item.loaiHang === yardCargoFilter;
                const matchesSearch = searchTerm === '' ||
                  item.soXe.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.tenHang.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesVessel && matchesCargo && matchesSearch;
              });

              if (filteredItems.length === 0) return null;

              const isExpanded = expandedRows.includes(group.id);
              return (
                <div
                  key={group.id}
                  className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-slate-200 shadow-sm hover:border-slate-300'
                    }`}
                >
                  {/* Master Row */}
                  <div
                    className={`px-6 py-4 flex items-center justify-between cursor-pointer select-none transition-colors ${isExpanded ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'
                      }`}
                    onClick={() => toggleRow(group.id)}
                  >
                    <div className="flex items-center gap-6">
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${isExpanded ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}
                      >
                        <Warehouse size={12} className={isExpanded ? '' : 'rotate-90'} />
                      </motion.div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-800 tracking-tight">{group.phuongAn}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 text-right">
                      <div className="hidden lg:block text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">Tổng trọng lượng</p>
                        <p className="text-lg font-black text-red-600">
                          {filteredItems.reduce((sum, item) => {
                            const val = parseFloat(item.trongLuong.replace(/[^\d.]/g, '')) || 0;
                            return sum + val;
                          }, 0).toLocaleString('vi-VN')} <span className="text-xs font-bold text-slate-400 uppercase">Tấn</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detail Sub-table (Expanded) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-sky-100 bg-white text-[11px]">
                          <div className="overflow-x-auto overflow-y-hidden">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-[#dae6f3] border-y border-gray-300">
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">STT</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Tên tàu</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Số xe</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Rơ moóc</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Tên hàng</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Cẩu bờ</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Tổ đội</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">XN hầm</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">XN bãi</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Băng tải</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Xe xúc</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Xe ủi</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Máy đào</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Người thực hiện</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-right">Trọng lượng</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-right">Số lượng</th>
                                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] whitespace-nowrap align-middle text-left">Vị trí</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {filteredItems.map((item, idx) => (
                                  <tr key={item.id} className="hover:bg-sky-50/20 transition-colors group/row">
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center border-r border-slate-100">{idx + 1}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.tau}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-sky-600 font-mono">{item.soXe}</td>
                                    <td className="px-4 py-3 text-sm font-normal text-gray-500 font-mono">{item.soRomooc}</td>
                                    <td className="px-4 py-3">
                                      <div className="text-sm font-medium text-gray-900">{item.tenHang}</div>
                                      <div className="text-xs text-gray-500 capitalize">{item.loaiHang}</div>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.cauBo}</td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.toDoi}</td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.xeNangHam}</td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.xeNangBai}</td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.bangTai}</td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.xeXuc}</td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.xeUi}</td>
                                    <td className="px-4 py-3 text-center text-sm font-normal text-gray-700 bg-sky-50/5 group-hover/row:bg-sky-50/10 border-r border-slate-100">{item.mayDao}</td>
                                    <td className="px-4 py-3 text-sm font-normal text-gray-700 whitespace-nowrap">{(item as any).user || 'Administrator'}</td>
                                    <td className="px-4 py-3 text-sm font-normal text-gray-700 text-right">{item.trongLuong}</td>
                                    <td className="px-4 py-3 text-sm font-normal text-gray-700 text-right">{item.soLuong}</td>
                                    <td className="px-4 py-3 text-sm font-normal text-gray-700">{item.viTri}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
        </div>
      </div>
      )}
    </div>
  );
};
