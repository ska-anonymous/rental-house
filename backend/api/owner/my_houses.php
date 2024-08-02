<?php
require('config.php');


$user_id = $_SESSION['user_data']['id'];
$sql = "SELECT * FROM houses WHERE owner_id = '$user_id'";
$statment = $pdo->prepare($sql);
$success = $statment->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$houses = $statment->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['houses' => $houses]);

?>