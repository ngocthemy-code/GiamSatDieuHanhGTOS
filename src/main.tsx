import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HistoryItem } from './features/history/HistoryView.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
); export const mockHistoryData: HistoryItem[] = [
  { id: '1', time: '04/05/2026 10:30:15', user: 'Administrator', action: 'Sửa thông tin', object: 'Tàu PACIFIC WAVE', details: 'Cập nhật chứng từ: INV-9982', status: 'SUCCESS' },
  { id: '2', time: '04/05/2026 10:25:00', user: 'Operator 01', action: 'Xác nhận cổng', object: 'Xe 51C-12345', details: 'Tác nghiệp: NHẬP BÃI', status: 'SUCCESS' },
  { id: '3', time: '04/05/2026 10:22:45', user: 'Operator 02', action: 'Thay đổi trọng lượng', object: 'Xe 15H-998.22', details: '75.500 kg -> 76.200 kg', status: 'SUCCESS' },
  { id: '4', time: '04/05/2026 10:15:20', user: 'Administrator', action: 'Xóa bản ghi', object: 'Kế hoạch B002', details: 'Xóa kế hoạch bãi khu vực A', status: 'ERROR' },
  { id: '5', time: '04/05/2026 09:45:10', user: 'Operator 01', action: 'Phân bổ cẩu', object: 'Cẩu QC-01', details: 'Gán cho tàu WOLFSBURG', status: 'SUCCESS' },
];

