package model;

public class DichVuHopDong {
	private Integer id;
	private DichVuNuoc dichVuNuoc;
	private HopDong hopDong;

	public DichVuHopDong() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public HopDong getHopDong() {
		return hopDong;
	}

	public void setHopDong(HopDong hopDong) {
		this.hopDong = hopDong;
	}

	public DichVuNuoc getDichVuNuoc() {
		return dichVuNuoc;
	}

	public void setDichVuNuoc(DichVuNuoc dichVuNuoc) {
		this.dichVuNuoc = dichVuNuoc;
	}
}
