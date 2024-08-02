<?php
require_once('config.php');

$contract_id = $_POST['contract_id'];
$house_id = $_POST['house_id'];
$owner_id = $_POST['owner_id'];
$tenant_id = $_POST['tenant_id'];
$month = $_POST['month'];
$year = $_POST['year'];
$total = $_POST['total'];

$sql = "INSERT INTO `invoices`(`contract_id`, `house_id`, `owner_id`, `tenant_id`, `month`, `year`, `total`) VALUES (?,?,?,?,?,?,?)";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$contract_id, $house_id, $owner_id, $tenant_id, $month, $year, $total]);

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$lastInsertId = $pdo->lastInsertId();

// now get the generated bill
$sql = "SELECT inv.id as invoice_id, inv.*, COALESCE(SUM(p.payment_amount),0) as total_paid FROM invoices inv LEFT JOIN payments p ON inv.id = p.invoice_id WHERE inv.id = ? AND (p.payment_status = 'verified' OR p.payment_status IS NULL)";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$lastInsertId]);

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$new_generated_bill = $statement->fetch(PDO::FETCH_ASSOC);

echo json_encode(['new_bill' => $new_generated_bill]);

?>