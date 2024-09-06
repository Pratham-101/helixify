<?php
// Include connection
include(__DIR__ . "/../crud/connection.php");

// Get the appointment ID from the URL parameter
$appointmentId = $_GET['id'] ?? 0;

// Fetch all details from the form table for the given appointment ID
$query = "SELECT * FROM form WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "i", $appointmentId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

// Check if a row was returned and display the details
if ($row = mysqli_fetch_assoc($result)) {
    echo "<h2>Appointment Details</h2>";
    
    // Display each field from the form table
    echo "<p><strong>Name:</strong> " . $row['name'] . "</p>";
    echo "<p><strong>Email:</strong> " . $row['email'] . "</p>";
    echo "<p><strong>Phone Number:</strong> " . $row['phone_number'] . "</p>";
    echo "<p><strong>Date of Birth:</strong> " . $row['dob'] . "</p>";
    echo "<p><strong>Gender:</strong> " . $row['gender'] . "</p>";
    echo "<p><strong>Allergies:</strong> " . $row['allergies'] . "</p>";
    echo "<p><strong>Current Medication:</strong> " . $row['current_medication'] . "</p>";
    echo "<p><strong>Family History:</strong> " . $row['family_history'] . "</p>";
    echo "<p><strong>Past History:</strong> " . $row['past_history'] . "</p>";
    echo "<p><strong>Address:</strong> " . $row['address'] . "</p>";
    echo "<p><strong>Occupation:</strong> " . $row['occupation'] . "</p>";
    echo "<p><strong>Emergency Contact Name:</strong> " . $row['emergency_contact_name'] . "</p>";
    echo "<p><strong>Emergency Contact Phone:</strong> " . $row['emergency_contact_phone'] . "</p>";
    echo "<p><strong>Status:</strong> " . $row['status'] . "</p>";
} else {
    echo "<p>No appointment found with ID: " . $appointmentId . "</p>";
}

// Close the prepared statement and the database connection
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
