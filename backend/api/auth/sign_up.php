<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require('../cors_headers.php');
    $user_name = trim($_POST['user_name']);
    $user_email = trim($_POST['email']);
    $user_pass = trim($_POST['password']);
    $user_role = trim($_POST['role']);

    // validate role because its crucial
    if ($user_role != 'owner' && $user_role != 'tenant') {
        echo json_encode(['error' => true, 'error-name' => 'validation', 'error-message' => 'you cannot select a role other than owner or tenant']);
        exit(0);
    }

    $password_hash = md5($user_pass);

    require('../db_connect.php');

    // first check if the email or username already exists
    $sql = "SELECT * FROM users WHERE email=:user_email";
    $statment = $pdo->prepare($sql);
    $statment->bindParam(':user_email', $user_email);
    $statment->execute();
    if ($statment->rowCount()) {
        // a user with this email already exists
        echo json_encode(['error' => true, 'error-name' => 'duplicate_entry', 'error-message' => 'failed to register user, a user with this email "' . $user_email . '" already exists']);
        exit(0);
    }
    $sql = "SELECT * FROM users WHERE username=:username";
    $statment = $pdo->prepare($sql);
    $statment->bindParam(':username', $user_name);
    $statment->execute();
    if ($statment->rowCount()) {
        // a user with this email already exists
        echo json_encode(['error' => true, 'error-name' => 'duplicate_entry', 'error-message' => 'failed to register user, a user with this username "' . $user_name . '" already exists']);
        exit(0);
    }

    // now isert data into database

    $sql = "INSERT INTO `users`(`username`, `email`, `password`, `role`) VALUES (:user_name,:user_email,'$password_hash',:user_role)";

    $statment = $pdo->prepare($sql);
    $statment->bindParam(':user_name', $user_name);
    $statment->bindParam(':user_email', $user_email);
    $statment->bindParam(':user_role', $user_role);

    $statment->execute();
    if ($statment->rowCount()) {

        // now send the mail to the newly registered user
        $registration_date = date('d-m-Y h:i:s a');
        // get the email template
        require_once('../email_templates/new_registration.php');
        $to_addresses = [$user_email];
        $email_body = $new_registration_template;
        require_once('../PHPMailer/send_mail.php');
        
        echo json_encode(['error' => false]);
    } else {
        echo json_encode(['error' => true, 'error-name' => 'server-error', 'error-message' => 'failed to register user, internal server error']);
    }
} else {
    echo json_encode(['error' => true, 'error-name' => 'invalid-request-method', 'error-message' => 'failed to register user, only post method allowed']);
}

?>
