<?php
// Include the connection file
include(__DIR__ . "/crud/connection.php");

// Fetch appointment data including 'email' and 'snp_file_path' from the database
$query = "SELECT id, name, dob, email, status, snp_file_path FROM form";
$result = mysqli_query($conn, $query);
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
      <a href="crud/form.php" class="btn-register">New Registration</a>
    </div>

    <div class="stats">
      <!-- Stats will go here -->
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
        while ($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $row['name'] . "</td>";
            echo "<td>" . $row['dob'] . "</td>";

            // Status display
            $status = $row['status'] ? $row['status'] : 'pending';
            echo "<td><span class='status status-" . strtolower($status) . "'>" . ucfirst($status) . "</span></td>";

            // View form link
            echo "<td><a href='view_form.php?id=" . $row['id'] . "'>View Form</a></td>";

            $email = isset($row['email']) ? $row['email'] : 'no-email@example.com';

            // Actions based on status
            if ($status == 'pending') {
                echo "<td>
                        <a href='update_status.php?id=" . $row['id'] . "&status=successful&email=" . urlencode($email) . "' class='btn-success'>Successful</a> 
                        <a href='update_status.php?id=" . $row['id'] . "&status=cancelled&email=" . urlencode($email) . "' class='btn-cancel'>Cancel</a>
                      </td>";
            } elseif ($status == 'successful') {
                echo "<td><span class='status status-successful'>Successful</span></td>";
            } elseif ($status == 'cancelled') {
                echo "<td><span class='status status-cancelled'>Cancelled</span></td>";
            }

            // SNP file button or download link
            if (!empty($row['snp_file_path'])) {
                // Show a download link if the file is available
                echo "<td><a href='" . $row['snp_file_path'] . "' class='btn-snp'>Download SNP File</a></td>";
            } else {
                // Show the upload SNP file link if the file is not available
                echo "<td><a href='SNP/sendSNP.html?id=" . $row['id'] . "' class='btn-snp'>Upload SNP File</a></td>";
            }

            echo "</tr>";
        }
        ?>
      </tbody>
    </table>
  </div>
</body>
</html>
