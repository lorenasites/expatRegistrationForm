<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Asap+Condensed:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap"
      rel="stylesheet"
    />
    <title>Registration</title>
    <link rel="stylesheet" href="style.css" />
  </head>
<body>
<div id="registrationPhpPage">
<?php
// registration.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // sanatizing the inputs
    $account_type = filter_input(INPUT_POST, 'account_type', FILTER_SANITIZE_STRING);
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = $_POST['password']; 
    $full_name = filter_input(INPUT_POST, 'full_name', FILTER_SANITIZE_STRING);
    $phone_number = filter_input(INPUT_POST, 'phone_number', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $contact_name = filter_input(INPUT_POST, 'contact_name', FILTER_SANITIZE_STRING);
    $contact_title = filter_input(INPUT_POST, 'contact_title', FILTER_SANITIZE_STRING);
    $errors = [];

    // Basic validation - incorporating server-side validation in addition to the client-side javascript validation
    if (empty($username)) {
        $errors['username'] = "Username is required.";
    }
    if (empty($password) || strlen($password) < 8) {
        $errors['password'] = "Password is required and must be at least 8 characters.";
    }
    if ($account_type === 'individual' && empty($full_name)) {
        $errors['full_name'] = "Full Name is required for individual accounts.";
    }
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format.";
    }
    if ($account_type === 'company' && empty($contact_name)) {
        $errors['contact_name'] = "Contact Name is required for company accounts.";
    }
    if ($account_type === 'company' && empty($contact_title)) {
        $errors['contact_title'] = "Contact Title is required for company accounts.";
    }

    if (empty($errors)) {
        // Use password_hash() built-in php funtion to securely hash the password.
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Database Interaction using PDO:
        $servername = "localhost:3311"; 
        $dbname = "expat_form"; 
        $db_username = "LorenaS"; 
        $db_password = "LorenaS"; 

        try {
            $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $db_username, $db_password);
            
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "INSERT INTO users (ID, account_type, username, password, full_name, phone_number, email_address, contact_name, contact_title)
                    VALUES (NULL, :account_type, :username, :password, :full_name, :phone_number, :email, :contact_name, :contact_title)";
            
            // Prepared statements in sql for further security
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':account_type', $account_type);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':password', $hashed_password); // Storing the HASHED password
            $stmt->bindParam(':full_name', $full_name);
            $stmt->bindParam(':phone_number', $phone_number);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':contact_name', $contact_name);
            $stmt->bindParam(':contact_title', $contact_title);
            $stmt->execute();

            echo "Registration successful, thank you!";
            
            exit();

        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            
        }
        // Closing the database connection
        $pdo = null; 

    } else {
        // Displaying errors if any
        echo "<h2>Registration Errors:</h2>";
        echo "<ul>";
        foreach ($errors as $error) {
            echo "<li>" . htmlspecialchars($error) . "</li>";
        }
        echo "</ul>";
    }
}
?>
</div>
<script src="script.js"></script>
</body>
</html>