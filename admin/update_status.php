<?php
// Include connection
include(__DIR__ . "/crud/connection.php");

// Check if id, status, and email are present in the URL parameters
if (isset($_GET['id']) && isset($_GET['status']) && isset($_GET['email'])) {
    $appointmentId = $_GET['id'];
    $newStatus = $_GET['status'];
    $patientEmail = urldecode($_GET['email']); // Decode email from URL

    // Update the status in the database
    $query = "UPDATE form SET status = ? WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "si", $newStatus, $appointmentId);

    if (mysqli_stmt_execute($stmt)) {
        // Redirect to send_email.html and pass email and status
        header("Location: send_email.html?email=" . urlencode($patientEmail) . "&status=" . urlencode($newStatus));
        exit();
    } else {
        echo "Error updating status: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
?>
