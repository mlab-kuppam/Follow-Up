-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2016 at 11:11 AM
-- Server version: 5.6.24-log
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `trialdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow_up_data`
--

CREATE TABLE IF NOT EXISTS `follow_up_data` (
  `child_id` varchar(20) NOT NULL,
  `o_name` varchar(10) NOT NULL,
  `disease_name` varchar(100) NOT NULL,
  `complaint` text NOT NULL,
  `observation` int(11) NOT NULL,
  `comment` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow_up_data`
--

INSERT INTO `follow_up_data` (`child_id`, `o_name`, `disease_name`, `complaint`, `observation`, `comment`, `timestamp`) VALUES
('20102003001', 'ent', 'CSOM - Left Ear', '', 0, '', '2016-07-13 08:29:35'),
('20102003001', 'oral', 'Dental Caries', '', 0, 'filling done', '2016-07-13 08:29:35'),
('20102003001', 'skin', 'Xerosis', 'slight itching still present', 2, 'treatment completed', '2016-07-13 08:29:35'),
('20102003011', 'oral', 'Dental Caries', '', 0, '', '2016-07-13 08:29:35'),
('20102003011', 'skin', 'Pityriasis Alba', '', 0, '', '2016-07-13 08:29:35'),
('20102003052', 'ent', 'URTI', '', 0, '', '2016-07-13 08:29:35'),
('20102003052', 'oral', 'Spacing', '', 0, '', '2016-07-13 08:29:35'),
('20102003052', 'skin', 'Xerosis', '', 1, '', '2016-07-13 08:29:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow_up_data`
--
ALTER TABLE `follow_up_data`
  ADD PRIMARY KEY (`child_id`,`o_name`,`disease_name`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follow_up_data`
--
ALTER TABLE `follow_up_data`
ADD CONSTRAINT `fk2` FOREIGN KEY (`child_id`) REFERENCES `child` (`child_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
