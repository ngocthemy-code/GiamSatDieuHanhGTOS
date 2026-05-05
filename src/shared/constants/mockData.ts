import { GateOperation, BerthGroup, YardGroup, Option } from '../types';

export const mockGateData: GateOperation[] = [
  { id: '1', soLenh: 'BK24001', soVanDon: 'BOL-778899', soXe: '51C-123.45', soRomooc: '51R-001.22', tau: 'WOLFSBURG', tenHang: 'Sắt cuộn', loaiHang: 'Sắt thép', trongLuong: '25.5 Tấn', soLuong: '12 Cuộn', viTriKho: 'KHO-A1', tacNghiep: 'NHẬP GIAO THẲNG', xeVao: '28-04-2024 08:30', xeRa: '28-04-2024 10:15' },
  { id: '2', soLenh: 'BK24002', soToKhai: 'TK-100223344', soXe: '29H-567.89', soRomooc: '29R-005.43', tau: 'PEARL RIVER', tenHang: 'Gạo ST25', loaiHang: 'Nông sản', trongLuong: '30.0 Tấn', soLuong: '600 Bao', viTriKho: 'KHO-B2', tacNghiep: 'NHẬP BÃI', xeVao: '28-04-2024 09:12', xeRa: '28-04-2024 11:30' },
  { id: '3', soLenh: 'BK24003', soVanDon: 'BOL-554433', soXe: '15C-333.21', soRomooc: '15R-009.11', tau: 'PACIFIC WAVE', tenHang: 'Phân bón Urea', loaiHang: 'Hóa chất', trongLuong: '28.2 Tấn', soLuong: '560 Bao', viTriKho: 'KHO-A3', tacNghiep: 'NHẬP BÃI', xeVao: '28-04-2024 10:05', xeRa: '28-04-2024 12:45' },
  { id: '4', soLenh: 'BK24004', soToKhai: 'TK-998877665', soXe: '43C-888.99', soRomooc: '43R-002.55', tau: 'ORIENTAL STAR', tenHang: 'Than đá', loaiHang: 'Khoáng sản', trongLuong: '35.0 Tấn', soLuong: 'Rời', viTriKho: 'BAI-C1', tacNghiep: 'XUẤT BÃI', xeVao: '28-04-2024 10:45', xeRa: '' },
  { id: '5', soLenh: 'BK24005', soVanDon: 'BOL-221100', soXe: '60C-444.12', soRomooc: '60R-008.77', tau: 'WOLFSBURG', tenHang: 'Sắt ống', loaiHang: 'Sắt thép', trongLuong: '22.8 Tấn', soLuong: '40 Bó', viTriKho: 'KHO-A1', tacNghiep: 'NHẬP GIAO THẲNG', xeVao: '28-04-2024 11:20', xeRa: '28-04-2024 13:00' },
  { id: '6', soLenh: 'BK24006', soToKhai: 'TK-445566778', soXe: '72C-555.66', soRomooc: '72R-003.88', tau: 'PEARL RIVER', tenHang: 'Ngô hạt', loaiHang: 'Nông sản', trongLuong: '32.5 Tấn', soLuong: 'Rời', viTriKho: 'KHO-B3', tacNghiep: 'NHẬP BÃI', xeVao: '28-04-2024 13:15', xeRa: '' },
  { id: '7', soLenh: 'BK24007', soVanDon: 'BOL-332211', soXe: '36C-777.99', soRomooc: '36R-001.44', tau: 'PACIFIC WAVE', tenHang: 'Thức ăn gia súc', loaiHang: 'Nông sản', trongLuong: '27.4 Tấn', soLuong: '500 Bao', viTriKho: 'KHO-A3', tacNghiep: 'NHẬP BÃI', xeVao: '28-04-2024 14:05', xeRa: '' },
];

