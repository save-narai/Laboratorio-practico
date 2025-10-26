<?php
// resultados.php
include('conexion.php');

// Obtener totales por grupo
$sql = "SELECT grupo, COUNT(*) AS total FROM votos GROUP BY grupo ORDER BY total DESC";
$result = $conn->query($sql);

$totales = [];
$max = 1;
while ($row = $result->fetch_assoc()) {
    $totales[$row['grupo']] = (int)$row['total'];
    if ($totales[$row['grupo']] > $max) $max = $totales[$row['grupo']];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Resultados - Votación K-Pop</title>
<link rel="stylesheet" href="css/musica.css">
<style>
/* Small styles specific for results */
.resultados-container{max-width:900px;margin:40px auto;padding:20px;background:rgba(0,0,0,0.6);border-radius:12px;color:#fff;}
.result-row{display:flex;align-items:center;gap:16px;margin:14px 0;}
.grp-name{width:180px;font-weight:700;font-size:1.05rem;color:#ffd1f7;}
.bar-wrap{flex:1;background:rgba(255,255,255,0.06);border-radius:999px;height:28px;overflow:hidden;position:relative;}
.bar{height:100%;border-radius:999px;background:linear-gradient(90deg,#ff5edf,#7a3cff);width:0%;transition:width 1s ease;}
.count{width:70px;text-align:right;font-weight:700;color:#fff;}
.header-results{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
.title-neon{font-size:1.6rem;color:#ff9ef5;text-shadow:0 0 8px rgba(255,158,245,0.35);}
</style>
</head>
<body>
<div class="resultados-container">
  <div class="header-results">
    <div class="title-neon">Resultados de la votación</div>
    <a href="musica.html" class="btn-resultados" style="text-decoration:none;padding:8px 12px;border-radius:8px;background:#7a3cff;color:#fff;">Volver</a>
  </div>
  <?php if(empty($totales)): ?>
    <p>No hay votos aún. ¡Sé el primero en participar!</p>
  <?php else: ?>
    <?php foreach($totales as $grupo => $total): 
        $pct = ($max>0) ? round(($total / $max) * 100) : 0;
    ?>
      <div class="result-row">
        <div class="grp-name"><?php echo htmlspecialchars($grupo); ?></div>
        <div class="bar-wrap">
          <div class="bar" data-pct="<?php echo $pct; ?>"></div>
        </div>
        <div class="count"><?php echo $total; ?></div>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>

<script>
// Animar barras al cargar
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.bar').forEach(function(b){
    var pct = b.getAttribute('data-pct') || 0;
    b.style.width = pct + '%';
  });
});
</script>
</body>
</html>
