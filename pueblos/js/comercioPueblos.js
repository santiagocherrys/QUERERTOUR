/* Organización del código*/

import { getTowns } from "/pueblos/api/api.js";

let map;
let places;
let infoWindow;
let markers = [];

//
//"https://developers.google.com/maps/documentation/javascript/images/marker_green"
const MARKER_PATH =
"https://img.icons8.com/2266EE/search";
const hostnameRegexp = new RegExp("^https?://.+?/");

//const jardin = { lat: sitiosInteres['jardin'].latitud[0], lng: sitiosInteres['jardin'].longitud[0] };
const lugar = document.getElementById('lugar');
const sitios = document.getElementById('sitios');
let position;



//Pintar mapas
escogerPueblo.addEventListener('input',(e)=>{
  console.log(e.target.value);
  
  pintarSelector(e.target.value);
});

async function pintarSelector(opcPueblo){
  const pueblos = await getTowns();
  /* Limpio todo antes de buscar */
  clearMarkers();
  clearResults();

  /* Filtrar por lugar */
  const pueblo = pueblos.filter(buscarPueblo);

  console.log("este es el filtro lugar:" , pueblo);
  const sitios2 = pueblo[0].sitiosInteres;
  console.log("Estos son los sitios de interes" , sitios2);
  
//Borrar los selectorefa-spin
 sitios.innerHTML = `
 <option value="default" selected>Seleccione sitio interes</option>
 `;

  //pintar los selectores
  sitios2.forEach((site)=> {
    const option = document.createElement('option');
    option.textContent = site.lugar;
    option.value = site.lugar;
    sitios.appendChild(option);
  });

  //funcion filtro
  function buscarPueblo(resultado){
    if(opcPueblo){
      return resultado.nombre === opcPueblo;
    }else{
      return resultado;
    }
  }
  initMap(pueblo);
  
}

let marker = "";
function initMap(pueblo) {
  const sitioPueblo = { lat: pueblo[0].mapaPueblo.latitud, lng: pueblo[0].mapaPueblo.longitud };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: sitioPueblo,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
  });
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById("info-content"),
  });
  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  
  places = new google.maps.places.PlacesService(map);
 
    console.log(lugar.value);

    lugar.addEventListener('input', (e)=>{
      console.log("El elemento a filtrar es", e.target.value);

      /* Limpio todo antes de buscar */
      clearMarkers();
      clearResults();

      if(sitios.value == "default"){
        console.log("No hago nada");
      }else{
        search(e.target.value, position);
      }  
      
    })

    sitios.addEventListener('input',(e)=>{
        clearMarkers();
        clearResults();
        if(marker !== ""){
            marker.setMap(null);
        }
        /* Actualizar zoom */
        /* if(e.target.value == "Tour"){
            map.setZoom(13);
        } */
        //Se filtra por sitiosIntere
        const sitios_Interes = pueblo[0].sitiosInteres;
        console.log(e.target.value);
        console.log("Tu identificador es: ", sitios_Interes);

        //Se filtra por sitio especifico
        const lugarPintar = sitios_Interes.filter(filtrarElSitio);
        console.log(lugarPintar.length);

        function filtrarElSitio(resultado){
          if(e.target.value){
            return resultado.lugar === e.target.value;
          }else{
            return resultado;
          }
          
        }

        
        const indexLugar = sitiosInteres['jardin'].identificador.indexOf(e.target.value);

        /* Actualizar posicion mapa */
        if(lugarPintar.length > 0){
            //map.setCenter({ lat: sitiosInteres['jardin'].latitud[indexLugar], lng: sitiosInteres['jardin'].longitud[indexLugar] });
            map.setCenter({ lat: lugarPintar[0].mapaLugar.latitud, lng: lugarPintar[0].mapaLugar.longitud });

            /* Pintar marcador */
            position = { lat: lugarPintar[0].mapaLugar.latitud, lng: lugarPintar[0].mapaLugar.longitud };
            const title = "Jardin";
            const img = "estasAqui.png";
            marker = new google.maps.Marker({
            position,
            map,
            title: `${title}`,
            icon: `${img}`,

        
      });
      }
        
        

      /* Pintar Recomendaciones */
      if(lugarPintar.length > 0){
        search(lugar.value, position);
      }else{
        clearResults();
        map.setCenter({ lat: lugarPintar[0].mapaLugar.latitud, lng: lugarPintar[0].mapaLugar.longitud });
      }
    })
}

