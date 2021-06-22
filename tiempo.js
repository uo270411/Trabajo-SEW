"use strict";

class Meteo {
    constructor(){
       this.apikey = "a8ed74d9f48e4ad89ae0076084f6f7a9";
        this.ciudad = "Oviedo";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.weatherbit.io/v2.0/current?city="+"Madrid"+"&country=ES&key=a8ed74d9f48e4ad89ae0076084f6f7a9&include=minutely"
        this.correcto = "¡Todo correcto! Datos recibidos de <a href='https://www.weatherbit.io'>Weatherbit</a>"
		
    }
	
    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    $("pre").text(JSON.stringify(datos, null, 2));
                
                    //Presentacion de los datos contenidos en JSON
                    
                    var stringDatos = "<ul><li>Ciudad: " + datos.data[0].city_name + "</li>";
                        stringDatos += "<li>País: " + datos.data[0].country_code + "</li>";
                        stringDatos += "<li>Latitud: " + datos.data[0].lat + " grados</li>";
                        stringDatos += "<li>Longitud: " + datos.data[0].lon + " grados</li>";
                        stringDatos += "<li>Temperatura: " + datos.data[0].app_temp + " grados </li>";
                        stringDatos += "<li>Presión: " + datos.data[0].pres + " milibares</li>";
                        stringDatos += "<li>Amanece a las: " + datos.data[0].sunrise + "</li>";
                        stringDatos += "<li>Oscurece a las: " + datos.data[0].sunset + "</li>";
                        stringDatos += "<li>Dirección del viento: " + datos.data[0].wind_dir + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + datos.data[0].wind_spd + " metros/segundo</li>";
                        stringDatos += "<li>Fecha de la medida: " + datos.data[0].datetime + "</li>";
                        stringDatos += "<li>Descripción: " + datos.data[0].weather.description + "</li>";
                        stringDatos += "<li>Visibilidad: " + datos.data[0].vis + " metros</li>";
                        stringDatos += "<li>Nubosidad: " + datos.data[0].clouds + " %</li></ul>";
                    
                    $("p").html(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener datos de <a href='https://www.weatherbit.io'>Weatherbit</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
        });
    }
	
	cargarCoordenadas(texto){
		$.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    
                    var latitud = datos.data[0].lat;
                    var longitud = datos.data[0].lon;
                    situacion.mostrarDistancia(latitud, longitud, texto);
	
                   
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener datos de <a href='https://www.weatherbit.io'>Weatherbit</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
        });
	}
	
	
    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    verJSON(texto, ciudad){
		$("p").remove();
		$("h3").remove();
        this.crearElemento("h3",this.correcto,texto);     
        this.crearElemento("p","",texto);
        this.url = "https://api.weatherbit.io/v2.0/current?city="+ciudad+"&country=ES&key=a8ed74d9f48e4ad89ae0076084f6f7a9&include=minutely"
        this.correcto = "¡Todo correcto! Datos recibidos de <a href='https://www.weatherbit.io'>Weatherbit</a>"
        this.cargarDatos();
    }
	verCoordenadas(texto, ciudad){
		$("h3").remove();
		$("p").remove();
		this.crearElemento("p","",texto);
		this.url = "https://api.weatherbit.io/v2.0/current?city="+ciudad+"&country=ES&key=a8ed74d9f48e4ad89ae0076084f6f7a9&include=minutely"
        this.correcto = "¡Todo correcto! Datos recibidos de <a href='https://www.weatherbit.io'>Weatherbit</a>"
        this.cargarCoordenadas(texto);
	}
	
	kms(lat1,lon1,lat2,lon2){
		var rad = function(x) {return x*Math.PI/180;}
		var R = 6378.137; //Radio de la tierra en km
		var dLat = rad( lat2 - lat1 );
		var dLong = rad( lon2 - lon1 );
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		this.kilometros = d.toFixed(3); //Retorna tres decimales
		
	}
	 
}
var meteo = new Meteo();

class Geolocalizacion {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }
    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;    
    }
	
   
    mostrarDistancia(lat, lon, texto){
        var elem=document.getElementById(texto);
        var datos=''; 
		meteo.kms(this.latitud, this.longitud, lat, lon);
        datos+='<p>Distancia a la playa: '+ meteo.kilometros +' km</p>'; 
       
        elem.innerHTML = datos;
    }
	
}
var situacion = new Geolocalizacion();