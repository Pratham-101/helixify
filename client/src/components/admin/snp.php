<?php
include("C:/Users/PRATHAM CHINTRATE/OneDrive/Documents/zamp/htdocs/helixify/client/src/components/crud/connection.php");

if (!isset($conn)) {
    die("Database connection not established.");
}

$patientId = $_GET['id'] ?? 0;

// Fetch patient details
$query = "SELECT name, phone_number FROM form WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "i", $patientId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$patient = mysqli_fetch_assoc($result);

if (!$patient) {
    die("Patient not found.");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SNP for <?php echo htmlspecialchars($patient['name']); ?></title>
    <link rel="stylesheet" href="adminDashboard_styles.css">
    <style>
        .upload-section {
            background-color: #e8f4fd;
            padding: 2rem;
            border-radius: 5px;
            margin-bottom: 2rem;
        }
        .file-input-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
        }
        .file-input-wrapper input[type=file] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
        }
        .file-input-wrapper .btn-file-input {
            background-color: #3498db;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: inline-block;
        }
        .generate-btn {
            background-color: #2ecc71;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .generate-btn:hover {
            background-color: #27ae60;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>SNP Analysis for Disease Prediction</h1>
        <div class="patient-info">
            <h2>Patient: <?php echo htmlspecialchars($patient['name']); ?></h2>
            <p>Phone: <?php echo htmlspecialchars($patient['phone_number']); ?></p>
        </div>
        <div class="upload-section">
            <h2>Upload CSV File for Disease Prediction</h2>
            <form action="http://localhost:5000/upload" method="post" enctype="multipart/form-data">
                <input type="hidden" name="patient_id" value="<?php echo $patientId; ?>">
                <div class="file-input-wrapper">
                    <button class="btn-file-input">Choose File</button>
                    <input type="file" name="file" accept=".csv" required>
                </div>
                <p id="file-name">No file chosen</p>
                <button type="submit" class="generate-btn">Generate Report</button>
            </form>
        </div>
    </div>

    <script>
        document.querySelector('input[type="file"]').addEventListener('change', function(e) {
            var fileName = e.target.files[0].name;
            document.getElementById('file-name').textContent = fileName;
        });
    </script>
</body>
</html>
