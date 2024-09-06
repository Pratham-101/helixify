<?php 
include("connection.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$successMessage = ''; // Initialize the success message variable

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

    if (mysqli_query($conn, $query)) {
        // Set success message to show on the same page
        $successMessage = "Form submitted successfully!";
    } else {
        // Error message in case of failure
        $successMessage = "Error inserting data: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission</title>
</head>
<body>
    <!-- Display success message if form is submitted -->
    <?php if ($successMessage): ?>
        <p style="color: green;"><?php echo $successMessage; ?></p>
    <?php endif; ?>

    <form method="POST">
        <label for="fname">Full Name</label>
        <input type="text" id="fname" name="fname" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="phone">Phone</label>
        <input type="text" id="phone" name="phone" required>

        <label for="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" required>

        <label for="gender">Gender</label>
        <select id="gender" name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>

        <label for="allergies">Allergies</label>
        <input type="text" id="allergies" name="allergies">

        <label for="currentmedication">Current Medication</label>
        <input type="text" id="currentmedication" name="currentmedication">

        <label for="familymedicalhistory">Family Medical History</label>
        <input type="text" id="familymedicalhistory" name="familymedicalhistory">

        <label for="pastmedicalhistory">Past Medical History</label>
        <input type="text" id="pastmedicalhistory" name="pastmedicalhistory">

        <label for="address">Address</label>
        <input type="text" id="address" name="address">

        <label for="occupation">Occupation</label>
        <input type="text" id="occupation" name="occupation">

        <label for="emergencycontact">Emergency Contact Name</label>
        <input type="text" id="emergencycontact" name="emergencycontact">

        <label for="emergencyphone">Emergency Contact Phone</label>
        <input type="text" id="emergencyphone" name="emergencyphone">

        <button type="submit" name="register">Submit</button>
    </form>
</body>
</html>
