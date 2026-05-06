import React from 'react'

import { Ship, Anchor, Edit, Trash2, Check, X, ChevronRight, ChevronLeft, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BerthGroup } from '../../shared/types';
import { FilterSection } from '../shared/FilterSection';
import { UserHeader } from '../../shared/components/ui/UserHeader';

interface BerthEditProps {
  berthGroups: BerthGroup[];
  filterDateFrom: string;
  setFilterDateFrom: (val: string) => void;
  filterDateTo: string;
  setFilterDateTo: (val: string) => void;
  isFilterApplied: boolean;
  editingBerthId: string | null;
  setEditingBerthId: (id: string | null) => void;
  expandedRows: string[];
  toggleRow: (id: string) => void;
  onRefresh?: () => void;
}

export const BerthEdit: React.FC<BerthEditProps> = ({
  berthGroups,
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  isFilterApplied,
  editingBerthId,
  setEditingBerthId,
  expandedRows,
  toggleRow,
  onRefresh
}) => {
  const [userFilter, setUserFilter] = React.useState('ALL');
  const [tacNghiepFilter, setTacNghiepFilter] = React.useState('ALL');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const allItems = berthGroups.flatMap(group =>
    group.items.map(item => ({ ...item, vesselName: group.tau, direction: group.loaiChungTu }))
  );

  const filteredData = allItems.filter(item => {
    const matchUser = userFilter === 'ALL' || (item as any).user === userFilter || (userFilter === 'Administrator' && !(item as any).user);
    const matchTacNghiep = tacNghiepFilter === 'ALL' || item.tacNghiep === tacNghiepFilter;
    return matchUser && matchTacNghiep;
  });

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50/50">
      <h3 className="text-slate-800 font-bold text-lg mb-2">Chưa tìm thấy dữ liệu</h3>
      <p className="text-slate-500 text-sm max-w-md text-center">
        Vui lòng chọn các tiêu chí lọc ở phía trên và bấm nút <strong>Nạp dữ liệu</strong> để hiển thị chi tiết dữ liệu.
      </p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/30 overflow-hidden">
      {/* Page Header */}
      <div className="px-8 py-6 bg-white flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight decoration-blue-500/20 underline-offset-8">Thay đổi dữ liệu cầu tàu</h1>
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
        showTacNghiepFilter={true}
        tacNghiepFilter={tacNghiepFilter}
        setTacNghiepFilter={setTacNghiepFilter}
      >
        {isFilterApplied && (
          <button
            onClick={() => {
              alert('Đã lưu dữ liệu cầu tàu thành công!');
            }}
            className="flex items-center justify-center gap-2 h-10 px-5 bg-blue-600 text-white text-sm font-medium rounded-[6px] transition-all hover:bg-blue-700 active:bg-blue-800 shadow-sm"
          >
            <Check size={20} />
            Lưu dữ liệu
          </button>
        )}
      </FilterSection>

      {!isFilterApplied ? renderEmptyState() : (
        <div className="flex-1 pt-2 pb-6 px-4 overflow-auto no-scrollbar w-full">
          <div className="bg-white rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden w-full">
            <div className="overflow-x-auto custom-scrollbar w-full block">
              <table className="w-full min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#dae6f3] border-y border-gray-300">
                    <th className="px-4 py-3 text-[12px] font-semibold text-[#172b4d] text-center border-r border-gray-300 align-middle whitespace-nowrap">
                      <div className="flex items-center justify-center">STT</div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Tàu/chuyến <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Sà lan <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Số xe <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Rơ moóc <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Tên hàng <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Loại hàng <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Tác nghiệp <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">Cẩu bờ <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">Tổ đội <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">XN hầm <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">XN bãi <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">Băng tải <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">Xe xúc <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">Xe ủi <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-1">Máy đào <ArrowUpDown size={12} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between gap-2">Người thực hiện <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-center gap-2">Thời gian hoàn tất <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-[#172b4d] whitespace-nowrap align-middle cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-end gap-2">Trọng lượng <ArrowUpDown size={14} className="text-slate-400" /></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredData.map((item, idx) => {
                    const isRowEditing = editingBerthId === item.id;

                    return (
                      <tr 
                        key={item.id} 
                        className={`${isRowEditing ? 'bg-blue-50/60 ring-1 ring-inset ring-blue-500/20' : 'hover:bg-slate-50/30'} transition-all cursor-pointer group/row`}
                        onClick={() => setEditingBerthId(item.id)}
                      >
                        <td className="px-4 py-4 text-sm font-semibold text-gray-900 text-center border-r border-slate-100">{idx + 1}</td>

                        <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                          {item.vesselName}
                        </td>

                        <td className="px-4 py-4">
                          {isRowEditing ? (
                            <input defaultValue={item.saLan} className="w-16 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.saLan}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {isRowEditing ? (
                            <input defaultValue={item.soXe} className="w-24 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-medium text-blue-600 transition-all outline-none" />
                          ) : (
                            <span className="font-mono font-medium text-sm text-blue-600 whitespace-nowrap">{item.soXe}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {isRowEditing ? (
                            <input defaultValue={item.soRomooc} className="w-24 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-500 transition-all outline-none" />
                          ) : (
                            <span className="font-mono font-normal text-sm text-gray-500 whitespace-nowrap">{item.soRomooc}</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {isRowEditing ? (
                            <input defaultValue={item.tenHang} className="w-32 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-medium text-gray-900 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{item.tenHang}</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {isRowEditing ? (
                            <select className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none">
                              <option>Sắt thép</option>
                              <option>Nông sản</option>
                              <option>Bách hóa</option>
                            </select>
                          ) : (
                            <span className="text-sm font-normal text-gray-700 whitespace-nowrap">{item.loaiHang}</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {isRowEditing ? (
                            <select defaultValue={item.tacNghiep} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-medium text-sky-700 transition-all outline-none">
                              {item.direction === 'Xuất khẩu' ? (
                                <>
                                  <option value="XUẤT GIAO THẲNG">XUẤT GIAO THẲNG</option>
                                  <option value="XUẤT BÃI TÀU">XUẤT BÃI TÀU</option>
                                </>
                              ) : (
                                <>
                                  <option value="NHẬP GIAO THẲNG">NHẬP GIAO THẲNG</option>
                                  <option value="NHẬP BÃI">NHẬP BÃI</option>
                                </>
                              )}
                            </select>
                          ) : (
                            <span className="text-sky-700 font-medium normal-case text-sm whitespace-nowrap">{item.tacNghiep}</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {isRowEditing ? (
                            <select defaultValue={item.cauBo} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none">
                              <option>CB-01</option>
                              <option>CB-02</option>
                              <option>CB-03</option>
                            </select>
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.cauBo}</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {isRowEditing ? (
                            <select defaultValue={item.toDoi} className="bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none">
                              <option>Tổ 1</option>
                              <option>Tổ 2</option>
                              <option>Tổ 3</option>
                              <option>Tổ 4</option>
                            </select>
                          ) : (
                            <span className="text-sm font-normal text-gray-700 whitespace-nowrap">{item.toDoi}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isRowEditing ? (
                            <input defaultValue={item.xeNangHam} className="w-16 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.xeNangHam}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isRowEditing ? (
                            <input defaultValue={item.xeNangBai} className="w-16 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.xeNangBai}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isRowEditing ? (
                            <input defaultValue={item.bangTai} className="w-16 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.bangTai}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isRowEditing ? (
                            <input defaultValue={item.xeXuc} className="w-16 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.xeXuc}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isRowEditing ? (
                            <input defaultValue={item.xeUi} className="w-16 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.xeUi}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isRowEditing ? (
                            <input defaultValue={item.mayDao} className="w-16 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-1 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.mayDao}</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <span className="text-sm font-normal text-gray-700 whitespace-nowrap">{(item as any).user || 'Administrator'}</span>
                        </td>
                        <td className="px-4 py-4">
                          {isRowEditing ? (
                            <input defaultValue={item.thoiGianHoanTat || ''} className="w-32 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-sm font-normal text-gray-700 transition-all outline-none" />
                          ) : (
                            <span className="text-sm font-normal text-gray-700">{item.thoiGianHoanTat || '---'}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-right pr-8">
                          {isRowEditing ? (
                            <input defaultValue={item.trongLuong} className="w-24 bg-transparent border border-transparent hover:bg-slate-100/50 focus:bg-white focus:border-slate-200 rounded px-2 py-1 text-[11px] font-black text-red-600 transition-all outline-none text-right" />
                          ) : (
                            <span className="text-[13px] font-black text-red-600">{item.trongLuong}</span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
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
                  Hiển thị từ <span className="font-semibold text-gray-900">1</span> đến <span className="font-semibold text-gray-900">{Math.min(rowsPerPage, allItems.length)}</span> trong tổng số <span className="font-semibold text-gray-900">{allItems.length}</span> bản ghi
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
