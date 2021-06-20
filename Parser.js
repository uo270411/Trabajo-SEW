
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
		crearElemento("p","","footer");
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
		var stringDatos = "<ul><li>" + name + "</li>";
		stringDatos += "<li>" + playa + "</li>";
		stringDatos += "<li>" + ubi + "</li>";
        stringDatos += "<li>" + ini + "</li>";
		stringDatos += "<li>" + fin + "</li>";
		stringDatos += "<li>" + ocupacion + "</li>";
		stringDatos += "<li>" + oleaje + "</li>";
		stringDatos += "<li>" + imagen + "</li>";
		stringDatos += "<li>" + aguamax + "</li>";
		stringDatos += "<li>" + aguamin + "</li>";
		stringDatos += "<li>" + aguamed + "</li>";
		stringDatos += "<li>" + ambientemax + "</li>";
		stringDatos += "<li>" + ambientemin + "</li>";
		stringDatos += "<li>" + ambientemed + "</li>";
		stringDatos += "<li><img src="+imagen+"></li>";
        $("<img></img>").attr('src', "" + imagen + "").appendTo("div");
		$(this).find('incidencias').children('incidencia').each(function () {
			var descripcion = $(this).find('descripcion').text();
			var hora = $(this).find('hora').text();
			var gravedad = $(this).find('gravedad').text();
			stringDatos += "<li> Incidencia </li>";
			stringDatos += "<li>" + descripcion + "</li>";
			stringDatos += "<li>" + hora + "</li>";
			stringDatos += "<li>" + gravedad + "</li>";
   
        });
		 $("p").html(stringDatos);
      });
    },
    error: function () {
      $("<p></p>").html('An error occurred while processing XML file.').prependTo("#results");
    }
  });
}

function crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }