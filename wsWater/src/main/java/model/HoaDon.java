package model;

import java.util.Date;

public class HoaDon {
	private Integer id;
	private Integer chiSoDongHo;
	private Integer chiSoTieuThu;
	private Integer soTien;
	private Date ngayTao;
	private DichVuHopDong dichVuHopDong;
	private BangGia bangGia;
	private Integer soTienDaThanhToan;

	public HoaDon() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getChiSoDongHo() {
		return chiSoDongHo;
	}

	public void setChiSoDongHo(Integer chiSoDongHo) {
		this.chiSoDongHo = chiSoDongHo;
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

	public Date getNgayTao() {
		return ngayTao;
	}

	public void setNgayTao(Date ngayTao) {
		this.ngayTao = ngayTao;
	}

	public Integer getSoTienDaThanhToan() {
		return soTienDaThanhToan;
	}

	public void setSoTienDaThanhToan(Integer soTienDaThanhToan) {
		this.soTienDaThanhToan = soTienDaThanhToan;
	}

	public DichVuHopDong getDichVuHopDong() {
		return dichVuHopDong;
	}

	public void setDichVuHopDong(DichVuHopDong dichVuHopDong) {
		this.dichVuHopDong = dichVuHopDong;
	}

	public BangGia getBangGia() {
		return bangGia;
	}

	public void setBangGia(BangGia bangGia) {
		this.bangGia = bangGia;
	}
}
