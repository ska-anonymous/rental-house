<?php
require_once('config.php');

$owner_id = $_SESSION['user_data']['id'];

$sql = "SELECT * FROM payments WHERE owner_id = ?";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$owner_id]);
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$payments = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['payments' => $payments]);


?>