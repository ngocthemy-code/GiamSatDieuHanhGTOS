export interface GateOperation {
  id: string;
  soLenh: string;
  soVanDon?: string;
  soToKhai?: string;
  soXe: string;
  soDangKiemXe?: string;
  hanDangKiemXe?: string;
  khoiLuongDauKeo?: string;
  taiTrongDauKeo?: string;
  gplxTaiXe?: string;
  tenTaiXe?: string;
  soRomooc: string;
  soDangKiemRomooc?: string;
  hanDangKiemRomooc?: string;
  khoiLuongRomooc?: string;
  taiTrongRomooc?: string;
  tau: string;
  tenHang: string;
  loaiHang: string;
  trongLuong: string;
  soLuong: string;
  viTriKho: string;
  tacNghiep: string;
  xeVao: string;
  xeRa?: string;
}

export interface BerthItem {
  id: string;
  saLan: string;
  soXe: string;
  soRomooc: string;
  cauBo: string;
  toDoi: string;
  xeNangHam: string;
  xeNangBai: string;
  bangTai: string;
  xeXuc: string;
  xeUi: string;
  mayDao: string;
  tenHang: string;
  loaiHang: string;
  tacNghiep: string;
  trongLuong: string;
  soLuong: string;
  viTri: string;
  thoiGianHoanTat?: string;
}

export interface BerthGroup {
  id: string;
  tau: string;
  chungTu: string;
  loaiChungTu: string;
  totalTrips: number;
  items: BerthItem[];
}

export interface YardItem {
  id: string;
  soXe: string;
  soRomooc: string;
  tau: string;
  tenHang: string;
  loaiHang: string;
  cauBo: string;
  toDoi: string;
  xeNangHam: string;
  xeNangBai: string;
  bangTai: string;
  xeXuc: string;
  xeUi: string;
  mayDao: string;
  trongLuong: string;
  soLuong: string;
  viTri: string;
  thoiGianHoanTat?: string;
}

export interface YardGroup {
  id: string;
  phuongAn: string;
  items: YardItem[];
}

export interface Option {
  label: string;
  value: string;
}
