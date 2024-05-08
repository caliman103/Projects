-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 17, 2022 at 06:22 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `400005037`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
CREATE TABLE IF NOT EXISTS `class` (
  `ClassLevel` varchar(15) NOT NULL,
  `LoanFee` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`ClassLevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`ClassLevel`, `LoanFee`) VALUES
('Form 1', '55.00'),
('Form 2', '60.00'),
('Form 3', '65.00'),
('Form 4', '70.00'),
('Form 5', '75.00'),
('Infants A', '35.00'),
('Infants B', '35.00'),
('J1', '40.00'),
('J2', '45.00'),
('J3', '50.00'),
('J4', '50.00'),
('Preschool', '25.00'),
('Reception', '30.00');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `studid` int(11) NOT NULL,
  `FirstName` varchar(25) DEFAULT NULL,
  `MiddleName` varchar(25) DEFAULT NULL,
  `LastName` varchar(25) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `BirthDate` date DEFAULT NULL,
  `ClassLevel` varchar(15) DEFAULT NULL,
  `ClassSuffix` char(1) DEFAULT NULL,
  `ParentPhoneNumber` varchar(14) DEFAULT NULL,
  `ParentEmail` varchar(50) DEFAULT NULL,
  `Enrolled` char(1) DEFAULT NULL,
  `LoanFeePaid` char(1) DEFAULT NULL,
  `RepairCost` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`studid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`studid`, `FirstName`, `MiddleName`, `LastName`, `Address`, `BirthDate`, `ClassLevel`, `ClassSuffix`, `ParentPhoneNumber`, `ParentEmail`, `Enrolled`, `LoanFeePaid`, `RepairCost`) VALUES
