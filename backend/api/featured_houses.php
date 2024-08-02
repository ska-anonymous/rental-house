<?php
require('cors_headers.php');
require('db_connect.php');
// no login (authentication) required

// select only those houses which are not already in contract i.e not booked yet
$sql = "SELECT * FROM houses WHERE id NOT IN (
    SELECT DISTINCT house_id
    FROM rent_contract
    WHERE Status IN ('pending', 'confirmed')
)
ORDER BY RAND()
LIMIT 20;
";

$statement = $pdo->prepare($sql);
$success = $statement->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$data = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['featured_houses' => $data]);


?>