<?php
require('config.php');
// now get the users data from the database
$sql = "SELECT us.id, us.username, us.email, us.role, us.registration_date, usd.* FROM users us LEFT JOIN user_details usd ON us.id = usd.user_id";
$stment = $pdo->prepare($sql);
$stment->execute();
$data = $stment->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['users' => $data]);
?>