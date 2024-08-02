<?php
require_once('config.php');

// get the required data for owner dashboard home page
$owner_id = $_SESSION['user_data']['id'];

// get the total number of houses
$sql = "SELECT COUNT(*) as total_houses FROM houses WHERE owner_id = '$owner_id'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_houses = $statement->fetch(PDO::FETCH_ASSOC)['total_houses'] ?? 0;

// now get the total number of houses in contract
$sql = "SELECT COUNT(*) as total_contract_houses FROM rent_contract WHERE owner_id = '$owner_id' AND status = 'confirmed'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_contract_houses = $statement->fetch(PDO::FETCH_ASSOC)['total_contract_houses'] ?? 0;

// now get the total number of houses in pending contract
$sql = "SELECT COUNT(*) as total_pending_contracts FROM rent_contract WHERE owner_id = '$owner_id' AND status = 'pending'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$total_pending_contracts = $statement->fetch(PDO::FETCH_ASSOC)['total_pending_contracts'] ?? 0;


// now get the total no of invoices and total amount of money receivable from invoices and total amount of money received
$sql = "SELECT COUNT(*) as total_invoices, SUM(total) as total_amount_receivable FROM invoices WHERE owner_id = '$owner_id'";
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
$sql = "SELECT SUM(payment_amount) as total_paid FROM payments WHERE owner_id = '$owner_id' AND payment_status = 'verified';";
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
AND payments.owner_id = '$owner_id'
GROUP BY months.month_num
";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$monthly_payments = $statement->fetchAll(PDO::FETCH_ASSOC);


// get the top 5 houses which are generating more revenue
$sql = "SELECT
h.id AS house_id,
h.name as house_name,
SUM(p.payment_amount) AS total_revenue
FROM
payments p
JOIN
houses h ON p.house_id = h.id
WHERE
p.payment_status = 'verified' AND h.owner_id = '$owner_id'
GROUP BY
h.id
ORDER BY
total_revenue DESC
LIMIT
5;
";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$top_revenue_houses = $statement->fetchAll(PDO::FETCH_ASSOC);


echo json_encode(
    [
        'dashboard_data' =>
        [
            'total_houses' => $total_houses,
            'total_contract_houses' => $total_contract_houses,
            'total_pending_contracts' => $total_pending_contracts,
            'total_invoices' => $total_invoices,
            'total_amount_receivable' => $total_amount_receivable,
            'total_paid' => $total_paid,
            'monthly_payments' => $monthly_payments,
            'top_revenue_houses' => $top_revenue_houses
        ]
    ]
);

?>
