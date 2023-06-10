package model;

import java.util.Date;

public class ThanhToanTienMat extends PhuongThucThanhToan {

	public ThanhToanTienMat() {

	}

	@Override
	public ThanhToan thanhToan(ThanhToan thanhToan) {
		thanhToan.setHoaDon(thanhToan.getHoaDon());
		thanhToan.setSoTien(thanhToan.getSoTien());
		thanhToan.setNgayThanhToan(new Date());
		thanhToan.setPhuongThucThanhToan("Thanh toan bang tien mat");
		return thanhToan;
	}
}
