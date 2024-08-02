<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    require('../cors_headers.php');
    $user_login = trim($_POST['userlogin']);
    $user_password = trim($_POST['password']);

    $password_hash = md5($user_password);

    require('../db_connect.php');
    
    $sql = "SELECT us.*, usd.* FROM users us LEFT JOIN user_details usd ON us.id = usd.user_id WHERE (email=:user_email OR username=:user_name) AND password='$password_hash'";
    $statement = $pdo->prepare($sql);
    $statement->bindParam(':user_email', $user_login);
    $statement->bindParam(':user_name', $user_login);
    $success = $statement->execute();
    if(!$success){
        echo json_encode(['error'=> true, 'error-name'=> 'server-error' ,'error-message'=> 'internal server error']);
        exit(0);
    }
    if($statement->rowCount()){
        session_start();
        $user_data = $statement->fetch(PDO::FETCH_ASSOC);
        $_SESSION['logged'] = true;
        $_SESSION['user_data'] = $user_data;
        unset($user_data['password']);
        echo json_encode(['error'=> false, 'user' => $user_data]);
    }else{
        echo json_encode(['error'=> true, 'error-name'=> 'incorrect-login' ,'error-message'=> 'invalid login id or password']);
    }
}else{
    echo json_encode(['error'=>true, 'error-name'=> 'invalid-request-method', 'error-message'=>'only post method allowed']);
}
?>