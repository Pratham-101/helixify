<?php
include("C:/Users/PRATHAM CHINTRATE/OneDrive/Documents/zamp/htdocs/helixify/client/src/components/crud/connection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patientId = $_POST['patient_id'];
    
    // Check if file was uploaded without errors
    if (isset($_FILES["snp_file"]) && $_FILES["snp_file"]["error"] == 0) {
        $allowed = array("csv" => "text/csv");
        $filename = $_FILES["snp_file"]["name"];
        $filetype = $_FILES["snp_file"]["type"];
        $filesize = $_FILES["snp_file"]["size"];
    
        // Verify file extension
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if (!array_key_exists($ext, $allowed)) die("Error: Please select a valid file format.");
    
        // Verify file size - 5MB maximum
        $maxsize = 5 * 1024 * 1024;
        if ($filesize > $maxsize) die("Error: File size is larger than the allowed limit.");
    
        // Verify MIME type of the file
        if (in_array($filetype, $allowed)) {
            // Create upload directory if it doesn't exist
            $upload_dir = "../../uploads/";
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }

            $upload_file = $upload_dir . $filename;

            // Check whether file exists before uploading it
            if (file_exists($upload_file)) {
                echo $filename . " already exists.";
            } else {
                if (move_uploaded_file($_FILES["snp_file"]["tmp_name"], $upload_file)) {
                    echo "Your file was uploaded successfully.<br>";
                    
                    // Here you would process the CSV file and generate the report
                    // For now, we'll just simulate this with a message
                    echo "Generating report for patient ID: " . $patientId;

                    // TODO: Add your disease prediction logic here

                } else {
                    echo "Error: There was a problem uploading your file. Please try again.";
                }
            }
        } else {
            echo "Error: There was a problem uploading your file. Please try again."; 
        }
    } else {
        echo "Error: " . $_FILES["snp_file"]["error"];
    }
}
?>