-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2016 at 04:50 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `atkat`
--

-- --------------------------------------------------------

--
-- Table structure for table `atk`
--

CREATE TABLE IF NOT EXISTS `atk` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `stok` int(10) NOT NULL DEFAULT '0',
  `satuan` varchar(255) NOT NULL DEFAULT 'Buah',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE IF NOT EXISTS `booking` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tanggal_pesan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_pakai` datetime NOT NULL,
  `jumlah` int(10) NOT NULL,
  `atk` int(10) NOT NULL,
  `pemakai` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `atk` (`atk`),
  KEY `pemakai` (`pemakai`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pemakai`
--

CREATE TABLE IF NOT EXISTS `pemakai` (
  `id` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pemakaian`
--

CREATE TABLE IF NOT EXISTS `pemakaian` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `jumlah` int(10) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atk` int(255) NOT NULL,
  `pemakai` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pemakai` (`pemakai`),
  KEY `atk` (`atk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pengadaan`
--

CREATE TABLE IF NOT EXISTS `pengadaan` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tanggal_pesan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_datang` datetime DEFAULT NULL,
  `jumlah` int(10) NOT NULL,
  `atk` int(10) NOT NULL,
  `penyuplai` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `atk` (`atk`),
  KEY `penyuplai` (`penyuplai`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `penyuplai`
--

CREATE TABLE IF NOT EXISTS `penyuplai` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `kontak` varchar(255) NOT NULL,
  `alamat` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_atk` FOREIGN KEY (`atk`) REFERENCES `atk` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_pemakai` FOREIGN KEY (`pemakai`) REFERENCES `pemakai` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `pemakaian`
--
ALTER TABLE `pemakaian`
  ADD CONSTRAINT `pemakaian_atk` FOREIGN KEY (`atk`) REFERENCES `atk` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `pemakaian_pemakai` FOREIGN KEY (`pemakai`) REFERENCES `pemakai` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `pengadaan`
--
ALTER TABLE `pengadaan`
  ADD CONSTRAINT `pengadaan_atk` FOREIGN KEY (`atk`) REFERENCES `atk` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `pengadaan_penyuplai` FOREIGN KEY (`penyuplai`) REFERENCES `penyuplai` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
