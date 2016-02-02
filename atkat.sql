-- MySQL dump 10.13  Distrib 5.6.16, for Win32 (x86)
--
-- Host: localhost    Database: atkat
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_master_atk`
--

DROP TABLE IF EXISTS `t_master_atk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_master_atk` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `stok` int(10) NOT NULL DEFAULT '0',
  `satuan` varchar(255) NOT NULL DEFAULT 'Buah',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_master_atk`
--

LOCK TABLES `t_master_atk` WRITE;
/*!40000 ALTER TABLE `t_master_atk` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_master_atk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_master_pemakai`
--

DROP TABLE IF EXISTS `t_master_pemakai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_master_pemakai` (
  `id` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_master_pemakai`
--

LOCK TABLES `t_master_pemakai` WRITE;
/*!40000 ALTER TABLE `t_master_pemakai` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_master_pemakai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_master_penyuplai`
--

DROP TABLE IF EXISTS `t_master_penyuplai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_master_penyuplai` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `kontak` varchar(255) NOT NULL,
  `alamat` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_master_penyuplai`
--

LOCK TABLES `t_master_penyuplai` WRITE;
/*!40000 ALTER TABLE `t_master_penyuplai` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_master_penyuplai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_trans_booking`
--

DROP TABLE IF EXISTS `t_trans_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_trans_booking` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tanggal_pesan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_pakai` datetime NOT NULL,
  `jumlah` int(10) NOT NULL,
  `atk` int(10) NOT NULL,
  `pemakai` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `atk` (`atk`),
  KEY `pemakai` (`pemakai`),
  CONSTRAINT `booking_atk` FOREIGN KEY (`atk`) REFERENCES `t_master_atk` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `booking_pemakai` FOREIGN KEY (`pemakai`) REFERENCES `t_master_pemakai` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_trans_booking`
--

LOCK TABLES `t_trans_booking` WRITE;
/*!40000 ALTER TABLE `t_trans_booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_trans_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_trans_pemakaian`
--

DROP TABLE IF EXISTS `t_trans_pemakaian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_trans_pemakaian` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `jumlah` int(10) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atk` int(255) NOT NULL,
  `pemakai` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pemakai` (`pemakai`),
  KEY `atk` (`atk`),
  CONSTRAINT `pemakaian_atk` FOREIGN KEY (`atk`) REFERENCES `t_master_atk` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `pemakaian_pemakai` FOREIGN KEY (`pemakai`) REFERENCES `t_master_pemakai` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_trans_pemakaian`
--

LOCK TABLES `t_trans_pemakaian` WRITE;
/*!40000 ALTER TABLE `t_trans_pemakaian` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_trans_pemakaian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_trans_pengadaan`
--

DROP TABLE IF EXISTS `t_trans_pengadaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_trans_pengadaan` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tanggal_pesan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_datang` datetime DEFAULT NULL,
  `jumlah` int(10) NOT NULL,
  `atk` int(10) NOT NULL,
  `penyuplai` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `atk` (`atk`),
  KEY `penyuplai` (`penyuplai`),
  CONSTRAINT `pengadaan_atk` FOREIGN KEY (`atk`) REFERENCES `t_master_atk` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `pengadaan_penyuplai` FOREIGN KEY (`penyuplai`) REFERENCES `t_master_penyuplai` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_trans_pengadaan`
--

LOCK TABLES `t_trans_pengadaan` WRITE;
/*!40000 ALTER TABLE `t_trans_pengadaan` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_trans_pengadaan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-02 10:31:10