export const berthGroups: BerthGroup[] = [
  {
    id: 'g1',
    tau: 'WOLFSBURG',
    chungTu: 'BOL-778899',
    loaiChungTu: 'Nhập khẩu',
    totalTrips: 3,
    items: [
      { id: 'b1-1', saLan: 'SL-01', soXe: '51C-123.45', soRomooc: '51R-001.22', cauBo: 'CB-01', toDoi: 'Tổ 1', xeNangHam: 'NH-05', xeNangBai: 'NB-12', bangTai: '---', xeXuc: 'XX-02', xeUi: '---', mayDao: '---', tenHang: 'Sắt ống', loaiHang: 'Sắt thép', tacNghiep: 'NHẬP GIAO THẲNG', trongLuong: '25.5 Tấn', soLuong: '12 Bó', viTri: 'KHO-A1', thoiGianHoanTat: '28-04-2024 16:20' },
      { id: 'b1-2', saLan: 'SL-01', soXe: '51C-999.00', soRomooc: '51R-007.66', cauBo: 'CB-01', toDoi: 'Tổ 1', xeNangHam: 'NH-05', xeNangBai: 'NB-12', bangTai: '---', xeXuc: 'XX-02', xeUi: '---', mayDao: '---', tenHang: 'Sắt ống', loaiHang: 'Sắt thép', tacNghiep: 'NHẬP GIAO THẲNG', trongLuong: '24.2 Tấn', soLuong: '11 Bó', viTri: 'KHO-A1', thoiGianHoanTat: '28-04-2024 16:20' },
      { id: 'b1-3', saLan: 'SL-02', soXe: '---', soRomooc: '---', cauBo: 'CB-02', toDoi: 'Tổ 2', xeNangHam: 'NH-03', xeNangBai: '---', bangTai: '---', xeXuc: '---', xeUi: '---', mayDao: '---', tenHang: 'Sắt thép rời', loaiHang: 'Sắt thép', tacNghiep: 'DỠ TÀU', trongLuong: '150 Tấn', soLuong: '---', viTri: 'SL-02', thoiGianHoanTat: '28-04-2024 17:15' },
    ]
  },
  {
    id: 'g2',
    tau: 'PEARL RIVER',
    chungTu: 'TK-100223344',
    loaiChungTu: 'Xuất khẩu',
    totalTrips: 2,
    items: [
      { id: 'b2-1', saLan: 'SL-08', soXe: '29H-567.89', soRomooc: '29R-005.43', cauBo: 'CB-02', toDoi: 'Tổ 3', xeNangHam: '---', xeNangBai: 'NB-05', bangTai: 'BT-01', xeXuc: '---', xeUi: 'XU-01', mayDao: 'MD-02', tenHang: 'Ngô hạt', loaiHang: 'Nông sản', tacNghiep: 'XUẤT TÀU', trongLuong: '30.0 Tấn', soLuong: '600 Bao', viTri: 'KHO-B3', thoiGianHoanTat: '28-04-2024 14:45' },
      { id: 'b2-2', saLan: 'SL-08', soXe: '72C-555.66', soRomooc: '72R-003.88', cauBo: 'CB-02', toDoi: 'Tổ 3', xeNangHam: '---', xeNangBai: 'NB-05', bangTai: 'BT-01', xeXuc: '---', xeUi: 'XU-01', mayDao: 'MD-02', tenHang: 'Ngô hạt', loaiHang: 'Nông sản', tacNghiep: 'XUẤT TÀU', trongLuong: '32.5 Tấn', soLuong: '650 Bao', viTri: 'KHO-B3', thoiGianHoanTat: '28-04-2024 14:45' },
    ]
  },
  {
    id: 'g3',
    tau: 'PACIFIC WAVE',
    chungTu: 'BOL-554433',
    loaiChungTu: 'Nhập khẩu',
    totalTrips: 1,
    items: [
      { id: 'b3-1', saLan: '---', soXe: '15C-333.21', soRomooc: '15R-009.11', cauBo: 'CB-03', toDoi: 'Tổ 2', xeNangHam: 'NH-01', xeNangBai: '---', bangTai: '---', xeXuc: 'XX-05', xeUi: '---', mayDao: '---', tenHang: 'Phân bón Urea', loaiHang: 'Hóa chất', tacNghiep: 'NHẬP BÃI', trongLuong: '28.2 Tấn', soLuong: '560 Bao', viTri: 'KHO-A3', thoiGianHoanTat: '28-04-2024 11:20' },
    ]
  },
  {
    id: 'g4',
    tau: 'ORIENTAL STAR',
    chungTu: 'TK-998877665',
    loaiChungTu: 'Xuất khẩu',
    totalTrips: 2,
    items: [
      { id: 'b4-1', saLan: 'SL-05', soXe: '43C-888.99', soRomooc: '43R-002.55', cauBo: 'CB-03', toDoi: 'Tổ 4', xeNangHam: '---', xeNangBai: 'NB-20', bangTai: 'BT-02', xeXuc: '---', xeUi: 'XU-02', mayDao: 'MD-05', tenHang: 'Than đá', loaiHang: 'Khoáng sản', tacNghiep: 'XUẤT TÀU', trongLuong: '35.0 Tấn', soLuong: 'Rời', viTri: 'BAI-C1', thoiGianHoanTat: '28-04-2024 12:40' },
      { id: 'b4-2', saLan: 'SL-05', soXe: '43C-111.22', soRomooc: '43R-005.11', cauBo: 'CB-03', toDoi: 'Tổ 4', xeNangHam: '---', xeNangBai: 'NB-20', bangTai: 'BT-02', xeXuc: '---', xeUi: 'XU-02', mayDao: 'MD-05', tenHang: 'Than đá', loaiHang: 'Khoáng sản', tacNghiep: 'XUẤT TÀU', trongLuong: '34.5 Tấn', soLuong: 'Rời', viTri: 'BAI-C1', thoiGianHoanTat: '28-04-2024 12:40' },
    ]
  },
  {
    id: 'g5',
    tau: 'ORIENTAL STAR',
    chungTu: 'BOL-112233445',
    loaiChungTu: 'Nhập khẩu',
    totalTrips: 1,
    items: [
      { id: 'b5-1', saLan: 'SL-06', soXe: '51C-999.00', soRomooc: '51R-007.66', cauBo: 'CB-03', toDoi: 'Tổ 4', xeNangHam: 'NH-08', xeNangBai: '---', bangTai: '---', xeXuc: 'XX-09', xeUi: '---', mayDao: '---', tenHang: 'Clinker', loaiHang: 'Khoáng sản', tacNghiep: 'NHẬP GIAO THẲNG', trongLuong: '34.2 Tấn', soLuong: 'Rời', viTri: 'BAI-C2', thoiGianHoanTat: '28-04-2024 15:10' },
    ]
  },
  {
    id: 'g6',
    tau: 'ORIENTAL STAR',
    chungTu: 'TK-887766554',
    loaiChungTu: 'Xuất khẩu',
    totalTrips: 1,
    items: [
      { id: 'b6-1', saLan: 'SL-07', soXe: '60C-123.45', soRomooc: '60R-001.22', cauBo: 'CB-03', toDoi: 'Tổ 4', xeNangHam: '---', xeNangBai: 'NB-21', bangTai: 'BT-02', xeXuc: '---', xeUi: 'XU-02', mayDao: 'MD-05', tenHang: 'Than cám', loaiHang: 'Khoáng sản', tacNghiep: 'XUẤT TÀU', trongLuong: '33.2 Tấn', soLuong: 'Rời', viTri: 'BAI-C1', thoiGianHoanTat: '28-04-2024 12:40' },
    ]
  }
];

