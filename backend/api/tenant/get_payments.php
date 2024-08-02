<?php
require_once('config.php');

$tenant_id = $_SESSION['user_data']['id'];

$sql = "SELECT * FROM payments WHERE tenant_id = ?";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$tenant_id]);
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$payments = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['payments' => $payments]);


?>