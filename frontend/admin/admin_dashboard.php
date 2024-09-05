<?php
// Include the connection file
include(__DIR__ . "/crud/connection.php");

// Fetch appointment data including 'email' from the database
$query = "SELECT id, name, dob, email, status FROM form";
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
      <div class="logo">Helixify</div>
    </header>

    <h1>Welcome, Admin</h1>
    <p class="subtitle">Start your day by managing new appointments</p>

    <!-- New Registration Button -->
    <div class="new-registration">
      <a href="crud/form.php" class="btn-register">New Registration</a>
    </div>

    <div class="stats">
      <!-- Stats here -->
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

            // Show the status with color labels (successful, pending, or cancelled)
            $status = $row['status'] ? $row['status'] : 'pending'; // Default to pending if status is empty
            echo "<td><span class='status status-" . strtolower($status) . "'>" . ucfirst($status) . "</span></td>";

            // Provide the option to view the form
            echo "<td><a href='view_form.php?id=" . $row['id'] . "'>View Form</a></td>";

            // Fetch the patient's email from the database
            $email = isset($row['email']) ? $row['email'] : 'no-email@example.com';

            // Show action buttons only if status is pending
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

            // Add SNP File button
            echo "<td><a href='snp_file.php?id=" . $row['id'] . "' class='btn-snp'>SNP File</a></td>";
            echo "</tr>";
        }
        ?>
      </tbody>
    </table>
  </div>
</body>
</html>
