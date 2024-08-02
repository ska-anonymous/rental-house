<?php
require('cors_headers.php');
require('db_connect.php');

// no login required
$m_name = trim($_POST['m_name']);
$m_email = trim($_POST['m_email']);
$m_phone = trim($_POST['m_phone']);
$m_message = trim($_POST['m_message']);

$sql = "INSERT INTO `messages`(`m_name`, `m_email`, `m_phone`, `m_message`) VALUES (?,?,?,?)";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$m_name, $m_email, $m_phone, $m_message]);

if(!$success){
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

echo json_encode(['error' => false]);


?>