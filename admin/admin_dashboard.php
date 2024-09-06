<?php

// Correct path to the connection files
include(__DIR__ . "/../crud/connection.php");   // Adjusted path for appointment_form database connection
include(__DIR__ . "/../crud/snp_connection.php"); // Adjusted path for snp_storage database connection

// Fetch appointment data from the 'appointment_form' database
$query = "SELECT id, name, dob, email, status FROM form";
$appointment_result = mysqli_query($conn, $query); // Use $conn for appointment database

if (!$appointment_result) {
    die("Query failed: " . mysqli_error($conn));
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="adminDashboard_styles.css">
</head>
<body>
  <div class="container">
    <header>
      <div class="logo animated-logo">Helixify</div>
    </header>
    <h1>Welcome, Admin</h1>
    <p class="subtitle">Start your day by managing new appointments</p>

    <!-- New Registration Button -->
    <div class="new-registration">
      <a href="http://localhost/crud/form.php" class="btn-register">New Registration</a>
    </div>

    <table>
      <thead>
        <tr>
          <th>Patient</th>
          <th>Date of Birth</th>
          <th>Status</th>
          <th>Form</th>
          <th>Actions</th>
          <th>SNP File</th>
        </tr>
      </thead>
      <tbody>
        <?php
        // Loop through each patient record and display in a table row
        while ($row = mysqli_fetch_assoc($appointment_result)) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($row['name']) . "</td>";
            echo "<td>" . htmlspecialchars($row['dob']) . "</td>";

            // Display status with appropriate color
            $status = strtolower($row['status']) ? $row['status'] : 'pending';
            echo "<td><span class='status status-" . htmlspecialchars($status) . "'>" . ucfirst($status) . "</span></td>";

            // Link to view the form for the patient
            echo "<td><a href='view_form.php?id=" . $row['id'] . "'>View Form</a></td>";

            // Actions based on status
            $email = isset($row['email']) ? htmlspecialchars($row['email']) : 'no-email@example.com';
            if ($status == 'pending') {
                echo "<td>
                        <a href='update_status.php?id=" . $row['id'] . "&status=successful&email=" . urlencode($email) . "' class='btn-success'>Mark Successful</a> 
                        <a href='update_status.php?id=" . $row['id'] . "&status=cancelled&email=" . urlencode($email) . "' class='btn-cancel'>Cancel</a>
                      </td>";
            } elseif ($status == 'successful') {
                echo "<td><span class='status status-successful'>Successful</span></td>";
            } elseif ($status == 'cancelled') {
                echo "<td><span class='status status-cancelled'>Cancelled</span></td>";
            }

            // Query the SNP storage database for the patient's SNP files
            $patient_id = $row['id'];
            $snp_query = "SELECT file_path FROM snp_files WHERE patient_id = '$patient_id'";
            $snp_result = mysqli_query($snp_conn, $snp_query);
            $snp_file = mysqli_fetch_assoc($snp_result);

            // Display the SNP file or upload option
            if ($snp_file) {
                echo "<td><a href='" . htmlspecialchars($snp_file['file_path']) . "' class='btn-snp'>Download SNP File</a></td>";
            } else {
                echo "<td><a href='../SNP/sendSNP.php?id=" . $row['id'] . "' class='btn-snp'>Upload SNP File</a></td>";
            }

            echo "</tr>";
        }
        ?>
      </tbody>
    </table>
  </div>
</body>
</html>
