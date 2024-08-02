<?php
require('config.php');

$house_id = $_GET['houseId'];

// first check if the house is not in rent contract (i.e not booked or contract is not pending for confirmation) then delete the house
$sql = "SELECT * FROM rent_contract WHERE house_id = '$house_id' AND (status = 'pending' OR status = 'confirmed')";

$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

if ($statement->rowCount() >  0) {
    // means that house cannot be deleted
    echo json_encode(['error' => true, 'error-message' => 'This house is is in contract']);
    exit(0);
}

// now the house can be deleted
$sql = "DELETE FROM houses WHERE id = '$house_id'";
$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

echo json_encode(['error' => false]);


?>