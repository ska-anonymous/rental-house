<?php
require_once('config.php');

$house_owner_id = $_GET['ownerId'];

$sql = "SELECT * FROM user_details WHERE user_id = '$house_owner_id'";

$statement = $pdo->prepare($sql);

$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

// if there are no details entered by the house owner (user)
if ($statement->rowCount() == 0) {
    echo json_encode(['error' => true, 'error-message' => 'House Owner Details Not found']);
    exit(0);
}

$house_owner_details = $statement->fetch(PDO::FETCH_ASSOC);

echo json_encode(['house_owner_details' => $house_owner_details])

?>