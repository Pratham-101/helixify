<?php 
include("connection.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register'])) {
    $full_name   = $_POST['fname'];
    $email       = $_POST['email'];
    $phone       = $_POST['phone'];
    $dob         = $_POST['dob'];
    $gender      = $_POST['gender'];
    $allergies   = $_POST['allergies'];
    $current_medication = $_POST['currentmedication'];
    $family_history = $_POST['familymedicalhistory'];
    $past_history = $_POST['pastmedicalhistory'];
    $address     = $_POST['address'];
    $occupation  = $_POST['occupation'];
    $emergency_contact_name = $_POST['emergencycontact'];
    $emergency_contact_phone = $_POST['emergencyphone'];

    // Insert query with correct column names
    $query = "INSERT INTO form (name, email, phone_number, dob, gender, allergies, current_medication, family_history, past_history, address, occupation, emergency_contact_name, emergency_contact_phone) 
              VALUES ('$full_name', '$email', '$phone', '$dob', '$gender', '$allergies', '$current_medication', '$family_history', '$past_history', '$address', '$occupation', '$emergency_contact_name', '$emergency_contact_phone')";

    $data = mysqli_query($conn, $query);

    if ($data) {
        // Calculate age from dob
        $birthdate = new DateTime($dob);
        $today = new DateTime('today');
        $age = $birthdate->diff($today)->y;

        // Prepare data to send to Flask API
        $flask_data = array(
            'age' => $age,
            'gender' => $gender,
            'pastmedicalhistory' => $past_history
        );

        // Initialize cURL session to send data to Flask API
        $ch = curl_init('http://127.0.0.1:5000/predict');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($flask_data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

        // Execute the request and get the response from Flask
        $response = curl_exec($ch);
        curl_close($ch);

        // Decode Flask response
        $responseData = json_decode($response, true);

        // Display the result from Flask
        if (isset($responseData['result'])) {
            echo "Prediction result: " . $responseData['result'];
        } else {
            echo "Error receiving prediction from Flask API.";
        }

    } else {
        echo "Error inserting data: " . mysqli_error($conn);
    }
}
