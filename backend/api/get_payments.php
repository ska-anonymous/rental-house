<?php
require_once('config.php');

$invoice_id = $_GET['invoice_id'];

$sql = "SELECT * FROM payments WHERE invoice_id = ?";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$invoice_id]);
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$payments = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['payments' => $payments]);


?>