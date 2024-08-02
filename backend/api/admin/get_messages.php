<?php
require_once('config.php');

// get messages data from database
$sql = "SELECT * FROM `messages` ORDER BY id DESC";
$statement = $pdo->prepare($sql);
$success = $statement->execute();

if(!$success){
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$messages = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($messages);

?>