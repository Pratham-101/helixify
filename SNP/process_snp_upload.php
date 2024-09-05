<?php
// Include database connection
include(__DIR__ . "/crud/connection.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the patient ID from the form
    $patient_id = $_POST['patient_id'];

    // Check if the file was uploaded without any error
    if (isset($_FILES['snp_file']) && $_FILES['snp_file']['error'] == 0) {
        // Define allowed file types (csv, tsv, txt, vcf)
        $allowed_types = array('text/plain', 'text/csv', 'application/vnd.ms-excel');

        // Get the file information
        $file_name = $_FILES['snp_file']['name'];
        $file_tmp = $_FILES['snp_file']['tmp_name'];
        $file_type = $_FILES['snp_file']['type'];

        // Check if the file type is allowed
        if (in_array($file_type, $allowed_types)) {
            // Define the upload directory
            $upload_dir = 'uploads/snp_files/';
            $file_path = $upload_dir . basename($file_name);

            // Move the file to the uploads directory
            if (move_uploaded_file($file_tmp, $file_path)) {
                echo "File successfully uploaded to: " . $file_path . "<br>"; // Add this line for debugging

                // Update the database with the file path
                $query = "UPDATE form SET snp_file_path = '$file_path' WHERE id = $patient_id";
                $result = mysqli_query($conn, $query);

                if ($result) {
                    echo "File path saved in the database.";
                } else {
                    echo "Failed to update the database: " . mysqli_error($conn);
                }
                
            } else {
                echo "Failed to move the file to the server.<br>";
            }
        } else {
            echo "Invalid file type. Only CSV, TSV, TXT, and VCF files are allowed.<br>";
        }
    } else {
        echo "No file was uploaded or there was an error.<br>";
    }
}
?>
