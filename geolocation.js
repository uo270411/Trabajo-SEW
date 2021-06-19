"use strict";
class Geolocalizacion {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }
    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
       // this.precisionAltitud = posicion.coords.altitudeAccuracy;
       // this.rumbo            = posicion.coords.heading;
       // this.velocidad        = posicion.coords.speed;       
    }
	
	kms(lat1,lon1,lat2,lon2){
		rad = function(x) {return x*Math.PI/180;}
		var R = 6378.137; //Radio de la tierra en km
		var dLat = rad( lat2 - lat1 );
		var dLong = rad( lon2 - lon1 );
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		this.kilometros = d.toFixed(3); //Retorna tres decimales
		
	}
   
    mostrarDistancia(lat, lon){
        var situacion=document.getElementById('situacion');
        var datos=''; 
		kms(this.latitud, this.longitud, lat, lon);
        datos+='<p>Distancia a la playa: '+ this.kilometros +' km</p>'; 
       
        situacion.innerHTML = datos;
    }
	
}
var situacion = new Geolocalizacion();