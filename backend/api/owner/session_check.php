<?php
    if(!isset($_SESSION['logged']) || !$_SESSION['logged']){
        echo json_encode(['error'=> true, 'error-name'=> 'session-expired', 'error-message'=> 'your session has been expired. Please login again to start a session']);
        exit(0);
    }
    // check if the user role is not owner
    if(isset($_SESSION['logged']) && $_SESSION['user_data']['role'] != 'owner'){
        echo json_encode(['error'=> true, 'error-name'=> 'permission-denied', 'error-message'=> 'You have no permission to do this operation']);
        exit(0);
    }
?>