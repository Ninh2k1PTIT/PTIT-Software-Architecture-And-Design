package dao;

import java.io.IOException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.HoaDon;
import model.ThanhToan;
import model.ThanhToanTienMat;
import model.ThanhToanVnPay;

public class ThanhToanDAO extends DAO {
	public ThanhToanDAO() {
		super();
	}

	public ThanhToan[] getByHoaDon(HoaDon hoaDon) {
		ThanhToan[] result = null;
		String sql = "SELECT * FROM `thanh_toan` WHERE `hoaDonId`=?";
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, hoaDon.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new ThanhToan[rs.getRow()];
				int index = 0;
				rs.beforeFirst();
				while (rs.next()) {
					result[index] = new ThanhToan();
					result[index].setId(rs.getInt("id"));
					result[index].setSoTien(rs.getInt("soTien"));
					result[index].setNgayThanhToan(rs.getDate("ngayThanhToan"));
					result[index].setPhuongThucThanhToan(rs.getString("phuongThuc"));
					index++;
				}
			}
		} catch (SQLException e) {
		}
		return result;
	}

	public boolean createThanhToanTienMat(ThanhToan thanhToan) throws IOException {
		if (getSoTienChuaThanhToan(thanhToan.getHoaDon()) <= 0 || thanhToan.getSoTien() <= 0)
			return false;
		thanhToan.setPhuongThuc(new ThanhToanTienMat());
		thanhToan = thanhToan.thucHienThanhToan(thanhToan);
		String sql = "INSERT INTO `thanh_toan` (`hoaDonId`, `soTien`, `ngayThanhToan`, `phuongThuc`) VALUES (?, ?, ?, ?)";
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, thanhToan.getHoaDon().getId());
			ps.setInt(2, thanhToan.getSoTien());
			ps.setDate(3, new Date(thanhToan.getNgayThanhToan().getTime()));
			ps.setString(4, thanhToan.getPhuongThucThanhToan());
			ps.executeUpdate();
		} catch (SQLException e) {
			return false;
		}
		return true;
	}

	public String getUrlVnPay(HoaDon hoaDon) throws IOException {
		int soTienChuaThanhToan = getSoTienChuaThanhToan(hoaDon);
		if (soTienChuaThanhToan <= 0)
			return null;
		ThanhToanVnPay thanhToanVnPay = new ThanhToanVnPay();
		return thanhToanVnPay.urlThanhToan(soTienChuaThanhToan, hoaDon);
	}

	public boolean createThanhToanVnPay(ThanhToan thanhToan) throws IOException {
		String sql = "SELECT * FROM `thanh_toan` WHERE `thanh_toan`.`url`=?";
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, thanhToan.getUrlThanhToan());
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				return false;
			}
		} catch (SQLException e) {
		}

		ThanhToanVnPay thanhToanVnPay = new ThanhToanVnPay();

		if (!thanhToanVnPay.kiemTraReturnUrl(thanhToan.getUrlThanhToan()) || getSoTienChuaThanhToan(thanhToan.getHoaDon()) <= 0)
			return false;
		thanhToan.setPhuongThuc(new ThanhToanVnPay());
		thanhToan = thanhToan.thucHienThanhToan(thanhToan);
		sql = "INSERT INTO `thanh_toan` (`hoaDonId`, `soTien`, `ngayThanhToan`, `phuongThuc`, `url`) VALUES (?, ?, ?, ?, ?)";
		try {

			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, thanhToan.getHoaDon().getId());
			ps.setInt(2, thanhToan.getSoTien());
			ps.setDate(3, new Date(thanhToan.getNgayThanhToan().getTime()));
			ps.setString(4, thanhToan.getPhuongThucThanhToan());
			ps.setString(5, thanhToan.getUrlThanhToan());
			ps.executeUpdate();
		} catch (SQLException e) {
			return false;
		}
		return true;
	}

	public int getSoTienDaThanhToan(HoaDon hoaDon) {
		int result = 0;
		String sql = "SELECT coalesce(sum(`soTien`), 0) AS `daThanhToan` FROM `thanh_toan` WHERE `thanh_toan`.`hoaDonId`=?";
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, hoaDon.getId());
			ResultSet rs = ps.executeQuery();

			if (rs.next()) {
				result = rs.getInt("daThanhToan");
			}
		} catch (SQLException e) {
		}
		return result;
	}

	public int getSoTienChuaThanhToan(HoaDon hoaDon) {
		int result = 0;
		String sql = "SELECT `soTien` FROM `hoa_don` WHERE `hoa_don`.`id`=?";
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, hoaDon.getId());
			ResultSet rs = ps.executeQuery();

			if (rs.next()) {
				result = rs.getInt("soTien") - getSoTienDaThanhToan(hoaDon);
			}
		} catch (SQLException e) {
		}
		return result;
	}
}