(1, 'Rose', 'Pauline ', 'Morgan', 'St. Michael', '2003-06-12', 'Form 5', '3', '1 246-522-0133', 'goria.Y@gmail.com', 'N', 'Y', '0.00'),
(2, 'Abbie', 'Vickie ', 'Joseph', 'St. George', '2006-08-19', 'Form 5', '2', '1 246-835-8274', 'samSUNG@gmail.com', 'Y', 'Y', '0.00'),
(3, 'Tommy', 'Manuel ', 'Saunders', 'St. Phillip', '2007-01-12', 'Form 3', '1', '1 246-522-0542', 'YorknewY@hotmail.com', 'N', 'Y', '0.00'),
(4, 'Chris', 'Horace', 'Buchanan', 'St. John', '2008-01-21', 'Form 4', '2', '1 246-521-7155', 'maryjaMe@gmail.com', 'Y', 'Y', '0.00'),
(5, 'Sammy', 'Austin ', 'Reeves', 'St. Joseph', '2009-05-30', 'Form 3', '4', '1 246-249-2272', 'patricia.Reeves@gmail.com', 'Y', 'N', '0.00'),
(6, 'Eden', 'Gerald', 'Gayle', 'St. James', '2009-07-19', 'Form 3', '1', '1 246-446-0950', 'justIn.JJ@hotmail.com', 'Y', 'N', '0.00'),
(7, 'Tiffany', 'Diane', 'Ross', 'St. Lucy', '2011-12-22', 'Form 1', '2', '1 246-454-1169', 'veles9994@gmail.com', 'Y', 'Y', '0.00'),
(8, 'Chris', 'Gerald', 'Ross', 'St. Lucy', '2011-12-22', 'Form 1', '2', '1 246-454-1169', 'veles9994@gmail.com', 'Y', 'Y', '0.00'),
(9, 'Liza', 'Della ', 'Torres', 'Christ Church', '2013-01-23', 'J3', '3', '1 246-452-6243', 'akroutaz@gmail.com', 'Y', 'N', '0.00'),
(10, 'Ellen', 'Camille ', 'Bennett', 'St. James', '2013-09-14', 'J3', '2', '1 246-521-4562', 'devinatte@hotmail.com', 'N', 'Y', '100.00'),
(11, 'Charlotte', 'Jaime ', 'Ramirez', 'St. John', '2014-10-10', 'J2', '4', '1 246-363-3410', 'ercolegacam@outlook.com', 'Y', 'Y', '0.00'),
(12, 'Margaret', 'Rosie ', 'Fleming', 'St. Thomas', '2015-03-03', 'J1', '3', '1 246-354-1916', 'ashrak@gmail.com', 'Y', 'N', '0.00'),
(13, 'Maunel', 'Gayle', 'Austin', 'St. Phillip', '2015-08-28', 'J1', '4', '1 246-522-0113', 'yulyakale@hotmail.com', 'Y', 'Y', '0.00'),
(14, 'Lois', 'Catherine ', 'Salazar', 'St. Peter', '2016-10-11', 'Infants B', '1', '1 246-446-4033', 'jjenerette01@gmail.com', 'Y', 'Y', '0.00'),
(15, 'Alexa', 'Jessica ', 'Sherman', 'St. James', '2016-06-28', 'Infants B', '1', '1 246-696-5888', 'kbrok.dbz@outlook.com', 'Y', 'N', '0.00'),
(16, 'Kimberley', 'Cynthia ', 'Sandoval', 'St. Andrew', '2017-02-13', 'Infants A', '2', '1 246-247-9595', 'genien@hotmail.com', 'Y', 'Y', '0.00'),
(17, 'Max', 'Rodney ', 'Hart', 'St. Peter', '2017-12-07', 'Infants A', '3', '1 246-361-7231', 'winrs@gmail.com', 'Y', 'Y', '78.00'),
(18, 'Lois', 'Melissa ', 'Edwards', 'St. George', '2018-06-21', 'Reception', '1', '1 246-695-5970', 'jack93@outlook.com', 'Y', 'Y', '0.00'),
(19, 'Carole ', 'Ruiz', 'Simpson', 'St. Michael', '2018-09-23', 'Reception', '2', '1 246-446-9168', 'zimuskha@gmail.com', 'Y', 'Y', '0.00'),
(20, 'Tommy', 'Todd', 'Torres', 'Christ Church', '2018-12-08', 'Reception', '1', '1 246-452-6243', 'akroutaz@gmail.com', 'Y', 'Y', '0.00'),
(21, 'Alexa', 'Patricia ', 'Patterson', 'St. Phillip', '2019-06-12', 'Preschool', '4', '1 246-360-2890', 'mossi81@hotmail.com', 'Y', 'Y', '0.00'),
(22, 'Jack', 'Jason', 'Sparrow', 'St. Lucy', '2003-12-12', 'Form 2', '3', '1 246-142-7818', 'jackNjill@gmail.com', 'N', 'Y', '0.00'),
(23, 'Macy', 'Lucy', 'Madison', 'St. Joseph', '1999-11-02', 'Infants A', '1', '1 246-124-9830', 'sads@outlook.com', 'Y', 'N', '25.00'),
(24, 'John', '', 'Doe', 'St. Peter', '2016-07-28', 'Form 5', '3', '1 246-452-9826', 'MyGmailEmai@gmail.com', 'Y', 'Y', '30.00'),
(25, 'Lois', 'Mary', 'Paul', 'St. John', '2019-06-19', 'Preschool', '4', '1 246-167-9821', 'TheEmail@gmail.com', 'N', 'N', '0.00'),
(26, 'Jaskson', 'Jones', 'Johnson', 'St. James', '2016-05-27', 'J3', '4', '1 246-245-9815', 'tiredJack@gmail.com', 'Y', 'Y', '10.00'),
(27, 'Hina', 'Alicia', 'Isabelle', 'St. Michael', '2019-12-25', 'Preschool', '2', '1 246-213-8763', 'isabelleee@outlook.com', 'Y', 'Y', '13.07'),
(28, 'Peter', '', 'Parker', 'Christ Church', '2015-01-29', 'Form 3', '3', '1 246-426-9821', 'Spidey@gmail.com', 'Y', 'N', '50.00');

