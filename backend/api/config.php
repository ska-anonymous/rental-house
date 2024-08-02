<?php
require('cors_headers.php');
session_start();
if(!isset($_SESSION['logged']) || !$_SESSION['logged']){
    echo json_encode(['error'=> true, 'error-name'=> 'session-expired', 'error-message'=> 'your session has been expired. Please login again to start a session']);
    exit(0);
}
require('db_connect.php');
?>