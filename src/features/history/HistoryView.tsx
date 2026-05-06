import React, { useState, useRef, useEffect } from 'react';
import { UserHeader } from '../../shared/components/ui/UserHeader';
import { Search, Filter, RefreshCw, AlertTriangle, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Eye, Shield, Activity, Clock, Server, FileText, LayoutDashboard, User as UserIcon, ChevronDown, Ship, ArrowUpDown, ArrowRightLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { CenterModal } from '../../shared/components/ui/CenterModal';
import { DiffViewer, DiffChange } from '../../shared/components/ui/DiffViewer';
import { RefreshButton } from '../../shared/components/ui/RefreshButton';
import { motion } from 'motion/react';

interface HistoryViewProps {
  title: string;
  isFilterApplied: boolean;
  onRefresh: () => void;
}

type ActionType = 'UPDATE' | 'CREATE' | 'DELETE' | 'REJECT' | 'LOGIN';
type EntityType = 'YARD' | 'VESSEL' | 'GATE' | 'ORDER' | 'SYSTEM';

interface HistoryItem {
  id: string;
  time: string;
  user: string;
  fullName?: string;
  actionType: ActionType;
  entityType: EntityType;
  object: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  screen: string;
  changes?: DiffChange[];
  ipAddress?: string;
  sessionId?: string;
}

const mockHistoryData: HistoryItem[] = [
  {
    id: 'AUD-8829',
    time: '04/05/2026 10:30:15',
    user: 'K-Weighbridge-01',
    fullName: 'Nguyễn Văn A',
    actionType: 'UPDATE',
    entityType: 'GATE',
    object: 'Phiếu cân WB-202605-0991',
    details: 'Điều chỉnh trọng lượng tịnh xe (Trừ bì thủ công)',
    status: 'WARNING',
    screen: 'Giám sát trạm cân',
    ipAddress: '192.168.1.102',
    sessionId: 'sess_99x81',
    changes: [
      { field: 'Trọng lượng tổng (Gross)', oldValue: '45,200 kg', newValue: '45,200 kg' },
      { field: 'Trọng lượng bì (Tare)', oldValue: '15,000 kg', newValue: '15,400 kg' },
      { field: 'Trọng lượng tịnh (Net)', oldValue: '30,200 kg', newValue: '29,800 kg' },
      { field: 'Ghi chú', oldValue: '', newValue: 'Khách yêu cầu trừ bì do xe dính nhiều bùn đất sau mưa' },
      { field: 'Hình ảnh đính kèm', oldValue: '0 file', newValue: '2 files (img_mud_01.jpg, img_mud_02.jpg)' }
    ]
  },
  {
    id: 'AUD-8828',
    time: '04/05/2026 10:25:00',
    user: 'Admin_Billing',
    fullName: 'Trần Thị B',
    actionType: 'UPDATE',
    entityType: 'ORDER',
    object: 'Biểu cước Lưu bãi (Than cám)',
    details: 'Cập nhật đơn giá lưu bãi lũy tiến cho hợp đồng số HD-002',
    status: 'SUCCESS',
    screen: 'Quản lý biểu cước',
    ipAddress: '192.168.1.10',
    sessionId: 'sess_admin_441',
    changes: [
      { field: 'Đơn giá (Ngày 1-15)', oldValue: '2,500 VND/Tấn/Ngày', newValue: '3,000 VND/Tấn/Ngày' },
      { field: 'Đơn giá (Từ ngày 16)', oldValue: '3,500 VND/Tấn/Ngày', newValue: '4,500 VND/Tấn/Ngày' },
      { field: 'Áp dụng từ', oldValue: '01/01/2026', newValue: '05/05/2026' }
    ]
  },
  {
    id: 'AUD-8827',
    time: '04/05/2026 09:15:22',
    user: 'Yard_Op_01',
    fullName: 'Lê Văn C',
    actionType: 'UPDATE',
    entityType: 'YARD',
    object: 'Stockpile S-Cám-01',
    details: 'Chuyển bãi nội bộ do quá tải khu vực A',
    status: 'SUCCESS',
    screen: 'Quản lý bãi',
    ipAddress: '192.168.1.55',
    sessionId: 'sess_yard_22',
    changes: [
      { field: 'Vị trí bãi', oldValue: 'Khu vực A - Ô 01', newValue: 'Khu vực C - Ô 12' },
      { field: 'Sức chứa hiện tại', oldValue: '100%', newValue: '0%' },
      { field: 'Trạng thái ô bãi A-01', oldValue: 'Đang khai thác', newValue: 'Tạm ngưng nhập' }
    ]
  },
  {
    id: 'AUD-8826',
    time: '04/05/2026 08:45:10',
    user: 'QA_Inspector_Lead',
    fullName: 'Phạm Thị D',
    actionType: 'UPDATE',
    entityType: 'ORDER',
    object: 'Lô hàng L-992 (Tàu PACIFIC WAVE)',
    details: 'Cập nhật độ ẩm và tạp chất sau giám định bên thứ 3 (SGS)',
    status: 'WARNING',
    screen: 'Quản lý chất lượng',
    ipAddress: '192.168.1.72',
    changes: [
      { field: 'Độ ẩm (Moisture)', oldValue: '12.5%', newValue: '14.2%' },
      { field: 'Tạp chất (Impurities)', oldValue: '1.2%', newValue: '2.5%' },
      { field: 'Trạng thái chứng thư', oldValue: 'Chưa cấp', newValue: 'Đã cấp (Số 9982-SGS)' }
    ]
  },
  {
    id: 'AUD-8825',
    time: '04/05/2026 08:00:05',
    user: 'System_Scheduler',
    fullName: 'Hệ thống tự động',
    actionType: 'DELETE',
    entityType: 'VESSEL',
    object: 'Kế hoạch tàu WOLFSBURG',
    details: 'Hủy lịch cập do thời tiết xấu (Auto-trigger via API)',
    status: 'SUCCESS',
    screen: 'Kế hoạch cầu bến',
    changes: [
      { field: 'ETA', oldValue: '05/05/2026 14:00', newValue: null },
      { field: 'ETD', oldValue: '08/05/2026 12:00', newValue: null },
      { field: 'Trạng thái', oldValue: 'Dự kiến', newValue: 'Đã hủy' }
    ]
  },
  {
    id: 'AUD-8824',
    time: '04/05/2026 07:30:00',
    user: 'IT_Sec_Admin',
    fullName: 'Hoàng Văn E',
    actionType: 'UPDATE',
    entityType: 'SYSTEM',
    object: 'Role: Operator_Trạm_Cân',
    details: 'Gỡ bỏ quyền sửa phiếu cân sau khi in',
    status: 'SUCCESS',
    screen: 'Quản trị hệ thống',
    ipAddress: '10.0.0.5',
    changes: [
      { field: 'weighbridge.edit_after_print', oldValue: 'true', newValue: 'false' },
      { field: 'Người phê duyệt', oldValue: null, newValue: 'IT_Sec_Admin' }
    ]
  }
];

const UserFilterDropdown = ({ value, onChange, users }: { value: string, onChange: (v: string) => void, users: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users.filter(u => u.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative min-w-[220px]" ref={ref}>
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-500 transition-colors" size={16} />
        <div className="w-full h-10 pl-10 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 outline-none hover:border-blue-500 flex items-center transition-colors">
          {value ? value : <span className="text-gray-400 font-normal">Tìm người thực hiện...</span>}
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClick={e => e.stopPropagation()}
                className="w-full h-8 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-md text-[12px] text-slate-700 outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
            <div
              className={`px-3 py-2 text-[12px] cursor-pointer hover:bg-slate-50 ${value === '' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'}`}
              onClick={() => { onChange(''); setIsOpen(false); }}
            >
              Tất cả người thực hiện
            </div>
            {filteredUsers.map(u => (
              <div
                key={u}
                className={`px-3 py-2 text-[12px] cursor-pointer hover:bg-slate-50 ${value === u ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'}`}
                onClick={() => { onChange(u); setIsOpen(false); }}
              >
                {u}
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="px-3 py-4 text-center text-[12px] text-slate-500 italic">
                Không tìm thấy kết quả
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const HistoryView: React.FC<HistoryViewProps> = ({ title, isFilterApplied, onRefresh }) => {
  const [selectedLog, setSelectedLog] = useState<HistoryItem | null>(null);
  const [modalType, setModalType] = useState<'COMPARISON' | 'OLD_DATA' | 'NEW_DATA' | null>(null);

  // Filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [entityFilter, setEntityFilter] = useState('ALL');
  const [userFilter, setUserFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const uniqueUsers = Array.from(new Set(mockHistoryData.map(item => item.user)));

  const getActionColor = (action: ActionType) => {
    switch (action) {
      case 'CREATE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'UPDATE': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'DELETE': return 'bg-red-100 text-red-700 border-red-200';
      case 'REJECT': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getEntityLabel = (entity: EntityType) => {
    switch (entity) {
      case 'YARD': return 'Công việc bãi';
      case 'VESSEL': return 'Công việc tàu';
      case 'GATE': return 'Công việc cổng';
      case 'ORDER': return 'Lệnh';
      default: return 'Hệ thống';
    }
  };

  const filteredData = mockHistoryData.filter(item => {
    const matchSearch = searchTerm === '' ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAction = actionFilter === 'ALL' || item.actionType === actionFilter;
    const matchEntity = entityFilter === 'ALL' || item.entityType === entityFilter;
    const matchUser = userFilter === '' || item.user === userFilter;

    return matchSearch && matchAction && matchEntity && matchUser;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50/50 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-slate-200 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
          </div>
        </div>
        <UserHeader />
      </div>

      {/* Advanced Filter Bar - 2 Rows Layout */}
      <div className="px-8 py-4 bg-white border-b border-slate-200 flex flex-col gap-4 relative z-30">
        {/* Row 1: Time Range, User & Refresh */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Thời gian:</span>
              <div className="flex items-center gap-2">
                <input type="datetime-local" className="h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                <span className="text-gray-400">-</span>
                <input type="datetime-local" className="h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Người dùng:</span>
              <UserFilterDropdown value={userFilter} onChange={setUserFilter} users={uniqueUsers} />
            </div>
          </div>

          <RefreshButton onClick={onRefresh} className="h-10 rounded-md shadow-sm" />
        </div>

        {/* Row 2: Module, Action & Search */}
        <div className="flex flex-row items-center justify-start gap-4 w-full">
          <div className="flex items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Chức năng:</span>
            <div className="relative">
              <select
                value={entityFilter} onChange={e => setEntityFilter(e.target.value)}
                className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[160px]"
              >
                <option value="ALL">Tất cả chức năng</option>
                <option value="YARD">Công việc bãi</option>
                <option value="VESSEL">Công việc tàu</option>
                <option value="GATE">Công việc cổng</option>
                <option value="ORDER">Lệnh</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Hành động:</span>
            <div className="relative">
              <select
                value={actionFilter} onChange={e => setActionFilter(e.target.value)}
                className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-sm text-gray-800 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer min-w-[150px]"
              >
                <option value="ALL">Tất cả Hành động</option>
                <option value="UPDATE">UPDATE (Sửa)</option>
                <option value="CREATE">CREATE (Thêm)</option>
                <option value="DELETE">DELETE (Xóa)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2 whitespace-nowrap">Tìm kiếm:</span>
            <div className="relative w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Tìm theo Mã ID, Đối tượng..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="flex-1 pt-2 pb-6 px-4 overflow-hidden flex flex-col w-full">
        <div className="bg-white border border-slate-200 rounded-none shadow-sm flex flex-col overflow-hidden max-h-full w-full">
          <div className="overflow-x-auto custom-scrollbar w-full block">
            <table className="w-full min-w-full border-collapse text-left">
              <thead className="bg-[#dae6f3] border-y border-gray-300 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">STT</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">ID Log</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Người thực hiện</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Hành động</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Thời gian</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Chức năng</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle w-full text-center">Màn hình thay đổi</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Dữ liệu cũ</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] border-r border-gray-300 whitespace-nowrap align-middle text-center">Dữ liệu mới</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#172b4d] whitespace-nowrap align-middle text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, idx) => {
                  const isSelected = selectedLog?.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      className={`${isSelected ? 'bg-blue-50/60 ring-1 ring-inset ring-blue-500/20' : 'hover:bg-slate-50/80'} transition-all cursor-pointer group`}
                      onClick={() => setSelectedLog(item)}
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900 text-center border-l-4 border-transparent data-[selected=true]:border-blue-500 transition-colors" data-selected={isSelected}>{idx + 1}</td>
                      <td className="px-4 py-4 text-sm font-mono font-semibold text-gray-900 whitespace-nowrap text-center">{item.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-medium text-gray-900">{item.user}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border normal-case whitespace-nowrap ${getActionColor(item.actionType)}`}>
                          {item.actionType}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">{item.time}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-medium text-gray-700 bg-slate-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                          {getEntityLabel(item.entityType)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-normal text-indigo-700 whitespace-nowrap">{item.object}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedLog(item); setModalType('OLD_DATA'); }}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors inline-flex"
                          title="Xem dữ liệu cũ"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedLog(item); setModalType('NEW_DATA'); }}
                          className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-md transition-colors inline-flex"
                          title="Xem dữ liệu mới"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <button
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors inline-flex"
                          title="So sánh chi tiết thay đổi"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLog(item);
                            setModalType('COMPARISON');
                          }}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  )
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
                Hiển thị từ <span className="font-semibold text-gray-900">1</span> đến <span className="font-semibold text-gray-900">{Math.min(rowsPerPage, filteredData.length)}</span> trong tổng số <span className="font-semibold text-gray-900">{filteredData.length}</span> bản ghi
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

      {/* Center Modal for Diff View */}
      <CenterModal
        isOpen={!!selectedLog && !!modalType}
        onClose={() => { setSelectedLog(null); setModalType(null); }}
        title={
          modalType === 'COMPARISON' ? 'So sánh dữ liệu thay đổi' :
            modalType === 'OLD_DATA' ? 'Chi tiết dữ liệu cũ' : 'Chi tiết dữ liệu mới'
        }
        maxWidth="max-w-[900px]"
      >
        {selectedLog && (
          <div className="mt-4">
            {modalType === 'COMPARISON' && <DiffViewer changes={selectedLog.changes || []} />}

            {modalType === 'OLD_DATA' && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#3b82f6] border-b border-[#2563eb]">
                      <th className="px-4 py-3 text-[12px] font-bold text-white uppercase w-1/2 border-r border-blue-500/50">Trường dữ liệu</th>
                      <th className="px-4 py-3 text-[12px] font-bold text-white uppercase w-1/2">Dữ liệu cũ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {selectedLog.changes?.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3.5 text-[12px] font-bold text-slate-700 border-r border-slate-200 align-top">
                          {c.field}
                        </td>
                        <td className="px-4 py-3.5 text-[13px] text-slate-600 font-medium whitespace-pre-wrap break-words align-top">
                          {c.oldValue === null || c.oldValue === undefined || c.oldValue === '' ? (
                            <span className="text-slate-400 italic">Trống</span>
                          ) : (
                            String(c.oldValue)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {modalType === 'NEW_DATA' && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#3b82f6] border-b border-[#2563eb]">
                      <th className="px-4 py-3 text-[12px] font-bold text-white uppercase w-1/2 border-r border-blue-500/50">Trường dữ liệu</th>
                      <th className="px-4 py-3 text-[12px] font-bold text-white uppercase w-1/2">Dữ liệu mới</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {selectedLog.changes?.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3.5 text-[12px] font-bold text-slate-700 border-r border-slate-200 align-top">
                          {c.field}
                        </td>
                        <td className="px-4 py-3.5 text-[13px] text-slate-800 font-bold whitespace-pre-wrap break-words align-top">
                          {c.newValue === null || c.newValue === undefined || c.newValue === '' ? (
                            <span className="text-slate-400 italic">Trống</span>
                          ) : (
                            String(c.newValue)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </CenterModal>
    </div>
  );
};

