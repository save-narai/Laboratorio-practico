<?php
// procesar_registro.php
include("conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre   = trim($_POST['name'] ?? '');
    $usuario  = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validaciones básicas
    if (!$nombre || !$usuario || !$email || !$password) {
        echo "<script>alert('Por favor completa todos los campos.'); window.location='login.html#register';</script>";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Correo electrónico no válido.'); window.location='login.html#register';</script>";
        exit;
    }

    // Encriptar contraseña
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // Verificar si el usuario o email ya existen
    $check = $conn->prepare("SELECT id FROM usuarios WHERE email = ? OR usuario = ?");
    $check->bind_param('ss', $email, $usuario);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "<script>alert('El correo o usuario ya están registrados.'); window.location='login.html#register';</script>";
        $check->close();
        $conn->close();
        exit;
    }
    $check->close();

    // Insertar nuevo usuario
    $sql = $conn->prepare("INSERT INTO usuarios (nombre, usuario, email, password) VALUES (?, ?, ?, ?)");
    $sql->bind_param('ssss', $nombre, $usuario, $email, $hash);

    if ($sql->execute()) {
        echo "<script>alert('✅ Registro exitoso. Ahora puedes iniciar sesión.'); window.location='login.html';</script>";
    } else {
        error_log("Error al registrar usuario: " . $sql->error);
        echo "<script>alert('❌ Error al registrar. Intenta nuevamente.'); window.location='login.html#register';</script>";
    }

    $sql->close();
    $conn->close();
} else {
    header('Location: login.html');
    exit;
}
?>
