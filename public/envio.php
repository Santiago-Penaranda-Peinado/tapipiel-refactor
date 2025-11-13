<?php
// ============================================
// PROCESADOR DE FORMULARIO - TAPIPIEL
// ============================================
// Este archivo procesa el formulario de contacto y envía los correos
// Incluye validación de reCAPTCHA v2 y PHPMailer para envío seguro
// ============================================

// 1. Carga manual de las clases de PHPMailer 6.x
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// 2. Importar las clases al namespace global
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// ==========================================
// CONFIGURACIÓN DE RECAPTCHA
// ==========================================
$recaptcha_secret = '6LeOsnApAAAAAD-nMe2aDb9X2liNEnjuUHDWP9Nm';

// ==========================================
// VALIDACIÓN DE RECAPTCHA
// ==========================================
// Detección de solicitud AJAX
$isAjax = (
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
    || isset($_POST['ajax'])
);

function respondJson($payload) {
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

if (empty($_POST['g-recaptcha-response'])) {
    if ($isAjax) {
        respondJson(['success' => false, 'error' => 'Por favor completa el reCAPTCHA.']);
    }
    die('Error: Se ha detectado un robot (Respuesta vacía). Por favor, complete el captcha.');
}

$recaptcha_response = $_POST['g-recaptcha-response'];
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $recaptcha_secret . "&response=" . $recaptcha_response);
$g_response = json_decode($response);

if ($g_response->success !== true) {
    if ($isAjax) {
        respondJson(['success' => false, 'error' => 'Verificación reCAPTCHA fallida. Intenta nuevamente.']);
    }
    die('Error: Se ha detectado un robot (Verificación fallida). Por favor, intente nuevamente.');
}

// ==========================================
// CAPTURA Y SANITIZACIÓN DE DATOS
// ==========================================
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Capturar datos del formulario
$nombre = isset($_POST['nombre']) ? sanitize($_POST['nombre']) : '';
$email = isset($_POST['correo']) ? sanitize($_POST['correo']) : '';
$telefono = isset($_POST['telefono']) ? sanitize($_POST['telefono']) : 'No proporcionado';
$asunto = isset($_POST['asunto']) ? sanitize($_POST['asunto']) : 'Contacto desde tapipiel.com.mx';
$servicio = isset($_POST['servicio']) ? sanitize($_POST['servicio']) : 'No especificado';
$mensaje = isset($_POST['mensaje']) ? sanitize($_POST['mensaje']) : '';

// ==========================================
// VALIDACIÓN DE CAMPOS OBLIGATORIOS
// ==========================================
$errores = [];

if (empty($nombre)) {
    $errores[] = "El nombre es obligatorio.";
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "El correo electrónico es obligatorio y debe ser válido.";
}

if (empty($asunto)) {
    $errores[] = "El asunto es obligatorio.";
}

if (empty($mensaje)) {
    $errores[] = "El mensaje es obligatorio.";
}

// Si hay errores, mostrarlos y detener
if (!empty($errores)) {
    if ($isAjax) {
        respondJson(['success' => false, 'error' => implode(' ', $errores)]);
    }
    echo "<h3>Errores en el formulario:</h3><ul>";
    foreach ($errores as $error) {
        echo "<li>$error</li>";
    }
    echo "</ul>";
    echo '<br><a href="javascript:history.back()">Volver al formulario</a>';
    exit;
}

// ==========================================
// FORMATEAR NOMBRE DEL SERVICIO
// ==========================================
$servicios_nombres = [
    'tapiceria-residencial' => 'Tapicería Residencial',
    'tapiceria-oficina' => 'Tapicería de Oficina',
    'restauracion' => 'Restauración Especializada',
    'limpieza' => 'Limpieza Profesional',
    'otro' => 'Otro Servicio'
];

$servicio_nombre = isset($servicios_nombres[$servicio]) ? $servicios_nombres[$servicio] : $servicio;

// ==========================================
// LISTA DE DESTINATARIOS
// ==========================================
$destinatarios = [];
$destinatarios[] = ['email' => 'mueblesdamasco@gmail.com', 'name' => 'Hoby'];
$destinatarios[] = ['email' => 'ventas@tapipiel.com.mx', 'name' => 'Tapipiel'];
$destinatarios[] = ['email' => 'ventas@wde.com.mx', 'name' => 'WDE'];
$destinatarios[] = ['email' => 'joseluis@mail.wde.com.mx', 'name' => 'Soporte WDE'];

