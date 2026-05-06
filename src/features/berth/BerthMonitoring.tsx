import React from 'react';
import { Calendar, Ship, Search, Filter, ArrowRightLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BerthGroup, Option } from '../../shared/types';
import { RefreshButton } from '../../shared/components/ui/RefreshButton';
import { UserHeader } from '../../shared/components/ui/UserHeader';

interface BerthMonitoringProps {
  berthGroups: BerthGroup[];
  filterDateFrom: string;
  setFilterDateFrom: (val: string) => void;
  filterDateTo: string;
  setFilterDateTo: (val: string) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  vesselSearchTerm: string;
  setVesselSearchTerm: (val: string) => void;
  cargoTypeFilter: string;
  setCargoTypeFilter: (val: string) => void;
  directionFilter: string;
  setDirectionFilter: (val: string) => void;
  expandedRows: string[];
  toggleRow: (id: string) => void;
  cargoTypeOptions: Option[];
  directionOptions: Option[];
  isFilterApplied: boolean;
  onRefresh?: () => void;
}

export const BerthMonitoring: React.FC<BerthMonitoringProps> = ({
  berthGroups,
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  searchTerm,
  setSearchTerm,
  vesselSearchTerm,
  setVesselSearchTerm,
  cargoTypeFilter,
  setCargoTypeFilter,
  directionFilter,
  setDirectionFilter,
  expandedRows,
  toggleRow,
  cargoTypeOptions,
  directionOptions,
  isFilterApplied,
  onRefresh
}) => {
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50/50">
      <h3 className="text-slate-800 font-bold text-lg mb-2">Chưa tìm thấy dữ liệu</h3>
      <p className="text-slate-500 text-sm max-w-md text-center">
        Vui lòng chọn các tiêu chí lọc ở phía trên và bấm nút <strong>Nạp dữ liệu</strong> để hiển thị chi tiết dữ liệu.
      </p>
    </div>
  );
  const filteredGroups = berthGroups.filter(group => {
    const matchesVessel = vesselSearchTerm === '' || group.tau.toLowerCase().includes(vesselSearchTerm.toLowerCase());
    const matchesSearch = searchTerm === '' ||
      group.tau.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.chungTu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCargo = cargoTypeFilter === 'ALL' || group.items.some(item => item.loaiHang === cargoTypeFilter);
    const matchesDirection = directionFilter === 'ALL' || group.loaiChungTu === directionFilter;

    return matchesVessel && matchesSearch && matchesCargo && matchesDirection;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Content Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Giám sát cầu tàu</h1>
            <div className="flex items-center gap-2">


            </div>
          </div>
          <UserHeader />
        </div>

        <div className="px-8 py-4 flex flex-col gap-4 w-full border-t border-slate-100">
          {/* Row 1: Time Range & Refresh */}
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
            </div>
            <RefreshButton onClick={onRefresh} />
          </div>

          {/* Row 2: Detail Filters & Search */}
          <div className="flex flex-row items-center justify-start gap-4 w-full">
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Tên tàu:</span>
              <div className="relative">
                <select
                  value={vesselSearchTerm}
                  onChange={(e) => setVesselSearchTerm(e.target.value)}
                  className="h-10 pl-10 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[200px]"
                >
                  <option value="">Tất cả tàu</option>
                  {Array.from(new Set(berthGroups.map(g => g.tau))).sort().map(tau => (
                    <option key={tau} value={tau}>{tau}</option>
                  ))}
                </select>
                <Ship className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Loại hàng:</span>
              <div className="relative">
                <select
                  value={cargoTypeFilter}
                  onChange={(e) => setCargoTypeFilter(e.target.value)}
                  className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[160px]"
                >
                  {cargoTypeOptions.map((opt) => (
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
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Hướng:</span>
              <div className="relative">
                <select
                  value={directionFilter}
                  onChange={(e) => setDirectionFilter(e.target.value)}
                  className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[140px]"
                >
                  {directionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ArrowRightLeft size={16} />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2 whitespace-nowrap">Tìm nhanh:</span>
              <div className="relative w-[450px]">
                <input
                  type="text"
                  placeholder="Tìm kiếm Số chứng từ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Data Table */}
      {!isFilterApplied ? renderEmptyState() : (
        <div className="flex-1 py-8 px-4 overflow-y-auto w-full">
        <div className="space-y-4 w-full">
          {filteredGroups.map((group) => {
            const isExpanded = expandedRows.includes(group.id);
            return (
              <div
                key={group.id}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-sky-200 shadow-md ring-1 ring-sky-50' : 'border-slate-200 shadow-sm hover:border-slate-300'
                  }`}
              >
                {/* Master Row */}
                <div
                  className={`px-6 py-4 flex items-center justify-between cursor-pointer select-none transition-colors ${isExpanded ? 'bg-sky-50/50' : 'hover:bg-slate-50/50'
                    }`}
                  onClick={() => toggleRow(group.id)}
                >
                  <div className="flex items-center gap-6">
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${isExpanded ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}
                    >
                      <ArrowRightLeft size={12} className={isExpanded ? '' : 'rotate-90'} />
                    </motion.div>

                    <div className="flex flex-row items-center flex-wrap">
                      <div className="flex items-center gap-2">
                        <Ship size={18} className="text-slate-400" />
                        <span className="text-lg font-bold text-slate-800 tracking-tight">{group.tau}</span>
                      </div>
                      
                      <div className="ml-4 pl-4 border-l-2 border-gray-300 flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Chứng từ:</span>
                        <span className={`text-sm font-bold font-mono px-1.5 py-0.5 rounded transition-colors ${isExpanded ? 'text-sky-600 bg-sky-100/50' : 'text-blue-600 hover:bg-blue-50 underline'
                          }`}>
                          {group.chungTu}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-bold uppercase ${group.loaiChungTu === 'Xuất khẩu' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
                          }`}>
                          {group.loaiChungTu}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 text-right">
                    <div className="hidden lg:block">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">Tổng trọng lượng</p>
                      <p className="text-lg font-black text-red-600">
                        {group.items.reduce((sum, item) => {
                          const val = parseFloat(item.trongLuong.replace(/[^\d.]/g, '')) || 0;
                          return sum + val;
                        }, 0).toLocaleString('vi-VN')} <span className="text-xs font-bold text-slate-400 uppercase">Tấn</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">Số lượng tác nghiệp</p>
                      <p className="text-lg font-black text-slate-700">{group.totalTrips} <span className="text-xs font-bold text-slate-400 uppercase">lượt</span></p>
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
                      <div className="border-t border-sky-100 bg-white">
                        <div className="overflow-x-auto overflow-y-hidden">
                          <table className="w-full border-collapse">
                            <thead>
                               <tr className="bg-[#dae6f3] border-y border-gray-300">
                                 <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">STT</th>
                                 <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Sà lan</th>
                                 <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Số xe</th>
                                 <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Rơ moóc</th>
                                 <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Tên hàng</th>
                                 <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-left">Loại hàng</th>
                                 <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Tác nghiệp</th>
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
                              {group.items.map((item, idx) => (
                                <tr 
                                  key={item.id} 
                                  onClick={() => setSelectedRowId(item.id === selectedRowId ? null : item.id)}
                                  className={`${selectedRowId === item.id ? 'bg-blue-50/60 ring-1 ring-inset ring-blue-500/20' : 'hover:bg-sky-50/20'} transition-colors cursor-pointer group/row`}
                                >
                                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center border-r border-slate-100">{idx + 1}</td>
                                  <td className="px-4 py-3 text-sm font-normal text-gray-700">{item.saLan}</td>
                                  <td className="px-4 py-3 text-sm font-medium text-sky-600 font-mono whitespace-nowrap">{item.soXe}</td>
                                  <td className="px-4 py-3 text-sm font-normal text-gray-500 font-mono whitespace-nowrap">{item.soRomooc}</td>
                                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.tenHang}</td>
                                  <td className="px-4 py-3 text-xs text-gray-500 capitalize">{item.loaiHang}</td>
                                  <td className="px-4 py-3 text-center whitespace-nowrap">
                                    <span className={`px-1.5 py-0.5 rounded-md text-sm font-medium normal-case whitespace-nowrap ${item.tacNghiep.includes('NHẬP') ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                      item.tacNghiep.includes('XUẤT') ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                        'bg-green-50 text-green-600 border border-green-100'
                                      }`}>
                                      {item.tacNghiep}
                                    </span>
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
