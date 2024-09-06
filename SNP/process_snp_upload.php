<?php
include(__DIR__ . "/../crud/snp_connection.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the patient ID
    $patient_id = isset($_POST['patient_id']) ? $_POST['patient_id'] : 0;
    echo "Patient ID: " . $patient_id . "<br>";

    // Check if the file was uploaded without any error
    if (isset($_FILES['snp_file']) && $_FILES['snp_file']['error'] == 0) {
        echo "File was uploaded successfully!<br>";

        // Define allowed file types (csv, tsv, txt, vcf)
        $allowed_types = array('text/plain', 'text/csv', 'application/vnd.ms-excel');

        // Get the file information
        $file_name = $_FILES['snp_file']['name'];
        $file_tmp = $_FILES['snp_file']['tmp_name'];
        $file_type = $_FILES['snp_file']['type'];

        echo "File Name: $file_name<br>";
        echo "Temp File: $file_tmp<br>";
        echo "File Type: $file_type<br>";

        // Check if the file type is allowed
        if (in_array($file_type, $allowed_types)) {
            // Define the upload directory
            $upload_dir = '../uploads/snp_files/';  // Ensure this directory exists and is writable
            $file_path = $upload_dir . basename($file_name);

            // Move the file to the uploads directory
            if (move_uploaded_file($file_tmp, $file_path)) {
                echo "File moved to: $file_path<br>";
            } else {
                echo "Failed to move the file to the server.<br>";
                echo "Error code: " . $_FILES['snp_file']['error'] . "<br>";
            }
            
                // Insert the file path into the SNP storage table
                $query = "INSERT INTO snp_files (patient_id, file_path) VALUES ('$patient_id', '$file_path')";
                $result = mysqli_query($snp_conn, $query);

                if ($result) {
                    echo "File path saved in the SNP storage database.<br>";

                    // Send the file to Flask backend for predictions
                    $url = "http://localhost:5000/process_snp_upload";
                    $curl = curl_init();
                    curl_setopt($curl, CURLOPT_URL, $url);
                    curl_setopt($curl, CURLOPT_POST, true);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, [
                        'snp_file' => new CURLFile($file_path),
                    ]);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                    $response = curl_exec($curl);
                    curl_close($curl);

                    // Decode the response from the Flask backend
                    $predictions = json_decode($response, true);

                    // Handle errors or display predictions
                    if (isset($predictions['error'])) {
                        echo "Error: " . htmlspecialchars($predictions['error']);
                    } else {
                        echo "<h2>Predictions</h2>";
                        foreach ($predictions as $disease => $prediction) {
                            echo "<p><strong>" . htmlspecialchars($disease) . ":</strong> " . htmlspecialchars($prediction) . "</p>";
                        }
                    }
                } else {
                    echo "Failed to insert file details into the SNP storage database: " . mysqli_error($snp_conn) . "<br>";
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
