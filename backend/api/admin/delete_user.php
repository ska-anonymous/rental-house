<?php
require('config.php');
// check if the user id is not provided
if(!isset($_GET['user_id'])){
    echo json_encode(['error' => true, 'error-message' => 'user id not provided']);
    exit(0);
}

$user_id = $_GET['user_id'];

$sql = "DELETE FROM users WHERE id = :user_id";
$statement = $pdo->prepare($sql);
$statement->bindParam(':user_id', $user_id);
$success  = $statement->execute();
if(!$success){
    echo json_encode(['error' => true, 'error-message' => 'Server Error']);
    exit(0);
}

// also delete user_details
$sql = "DELETE FROM user_details WHERE user_id = :user_id";
$statement = $pdo->prepare($sql);
$statement->bindParam(':user_id', $user_id);
$success  = $statement->execute();
if(!$success){
    echo json_encode(['error' => true, 'error-message' => 'Server Error']);
    exit(0);
}

echo json_encode(['error' => false]);

?>