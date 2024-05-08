-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2022 at 02:08 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vlrms`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `national_id` char(15) NOT NULL,
  `license_no` char(15) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `address_1` varchar(50) NOT NULL,
  `address_2` varchar(50) NOT NULL,
  `parish_id` tinyint(4) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`national_id`, `license_no`, `first_name`, `last_name`, `address_1`, `address_2`, `parish_id`, `username`, `password`) VALUES
('1967-12-12-0404', '143647819671212', 'Jennifer', 'Davis', 'Wavell Ave', 'Black Rock', 8, 'Geju0593', 'Anoth3rpass'),
('1973-02-09-3043', '135686819730209', 'Andrew', 'Pryor', '31 ', 'Prior Park', 4, 'Qwer1234', 'andrewPryor123'),
('1979-04-22-1209', '100893419790422', 'Anderson', 'Alleyne', 'Lascelles Terrace', 'The Pine', 8, 'Oyqb0789', 'thePassw0rd');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` char(12) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(18) NOT NULL,
  `last_logged_in` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `password`, `last_logged_in`) VALUES
('11000907DRVR', 'Terold', 'Bostwick', 'secur3Acc3s5', '0000-00-00 00:00:00'),
('11001478CLRK', 'Vanda', 'Marshall', 'Oll1Ollip0ps', '0000-00-00 00:00:00'),
('11005457ADMN', 'Merissa', 'Halliwall', 'f1rst1Pa55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `parishes`
--

CREATE TABLE `parishes` (
  `id` tinyint(4) NOT NULL,
  `parish` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parishes`
--

INSERT INTO `parishes` (`id`, `parish`) VALUES
(1, 'Christ Church'),
(2, 'St. Andrew'),
(3, 'St. George'),
(4, 'St. James'),
(5, 'St. John'),
(6, 'St. Joseph'),
(7, 'St. Lucy'),
(8, 'St. Michael'),
(9, 'St. Peter'),
(10, 'St. Phillip'),
(11, 'St. Thomas');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `registration_no` varchar(6) NOT NULL,
  `manufacturer` varchar(20) NOT NULL,
  `make` varchar(20) NOT NULL,
  `model` varchar(20) NOT NULL,
  `year` year(4) NOT NULL,
  `national_id` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`registration_no`, `manufacturer`, `make`, `model`, `year`, `national_id`) VALUES
('E644', 'Porsche', 'Cayenne', 'Turbo', 2016, '1979-04-22-1209'),
('MB3920', 'Suzuki', 'Celerio', 'CVT', 2018, '1973-02-09-3043'),
('XA232', 'Subaru', 'Legacy', '2.5i-S CVT', 2020, '1967-12-12-0404');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`national_id`),
  ADD UNIQUE KEY `license_no` (`license_no`),
  ADD KEY `driver_parish` (`parish_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `parishes`
--
ALTER TABLE `parishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`registration_no`),
  ADD KEY `driver_registration` (`national_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `parishes`
--
ALTER TABLE `parishes`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `driver_parish` FOREIGN KEY (`parish_id`) REFERENCES `parishes` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `driver_registration` FOREIGN KEY (`national_id`) REFERENCES `drivers` (`national_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;