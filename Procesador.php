<?php
//datos de la base de datos
$servername = "localhost";
$username = "DBUSER2020";
$password = "DBPSWD2020";
$database = "guiasew";
// Conexión al SGBD local con XAMPP con el usuario creado
$db = new mysqli($servername,$username,$password,$database);
// comprueba la conexion
if($db->connect_error) {
exit ("<h2>ERROR de conexión:".$db->connect_error."</h2>");
} else {echo "<h2>Conexión establecida</h2>";}

//prepara la sentencia de inserción
$consultaUser = $db->prepare("INSERT INTO usuario (nombreusuario) VALUES (?)");
//añade los parámetros de la variable Predefinida $_POST
// sss indica que se añaden 3 string
$consultaUser->bind_param('s',
$_POST["usuario"]);
//ejecuta la sentencia
$consultaUser->execute();
//muestra los resultados
echo "<p>Filas agregadas: " . $consultaUser->affected_rows . "</p>";
$consultaUser->close();

//prepara la sentencia de inserción
$consultaPlaya = $db->prepare("INSERT INTO playa (nombreplaya) VALUES (?)");
//añade los parámetros de la variable Predefinida $_POST
// sss indica que se añaden 3 string
$consultaPlaya->bind_param('s',
$_POST["playa"]);
//ejecuta la sentencia
$consultaPlaya->execute();
//muestra los resultados
echo "<p>Filas agregadas: " . $consultaPlaya->affected_rows . "</p>";
$consultaPlaya->close();

//prepara la sentencia de inserción
$consultaOp = $db->prepare("INSERT INTO opinion (texto, playa, usuario) VALUES (?, ?, ?)");
//añade los parámetros de la variable Predefinida $_POST
// sss indica que se añaden 3 string

$consultaOp->bind_param('sss',
$_POST["opinion"], $_POST["playa"], $_POST["usuario"]);
//ejecuta la sentencia
$consultaOp->execute();
//muestra los resultados
echo "<p>Filas agregadas: " . $consultaOp->affected_rows . "</p>";
$consultaOp->close();


//cierra la base de datos
$db->close();
?>