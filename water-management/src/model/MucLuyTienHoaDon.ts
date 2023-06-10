import { MucLuyTien } from "./MucLuyTiens";

export interface MucLuyTienHoaDon {
    id?: number;
    soTien: number;
    chiSoTieuThu: number;
    mucLuyTien: MucLuyTien
}