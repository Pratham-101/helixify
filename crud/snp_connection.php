<?php
$servername = "localhost";
$username = "root"; // Update with your MySQL username
$password = ""; // Update with your MySQL password
$dbname = "snp_storage"; // The name of your SNP storage database

// Create connection
$snp_conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$snp_conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
