<?php
// procesar_login.php
session_start();
include("conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        echo "<script>alert('Por favor completa todos los campos.'); window.location='login.html';</script>";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Correo electrónico no válido.'); window.location='login.html';</script>";
        exit;
    }

    // Buscar usuario por email
    $stmt = $conn->prepare("SELECT id, nombre, usuario, password FROM usuarios WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        $user = $res->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            // Login exitoso
            $_SESSION['usuario'] = $user['usuario'];
            $_SESSION['nombre']  = $user['nombre'];

            echo "<script>alert('Bienvenido, " . addslashes($user['nombre']) . "'); window.location='index.html';</script>";
            exit;
        } else {
            echo "<script>alert('❌ Contraseña incorrecta.'); window.location='login.html';</script>";
            exit;
        }
    } else {
        echo "<script>alert('❌ No existe una cuenta con ese correo.'); window.location='login.html';</script>";
        exit;
    }

    $stmt->close();
    $conn->close();
} else {
    header('Location: login.html');
    exit;
}
?>
