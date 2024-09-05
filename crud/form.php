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
        // Change the Location header to match your path structure
        header("Location: /sih_project/Successfully_submitted/index.html");
        exit(); // Make sure to exit after the redirect
    } else {
        echo "Error inserting data: " . mysqli_error($conn);
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Form</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <form class="form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
      <header>
        <img src="Helixify-removebg-preview.png" alt="Logo" class="logo">
        <h1>Welcome <span></span></h1>
        <p>Please fill in your appointment details</p>
      </header>

      <div class="form-group">
        <label for="fullName">Full name <span class="required">*</span></label>
        <input type="text" id="fullName" name="fname" placeholder="Adam Smith" required>
      </div>
      <div class="form-group">
        <label for="email">Email address <span class="required">*</span></label>
        <input type="email" id="email" name="email" placeholder="adrian@jsmastery.pro" required>
      </div>
      <div class="form-group">
        <label for="phone">Phone number <span class="required">*</span></label>
        <input type="tel" id="phone" name="phone" placeholder="+91 00000 00000" required>
      </div>
      <div class="form-group">
        <label for="dob">Date of birth <span class="required">*</span></label>
        <input type="date" name="dob" id="dob" required>
      </div>
      <div class="form-group">
        <label>Gender <span class="required">*</span></label>
        <div class="radio-group">
          <label>
            <input type="radio" id="male" name="gender" value="Male" required> Male
          </label>
          <label>
            <input type="radio" id="female" name="gender" value="Female" required> Female
          </label>
          <label>
            <input type="radio" id="other" name="gender" value="Other" required> Other
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="allergies">Allergies</label>
        <input type="text" name="allergies" id="allergies" placeholder="ex: Peanuts, Penicillin, Pollen" required>
      </div>
      <div class="form-group">
        <label for="currentMedication">Current medication</label>
        <input type="text" name="currentmedication" id="currentMedication" placeholder="ex: Ibuprofen 200mg, Levothyroxin 50mcg" required>
      </div>
      <div class="form-group">
        <label for="familyMedicalHistory">Family medical history</label>
        <input type="text" name="familymedicalhistory" id="familyMedicalHistory" placeholder="ex: Mother had breast cancer" required>
      </div>
      <div class="form-group">
        <label for="pastMedicalHistory">Past medical history</label>
        <input type="text" name="pastmedicalhistory" id="pastMedicalHistory" placeholder="ex: Asthma diagnosis in childhood" required>
      </div>
      <div class="form-group">
        <label for="address">Address <span class="required">*</span></label>
        <input type="text" name="address" id="address" placeholder="14 Street, New York, NY - 5101" required>
      </div>
      <div class="form-group">
        <label for="occupation">Occupation</label>
        <input type="text" name="occupation" id="occupation" placeholder="Software Engineer" required>
      </div>
      <div class="form-group">
        <label for="emergencyContact">Emergency contact name <span class="required">*</span></label>
        <input type="text" name="emergencycontact" id="emergencyContact" placeholder="Guardian's name" required>
      </div>
      <div class="form-group">
        <label for="emergencyPhone">Emergency contact phone <span class="required">*</span></label>
        <input type="tel" name="emergencyphone" id="emergencyPhone" placeholder="+91 00000 00000" required>
      </div>
      <div class="consent-section">
        <h2 style="font-size: 30px; font: bold;">Consent and Privacy</h2>
        <div class="form-group">
          <label>
            <input type="checkbox" name="consent-treatment" required>
            I consent to receive treatment for my health condition.
          </label>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" name="consent-disclosure" required>
            I consent to the use and disclosure of my health information for treatment purposes.
          </label>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" name="consent-privacy" required>
            I acknowledge that I have reviewed and agree to the privacy policy.
          </label>
        </div>
      </div>
      
      <div class="form-group submit-group">
        <button type="submit" name="register">Book Appointment</button>
      </div>
    </form>
  </div>
</body>
</html>
