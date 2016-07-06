-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2016 at 09:17 PM
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
-- Table structure for table `report`
--

CREATE TABLE IF NOT EXISTS `report` (
  `t_name` varchar(100) DEFAULT NULL,
  `m_name` varchar(100) DEFAULT NULL,
  `c_name` varchar(100) DEFAULT NULL,
  `o_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`t_name`, `m_name`, `c_name`, `o_name`) VALUES
('skin', 'Scabies', 'sc', 'Skin'),
('skin', 'Pityriasis Alba', 'pi', 'Skin'),
('skin', 'Xerosis', 'xerosis', 'Skin'),
('skin', 'Phrynoderma', 'ph', 'Skin'),
('skin', 'Pediculosis', 'pe', 'Skin'),
('skin', 'Pityriasis Versicolor', 'pity', 'Skin'),
('skin', 'Impetigo', 'im', 'Skin'),
('skin', 'Papular Urticaria', 'pap', 'Skin'),
('skin', 'Tinea Cruris/corporis', 'tc', 'Skin'),
('skin', 'Miliaria', 'mi', 'Skin'),
('skin', 'Viral Warts', 'vi', 'Skin'),
('ent', 'Otitis Externa - Right Ear', 'oe_r', 'ENT'),
('ent', 'Otitis Externa - Left Ear', 'oe_l', 'ENT'),
('ent', 'ASOM - Right Ear', 'as_r', 'ENT'),
('ent', 'ASOM - Left Ear', 'as_l', 'ENT'),
('ent', 'CSOM - Right Ear', 'cs_r', 'ENT'),
('ent', 'CSOM - Left Ear', 'cs_l', 'ENT'),
('ent', 'Wax - Right Ear', 'iw_r', 'ENT'),
('ent', 'Wax Left', 'iw_l', 'ENT'),
('ent', 'Impaired Hearing - Right Ear', 'ih_r', 'ENT'),
('ent', 'Impaired Hearing Left', 'ih_l', 'ENT'),
('ent', 'H/O Epistaxis', 'ep', 'ENT'),
('ent', 'Adenotonsilitis', 'ad', 'ENT'),
('ent', 'Pharyngitis', 'ph', 'ENT'),
('ent', 'Allergic Rhinitis', 'ar', 'ENT'),
('ent', 'Speech Defects', 'sd', 'ENT'),
('ent', 'URTI', 'urti', 'ENT'),
('ent', 'Cleft Lip', 'cleft', 'ENT'),
('eye', 'Colour Vision - Right Eye', 'cv_r', 'Eye'),
('eye', 'Colour Vision - Left Eye', 'cv_l', 'Eye'),
('eye', 'Bitots spots - Right Eye', 'bs_r', 'Eye'),
('eye', 'Bitots spots - Left Eye', 'bs_l', 'Eye'),
('eye', 'Allergic Conjunctivitis - Right Eye', 'ac_r', 'Eye'),
('eye', 'Allergic Conjunctivitis - Left Eye', 'ac_l', 'Eye'),
('eye', 'Night Blindness', 'nb', 'Eye'),
('eye', 'Congenital ptosis - Right Eye', 'cp_r', 'Eye'),
('eye', 'Congenital ptosis - Left Eye', 'cp_l', 'Eye'),
('eye', 'Congenital developmental cararact - Right Eye', 'cdc_r', 'Eye'),
('eye', 'Congenital developmental cararact - Left Eye', 'cdc_l', 'Eye'),
('eye', 'Amblyopia - Right Eye', 'am_r', 'Eye'),
('eye', 'Amblyopia - Left Eye', 'am_l', 'Eye'),
('eye', 'Nystagmus - Right Eye', 'ny_r', 'Eye'),
('eye', 'Nystagmus - Left Eye', 'ny_l', 'Eye'),
('eye', 'Fundus examination - Right Eye', 'fe_r', 'Eye'),
('eye', 'Fundus examination - Left Eye', 'fe_l', 'Eye'),
('health1', 'Clinical Anaemia', 'ca', 'General'),
('health1', 'Frequency of Skipping Food', 'frequencyFood', 'General'),
('health1', 'Having Overnight Food in the Morning', 'over_night_food', 'General'),
('health1', 'Both Parents Working', 'both_parents', 'General'),
('health1', 'Height', 'height', 'General'),
('health1', 'Weight', 'weight', 'General'),
('health1', 'Waist Circumference', 'wc', 'General'),
('health1', 'Hip Circumference', 'hc', 'General'),
('health1', 'Pulse Rate', 'pr', 'General'),
('health1', 'Blood Pressure', 'bp', 'General'),
('health1', 'Personale Hygiene Nails', 'ph_n', 'General'),
('health1', 'Personale Hygiene Bathing', 'ph_b', 'General'),
('health1', 'Personale Hygiene Grooming', 'ph_g', 'General'),
('health1', 'Personale Hygiene Regular Brushing', 'ph_oc', 'General'),
('health1', 'Personale Hygiene Age of Menarche', 'ph_am', 'General'),
('health1', 'Dental Caries', 'oe_dc', 'Oral'),
('health1', 'Fluorosis', 'oe_f', 'Oral'),
('health1', 'Gingivitis', 'oe_g', 'Oral'),
('health1', 'Oral Ulcers', 'oe_ou', 'Oral'),
('health1', 'Trauma of Tooth', 'oe_trauma', 'Oral'),
('health1', 'Spacing', 'oe_spacing', 'Oral'),
('health1', 'corwding', 'oe_crowding', 'Oral'),
('health1', 'Chronic Cough', 'rs_chronic', 'General'),
('health1', 'Brochial Asthma', 'rs_bronchial', 'General'),
('health1', 'Adventitous Sounds', 'rs_sounds', 'General'),
('health1', 'Abnormal Heart Sounds', 'cvs_ahs', 'General'),
('health2', 'H/O gastro-enteritis in Last 6 Months', 'gs_ag', 'General'),
('health2', 'H/O Worm Infestation in Last 6 Months', 'gs_wi', 'General'),
('health2', 'Deformities', 'ms_d', 'General'),
('health2', 'H/O Seizures', 'ns_s', 'General'),
('health2', 'ADHD', 'bp_adhd', 'General'),
('health2', 'UTI', 'gus_uti', 'General'),
('health2', 'Bedwetting', 'gus_bed', 'General'),
('health2', 'Vitamin C Deficiency', 'vt_c', 'General'),
('health2', 'Vitamin B Complex Deficiency', 'vt_b', 'General');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
