package dao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import model.BangGia;
import model.CanHo;
import model.DichVuHopDong;
import model.DichVuNuoc;
import model.MucLuyTien;

public class DichVuNuocDAO extends DAO {
	public DichVuNuocDAO() {
		super();
	}

	public DichVuNuoc[] getAllDichVu() {
		DichVuNuoc[] result = null;
		String sql = "SELECT * FROM `dich_vu_nuoc` ORDER BY `id` DESC";
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new DichVuNuoc[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new DichVuNuoc();
					result[index].setId(rs.getInt("id"));
					result[index].setTenDichVu(rs.getString("tenDichVu"));
					result[index].setNgayTao(rs.getDate("ngayTao"));
					result[index].setGhiChu(rs.getString("ghiChu"));
					index++;
				}
			}

		} catch (SQLException e) {
		}
		return result;
	}

	public DichVuNuoc getDichVu(DichVuNuoc dichVuNuoc) {
		DichVuNuoc result = new DichVuNuoc();
		String sql = "SELECT * FROM `dich_vu_nuoc` WHERE `id` = ?";
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, dichVuNuoc.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				result.setId(rs.getInt("id"));
				result.setTenDichVu(rs.getString("tenDichVu"));
				result.setNgayTao(rs.getDate("ngayTao"));
				result.setGhiChu(rs.getString("ghiChu"));
			}

		} catch (SQLException e) {
		}
		return result;
	}

	public long createDichVu(DichVuNuoc dichVu) {
		String sql = "INSERT INTO `dich_vu_nuoc` (`tenDichVu`, `ngayTao`, `ghiChu`) VALUES (?, ?, ?)";
		int id = 0;
		try {
			PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, dichVu.getTenDichVu());
			ps.setDate(2, new Date(new java.util.Date().getTime()));
			ps.setString(3, dichVu.getGhiChu());
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			if (rs.next()) {
				id = rs.getInt(1);
			}

		} catch (SQLException e) {
			return id;
		}
		return id;
	}

	public BangGia[] getAllBangGiaByDichVu(DichVuNuoc dichVu) {
		BangGia[] result = null;
		String sql = "SELECT * FROM `bang_gia` WHERE `dichVuNuocId`=? ORDER BY `id` DESC";
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, dichVu.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new BangGia[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new BangGia();
					result[index].setId(rs.getInt("id"));
					result[index].setNgayTao(rs.getDate("ngayTao"));
					result[index].setDichVu(dichVu);
					index++;
				}
			}

		} catch (SQLException e) {
			return null;
		}
		return result;
	}

	public long saveBangGia(BangGia bangGia) {
		String sql = "INSERT INTO `bang_gia` (`dichVuNuocId`, `ngayTao`) VALUES (?, ?)";
		int id = 0;
		try {
			PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setInt(1, bangGia.getDichVu().getId());
			ps.setDate(2, new Date(new java.util.Date().getTime()));
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			if (rs.next()) {
				id = rs.getInt(1);
			}

		} catch (SQLException e) {
			return id;
		}
		return id;
	}

	public BangGia getLatestBangGiaByDichVu(DichVuNuoc dichVu) {
		BangGia result = new BangGia();
		String sql = "SELECT * FROM `bang_gia` WHERE `dichVuNuocId`=? ORDER  BY `id` DESC LIMIT 1";
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, dichVu.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				result.setId(rs.getInt("id"));
				result.setNgayTao(rs.getDate("ngayTao"));
				result.setDichVu(dichVu);
			}
		} catch (SQLException e) {
			return null;
		}
		return result;
	}

	public MucLuyTien[] getAllMucLuyTienByBangGia(BangGia bangGia) {
		MucLuyTien[] result = null;
		String sql = "SELECT * FROM `muc_luy_tien` WHERE `bangGiaId`=? ORDER BY `gioiHan`";
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setLong(1, bangGia.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new MucLuyTien[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new MucLuyTien();
					result[index].setId(rs.getInt("id"));
					result[index].setGioiHan(rs.getInt("gioiHan"));
					result[index].setDonGia(rs.getInt("donGia"));
					result[index].setGhiChu(rs.getString("ghiChu"));
					result[index].setBangGia(bangGia);
					index++;
				}
			}

		} catch (SQLException e) {
		}
		return result;
	}

	public boolean saveMucLuyTiens(MucLuyTien[] mucLuyTiens) {
		String sql = "INSERT INTO `muc_luy_tien` (`gioiHan`, `donGia`, `ghiChu`, `bangGiaId`) VALUES (?, ?, ?, ?)";
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			for (MucLuyTien mucLuyTien : mucLuyTiens) {
				ps.setLong(1, mucLuyTien.getGioiHan());
				ps.setLong(2, mucLuyTien.getDonGia());
				ps.setString(3, mucLuyTien.getGhiChu());
				ps.setLong(4, mucLuyTien.getBangGia().getId());
				ps.executeUpdate();
			}

		} catch (SQLException e) {
			return false;
		}
		return true;

	}

	public boolean updateDichVu(DichVuNuoc dichVu) {
		String sql = "UPDATE `dich_vu_nuoc` SET `tenDichVu` = ?, `ghiChu` = ? WHERE `id` = ?";
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, dichVu.getTenDichVu());
			ps.setString(2, dichVu.getGhiChu());
			ps.setLong(3, dichVu.getId());
			ps.executeUpdate();

		} catch (SQLException e) {
			return false;
		}
		return true;
	}

	public DichVuHopDong[] getDichVuByCanHo(CanHo canHo) {
		String sql = "SELECT `dich_vu_hop_dong`.`id`, `dich_vu_nuoc`.`tenDichVu`, `hop_dong`.`id` as dichVuNuocId\r\n"
				+ "FROM `can_ho`\r\n" + "INNER JOIN `hop_dong` ON `can_ho`.`id` = `hop_dong`.`canHoId`\r\n"
				+ "INNER JOIN `dich_vu_hop_dong` ON `hop_dong`.`id` = `dich_vu_hop_dong`.`hopDongId`\r\n"
				+ "INNER JOIN `dich_vu_nuoc` ON `dich_vu_hop_dong`.`dichVuNuocId` = `dich_vu_nuoc`.`id`\r\n"
				+ "WHERE `can_ho`.`id` = ?";
		DichVuHopDong[] result = null;
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, canHo.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new DichVuHopDong[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new DichVuHopDong();
					result[index].setId(rs.getInt("id"));
					result[index].setDichVuNuoc(new DichVuNuoc());
					result[index].getDichVuNuoc().setId(rs.getInt("dichVuNuocId"));
					result[index].getDichVuNuoc().setTenDichVu(rs.getString("tenDichVu"));
					index++;
				}

			}
		} catch (SQLException e) {

		}
		return result;
	}
}
