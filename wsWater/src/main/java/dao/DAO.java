package dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class DAO {
	public static Connection con;

	public DAO() {
		if (con == null) {
			String dbUrl = "jdbc:mysql://localhost:3306/water"; //Chay tren localhost
//            String dbUrl = "jdbc:mysql://mysql-db/water"; //Chay tren k8s
			String dbClass = "com.mysql.cj.jdbc.Driver";

			try {
				Class.forName(dbClass);
				con = DriverManager.getConnection(dbUrl, "root", "root"); //Chay tren localhost
//				con = DriverManager.getConnection(dbUrl, "root", "root"); //Chay tren k8s
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
