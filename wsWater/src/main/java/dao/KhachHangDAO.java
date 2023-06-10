package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.CanHo;
import model.KhachHang;

public class KhachHangDAO extends DAO {
	public KhachHangDAO() {
		super();
	}

	public KhachHang[] getKhachHangByTen(String key) {
		KhachHang[] result = null;
		String sql = "SELECT * FROM `khach_hang` WHERE `tenKhachHang` LIKE ?";
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setString(1, "%" + key + "%");
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new KhachHang[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new KhachHang();
					result[index].setId(rs.getInt("id"));
					result[index].setTenKhachHang(rs.getString("tenKhachHang"));
					index++;
				}
			}

		} catch (SQLException e) {
		}
		return result;
	}

	public CanHo[] getCanHoByKhachHang(KhachHang khachHang) {
		CanHo[] result = null;
		String sql = "SELECT * FROM `can_ho` WHERE `khachHangId` = ?";
		try {
			PreparedStatement ps = con.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			ps.setLong(1, khachHang.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.last()) {
				result = new CanHo[rs.getRow()];
				rs.beforeFirst();
				int index = 0;
				while (rs.next()) {
					result[index] = new CanHo();
					result[index].setId(rs.getInt("id"));
					result[index].setDiaChi(rs.getString("diaChi"));
					index++;
				}
			}

		} catch (SQLException e) {
		}
		return result;
	}
}
