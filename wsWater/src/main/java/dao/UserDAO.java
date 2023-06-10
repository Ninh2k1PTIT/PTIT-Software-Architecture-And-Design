package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.User;

public class UserDAO extends DAO {
	public UserDAO() {
		super();
	}

	public boolean login(User user) {
		String sql = "SELECT * FROM `user` WHERE `username` = ? AND `password` = ?";
		boolean result = false;
		try {
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getPassword());
			ResultSet rs = ps.executeQuery();
			if (rs.next())
				result = true;
		} catch (SQLException e) {

		}
		return result;
	}
}
