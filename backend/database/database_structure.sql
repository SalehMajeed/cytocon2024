DROP DATABASE IF EXISTS REGISTER_FORM;

CREATE DATABASE REGISTER_FORM;

USE REGISTER_FORM;

DROP TABLE IF EXISTS `registrations`;

CREATE TABLE `registrations` (
  `id` int NOT NULL DEFAULT (uuid()),
  `title` varchar(10) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact_number` int NOT NULL,
  `medical_registration_number` int NOT NULL,
  `medical_board` varchar(20) NOT NULL,
  `designation` varchar(20) NOT NULL,
  `hospital_address` varchar(150) NOT NULL,
  `profession` varchar(20) NOT NULL,
  `physical_or_virtual` varchar(10) NOT NULL,
  UNIQUE KEY `contact_number` (`contact_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

