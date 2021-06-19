"use strict";
function procesar(url){
  $.ajax({
    type: "GET",
    beforeSend: function(request) {
      request.setRequestHeader('Content-Type', 'application/xml');
    },
    url: url,
    dataType: "xml",
    success: function (xml) {

      $(xml).find('informes').children('informe').each(function () {
        var name = "Socorrista: " + $(this).find('socorrista').text();
        var playa = "Playa " + $(this).find('playa').text();
		var ubi = "Ubicación: " + $(this).find('ubicacion').text();
		var ini = "Hora de entrada: " + $(this).find('horainicio').text();
		var fin = "Hora de salida: " + $(this).find('horafinal').text();
		var ocupacion = "Ocupación: " + $(this).find('ocupacion').text();
		var oleaje = $(this).find('oleaje').text();
		var imagen = $(this).find('foto').text();
		var aguamax = "Temperatura máxima del agua: " +$(this).children('temperaturaagua').find('maxima').text() + "ºC";
		var aguamin = "Temperatura mínima del agua: " +$(this).children('temperaturaagua').find('minima').text() + "ºC";
		var aguamed = "Temperatura media del agua: " +$(this).children('temperaturaagua').find('media').text() + "ºC";
		var ambientemax = "Temperatura máxima del ambiente: " +$(this).children('temperaturaambiente').find('maxima').text() + "ºC";
		var ambientemin = "Temperatura mínima del ambiente: " +$(this).children('temperaturaambiente').find('minima').text() + "ºC";
		var ambientemed = "Temperatura media del ambiente: " +$(this).children('temperaturaambiente').find('media').text() + "ºC";
        $("<h2></h2>").html(name).appendTo("div");
        $("<h2></h2>").html(playa).appendTo("div");
		$("<li></li>").html(ubi).appendTo("div");
		$("<li></li>").html(ini).appendTo("div");
		$("<li></li>").html(fin).appendTo("div");
		$("<li></li>").html(oleaje).appendTo("div");
		$("<li></li>").html(ocupacion).appendTo("div");
		$("<li></li>").html(aguamax).appendTo("div");
		$("<li></li>").html(aguamin).appendTo("div");
		$("<li></li>").html(aguamed).appendTo("div");
		$("<li></li>").html(ambientemax).appendTo("div");
		$("<li></li>").html(ambientemin).appendTo("div");
		$("<li></li>").html(ambientemed).appendTo("div");
        $("<img></img>").attr('src', "" + imagen + "").appendTo("div");
		$(this).find('incidencias').children('incidencia').each(function () {
			var descripcion = $(this).find('descripcion').text();
			var hora = $(this).find('hora').text();
			var gravedad = $(this).find('gravedad').text();
			$("<h3></h3>").html("Incidencia").appendTo("div");
			$("<li><li>").html(descripcion).appendTo("div");
			$("<li><li>").html(hora).appendTo("div");
			$("<li><li>").html(gravedad).appendTo("div");
   
        });
      });
    },
    error: function () {
      $("<p></p>").html('An error occurred while processing XML file.').prependTo("#results");
    }
  });
}