<?php
require_once 'database.php';

function registerUser($data)
{
    global $conn;

    $title = $data['title'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $email = $data['email'];
    $contactNumber = $data['countryCode'] . $data['contactNumber'];
    $medicalRegistrationNumber = $data['medicalRegistrationNumber'];
    $medicalBoard = $data['medicalBoard'];
    $designation = $data['designation'];
    $hospitalInstituteClinicName = $data['hospitalInstituteClinicName'];
    $profession = $data['profession'];
    $physicalOrVirtual = $data['physicalOrVirtual'];

    $sql = "INSERT INTO registrations (title, first_name, last_name, email, contact_number, medical_registration_number, medical_board, designation, hospital_address, profession, physical_or_virtual) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssss", $title, $firstName, $lastName, $email, $contactNumber, $medicalRegistrationNumber, $medicalBoard, $designation, $hospitalInstituteClinicName, $profession, $physicalOrVirtual);

    if (!$stmt->execute()) {
        throw new Exception("Error executing query: " . $stmt->error);
    }

    $stmt->close();
}
