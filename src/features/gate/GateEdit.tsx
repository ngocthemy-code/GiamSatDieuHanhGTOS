import React from 'react';
import { Edit, Trash2, Check, X, Ship, Anchor, ChevronRight, ChevronLeft, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GateOperation } from '../../shared/types';
import { FilterSection } from '../shared/FilterSection';
import { UserHeader } from '../../shared/components/ui/UserHeader';

interface GateEditProps {
  mockData: GateOperation[];
  filterDateFrom: string;
  setFilterDateFrom: (val: string) => void;
  filterDateTo: string;
  setFilterDateTo: (val: string) => void;
  isFilterApplied: boolean;
  editingGateId: string | null;
  setEditingGateId: (id: string | null) => void;
  expandedRows: string[];
  toggleRow: (id: string) => void;
  onRefresh?: () => void;
}

export const GateEdit: React.FC<GateEditProps> = ({
  mockData,
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  isFilterApplied,
  editingGateId,
  setEditingGateId,
  expandedRows,
  toggleRow,
  onRefresh
}) => {
  const [userFilter, setUserFilter] = React.useState('ALL');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50/50">
      <h3 className="text-slate-800 font-bold text-lg mb-2">Chưa tìm thấy dữ liệu</h3>
      <p className="text-slate-500 text-sm max-w-md text-center">
        Vui lòng chọn các tiêu chí lọc ở phía trên và bấm nút <strong>Nạp dữ liệu</strong> để hiển thị chi tiết dữ liệu.
      </p>
    </div>
  );

  const totalWeight = mockData.reduce((sum, r) => {
    const val = parseFloat(r.trongLuong.replace(/[^\d.]/g, '')) || 0;
    return sum + val;
  }, 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Page Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 bg-white">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Thay đổi dữ liệu cổng</h1>
        </div>
        <UserHeader />
      </div>

      <FilterSection
        filterDateFrom={filterDateFrom}
        setFilterDateFrom={setFilterDateFrom}
        filterDateTo={filterDateTo}
        setFilterDateTo={setFilterDateTo}
        onRefresh={onRefresh}
        showUserFilter={true}
        userFilter={userFilter}
        setUserFilter={setUserFilter}
      >
        {isFilterApplied && (
          <button
            onClick={() => {
              alert('Đã lưu dữ liệu thành công!');
            }}
            className="flex items-center justify-center gap-2 h-10 px-5 bg-blue-600 text-white text-sm font-medium rounded-[6px] transition-all hover:bg-blue-700 active:bg-blue-800 shadow-sm"
          >
            <Check size={20} />
            Lưu dữ liệu
          </button>
        )}
      </FilterSection>

      {!isFilterApplied ? renderEmptyState() : (
        <div className="flex-1 pt-2 pb-6 px-4 overflow-auto w-full">
          <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm w-full">
            <div className="overflow-x-auto custom-scrollbar w-full block">
              <table className="w-full min-w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#dae6f3] border-y border-gray-300">
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] text-center border-r border-gray-300 align-middle whitespace-nowrap">
                      <div className="flex items-center justify-center">STT</div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Tên tàu <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Số lệnh <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Số xe <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Rơ moóc <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Tác nghiệp <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Tên hàng <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-end gap-2">Trọng lượng <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-end gap-2">Số lượng <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Vị trí/kho <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Tờ khai <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Vận đơn <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Người thực hiện <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-2">Thời gian xe vào <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-2">Thời gian xe ra <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {mockData.map((row, idx) => {
                    const isEditing = editingGateId === row.id;

                    return (
                      <tr key={row.id} className={`${isEditing ? 'bg-white' : 'hover:bg-slate-50/30'} transition-colors group/row`}>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-900 text-center border-r border-slate-50">{idx + 1}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                          {row.tau}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <input defaultValue={row.soLenh} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-700 w-24 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{row.soLenh}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <input
                              type="text"
                              defaultValue={row.soXe}
                              autoFocus
                              className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-medium text-blue-600 w-28 transition-all outline-none"
                            />
                          ) : (
                            <span className="text-sm font-medium text-blue-600 font-mono">{row.soXe}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <input defaultValue={row.soRomooc} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-500 w-28 transition-all outline-none" />
                          ) : (
                            <span className="text-sm text-gray-500 font-mono">{row.soRomooc}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <select defaultValue={row.tacNghiep} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-medium transition-all outline-none">
                              <option>NHẬP GIAO THẲNG</option>
                              <option>NHẬP BÃI</option>
                              <option>XUẤT BÃI</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-0.5 rounded text-sm font-medium normal-case whitespace-nowrap ${row.tacNghiep.includes('BÃI') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                              {row.tacNghiep}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <input defaultValue={row.tenHang} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-medium text-gray-900 w-32 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{row.tenHang}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          {isEditing ? (
                            <input
                              type="text"
                              defaultValue={row.trongLuong}
                              className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-700 w-20 text-right transition-all outline-none"
                            />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{row.trongLuong}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          {isEditing ? (
                            <input defaultValue={row.soLuong} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-700 w-20 text-right transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{row.soLuong}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <input defaultValue={row.viTriKho} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-700 w-24 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700 whitespace-nowrap">{row.viTriKho}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <input defaultValue={row.soToKhai} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-indigo-600 w-32 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-indigo-600 whitespace-nowrap">{row.soToKhai || '---'}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {isEditing ? (
                            <input defaultValue={row.soVanDon} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-amber-600 w-32 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-amber-600 whitespace-nowrap">{row.soVanDon || '---'}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-normal text-gray-700 whitespace-nowrap">{(row as any).user || 'Administrator'}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm font-normal whitespace-nowrap">
                          {isEditing ? (
                            <input defaultValue={row.xeVao} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal w-32 transition-all outline-none" />
                          ) : (
                            row.xeVao
                          )}
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm font-normal whitespace-nowrap">
                          {isEditing ? (
                            <input defaultValue={row.xeRa || ''} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal w-32 transition-all outline-none" />
                          ) : (
                            row.xeRa || '---'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                    <td colSpan={7} className="px-4 py-4 text-right text-slate-500 uppercase text-[10px]">Tổng cộng:</td>
                    <td className="px-4 py-4 text-right text-red-600 text-[13px]">{totalWeight.toLocaleString('vi-VN')} Tấn</td>
                    <td colSpan={7} className="px-4 py-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pagination Component */}
            <div className="flex flex-row items-center justify-between w-full py-3 px-4 border-t border-gray-300 bg-white">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>Số dòng/trang:</span>
                  <select 
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="h-8 px-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:border-blue-500 outline-none cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <div className="text-gray-500">
                  Hiển thị từ <span className="font-semibold text-gray-900">1</span> đến <span className="font-semibold text-gray-900">{Math.min(rowsPerPage, mockData.length)}</span> trong tổng số <span className="font-semibold text-gray-900">{mockData.length}</span> bản ghi
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button 
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-600 bg-blue-600 text-white font-semibold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors">3</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors">10</button>

                <button 
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