// Search for restaurants and hotels in the selected city, within the viewport of the map.
function search(sitio, posicion) {

  places.nearbySearch({location: posicion, radius: 150, type: sitio}, (results, status, pagination) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      clearResults();
      clearMarkers();

      // Create a marker for each hotel or restaurant found, and
      // assign a letter of the alphabetic to each marker icon.
      for (let i = 0; i < results.length; i++) {
        const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
        //const markerIcon = MARKER_PATH + markerLetter + ".png";
        const markerIcon = MARKER_PATH;

        console.log(results[i].geometry.location);
        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon,
        });
        // If the user clicks a hotel marker, show the details of that hotel
        // in an info window.
        // @ts-ignore TODO refactor to avoid storing on marker
        markers[i].placeResult = results[i];
        console.log("Esto es result" , results);
        google.maps.event.addListener(markers[i], "click", showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
      }
    }
  });
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }

  markers = [];
}

function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}

function addResult(result, i) {
  const results = document.getElementById("results");
  const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
  const markerIcon = MARKER_PATH + markerLetter + ".png";
  const tr = document.createElement("tr");

  tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";
  tr.onclick = function () {
    google.maps.event.trigger(markers[i], "click");
  };

  const iconTd = document.createElement("td");
  const nameTd = document.createElement("td");
  const icon = document.createElement("img");

  icon.src = markerIcon;
  icon.setAttribute("class", "placeIcon");
  icon.setAttribute("className", "placeIcon");

  const name = document.createTextNode(result.name);

  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}

function clearResults() {
  const results = document.getElementById("results");

  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
  // @ts-ignore
  const marker = this;

  places.getDetails(
    { placeId: marker.placeResult.place_id },
    (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }

      infoWindow.open(map, marker);
      buildIWContent(place);
    },
  );
}

//Selectores de infowindow
const iw_icon = document.getElementById("iw-icon");
const iw_url = document.getElementById("iw-url");
const iw_address = document.getElementById("iw-address");
const iw_phone_row = document.getElementById("iw-phone-row");
const iw_phone = document.getElementById("iw-phone");
const iw_rating_row = document.getElementById("iw-rating-row");
const iw_website_row = document.getElementById("iw-website-row");
const iw_website = document.getElementById("iw-website");
const iw_rating = document.getElementById("iw-rating");
// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
  iw_icon.innerHTML =
    '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
  iw_url.innerHTML =
    '<b><a href="' + place.url + '">' + place.name + "</a></b>";
    iw_address.textContent = place.vicinity;
  if (place.formatted_phone_number) {
    iw_phone_row.style.display = "";
    iw_phone.textContent =
      place.formatted_phone_number;
  } else {
    iw_phone_row.style.display = "none";
  }

  // Assign a five-star rating to the hotel, using a black star ('&#10029;')
  // to indicate the rating the hotel has earned, and a white star ('&#10025;')
  // for the rating points not achieved.
  if (place.rating) {
    let ratingHtml = "";

    for (let i = 0; i < 5; i++) {
      if (place.rating < i + 0.5) {
        ratingHtml += "&#10025;";
      } else {
        ratingHtml += "&#10029;";
      }

      iw_rating_row.style.display = "";
      iw_rating.innerHTML = ratingHtml;
    }
  } else {
    iw_rating_row.style.display = "none";
  }

  // The regexp isolates the first part of the URL (domain plus subdomain)
  // to give a short URL for displaying in the info window.
  if (place.website) {
    let fullUrl = place.website;
    let website = String(hostnameRegexp.exec(place.website));

    if (!website) {
      website = "http://" + place.website + "/";
      fullUrl = website;
    }

    iw_website_row.style.display = "";
    iw_website.textContent = website;
  } else {
    iw_website_row.style.display = "none";
  }
}

//window.initMap = initMap;
//initMap();