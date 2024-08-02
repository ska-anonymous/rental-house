<?php
$db_host = 'localhost';
$db_user_name = 'root';
$db_user_password = '';
$db_name = 'rentalhouse';
try{
    $pdo= new PDO("mysql:host=$db_host;dbname=$db_name", $db_user_name, $db_user_password);
    }catch(PDOException $e){
        echo json_encode(['error'=> true, 'error-name' => 'db_connection_failure', 'error-message'=> 'failed to connect to database']);
        exit(0);
    }
?>