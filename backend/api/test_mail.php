<?php
$user_name = 'atta';
$user_email = 'atta.khan6295@gmail.com';
$user_role = 'owner';
$registration_date = date('d-m-Y');

require_once('email_templates/new_registration.php');

$email_body = $new_registration_template;


require_once('PHPMailer/send_mail.php');


?>