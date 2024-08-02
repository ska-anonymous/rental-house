<?php
require_once('config.php');

$tenant_id = $_SESSION['user_data']['id'];

$sql = "SELECT rc.id as rc_id, rc.*, h.name as house_name, h.*, ud.name as owner_name, ud.* FROM `rent_contract` rc LEFT JOIN houses h ON rc.house_id = h.id LEFT JOIN user_details ud ON h.owner_id = ud.user_id WHERE rc.tenant_id = '$tenant_id' ORDER BY rc.id DESC";
$statement = $pdo->prepare($sql);
$success = $statement->execute();

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$my_contracts = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['my_contracts' => $my_contracts])

?>