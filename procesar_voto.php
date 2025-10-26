<?php
// procesar_voto.php
include('conexion.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $grupo = $conn->real_escape_string($_POST['grupo'] ?? '');

    if (empty($grupo)) {
        echo "<script>alert('Por favor selecciona un grupo antes de votar.'); window.location='musica.html';</script>";
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO votos (grupo) VALUES (?)");
    $stmt->bind_param('s', $grupo);

    if ($stmt->execute()) {
        echo "<script>alert('✅ Tu voto por $grupo fue registrado con éxito. ¡Gracias por participar!'); window.location='musica.html';</script>";
    } else {
        echo "<script>alert('Error al registrar el voto.'); window.location='musica.html';</script>";
    }

    $stmt->close();
    $conn->close();
} else {
    header('Location: musica.html');
    exit;
}
?>
