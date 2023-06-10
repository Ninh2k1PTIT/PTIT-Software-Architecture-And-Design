import { BangGia } from './BangGia';

export interface HoaDon {
  id: number;
  chiSoDongHo?: number;
  chiSoTieuThu: number;
  soTien: number;
  ngayTao?: Date;
  soTienDaThanhToan: number;
  bangGiaId: number;
  dichVuHopDongId?: number;
}
