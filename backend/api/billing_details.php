<?php
// these information can be accessed by both owner and tenant
require('cors_headers.php');
session_start();
if(!isset($_SESSION['logged']) || !$_SESSION['logged']){
    echo json_encode(['error'=> true, 'error-name'=> 'session-expired', 'error-message'=> 'your session has been expired. Please login again to start a session']);
    exit(0);
}
// also check both roles
if($_SESSION['user_data']['role'] != 'owner' && $_SESSION['user_data']['role'] != 'tenant'){
    echo json_encode(['error'=> true, 'error-name'=> 'permission-denied', 'error-message'=> 'You have no permission to do this operation']);
    exit(0);
}

// now get the details from db
require('db_connect.php');

$contract_id = $_GET['contract_id'];

$sql = "SELECT inv.id as invoice_id, inv.*, COALESCE(SUM(p.payment_amount),0) as total_paid FROM invoices inv LEFT JOIN payments p ON inv.id = p.invoice_id AND p.payment_status = 'verified' WHERE inv.contract_id = ? GROUP BY inv.id ORDER BY CAST(inv.year AS SIGNED), CAST(inv.month AS SIGNED);";

$statement = $pdo->prepare($sql);
$success = $statement->execute([$contract_id]);

if(!$success){
    echo json_encode(['error'=> true, 'error-message'=> 'server error']);
    exit(0);
}

$billing_details = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['billing_details' => $billing_details]);

?>