<?php
include("C:/Users/PRATHAM CHINTRATE/OneDrive/Documents/zamp/htdocs/helixify/client/src/components/crud/connection.php");

if (isset($_GET['id']) && isset($_GET['status']) && isset($_GET['email'])) {
    $id = intval($_GET['id']);
    $status = mysqli_real_escape_string($conn, $_GET['status']);
    $email = mysqli_real_escape_string($conn, $_GET['email']);

    if (!in_array($status, ['successful', 'cancelled'])) {
        die("Invalid status value.");
    }

    $query = "SELECT status FROM form WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    $current_status = $row['status'];

    if ($current_status === 'successful' || $current_status === 'cancelled') {
        die("The status has already been updated to: " . $current_status);
    }

    if ($conn) {
        $stmt = mysqli_prepare($conn, "UPDATE form SET status = ? WHERE id = ?");
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "si", $status, $id);

            if (mysqli_stmt_execute($stmt)) {
                echo "Status updated successfully.";
                header("Location: send_email.html?email=" . urlencode($email) . "&status=" . $status);
                exit();
            } else {
                echo "Error updating status: " . mysqli_stmt_error($stmt);
            }

            mysqli_stmt_close($stmt);
        } else {
            echo "Failed to prepare statement: " . mysqli_error($conn);
        }
    } else {
        echo "Database connection failed.";
    }
} else {
    echo "Missing id, status, or email.";
}
?>