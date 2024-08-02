<?php
require_once('config.php');

$invoice_id = $_POST['invoice_id'];
$house_id = $_POST['house_id'];
$owner_id = $_POST['owner_id'];
$tenant_id = $_POST['tenant_id'];

$payment_date = $_POST['payment_date'];
$payment_method = $_POST['payment_method'];
$transaction_id = isset($_POST['transaction_id']) ? $_POST['transaction_id'] : null;
$payment_amount = $_POST['payment_amount'];
$company_name = isset($_POST['company_name']) ? $_POST['company_name'] : null;

$receipt_pic = null;


if (isset($_FILES['receipt_pic']) && $_FILES['receipt_pic']['error'] === UPLOAD_ERR_OK) {
    $file_name = $_FILES['receipt_pic']['name'];
    $file_tmp = $_FILES['receipt_pic']['tmp_name'];

    // Generate a unique name
    $receipt_pic = time() . '_' . $file_name;

    // Move the file to a directory
    $destination = '../uploads/receipt_pics/' . $receipt_pic;
    if (!move_uploaded_file($file_tmp, $destination)) {
        // if it fails to store the file/image
        $receipt_pic = null;
    }
}

$sql = "INSERT INTO `payments`(`invoice_id`, `house_id`, `owner_id`, `tenant_id`, `payment_date`, `payment_method`, `transaction_id`, `payment_amount`, `receipt_pic`, `company_name`) VALUES (?,?,?,?,?,?,?,?,?,?)";
$statement = $pdo->prepare($sql);
$success = $statement->execute([$invoice_id, $house_id, $owner_id, $tenant_id, $payment_date, $payment_method, $transaction_id, $payment_amount, $receipt_pic, $company_name]);

if (!$success) {
    echo json_encode(['error' => true, 'error-message' => 'server error']);
    exit(0);
}

echo json_encode(['error' => false]);

?>
