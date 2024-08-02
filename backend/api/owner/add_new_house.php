<?php
require('config.php');

$owner_id = $_SESSION['user_data']['id'];
// now get the house data from post array
$house_name = trim($_POST['house_name']);
$house_description = trim($_POST['house_description']);
$house_location = trim($_POST['house_location']);
$house_city = trim($_POST['house_city']);
$house_no_of_bedrooms = trim($_POST['house_no_of_bedrooms']);
$house_no_of_rooms = trim($_POST['house_no_of_rooms']);
$house_square_area = trim($_POST['house_square_area']);
$house_attached_baths = trim($_POST['house_attached_baths']);
$house_car_wash = trim($_POST['house_car_wash']);
$house_garage = trim($_POST['house_garage']);
$house_type = trim($_POST['house_type']);
$monthly_rent = trim($_POST['monthly_rent']);
$house_pictures = '';

$pics_names = [];
// handle pictures upload and their names
for($i=0; $i < count($_FILES['house_pics']['name']); $i++){
    $new_pic_name = time() . '_' .$_FILES['house_pics']['name'][$i];
    $pics_names[] = $new_pic_name;
    move_uploaded_file($_FILES['house_pics']['tmp_name'][$i], '../uploads/house_pics/'.$new_pic_name);
}

$house_pictures = implode('_$$_', $pics_names);

// now insert data into database
$sql = "INSERT INTO `houses`(`name`, `owner_id`, `description`, `location`, `city`, `no_of_bedroom`, `no_of_rooms`, `square_area`, `attached_baths`, `car_wash`, `garage`, `house_type`, `monthly_rent`, `pictures`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
$statment = $pdo->prepare($sql);
$statment->execute([$house_name, $owner_id, $house_description, $house_location, $house_city, $house_no_of_bedrooms, $house_no_of_rooms, $house_square_area, $house_attached_baths, $house_car_wash, $house_garage, $house_type, $monthly_rent, $house_pictures]);
if($statment->rowCount()){
    echo json_encode(['error'=> false]);
}else{
    echo json_encode(['error'=>true, 'error-name'=> 'server-error', 'error-message'=>'Failed to add house due to internal server error']);
}


?>