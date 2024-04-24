<?php
require_once 'functions.php';

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = $_POST;
        registerUser($data);
        echo "<script>alert('Form submitted successfully!');</script>";
        exit;
    }
} catch (Exception $e) {
    error_log($e->getMessage(), 3, "error_log.txt");
    $error_message = "An error occurred while processing your form. Please try again later.";
    echo "<script>alert('An error occurred while processing your form. Please try again later.');</script>";
}
?>
