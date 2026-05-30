<?php
$servername = "localhost";
$username = "root";
$password = ""; // Thường mặc định là để trống trong XAMPP
$dbname = "webcobank24";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>