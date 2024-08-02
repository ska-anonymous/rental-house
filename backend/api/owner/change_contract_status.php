<?php
require_once('config.php');


$contract_id = $_GET['contract_id'];
$new_status = $_GET['new_status'];
$owner_id = $_SESSION['user_data']['id'];

// the owner id check is used in the query to avoid another logged in person from changing someones other contract status

$sql = "UPDATE rent_contract SET status = ? WHERE id = ? AND owner_id = '$owner_id'";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$new_status, $contract_id]);

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

echo json_encode(['error' => false])

?>
