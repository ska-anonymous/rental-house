<?php
require('config.php');
$sql = "SELECT
COUNT(*) AS house_count,
(SELECT COUNT(*) FROM users WHERE role = 'admin') AS admin_count,
(SELECT COUNT(*) FROM users WHERE role = 'owner') AS owner_count,
(SELECT COUNT(*) FROM users WHERE role = 'tenant') AS tenant_count
FROM houses;
";

$stment = $pdo->prepare($sql);
$stment->execute();
if (!$stment->rowCount()) {
    echo json_encode(['error' => true, 'error-message' => 'Server Error']);
    exit(0);
}

$count_data = $stment->fetch(PDO::FETCH_ASSOC);


// now get the total number of houses in contract
$sql = "SELECT COUNT(*) as total_contract_houses FROM rent_contract WHERE status = 'confirmed'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_contract_houses = $statement->fetch(PDO::FETCH_ASSOC)['total_contract_houses'] ?? 0;

// now get the total number of houses in pending contract
$sql = "SELECT COUNT(*) as total_pending_contracts FROM rent_contract WHERE status = 'pending'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_pending_contracts = $statement->fetch(PDO::FETCH_ASSOC)['total_pending_contracts'] ?? 0;

// now get the total no of invoices and total amount of money receivable from invoices and total amount of money received
$sql = "SELECT COUNT(*) as total_invoices, SUM(total) as total_amount_receivable FROM invoices";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$data = $statement->fetch(PDO::FETCH_ASSOC);
$total_invoices = $data['total_invoices'] ?? 0;
$total_amount_receivable = $data['total_amount_receivable'] ?? 0;

// now get the total payment done
$sql = "SELECT SUM(payment_amount) as total_paid FROM payments WHERE payment_status = 'verified';";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_paid = $statement->fetch(PDO::FETCH_ASSOC)['total_paid'] ?? 0;


// get monthly payments for current year
$sql = "SELECT 
months.month_num AS month,
IFNULL(SUM(payments.payment_amount), 0) AS total_amount
FROM (
SELECT 1 AS month_num
UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11
UNION SELECT 12
) AS months
LEFT JOIN payments ON MONTH(payments.payment_date) = months.month_num
AND YEAR(payments.payment_date) = YEAR(CURDATE())
AND payments.payment_status = 'verified'
GROUP BY months.month_num
";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$monthly_payments = $statement->fetchAll(PDO::FETCH_ASSOC);


echo json_encode(
    [
        'dashboard_data' =>
        [
            'count_data' => $count_data,
            'total_contract_houses' => $total_contract_houses,
            'total_pending_contracts' => $total_pending_contracts,
            'total_invoices' => $total_invoices,
            'total_amount_receivable' => $total_amount_receivable,
            'total_paid' => $total_paid,
            'monthly_payments' => $monthly_payments
        ]
    ]
);


?>
