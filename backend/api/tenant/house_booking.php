<?php
require_once('config.php');

// now get the data from the post
$house_id = $_POST['house_id'];
$start_date = $_POST['start_date'];
$duration = $_POST['duration'];
$rent = $_POST['rent'];
$owner_id = $_POST['owner_id'];

$tenant_id = $_SESSION['user_data']['id'];


// first check if the house is not already booked or pending for booking
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

// now insert the booking data into database

$sql = "INSERT INTO `rent_contract`(`house_id`, `tenant_id`, `owner_id`, `start_date`, `duration`, `rent`) VALUES (?,?,?,?,?,?)";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$house_id, $tenant_id, $owner_id, $start_date, $duration, $rent]);

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

echo json_encode(['error' => false])

?>