<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Autoload PHPMailer (Pfad ggf. anpassen)
// require 'phpmailer/autoload.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';
require __DIR__ . '/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"):
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"):
        header("Access-Control-Allow-Origin: *");
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        $recipient = 'carlahoffmann@gmx.net';
        $subject = "Contact From <$email>";
        $body = "From: " . htmlspecialchars($name) . "<br>" . nl2br(htmlspecialchars($message));

        // PHPMailer initialisieren
        $mail = new PHPMailer(true);
        try {
            // SMTP Einstellungen
            $mail->isSMTP();
            $mail->Host = 'w0205066.kasserver.com'; // z.B. smtp.strato.de, smtp.gmail.com, etc.
            $mail->SMTPAuth = true;
            $mail->Username = 'info@carla-hoffmann.net'; // Deine SMTP-Zugangsdaten
            $mail->Password = 'gruneB4n4ne!';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // oder PHPMailer::ENCRYPTION_SMTPS für SSL
            $mail->Port = 465; // für SSL oder 587

            // Absender und Empfänger
            $mail->setFrom('info@carla-hoffmann.net', 'Kontaktformular');
            $mail->addAddress($recipient);

            // Antwortadresse auf die des Absenders setzen (optional, aber hilfreich)
            $mail->addReplyTo($email, $name);

            // Inhalt
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $body;

            $mail->send();
            http_response_code(200);
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
        }
        break;

    default:
        header("Allow: POST", true, 405);
        exit;
}
