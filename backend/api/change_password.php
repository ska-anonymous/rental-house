<?php
require_once('config.php');

$old_password = $_POST['old_password'];
$new_password = $_POST['new_password'];

// get the user id from the session
$user_id = $_SESSION['user_data']['id'];

$old_password_hash = md5($old_password);
$new_password_hash = md5($new_password);

// now first check if the old password is correct
$sql = "SELECT * FROM users WHERE id = ? AND password = ?";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$user_id, $old_password_hash]);

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

if ($statement->rowCount() == 0) {
    echo json_encode(['error' => true, 'error-message' => 'incorrect old password']);
    exit(0);
}

// now update the password to the new password
// now first check if the old password is correct
$sql = "UPDATE users SET password = ? WHERE id = ?";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$new_password_hash, $user_id]);

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

echo json_encode(['error' => false]);

?>
