<?php
// conexion.php
$servername = "localhost";
$username   = "root";      // Usuario por defecto en XAMPP
$password   = "";          // Sin contraseña por defecto
$database   = "kpop_db";   // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Error de conexión a la base de datos: " . $conn->connect_error);
}

// Forzar UTF-8 para acentos y caracteres especiales
$conn->set_charset("utf8mb4");
?>
