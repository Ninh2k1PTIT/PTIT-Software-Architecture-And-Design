package model;

import java.util.Date;

public class BangGia {
	private Integer id;
	private Date ngayTao;
	private DichVuNuoc dichVu;

	public BangGia() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getNgayTao() {
		return ngayTao;
	}

	public void setNgayTao(Date ngayTao) {
		this.ngayTao = ngayTao;
	}

	public DichVuNuoc getDichVu() {
		return dichVu;
	}

	public void setDichVu(DichVuNuoc dichVu) {
		this.dichVu = dichVu;
	}

}
