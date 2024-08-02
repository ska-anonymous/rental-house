<?php
require('config.php');

$name = trim($_POST['name']);
$phone = trim($_POST['phone']);
$gender = trim($_POST['gender']);
$cnic = trim($_POST['cnic']);
$address = trim($_POST['address']);
$dob = trim($_POST['dob']);

$user_id = $_SESSION['user_data']['id'];

// if new picture is selected then set its unique name and copy the uploaded picture
if (strlen($_FILES['picture']['name']) > 0) {
    $picture = $_FILES['picture']['name'];
    // give unique name to the picture
    $picture = time() . $picture;
    move_uploaded_file($_FILES['picture']['tmp_name'], 'uploads/profile_pics/' . $picture);
} else {
    // otherwise set to old name
    $picture = $_POST['old_picture'];
}


// first check if the details are there then update otherwise insert new row
$sql = "SELECT * FROM user_details WHERE user_id = '$user_id'";
$statment = $pdo->prepare($sql);
$success = $statment->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

if ($statment->rowCount()) {
    $sql = "UPDATE `user_details` SET `name`= ?,`phone`=?,`gender`=?,`cnic`=?,`address`=?,`date_of_birth`=?,`picture`=? WHERE user_id = '$user_id'";
    $statment = $pdo->prepare($sql);
} else {
    $sql = "INSERT INTO `user_details`(`user_id`, `name`, `phone`, `gender`, `cnic`, `address`, `date_of_birth`, `picture`) VALUES ('$user_id',?,?,?,?,?,?,?)";
}

$statment = $pdo->prepare($sql);
$success = $statment->execute([$name, $phone,  $gender, $cnic, $address, $dob, $picture]);
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

// now get the updated user details to send to the frontend
$sql = "SELECT us.*, usd.* FROM users us LEFT JOIN user_details usd ON us.id = usd.user_id WHERE us.id = '$user_id'";
$statment = $pdo->prepare($sql);
$success = $statment->execute();
if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

$user_data = $statment->fetch(PDO::FETCH_ASSOC);
$_SESSION['user_data'] = $user_data;
unset($user_data['password']);
echo json_encode(['error' => false, 'user' => $user_data]);

?>
