<?php
require('config.php');

$user_id = $_POST['user_id'];
$username = trim($_POST['username']);
$email = trim($_POST['email']);

// first check if the username or email is already of another user
$sql = "SELECT * FROM users WHERE username = :username AND id != :user_id";
$statement = $pdo->prepare($sql);
$statement->bindParam(':username', $username);
$statement->bindParam(':user_id', $user_id);
$success = $statement->execute();
if(!$success){
    echo json_encode(['error' => true, 'error-message' => 'Server Error']);
    exit(0);
}
if($statement->rowCount()){
    echo json_encode(['error' => true, 'error-message' => 'This username is already taken try a different one']);
    exit(0);
}

// now check if email already exists for another person
$sql = "SELECT * FROM users WHERE email = :email AND id != :user_id";
$statement = $pdo->prepare($sql);
$statement->bindParam(':email', $email);
$statement->bindParam(':user_id', $user_id);
$success = $statement->execute();
if(!$success){
    echo json_encode(['error' => true, 'error-message' => 'Server Error']);
    exit(0);
}
if($statement->rowCount()){
    echo json_encode(['error' => true, 'error-message' => 'This email is already taken try a different one']);
    exit(0);
}

$sql = "UPDATE users SET username = :username,  email = :email WHERE id = :user_id";
$statement = $pdo->prepare($sql);
$statement->bindParam(':username', $username);
$statement->bindParam(':email', $email);
$statement->bindParam(':user_id', $user_id);

$success = $statement->execute();
if(!$success){
    echo json_encode(['error' => true, 'error-message' => 'Server Error']);
    exit(0);
}

echo json_encode(['error' => false])
?>