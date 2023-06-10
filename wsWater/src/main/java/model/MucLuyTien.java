package model;

public class MucLuyTien {
	private Integer id;
	private Integer gioiHan;
	private Integer donGia;
	private String ghiChu;
	private BangGia bangGia;

	public MucLuyTien() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getGioiHan() {
		return gioiHan;
	}

	public void setGioiHan(Integer gioiHan) {
		this.gioiHan = gioiHan;
	}

	public Integer getDonGia() {
		return donGia;
	}

	public void setDonGia(Integer donGia) {
		this.donGia = donGia;
	}

	public String getGhiChu() {
		return ghiChu;
	}

	public void setGhiChu(String ghiChu) {
		this.ghiChu = ghiChu;
	}

	public BangGia getBangGia() {
		return bangGia;
	}

	public void setBangGia(BangGia bangGia) {
		this.bangGia = bangGia;
	}

}
