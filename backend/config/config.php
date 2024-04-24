<?php
require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$db_host = $_ENV['DB_HOST'];
$db_username = $_ENV['DB_USER'];
$db_password = $_ENV['DB_PASS'];
$db_name = $_ENV['DB_NAME'];