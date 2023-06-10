package dao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import model.BangGia;
import model.DichVuHopDong;
import model.HoaDon;
import model.MucLuyTien;
import model.MucLuyTienHoaDon;

public class HoaDonDAO extends DAO {
	public HoaDonDAO() {
		super();
	}

	public HoaDon[] getHoaDonByDichVuHopDong(DichVuHopDong dichVuHopDong) {
		String sql = "SELECT `hoa_don`.*, coalesce(sum(`thanh_toan`.`soTien`), 0) AS `daThanhToan` \r\n"
				+ "FROM `hoa_don`\r\n" + "LEFT JOIN `thanh_toan` ON `hoa_don`.`id` = `thanh_toan`.`hoaDonId`\r\n"
				+ "WHERE `dichVuHopDongId` = ? GROUP BY `hoa_don`.`id` ORDER BY `hoa_don`.`id` DESC;";
		HoaDon[] result = null;
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, dichVuHopDong.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new HoaDon[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new HoaDon();
					result[index].setId(rs.getInt("id"));
					result[index].setChiSoTieuThu(rs.getInt("chiSoTieuThu"));
					result[index].setChiSoDongHo(rs.getInt("chiSoDongHo"));
					result[index].setSoTien(rs.getInt("soTien"));
					result[index].setNgayTao(rs.getDate("ngayTao"));
					result[index].setSoTienDaThanhToan(rs.getInt("daThanhToan"));
					result[index].setBangGia(new BangGia());
					result[index].getBangGia().setId(rs.getInt("bangGiaId"));
					index++;

				}
			}
		} catch (SQLException e) {
		}
		return result;
	}

	public boolean createHoaDon(HoaDon hoaDon) {
		String sql = "INSERT INTO `hoa_don` (`chiSoDongHo`, `chiSoTieuThu`, `soTien`, `ngayTao`, `dichVuHopDongId`, `bangGiaId`) VALUES (?, ?, ?, ?, ?, ?)";
		String sql2 = "SELECT `muc_luy_tien`.*\r\n" + "FROM `dich_vu_hop_dong`\r\n"
				+ "JOIN `dich_vu_nuoc` ON `dich_vu_hop_dong`.`dichVuNuocId` = `dich_vu_nuoc`.`id`\r\n"
				+ "JOIN `bang_gia` ON `dich_vu_nuoc`.`id` = `bang_gia`.`dichVuNuocId` AND `bang_gia`.`id` = (\r\n"
				+ "  SELECT MAX(`id`)\r\n" + "  FROM `bang_gia`\r\n"
				+ "  WHERE `dichVuNuocId` = `dich_vu_nuoc`.`id`\r\n" + ")\r\n"
				+ "JOIN `muc_luy_tien` ON `bang_gia`.`id` = `muc_luy_tien`.`bangGiaId`\r\n"
				+ "WHERE `dich_vu_hop_dong`.`id` = ?\r\n" + "ORDER BY `gioiHan` ASC";
		String sql3 = "SELECT * FROM `hoa_don` WHERE `dichVuHopDongId` = ? ORDER BY `id` DESC LIMIT 1";
		String sql4 = "INSERT INTO `muc_luy_tien_hoa_don` (`chiSoTieuThu`, `soTien`, `hoaDonId`, `mucLuyTienId`) VALUES (?, ?, ?, ?)";
		MucLuyTien[] bangGia = null;
		int chiSoDongHo = hoaDon.getChiSoDongHo();
		int soNuocTieuThu = chiSoDongHo;
		try {
			// Lay bang gia cua hoa don
			PreparedStatement ps = con.prepareStatement(sql2, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, hoaDon.getDichVuHopDong().getId());
			ResultSet rs = ps.executeQuery();
			int bangGiaId = 0;
			if (rs.last()) {
				bangGia = new MucLuyTien[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					bangGiaId = rs.getInt("bangGiaId");
					bangGia[index] = new MucLuyTien();
					bangGia[index].setId(rs.getInt("id"));
					bangGia[index].setGioiHan(rs.getInt("gioiHan"));
					bangGia[index].setDonGia(rs.getInt("donGia"));
					index++;
				}

			}

			// Lay chi so nuoc thang truoc
			ps = con.prepareStatement(sql3, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, hoaDon.getDichVuHopDong().getId());
			rs = ps.executeQuery();
			if (rs.next()) {
				soNuocTieuThu = soNuocTieuThu - rs.getInt("chiSoDongHo");
			}
			// Tinh tien
			int soTien = 0;
			if (bangGia.length < 2) {
				soTien = (soNuocTieuThu - bangGia[0].getGioiHan()) * bangGia[0].getDonGia();
				
			} else {
				for (int i = 0; i < bangGia.length - 1; i++) {
					if (soNuocTieuThu > bangGia[i].getGioiHan()) {
						if (soNuocTieuThu > bangGia[i + 1].getGioiHan()) {
							soTien += (bangGia[i + 1].getGioiHan() - bangGia[i].getGioiHan()) * bangGia[i].getDonGia();
						} else {
							soTien += (soNuocTieuThu - bangGia[i].getGioiHan()) * bangGia[i].getDonGia();
							break;
						}
					}
				}
				if (soNuocTieuThu > bangGia[bangGia.length - 1].getGioiHan()) {
					soTien += (soNuocTieuThu - bangGia[bangGia.length - 1].getGioiHan())
							* bangGia[bangGia.length - 1].getDonGia();
				}
			}

			ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setInt(1, chiSoDongHo);
			ps.setInt(2, soNuocTieuThu);
			ps.setInt(3, soTien);
			ps.setDate(4, new Date(new java.util.Date().getTime()));
			ps.setInt(5, hoaDon.getDichVuHopDong().getId());
			ps.setInt(6, bangGiaId);
			ps.executeUpdate();
			
			//Lay id hoa don vua tao
			int hoaDonId = 0;
			rs = ps.getGeneratedKeys();
			if (rs.next()) {
				hoaDonId = rs.getInt(1);
			}
			
			ps = con.prepareStatement(sql4);
			if (bangGia.length < 2) {
				soTien = (soNuocTieuThu - bangGia[0].getGioiHan()) * bangGia[0].getDonGia();
				ps.setInt(1, soNuocTieuThu);
				ps.setInt(2, soTien);
				ps.setInt(3, hoaDonId);
				ps.setInt(4, bangGia[0].getId());
				ps.executeUpdate();
				
			} else {
				for (int i = 0; i < bangGia.length - 1; i++) {
					if (soNuocTieuThu > bangGia[i].getGioiHan()) {
						ps.setInt(3, hoaDonId);
						ps.setInt(4, bangGia[i].getId());
						if (soNuocTieuThu > bangGia[i + 1].getGioiHan()) {
							soTien += (bangGia[i + 1].getGioiHan() - bangGia[i].getGioiHan()) * bangGia[i].getDonGia();
							ps.setInt(1, bangGia[i + 1].getGioiHan() - bangGia[i].getGioiHan());
							ps.setInt(2, (bangGia[i + 1].getGioiHan() - bangGia[i].getGioiHan()) * bangGia[i].getDonGia());
							ps.executeUpdate();
						} else {
							soTien += (soNuocTieuThu - bangGia[i].getGioiHan()) * bangGia[i].getDonGia();
							ps.setInt(1, soNuocTieuThu - bangGia[i].getGioiHan());
							ps.setInt(2, (soNuocTieuThu - bangGia[i].getGioiHan()) * bangGia[i].getDonGia());
							ps.executeUpdate();
							break;
						}
					}
				}
				if (soNuocTieuThu > bangGia[bangGia.length - 1].getGioiHan()) {
					soTien += (soNuocTieuThu - bangGia[bangGia.length - 1].getGioiHan())
							* bangGia[bangGia.length - 1].getDonGia();
					ps.setInt(1, soNuocTieuThu - bangGia[bangGia.length - 1].getGioiHan());
					ps.setInt(2, (soNuocTieuThu - bangGia[bangGia.length - 1].getGioiHan())
							* bangGia[bangGia.length - 1].getDonGia());
					ps.setInt(3, hoaDonId);
					ps.setInt(4, bangGia[bangGia.length - 1].getId());
					ps.executeUpdate();
				}
			}

		} catch (SQLException e) {
			return false;
		}
		return true;
	}

	public HoaDon getLatestHoaDonByDichVuHopDong(DichVuHopDong dichVuHopDong) {
		String sql = "SELECT * FROM `hoa_don` WHERE `dichVuHopDongId` = ? ORDER BY `id` DESC LIMIT 1";
		HoaDon result = new HoaDon();
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, dichVuHopDong.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				result.setId(rs.getInt("id"));
				result.setChiSoDongHo(rs.getInt("chiSoDongHo"));
				result.setNgayTao(rs.getDate("ngayTao"));
			}

		} catch (SQLException e) {
		}
		return result;
	}

	public MucLuyTienHoaDon[] getChiTietHoaDon(HoaDon hoaDon) {
		String sql = "SELECT * FROM `muc_luy_tien_hoa_don`\r\n"
				+ "JOIN `muc_luy_tien` ON `muc_luy_tien`.`id` = `muc_luy_tien_hoa_don`.`mucLuyTienId` WHERE `hoaDonId` = ?";
		MucLuyTienHoaDon[] result = null;
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, hoaDon.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new MucLuyTienHoaDon[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new MucLuyTienHoaDon();
					result[index].setId(rs.getInt("id"));
					result[index].setChiSoTieuThu(rs.getInt("chiSoTieuThu"));
					result[index].setSoTien(rs.getInt("soTien"));
					result[index].setMucLuyTien(new MucLuyTien());
					result[index].getMucLuyTien().setGioiHan(rs.getInt("gioiHan"));
					result[index].getMucLuyTien().setDonGia(rs.getInt("donGia"));
					index++;
				}

			}
		} catch (SQLException e) {
		}
		return result;
	}
}
