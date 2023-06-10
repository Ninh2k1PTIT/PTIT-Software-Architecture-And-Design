-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: water
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bang_gia`
--

DROP TABLE IF EXISTS `bang_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bang_gia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ngayTao` date DEFAULT NULL,
  `dichVuNuocId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dichVuNuocId_idx` (`dichVuNuocId`),
  CONSTRAINT `dichVuNuocId` FOREIGN KEY (`dichVuNuocId`) REFERENCES `dich_vu_nuoc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bang_gia`
--

LOCK TABLES `bang_gia` WRITE;
/*!40000 ALTER TABLE `bang_gia` DISABLE KEYS */;
INSERT INTO `bang_gia` VALUES (1,'2023-05-02',1),(2,'2023-05-02',2),(3,'2023-05-02',3),(4,'2023-05-03',4),(5,'2023-05-03',5),(6,'2023-05-03',6),(7,'2023-06-09',7),(8,'2023-06-10',8);
/*!40000 ALTER TABLE `bang_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `can_ho`
--

DROP TABLE IF EXISTS `can_ho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `can_ho` (
  `id` int NOT NULL AUTO_INCREMENT,
  `diaChi` text,
  `khachHangId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `khachHangId_idx` (`khachHangId`),
  CONSTRAINT `khachHangId` FOREIGN KEY (`khachHangId`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `can_ho`
--

LOCK TABLES `can_ho` WRITE;
/*!40000 ALTER TABLE `can_ho` DISABLE KEYS */;
INSERT INTO `can_ho` VALUES (1,'Hà Đông',1),(2,'Cầu Giấy',1),(3,'Sóc Sơn',2),(4,'Royal City',2),(5,'Chương Mỹ',3),(6,'Hoài Đức',4),(7,'Nam Từ Liêm',4),(8,'Bắc Từ Liêm',1);
/*!40000 ALTER TABLE `can_ho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dich_vu_hop_dong`
--

DROP TABLE IF EXISTS `dich_vu_hop_dong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dich_vu_hop_dong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dichVuNuocId` int DEFAULT NULL,
  `hopDongId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dichVuNuocId_idx` (`dichVuNuocId`),
  KEY `hopDongId_idx` (`hopDongId`),
  CONSTRAINT `dichVuNuocId2` FOREIGN KEY (`dichVuNuocId`) REFERENCES `dich_vu_nuoc` (`id`),
  CONSTRAINT `hopDongId` FOREIGN KEY (`hopDongId`) REFERENCES `hop_dong` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dich_vu_hop_dong`
--

LOCK TABLES `dich_vu_hop_dong` WRITE;
/*!40000 ALTER TABLE `dich_vu_hop_dong` DISABLE KEYS */;
INSERT INTO `dich_vu_hop_dong` VALUES (1,1,1),(2,2,1),(3,3,2),(4,4,2),(5,1,3),(6,3,3),(7,5,4),(8,6,4),(9,1,5),(10,6,5),(11,2,6),(12,3,6),(13,4,7),(14,5,7),(15,2,8),(16,4,8),(17,3,9),(18,6,9),(19,1,10),(20,4,11),(21,1,12),(22,2,12),(23,3,12),(24,4,13),(25,5,13),(26,1,14),(27,3,15),(28,5,15),(29,6,15);
/*!40000 ALTER TABLE `dich_vu_hop_dong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dich_vu_nuoc`
--

DROP TABLE IF EXISTS `dich_vu_nuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dich_vu_nuoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenDichVu` text,
  `ngayTao` date DEFAULT NULL,
  `ghiChu` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dich_vu_nuoc`
--

LOCK TABLES `dich_vu_nuoc` WRITE;
/*!40000 ALTER TABLE `dich_vu_nuoc` DISABLE KEYS */;
INSERT INTO `dich_vu_nuoc` VALUES (1,'Nước sinh hoạt 1','2023-05-02',NULL),(2,'Nước sinh hoạt 2','2023-05-02',NULL),(3,'Nước sinh hoạt 3','2023-05-02',NULL),(4,'Nước nhà máy 1','2023-05-03',NULL),(5,'Nước nhà máy 2','2023-05-03',NULL),(6,'Nước nhà máy 3','2023-05-03',NULL),(7,'Nước','2023-06-09',''),(8,'Nước kinh doanh','2023-06-10','Dịch vụ nước dành cho các doanh nghiệp, hộ kinh doanh,...');
/*!40000 ALTER TABLE `dich_vu_nuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chiSoDongHo` int DEFAULT NULL,
  `chiSoTieuThu` int DEFAULT NULL,
  `soTien` int DEFAULT NULL,
  `ngayTao` date DEFAULT NULL,
  `url` text,
  `dichVuHopDongId` int DEFAULT NULL,
  `bangGiaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dichVuHopDongId_idx` (`dichVuHopDongId`),
  KEY `bangGiaId_idx` (`bangGiaId`),
  CONSTRAINT `bangGiaId2` FOREIGN KEY (`bangGiaId`) REFERENCES `bang_gia` (`id`),
  CONSTRAINT `dichVuHopDongId` FOREIGN KEY (`dichVuHopDongId`) REFERENCES `dich_vu_hop_dong` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (1,100,100,150000,'2023-05-05',NULL,1,1),(2,200,100,150000,'2023-06-09',NULL,1,1),(3,200,200,450000,'2023-06-09',NULL,19,1);
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hop_dong`
--

DROP TABLE IF EXISTS `hop_dong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hop_dong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tuNgay` date DEFAULT NULL,
  `denNgay` date DEFAULT NULL,
  `canHoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `canHoId_idx` (`canHoId`),
  CONSTRAINT `canHoId` FOREIGN KEY (`canHoId`) REFERENCES `can_ho` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hop_dong`
--

LOCK TABLES `hop_dong` WRITE;
/*!40000 ALTER TABLE `hop_dong` DISABLE KEYS */;
INSERT INTO `hop_dong` VALUES (1,'2023-05-01','2024-05-01',1),(2,'2023-05-01','2024-05-01',1),(3,'2023-05-01','2024-05-01',2),(4,'2023-05-01','2024-05-01',2),(5,'2023-05-01','2024-05-01',3),(6,'2023-05-01','2024-05-01',4),(7,'2023-05-01','2024-05-01',4),(8,'2023-05-01','2024-05-01',5),(9,'2023-05-01','2024-05-01',5),(10,'2023-05-01','2024-05-01',6),(11,'2023-05-01','2024-05-01',6),(12,'2023-05-01','2024-05-01',7),(13,'2023-05-01','2024-05-01',7),(14,'2023-05-01','2024-05-01',8),(15,'2023-05-01','2024-05-01',8);
/*!40000 ALTER TABLE `hop_dong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khach_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenKhachHang` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khach_hang`
--

LOCK TABLES `khach_hang` WRITE;
/*!40000 ALTER TABLE `khach_hang` DISABLE KEYS */;
INSERT INTO `khach_hang` VALUES (1,'Nguyễn Văn An'),(2,'Phạm Minh Long'),(3,'Nguyễn Văn Ánh'),(4,'Trần Thị Linh');
/*!40000 ALTER TABLE `khach_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muc_luy_tien`
--

DROP TABLE IF EXISTS `muc_luy_tien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muc_luy_tien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gioiHan` int DEFAULT NULL,
  `donGia` int DEFAULT NULL,
  `ghiChu` text,
  `bangGiaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bangGiaId_idx` (`bangGiaId`),
  CONSTRAINT `bangGiaId` FOREIGN KEY (`bangGiaId`) REFERENCES `bang_gia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muc_luy_tien`
--

LOCK TABLES `muc_luy_tien` WRITE;
/*!40000 ALTER TABLE `muc_luy_tien` DISABLE KEYS */;
INSERT INTO `muc_luy_tien` VALUES (1,0,1000,NULL,1),(2,50,2000,NULL,1),(3,100,3000,NULL,1),(4,0,1500,NULL,2),(5,50,2250,NULL,2),(6,150,3500,NULL,2),(7,0,5000,NULL,3),(8,30,7000,NULL,3),(9,60,10000,NULL,3),(10,100,12000,NULL,3),(11,50,6500,NULL,4),(12,150,8000,NULL,4),(13,0,6200,NULL,5),(14,100,7000,NULL,5),(15,200,8000,NULL,5),(16,0,10000,NULL,6),(17,200,12000,NULL,6),(18,300,12500,NULL,6),(19,0,2000,'',7),(20,10,2500,'',7),(21,0,3000,'',8),(22,20,3500,'',8);
/*!40000 ALTER TABLE `muc_luy_tien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muc_luy_tien_hoa_don`
--

DROP TABLE IF EXISTS `muc_luy_tien_hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muc_luy_tien_hoa_don` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chiSoTieuThu` int DEFAULT NULL,
  `soTien` int DEFAULT NULL,
  `hoaDonId` int DEFAULT NULL,
  `mucLuyTienId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hoaDonId2_idx` (`hoaDonId`),
  KEY `mucLuyTienId_idx` (`mucLuyTienId`),
  CONSTRAINT `hoaDonId2` FOREIGN KEY (`hoaDonId`) REFERENCES `hoa_don` (`id`),
  CONSTRAINT `mucLuyTienId` FOREIGN KEY (`mucLuyTienId`) REFERENCES `muc_luy_tien` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muc_luy_tien_hoa_don`
--

LOCK TABLES `muc_luy_tien_hoa_don` WRITE;
/*!40000 ALTER TABLE `muc_luy_tien_hoa_don` DISABLE KEYS */;
INSERT INTO `muc_luy_tien_hoa_don` VALUES (1,50,50000,1,1),(2,50,100000,1,2),(4,50,50000,2,1),(5,50,100000,2,2),(6,50,50000,3,1),(7,50,100000,3,2),(8,100,300000,3,3);
/*!40000 ALTER TABLE `muc_luy_tien_hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thanh_toan`
--

DROP TABLE IF EXISTS `thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanh_toan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phuongThuc` text,
  `soTien` int DEFAULT NULL,
  `url` text,
  `ngayThanhToan` date DEFAULT NULL,
  `hoaDonId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hoaDonId_idx` (`hoaDonId`),
  CONSTRAINT `hoaDonId` FOREIGN KEY (`hoaDonId`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanh_toan`
--

LOCK TABLES `thanh_toan` WRITE;
/*!40000 ALTER TABLE `thanh_toan` DISABLE KEYS */;
INSERT INTO `thanh_toan` VALUES (1,'Thanh toan bang tien mat',100000,NULL,'2023-06-09',2),(2,'Thanh toan bang cong thanh toan VNPAY',50000,'http://localhost:4200/vnpay-result?vnp_Amount=5000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14034304&vnp_CardType=ATM&vnp_OrderInfo=2&vnp_PayDate=20230609083201&vnp_ResponseCode=00&vnp_TmnCode=ABNPPKEM&vnp_TransactionNo=14034304&vnp_TransactionStatus=00&vnp_TxnRef=47284681&vnp_SecureHash=fec576b6b4a1778eec9bd842213228c65e71889eb6a8352b76f366ca167b9f1e1f47137aacfc9b9ad78e9146280683c9e04ab82ed4c61bcca75887f2c0ed7d1f','2023-06-09',2),(3,'Thanh toan bang cong thanh toan VNPAY',0,'http://localhost:4200/vnpay-result?vnp_Amount=15000000&vnp_BankCode=NCB&vnp_CardType=ATM&vnp_OrderInfo=1&vnp_PayDate=20230610220921&vnp_ResponseCode=01&vnp_TmnCode=ABNPPKEM&vnp_TransactionNo=14035418&vnp_TransactionStatus=02&vnp_TxnRef=42336254&vnp_SecureHash=111b0cd8e9d62acbfc568f4044f9be3c9854a9f0b0d334bae5d19ff1f54f43567ee6c68e303e96d978061f866a2082bae91d886f24c3d403a5c01e78d22417be','2023-06-10',1),(4,'Thanh toan bang cong thanh toan VNPAY',150000,'http://localhost:4200/vnpay-result?vnp_Amount=15000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14035419&vnp_CardType=ATM&vnp_OrderInfo=1&vnp_PayDate=20230610221009&vnp_ResponseCode=00&vnp_TmnCode=ABNPPKEM&vnp_TransactionNo=14035419&vnp_TransactionStatus=00&vnp_TxnRef=25749440&vnp_SecureHash=87796dbb36cff443da998958c21edc06d6c3ae8d0e467db1e6d649dd731a7b8f693b22e031bf32b869199e803aa882b5045785f1f7c801762f61f40834e8bd12','2023-06-10',1);
/*!40000 ALTER TABLE `thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-10 23:13:59
