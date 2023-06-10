package model;

public class MucLuyTienHoaDon {
	private Integer id;
	private Integer chiSoTieuThu;
	private Integer soTien;
	private MucLuyTien mucLuyTien;
	private HoaDon hoaDon;
	public MucLuyTienHoaDon() {
		super();
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getChiSoTieuThu() {
		return chiSoTieuThu;
	}
	public void setChiSoTieuThu(Integer chiSoTieuThu) {
		this.chiSoTieuThu = chiSoTieuThu;
	}
	public Integer getSoTien() {
		return soTien;
	}
	public void setSoTien(Integer soTien) {
		this.soTien = soTien;
	}
	public MucLuyTien getMucLuyTien() {
		return mucLuyTien;
	}
	public void setMucLuyTien(MucLuyTien mucLuyTien) {
		this.mucLuyTien = mucLuyTien;
	}
	public HoaDon getHoaDon() {
		return hoaDon;
	}
	public void setHoaDon(HoaDon hoaDon) {
		this.hoaDon = hoaDon;
	}
}
