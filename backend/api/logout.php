<?php
require_once('cors_headers.php');
session_start();
session_unset();
session_destroy();
echo json_encode(['logout' => true]);
?>