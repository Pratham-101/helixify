<?php
// Include the connection file
include("C:/Users/PRATHAM CHINTRATE/OneDrive/Documents/zamp/htdocs/helixify/client/src/components/crud/connection.php");

// Ensure the connection is established
if (!isset($conn)) {
    die("Database connection not established.");
}

// Query to fetch the appointment data from the 'form' table
$query = "SELECT id, name, phone_number, email, preferred_time, status FROM form";
$appointment_result = mysqli_query($conn, $query);

// Check if the query was successful
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
  <style>
    .btn-snp {
      background-color: #4CAF50;
      color: white;
      padding: 6px 12px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      margin: 2px 2px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
    }
    .btn-success, .btn-cancel {
      background-color: #4CAF50; /* Change as per design */
      color: white;
      padding: 6px 12px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      margin: 2px 2px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
    }
    .btn-cancel {
      background-color: #f44336; /* Red for cancel */
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo animated-logo">Helixify</div>
    </header>
    <h1>Welcome, Admin</h1>
    <p class="subtitle">Start your day by managing new appointments</p>

    <div class="new-registration">
      <a href="http://localhost/helixify/client/src/components/crud/form.php" class="btn-register">New Registration</a>
    </div>

    <table>
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Phone Number</th>
          <th>Preferred Time</th>
          <th>Status</th>
          <th>Form</th>
          <th>Actions</th>
          <th>SNP</th>
        </tr>
      </thead>
      <tbody>
        <?php
        // Loop through each row in the fetched data and display it in the table
        while ($row = mysqli_fetch_assoc($appointment_result)) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($row['name']) . "</td>";
            echo "<td>" . htmlspecialchars($row['phone_number']) . "</td>";
            echo "<td>" . htmlspecialchars($row['preferred_time']) . "</td>";

            // Status handling
            $status = strtolower($row['status']) ? $row['status'] : 'pending';
            echo "<td><span class='status status-" . htmlspecialchars($status) . "'>" . ucfirst($status) . "</span></td>";

            // View form link
            echo "<td><a href='view_form.php?id=" . $row['id'] . "'>View Form</a></td>";

            // Check if the status is pending, if so, provide the options to update the status
            if ($status == 'pending') {
                echo "<td>
                        <a href='update_status.php?id=" . $row['id'] . "&status=successful&email=" . urlencode($row['email']) . "' class='btn-success'>Mark Successful</a>
                        <a href='update_status.php?id=" . $row['id'] . "&status=cancelled&email=" . urlencode($row['email']) . "' class='btn-cancel'>Cancel</a>
                      </td>";
            } else {
                echo "<td><span class='status-" . htmlspecialchars($status) . "'>" . ucfirst($status) . "</span></td>";
            }

            // SNP button
// SNP button
echo "<td><a href='http://127.0.0.1:5000/?id=" . $row['id'] . "' class='btn-snp'>SNP</a></td>";

            echo "</tr>";
        }
        ?>
      </tbody>
    </table>
  </div>
</body>
</html>