export const yardGroups: YardGroup[] = [
  {
    id: 'yg1',
    phuongAn: 'Nhập tàu - bãi',
    items: [
      { id: 'y1-1', soXe: '51C-123.45', soRomooc: '51R-001.22', tau: 'WOLFSBURG', tenHang: 'Sắt ống', loaiHang: 'Sắt thép', cauBo: 'CB-01', toDoi: 'Tổ 1', xeNangHam: 'NH-05', xeNangBai: 'NB-12', bangTai: '---', xeXuc: 'XX-02', xeUi: '---', mayDao: '---', trongLuong: '22.5 Tấn', soLuong: '10 Bó', viTri: 'KHO-A1', thoiGianHoanTat: '28-04-2024 16:30' },
      { id: 'y1-2', soXe: '72C-555.66', soRomooc: '72R-003.88', tau: 'PEARL RIVER', tenHang: 'Clinker', loaiHang: 'Khoáng sản', cauBo: 'CB-03', toDoi: 'Tổ 2', xeNangHam: 'NH-01', xeNangBai: '---', bangTai: '---', xeXuc: 'XX-05', xeUi: '---', mayDao: '---', trongLuong: '15.0 Tấn', soLuong: 'Rời', viTri: 'BAI-C2', thoiGianHoanTat: '28-04-2024 15:45' },
    ]
  },
  {
    id: 'yg2',
    phuongAn: 'Nhập giao thẳng qua xe chủ hàng',
    items: [
      { id: 'y2-1', soXe: '43C-888.99', soRomooc: '43R-002.55', tau: 'ORIENTAL STAR', tenHang: 'Than cám', loaiHang: 'Khoáng sản', cauBo: 'CB-03', toDoi: 'Tổ 4', xeNangHam: '---', xeNangBai: '---', bangTai: 'BT-02', xeXuc: '---', xeUi: 'XU-02', mayDao: '---', trongLuong: '33.2 Tấn', soLuong: 'Rời', viTri: 'CẦU TÀU', thoiGianHoanTat: '28-04-2024 13:20' },
      { id: 'y2-2', soXe: '60C-444.12', soRomooc: '60R-008.77', tau: 'WOLFSBURG', tenHang: 'Ngô hạt', loaiHang: 'Nông sản', cauBo: 'CB-02', toDoi: 'Tổ 3', xeNangHam: '---', xeNangBai: 'NB-05', bangTai: 'BT-01', xeXuc: '---', xeUi: 'XU-01', mayDao: 'MD-02', trongLuong: '26.4 Tấn', soLuong: '520 Bao', viTri: 'CẦU TÀU', thoiGianHoanTat: '28-04-2024 13:20' },
    ]
  },
  {
    id: 'yg3',
    phuongAn: 'Giao hàng bãi - xe',
    items: [
      { id: 'y3-1', soXe: '60C-444.12', soRomooc: '60R-008.77', tau: 'WOLFSBURG', tenHang: 'Ngô hạt', loaiHang: 'Nông sản', cauBo: 'CB-02', toDoi: 'Tổ 3', xeNangHam: '---', xeNangBai: 'NB-05', bangTai: 'BT-01', xeXuc: '---', xeUi: 'XU-01', mayDao: 'MD-02', trongLuong: '32.1 Tấn', soLuong: '640 Bao', viTri: 'KHO-B3', thoiGianHoanTat: '28-04-2024 14:10' },
      { id: 'y3-2', soXe: '15C-333.21', soRomooc: '15R-009.11', tau: 'PACIFIC WAVE', tenHang: 'Phân bón Urea', loaiHang: 'Hóa chất', cauBo: '---', toDoi: '---', xeNangHam: '---', xeNangBai: 'NB-08', bangTai: '---', xeXuc: '---', xeUi: '---', mayDao: '---', trongLuong: '28.2 Tấn', soLuong: '560 Bao', viTri: 'KHO-A3', thoiGianHoanTat: '28-04-2024 11:45' },
    ]
  },
  {
    id: 'yg4',
    phuongAn: 'Hạ tập kết',
    items: [
      { id: 'y4-1', soXe: '36C-777.99', soRomooc: '36R-001.44', tau: 'PACIFIC WAVE', tenHang: 'Thức ăn gia súc', loaiHang: 'Nông sản', cauBo: '---', toDoi: '---', xeNangHam: '---', xeNangBai: '---', bangTai: '---', xeXuc: '---', xeUi: '---', mayDao: '---', trongLuong: '25.4 Tấn', soLuong: '500 Bao', viTri: 'KHO-A3', thoiGianHoanTat: '28-04-2024 11:45' },
    ]
  }
];

export const tacNghiepOptions: Option[] = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Nhập bãi', value: 'NHẬP BÃI' },
  { label: 'Nhập giao thẳng', value: 'NHẬP GIAO THẲNG' },
  { label: 'Xuất bãi', value: 'XUẤT BÃI' },
  { label: 'Xuất giao thẳng', value: 'XUẤT GIAO THẲNG' },
];

export const cargoTypeOptions: Option[] = [
  { label: 'Tất cả loại hàng', value: 'ALL' },
  { label: 'Sắt thép', value: 'Sắt thép' },
  { label: 'Nông sản', value: 'Nông sản' },
  { label: 'Hóa chất', value: 'Hóa chất' },
  { label: 'Khoáng sản', value: 'Khoáng sản' },
];

export const directionOptions: Option[] = [
  { label: 'Tất cả hướng', value: 'ALL' },
  { label: 'Nhập khẩu', value: 'Nhập khẩu' },
  { label: 'Xuất khẩu', value: 'Xuất khẩu' },
];
