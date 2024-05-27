DROP DATABASE IF EXISTS cytocon;

CREATE DATABASE cytocon;

USE cytocon;

CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(10),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    countryCode VARCHAR(10),
    contactNumber VARCHAR(15),
    medicalRegistrationNumber VARCHAR(50),
    medicalBoard VARCHAR(50),
    designation VARCHAR(50),
    hospitalInstituteClinicName VARCHAR(255),
    profession VARCHAR(50),
    IACMemberNumber VARCHAR(50) DEFAULT NULL,
    appearanceMode VARCHAR(50),
    physicalConferenceType VARCHAR(50) DEFAULT NULL,
    physicalWorkshop VARCHAR(50) DEFAULT NULL,
    virtualConferenceType VARCHAR(50) DEFAULT NULL,
    accompanyingPerson INT,
    transactionId VARCHAR(36),
    payment DECIMAL(10, 2),
    paid BOOLEAN DEFAULT FALSE
);