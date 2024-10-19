<?php
include("C:/Users/PRATHAM CHINTRATE/OneDrive/Documents/zamp/htdocs/helixify/client/src/components/crud/connection.php");

$appointmentId = $_GET['id'] ?? 0;

$query = "SELECT * FROM form WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "i", $appointmentId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    echo "<h2>Appointment Details</h2>";
    
    echo "<p><strong>Name:</strong> " . $row['name'] . "</p>";
    echo "<p><strong>Email:</strong> " . $row['email'] . "</p>";
    echo "<p><strong>Phone Number:</strong> " . $row['phone_number'] . "</p>";
    echo "<p><strong>Date of Birth:</strong> " . $row['dob'] . "</p>";
    echo "<p><strong>Gender:</strong> " . $row['gender'] . "</p>";
    echo "<p><strong>Address:</strong> " . $row['address'] . "</p>";
    echo "<p><strong>Preferred Time:</strong> " . $row['preferred_time'] . "</p>";
    echo "<p><strong>Status:</strong> " . $row['status'] . "</p>";
} else {
    echo "<p>No appointment found with ID: " . $appointmentId . "</p>";
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>