<?php
// // Set the session cookie with the SameSite attribute
// session_set_cookie_params([
//     'samesite' => 'None',  // Set to 'None' to allow cross-site cookies
//     'secure' => true
// ]);

// $allowed_origins = array('http://127.0.0.1:5500', 'http://192.168.100.17:5500', 'http://192.168.100.17:5173', 'http://127.0.0.1:5173', 'http://localhost:5173');

// $request_origin = $_SERVER['HTTP_ORIGIN'];


// // Send the session cookie to the browser
// session_write_close(); // This saves the session and sends the cookie
// // Allow requests from any origin
// if(in_array($request_origin, $allowed_origins)){
//     header("Access-Control-Allow-Origin: $request_origin");
// }

// // Set the allowed HTTP methods (GET, POST, PUT, DELETE, etc.)
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// // Set the allowed HTTP headers (custom headers you want to allow)
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// // Allow credentials (e.g., cookies) to be sent with the request (for specific use cases)
// header("Access-Control-Allow-Credentials: true");

// // Set the maximum age for the preflight request cache (in seconds)
// header("Access-Control-Max-Age: 3600"); // Adjust this value as needed
?>
