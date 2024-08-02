<?php
$new_registration_template =
    '<table style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse; font-family: Arial, sans-serif; border: 1px solid #ddd;">
    <tr>
        <td style="background-color: #f8f8f8; padding: 20px; text-align: center;">
            <h2>New Registration</h2>
        </td>
    </tr>
    <tr>
        <td style="padding: 20px;">
            <p>Dear '.$user_role.',</p>
            <p>Thank you for registering with us on our online rental house management system. Your account has been created successfully.</p>
            <p>Here are your registration details:</p>
            <ul>
                <li><strong>Email:</strong> '.$user_email.'</li>
                <li><strong>Username:</strong> '.$user_name.'</li>
                <li><strong>Registration Date:</strong> '.$registration_date.'</li>
            </ul>
            <p>If you have any questions or need further assistance, please feel free to contact us.</p>
            <p>Best regards,<br>Rental House</p>
        </td>
    </tr>
</table>';

?>