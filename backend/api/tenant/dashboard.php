<?php
require_once('config.php');

// get the required data for owner dashboard home page
$tenant_id = $_SESSION['user_data']['id'];

// now get the total number of houses in contract
$sql = "SELECT COUNT(*) as total_contract_houses FROM rent_contract WHERE tenant_id = '$tenant_id' AND status = 'confirmed'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_contract_houses = $statement->fetch(PDO::FETCH_ASSOC)['total_contract_houses'] ?? 0;

// now get the total number of houses in pending contract
$sql = "SELECT COUNT(*) as total_pending_contracts FROM rent_contract WHERE tenant_id = '$tenant_id' AND status = 'pending'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_pending_contracts = $statement->fetch(PDO::FETCH_ASSOC)['total_pending_contracts'] ?? 0;


// now get the total no of invoices and total amount of money to be paid against invoices and total amount of money paid
$sql = "SELECT COUNT(*) as total_invoices, SUM(total) as total_amount_payable FROM invoices WHERE tenant_id = '$tenant_id'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$data = $statement->fetch(PDO::FETCH_ASSOC);
$total_invoices = $data['total_invoices'] ?? 0;
$total_amount_payable = $data['total_amount_payable'] ?? 0;

// now get the total payment done
$sql = "SELECT SUM(payment_amount) as total_paid FROM payments WHERE tenant_id = '$tenant_id' AND payment_status = 'verified';";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_paid = $statement->fetch(PDO::FETCH_ASSOC)['total_paid'] ?? 0;


echo json_encode(
    [
        'dashboard_data' =>
        [
            'total_contract_houses' => $total_contract_houses,
            'total_pending_contracts' => $total_pending_contracts,
            'total_invoices' => $total_invoices,
            'total_amount_payable' => $total_amount_payable,
            'total_paid' => $total_paid
        ]
    ]
);

?>