-- --------------------------------------------------------

--
-- Table structure for table `textbook`
--

DROP TABLE IF EXISTS `textbook`;
CREATE TABLE IF NOT EXISTS `textbook` (
  `ISBN` varchar(20) NOT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Author` varchar(20) DEFAULT NULL,
  `Edition` int(11) DEFAULT NULL,
  `PublicationYear` int(4) DEFAULT NULL,
  `Subject` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `textbook`
--

INSERT INTO `textbook` (`ISBN`, `Title`, `Author`, `Edition`, `PublicationYear`, `Subject`) VALUES
('112-8-58-086925-6', 'The Blighted Wolf', 'Joseph Powell', 1, 2006, 'Management\r'),
('128-2-4-8214658-6', 'Count With Me', 'Dorothy Roberts', 2, 2007, 'Mathematics\r'),
('150-3-07-830690-6', '2132: Grace', 'Jolynn Lilley', 2, 2007, 'Religious\r'),
('259-2-34-593538-5', 'Economics CXC', 'Nakita Fair', 1, 2006, 'Economics\r'),
('328-7-51-657382-0', 'Numbers 101', 'Lea Travers', 3, 2008, 'Mathematics\r'),
('380-7-28-850707-0', 'On The Beach', 'John Foster', 5, 2010, 'Reading\r'),
('404-5-64-427290-8', 'Mathematics CXC', 'Racheal Hudgens', 3, 2008, 'Mathematics\r'),
('533-2-77-104577-7', 'Cage the Mirage', 'Kieth Jose', 2, 2007, 'English\r'),
('546-9-05-840054-6', 'English CXC', 'Benita Mcmullen', 1, 2006, 'English\r'),
('547-1-12-239919-3', 'Read With Me', 'Dorothy Roberts', 2, 2007, 'Grammar\r'),
('679-6-91-962444-7', 'Fire and Flame', 'Nubia Van', 2, 2007, 'Chemistry\r'),
('795-7-16-780849-8', 'Learn With Me', 'Barbara Rogers', 1, 2006, 'Grammar\r');

-- --------------------------------------------------------

--
-- Table structure for table `textbookinventory`
--

DROP TABLE IF EXISTS `textbookinventory`;
CREATE TABLE IF NOT EXISTS `textbookinventory` (
  `CopyCode` int(11) NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  `DateAdded` date DEFAULT NULL,
  `studid` int(11) DEFAULT NULL,
  `InInventory` char(1) DEFAULT NULL,
  PRIMARY KEY (`CopyCode`,`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `textbookinventory`
--

INSERT INTO `textbookinventory` (`CopyCode`, `ISBN`, `DateAdded`, `studid`, `InInventory`) VALUES
(1, '112-8-58-086925-6', '2013-02-21', NULL, 'Y'),
(1, '128-2-4-8214658-6', '2013-01-24', 1016, 'N'),
(1, '150-3-07-830690-6', '2011-05-21', 1006, 'N'),
(1, '259-2-34-593538-5', '2014-04-21', NULL, 'N'),
(1, '328-7-51-657382-0', '2012-04-28', 1011, 'N'),
(1, '380-7-28-850707-0', '2011-06-13', 1014, 'N'),
(1, '404-5-64-427290-8', '2014-03-14', 1003, 'N'),
(1, '533-2-77-104577-7', '2011-07-07', NULL, 'N'),
(1, '546-9-05-840054-6', '2014-05-02', NULL, 'N'),
(1, '547-1-12-239919-3', '2012-02-21', 1019, 'N'),
(1, '679-6-91-962444-7', '2013-12-11', 1004, 'N'),
(1, '795-7-16-780849-8', '2013-09-09', 1020, 'N'),
(2, '112-8-58-086925-6', '2013-02-22', 1000, 'N'),
(2, '150-3-07-830690-6', '2011-05-22', 1007, 'N'),
(2, '259-2-34-593538-5', '2014-04-22', 1003, 'N'),
(2, '328-7-51-657382-0', '2012-04-29', 1009, 'N'),
(2, '380-7-28-850707-0', '2011-06-14', 1013, 'N'),
(2, '404-5-64-427290-8', '2014-03-15', 1001, 'N'),
(2, '679-6-91-962444-7', '2013-12-12', 1005, 'N'),
(2, '795-7-16-780849-8', '2013-09-10', NULL, 'Y'),
(3, '150-3-07-830690-6', '2011-05-23', NULL, 'Y'),
(3, '328-7-51-657382-0', '2012-04-30', 1008, 'N'),
(3, '380-7-28-850707-0', '2012-12-11', 1016, 'N'),
(3, '404-5-64-427290-8', '2015-06-12', NULL, 'Y'),
(4, '328-7-51-657382-0', '2012-08-18', 1010, 'N'),
(4, '404-5-64-427290-8', '2015-06-13', NULL, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `textbooklendinglog`
--

DROP TABLE IF EXISTS `textbooklendinglog`;
CREATE TABLE IF NOT EXISTS `textbooklendinglog` (
  `CopyCode` int(11) NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  `studid` int(11) DEFAULT NULL,
  `DateIssued` date NOT NULL,
  `IssuedCondition` char(1) DEFAULT NULL,
  `DateReturned` date DEFAULT NULL,
  `ReturnedCondition` char(1) DEFAULT NULL,
  `Comment` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`CopyCode`,`ISBN`,`DateIssued`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `textbooklendinglog`
--

INSERT INTO `textbooklendinglog` (`CopyCode`, `ISBN`, `studid`, `DateIssued`, `IssuedCondition`, `DateReturned`, `ReturnedCondition`, `Comment`) VALUES
(1, '112-8-58-086925-6', 1001, '2021-09-17', 'A', '2022-05-12', 'C', '\r'),
(1, '128-2-4-8214658-6', 1016, '2022-09-11', 'A', NULL, NULL, '\r'),
(1, '150-3-07-830690-6', 1004, '2020-09-03', 'A', NULL, NULL, '\r'),
(1, '150-3-07-830690-6', 1005, '2021-09-01', 'A', '2022-05-02', 'C', '\r'),
(1, '150-3-07-830690-6', 1006, '2022-09-06', 'C', NULL, NULL, '\r'),
(1, '259-2-34-593538-5', 1001, '2021-09-03', 'A', '2022-05-12', 'D', '\r'),
(1, '328-7-51-657382-0', 1008, '2021-09-02', 'A', '2022-05-05', 'C', '\r'),
(1, '328-7-51-657382-0', 1011, '2022-09-13', 'C', NULL, NULL, '\r'),
(1, '328-7-51-657382-0', 1007, '2022-09-14', 'A', '2021-05-16', 'A', '\r'),
(1, '380-7-28-850707-0', 1012, '2020-09-01', 'A', '2021-05-17', 'A', '\r'),
(1, '380-7-28-850707-0', 1014, '2021-09-07', 'A', NULL, NULL, '\r'),
(1, '404-5-64-427290-8', 1000, '2021-09-22', 'A', '2022-05-21', 'C', '\r'),
(1, '404-5-64-427290-8', 1003, '2022-09-01', 'C', NULL, NULL, '\r'),
(1, '533-2-77-104577-7', 1004, '2021-09-12', 'A', '2022-05-17', 'D', '\r'),
(1, '546-9-05-840054-6', 1001, '2021-09-28', 'A', NULL, NULL, '\r'),
(1, '547-1-12-239919-3', 1013, '2020-09-01', 'A', '2021-05-21', 'B', '\r'),
(1, '547-1-12-239919-3', 1015, '2021-09-01', 'B', '2022-09-05', 'B', '\r'),
(1, '547-1-12-239919-3', 1019, '2022-09-01', 'B', NULL, NULL, '\r'),
(1, '679-6-91-962444-7', 1001, '2020-09-18', 'A', '2021-05-12', 'B', '\r'),
(1, '679-6-91-962444-7', 1003, '2021-09-11', 'B', '2022-05-07', 'C', '\r'),
(1, '679-6-91-962444-7', 1004, '2022-09-17', 'C', NULL, NULL, '\r'),
(1, '795-7-16-780849-8', 1016, '2020-09-01', 'A', '2021-05-21', 'C', '\r'),
(1, '795-7-16-780849-8', 1017, '2021-09-01', 'C', '2022-05-21', 'C', '\r'),
(1, '795-7-16-780849-8', 1020, '2022-09-01', 'C', NULL, NULL, '\r'),
(2, '112-8-58-086925-6', 1000, '2021-09-01', 'A', '2022-05-12', 'D', '\r'),
(2, '150-3-07-830690-6', 1007, '2021-09-02', 'A', '2022-05-21', 'A', '\r'),
(2, '150-3-07-830690-6', 1007, '2022-09-03', 'A', NULL, NULL, '\r'),
(2, '259-2-34-593538-5', 1003, '2022-09-18', 'A', NULL, NULL, '\r'),
(2, '328-7-51-657382-0', 1009, '2021-09-11', 'A', NULL, NULL, '\r'),
(2, '380-7-28-850707-0', 1012, '2021-09-14', 'A', '2022-05-03', 'A', '\r'),
(2, '380-7-28-850707-0', 1013, '2022-09-01', 'A', NULL, NULL, '\r'),
(2, '404-5-64-427290-8', 1001, '2022-09-04', 'A', NULL, NULL, '\r'),
(2, '679-6-91-962444-7', 1005, '2022-09-13', 'A', NULL, NULL, '\r'),
(2, '795-7-16-780849-8', 1015, '2021-09-01', 'A', '2022-05-21', 'B', '\r'),
(3, '150-3-07-830690-6', 1004, '2021-09-26', 'A', '2022-05-26', 'B', '\r'),
(3, '328-7-51-657382-0', 1010, '2021-09-01', 'A', '2022-05-01', 'A', '\r'),
(3, '328-7-51-657382-0', 1008, '2022-09-12', 'A', NULL, NULL, '\r'),
(3, '380-7-28-850707-0', 1016, '2022-09-01', 'A', NULL, NULL, '\r'),
(4, '328-7-51-657382-0', 1010, '2022-09-01', 'A', NULL, NULL, '\r');

-- --------------------------------------------------------

--
-- Table structure for table `textbooklist`
--

DROP TABLE IF EXISTS `textbooklist`;
CREATE TABLE IF NOT EXISTS `textbooklist` (
  `ClassLevel` varchar(15) NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  PRIMARY KEY (`ClassLevel`,`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `textbooklist`
--

INSERT INTO `textbooklist` (`ClassLevel`, `ISBN`) VALUES
('Form 1', '150-3-07-830690-6'),
('Form 1', '533-2-77-104577-7'),
('Form 2', '150-3-07-830690-6'),
('Form 2', '533-2-77-104577-7'),
('Form 3', '112-8-58-086925-6'),
('Form 3', '679-6-91-962444-7'),
('Form 4', '112-8-58-086925-6'),
('Form 4', '259-2-34-593538-5'),
('Form 4', '404-5-64-427290-8'),
('Form 4', '546-9-05-840054-6'),
('Form 5', '259-2-34-593538-5'),
('Form 5', '404-5-64-427290-8'),
('Form 5', '546-9-05-840054-6'),
('Infants A', '128-2-4-8214658-6'),
('Infants A', '380-7-28-850707-0'),
('Infants B', '128-2-4-8214658-6'),
('Infants B', '380-7-28-850707-0'),
('J1', '328-7-51-657382-0'),
('J2', '328-7-51-657382-0'),
('J3', '328-7-51-657382-0'),
('J4', '328-7-51-657382-0'),
('Preschool', '795-7-16-780849-8'),
('Reception', '547-1-12-239919-3'),
('Reception', '795-7-16-780849-8');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
