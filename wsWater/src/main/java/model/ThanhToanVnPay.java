package model;

import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class ThanhToanVnPay extends PhuongThucThanhToan {
	public static String vnp_Version = "2.1.0";
	public static String vnp_Command = "pay";
	public static String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
	public static String vnp_Returnurl = "http://localhost:4200/vnpay-result";
	public static String vnp_TmnCode = "ABNPPKEM";
	public static String vnp_HashSecret = "MBADIAIMDKOGLKSUXGNRZUXZFRVYJRVD";
	public static String vnp_apiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";

	public ThanhToanVnPay() {

	}

	private static String hmacSHA512(final String key, final String data) {
		try {

			if (key == null || data == null) {
				throw new NullPointerException();
			}
			final Mac hmac512 = Mac.getInstance("HmacSHA512");
			byte[] hmacKeyBytes = key.getBytes();
			final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
			hmac512.init(secretKey);
			byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
			byte[] result = hmac512.doFinal(dataBytes);
			StringBuilder sb = new StringBuilder(2 * result.length);
			for (byte b : result) {
				sb.append(String.format("%02x", b & 0xff));
			}
			return sb.toString();

		} catch (Exception ex) {
			return "";
		}
	}

	private static String getRandomNumber(int len) {
		Random rnd = new Random();
		String chars = "0123456789";
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			sb.append(chars.charAt(rnd.nextInt(chars.length())));
		}
		return sb.toString();
	}

	public static String hashAllFields(Map<String, String> fields) {
		List<String> fieldNames = new ArrayList<>(fields.keySet());
		Collections.sort(fieldNames);
		StringBuilder sb = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = (String) itr.next();
			String fieldValue = (String) fields.get(fieldName);
			if ((fieldValue != null) && (fieldValue.length() > 0)) {
				sb.append(fieldName);
				sb.append("=");
				sb.append(fieldValue);
			}
			if (itr.hasNext()) {
				sb.append("&");
			}
		}
		return hmacSHA512(vnp_HashSecret, sb.toString());
	}

	public String urlThanhToan(long soTien, HoaDon hoaDon) throws IOException {
		long amount = soTien * 100;
		String vnp_TxnRef = getRandomNumber(8);
		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", hoaDon.getId() + "");
		vnp_Params.put("vnp_Locale", "vn");
		vnp_Params.put("vnp_ReturnUrl", vnp_Returnurl);
		vnp_Params.put("vnp_IpAddr", "0.0.0.0");

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		cld.add(Calendar.MINUTE, 15);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = (String) itr.next();
			String fieldValue = (String) vnp_Params.get(fieldName);
			if ((fieldValue != null) && (fieldValue.length() > 0)) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = hmacSHA512(vnp_HashSecret, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = vnp_PayUrl + "?" + queryUrl;

		return paymentUrl;
	}

	public boolean kiemTraReturnUrl(String returnUrl) throws IOException {
		URL url = new URL(returnUrl);
		String queryString = url.getQuery();
		Map<String, String> fields = new HashMap<>();
		for (String param : queryString.split("&")) {
			String[] pair = param.split("=");
			if ((pair[0] != null) && (pair[1].length() > 0)) {

				fields.put(URLEncoder.encode(pair[0], StandardCharsets.US_ASCII.toString()),
						URLEncoder.encode(pair[1], StandardCharsets.US_ASCII.toString()));
			}

		}

		String vnp_SecureHash = (String) fields.get("vnp_SecureHash");
		if (fields.containsKey("vnp_SecureHashType")) {
			fields.remove("vnp_SecureHashType");
		}
		if (fields.containsKey("vnp_SecureHash")) {
			fields.remove("vnp_SecureHash");
		}
		String signValue = hashAllFields(fields);
		return signValue.equals(vnp_SecureHash);
	}

	public Integer getSoTienThanhToan(String returnUrl) throws IOException {
		URL url = new URL(returnUrl);
		String queryString = url.getQuery();
		int soTien = 0;
		for (String param : queryString.split("&")) {
			String[] pair = param.split("=");
			if (pair[0].equals("vnp_Amount"))
				soTien = Integer.parseInt(pair[1]);
			if (pair[0].equals("vnp_ResponseCode") && !pair[1].equals("00"))
				return 0;
		}
		return soTien;
	}

	@Override
	public ThanhToan thanhToan(ThanhToan thanhToan) throws IOException {
		thanhToan.setHoaDon(thanhToan.getHoaDon());
		thanhToan.setSoTien(getSoTienThanhToan(thanhToan.getUrlThanhToan()) / 100);
		thanhToan.setNgayThanhToan(new Date());
		thanhToan.setPhuongThucThanhToan("Thanh toan bang cong thanh toan VNPAY");
		return thanhToan;
	}
}
