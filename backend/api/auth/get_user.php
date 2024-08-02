<?php
require('../cors_headers.php');
session_start();
if(!isset($_SESSION['logged']) || !$_SESSION['logged']){
    echo json_encode(['error'=> true, 'error-name'=> 'session-expired', 'error-message'=> 'your session has been expired. Please login again to start a session']);
    exit(0);
}

$user_data = $_SESSION['user_data'];
unset($user_data['password']);
echo json_encode(['user' => $user_data]);
?>