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
    $address     = $_POST['address'];
    $preferred_time = $_POST['preferred_time'];

    // Insert query with correct column names
    $query = "INSERT INTO form (name, email, phone_number, dob, gender, address, preferred_time) 
              VALUES ('$full_name', '$email', '$phone', '$dob', '$gender', '$address', '$preferred_time')";

    if (mysqli_query($conn, $query)) {
        header("Location: http://localhost:3000/success");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simplified Appointment Form</title>
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
        <input type="text" id="fullName" name="fname" required>
      </div>
      <div class="form-group">
        <label for="email">Email address <span class="required">*</span></label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="phone">Phone number <span class="required">*</span></label>
        <input type="tel" id="phone" name="phone" required>
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
        <label for="address">Address <span class="required">*</span></label>
        <input type="text" name="address" id="address" required>
      </div>
      <div class="form-group">
        <label for="preferred_time">Preferred Time Slot <span class="required">*</span></label>
        <select name="preferred_time" id="preferred_time" required>
          <option value="">Select a time slot</option>
          <option value="09:00-10:00">09:00 - 10:00</option>
          <option value="10:00-11:00">10:00 - 11:00</option>
          <option value="11:00-12:00">11:00 - 12:00</option>
          <option value="14:00-15:00">14:00 - 15:00</option>
          <option value="15:00-16:00">15:00 - 16:00</option>
          <option value="16:00-17:00">16:00 - 17:00</option>
        </select>
      </div>
      
      <div class="form-group submit-group">
        <button type="submit" name="register">Book Appointment</button>
      </div>
    </form>
  </div>
</body>
</html>