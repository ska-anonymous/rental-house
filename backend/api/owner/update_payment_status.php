<?php
require_once('config.php');

$new_status = $_GET['new_status'];
$payment_id = $_GET['payment_id'];

$sql = "UPDATE payments SET payment_status = ? WHERE id = ?";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$new_status, $payment_id]);
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

echo json_encode(['error' => false]);

?>