// ==========================================
// CONSTRUCCIÓN DEL EMAIL (HTML)
// ==========================================
$email_body = "
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #00008b; color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
        .field { margin-bottom: 20px; }
        .field strong { color: #00008b; display: block; margin-bottom: 5px; }
        .field p { margin: 0; padding: 10px; background: #f0f0f0; border-radius: 4px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nuevo mensaje desde tapipiel.com.mx</h2>
        </div>
        <div class='content'>
            <h3>Datos del Cliente</h3>
            
            <div class='field'>
                <strong>👤 Nombre:</strong>
                <p>$nombre</p>
            </div>
            
            <div class='field'>
                <strong>📧 Correo Electrónico:</strong>
                <p><a href='mailto:$email'>$email</a></p>
            </div>
            
            <div class='field'>
                <strong>📱 Teléfono:</strong>
                <p>$telefono</p>
            </div>
            
            <div class='field'>
                <strong>📋 Asunto:</strong>
                <p>$asunto</p>
            </div>
            
            <div class='field'>
                <strong>🛠️ Servicio de Interés:</strong>
                <p>$servicio_nombre</p>
            </div>
            
            <div class='field'>
                <strong>💬 Mensaje:</strong>
                <p>$mensaje</p>
            </div>
        </div>
        
        <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de <strong>tapipiel.com.mx</strong></p>
            <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Versión texto plano
$email_body_plain = "
NUEVO MENSAJE DESDE TAPIPIEL.COM.MX
=====================================

DATOS DEL CLIENTE
-----------------
Nombre: $nombre
Correo: $email
Teléfono: $telefono
Asunto: $asunto
Servicio: $servicio_nombre

MENSAJE
-------
$mensaje

=====================================
Fecha: " . date('d/m/Y H:i:s') . "
";

// ==========================================
// CONFIGURACIÓN Y ENVÍO CON PHPMAILER
// ==========================================
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host = "smtp.ionos.mx";
    $mail->SMTPAuth = true;
    $mail->Username = "formulario@tapipiel.com.mx";
    $mail->Password = "Tapi_2023!piel#075";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Remitente
    $mail->setFrom("formulario@tapipiel.com.mx", 'Formulario Tapipiel');
    
    // Responder a (el cliente)
    $mail->addReplyTo($email, $nombre);

    // Destinatarios
    foreach ($destinatarios as $destinatario) {
        $mail->addAddress($destinatario['email'], $destinatario['name']);
    }

    // Contenido del email
    $mail->isHTML(true);
    $mail->Subject = "Tapipiel - " . $asunto;
    $mail->Body = $email_body;
    $mail->AltBody = $email_body_plain;

    // Enviar
    $mail->send();

    if ($isAjax) {
        respondJson(['success' => true, 'redirect' => '/thank-you.html']);
    }
    header("Location: /thank-you.html");
    exit;

} catch (Exception $e) {
    if ($isAjax) {
        respondJson(['success' => false, 'error' => 'Error al enviar el mensaje.']);
    }
    echo "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Error - Tapipiel</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f0f0f0; padding: 50px; text-align: center; }
            .error-box { background: white; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #ff0000; }
            .btn { display: inline-block; margin-top: 20px; padding: 12px 30px; background: #00008b; color: white; text-decoration: none; border-radius: 4px; }
            .btn:hover { background: #000060; }
        </style>
    </head>
    <body>
        <div class='error-box'>
            <h1>❌ Error al Enviar el Mensaje</h1>
            <p>Lo sentimos, hubo un problema al procesar tu solicitud.</p>
            <p><strong>Detalles del error:</strong> {$mail->ErrorInfo}</p>
            <p>Por favor, intenta nuevamente o contáctanos directamente:</p>
            <p>📞 <strong>CDMX:</strong> 56 3342 1772</p>
            <p>📞 <strong>Cuernavaca:</strong> 777 986 2576</p>
            <p>📧 <strong>Email:</strong> ventas@tapipiel.com.mx</p>
            <a href='/' class='btn'>Volver al Inicio</a>
        </div>
    </body>
    </html>
    ";
}
?>
