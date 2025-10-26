<?php
// procesar_voto.php
include("conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $grupo = $_POST['grupo'] ?? '';

    if (!empty($grupo)) {
        $stmt = $conn->prepare("INSERT INTO votos (grupo) VALUES (?)");
        $stmt->bind_param('s', $grupo);

        if ($stmt->execute()) {
            echo "<script>alert('✅ Tu voto por $grupo fue registrado con éxito. ¡Gracias por participar!'); window.location='galeria.html';</script>";
        } else {
            echo "<script>alert('Error al registrar el voto.'); window.location='galeria.html';</script>";
        }
        $stmt->close();
    } else {
        echo "<script>alert('Por favor selecciona un grupo antes de votar.'); window.location='galeria.html';</script>";
    }
} else {
    header("Location: galeria.html");
    exit;
}

$conn->close();
?>
