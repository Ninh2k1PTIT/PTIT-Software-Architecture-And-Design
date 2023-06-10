package model;

import java.io.IOException;
import java.util.Date;

public class ThanhToan {
	private Integer id;
	private PhuongThucThanhToan phuongThuc;
	private String phuongThucThanhToan;
	private HoaDon hoaDon;
	private Integer soTien;
	private Date ngayThanhToan;
	private String urlThanhToan;

	public ThanhToan() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public HoaDon getHoaDon() {
		return hoaDon;
	}

	public String getPhuongThucThanhToan() {
		return phuongThucThanhToan;
	}

	public void setPhuongThucThanhToan(String phuongThucThanhToan) {
		this.phuongThucThanhToan = phuongThucThanhToan;
	}

	public void setHoaDon(HoaDon hoaDon) {
		this.hoaDon = hoaDon;
	}

	public Integer getSoTien() {
		return soTien;
	}

	public void setSoTien(Integer soTien) {
		this.soTien = soTien;
	}

	public Date getNgayThanhToan() {
		return ngayThanhToan;
	}

	public void setNgayThanhToan(Date ngayThanhToan) {
		this.ngayThanhToan = ngayThanhToan;
	}

	public ThanhToan thucHienThanhToan(ThanhToan thanhToan) throws IOException {
		return phuongThuc.thanhToan(thanhToan);
	}

	public void setPhuongThuc(PhuongThucThanhToan phuongThuc) {
		this.phuongThuc = phuongThuc;
	}

	public String getUrlThanhToan() {
		return urlThanhToan;
	}

	public void setUrlThanhToan(String urlThanhToan) {
		this.urlThanhToan = urlThanhToan;
	}
}
