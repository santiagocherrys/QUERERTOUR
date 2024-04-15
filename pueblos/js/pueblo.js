import { endMenu, modeMenu, sidebar, startMenu } from "./app.js";

/* Jardín */
export function initMap(latitud, longitud) {

  /* Selectores */
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: latitud, lng: longitud},
      disableDefaultUI: true,
    });
  
    directionsRenderer.setMap(map);
    //directionsRenderer.setPanel(document.getElementById("sidebar"));
  
    const control = document.getElementById("floating-panel");
  
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    
    startMenu.addEventListener("change", onChangeHandler);
    endMenu.addEventListener("change", onChangeHandler);
    modeMenu.addEventListener("change", onChangeHandler);
  }
  
  let selectedMode = modeMenu.value;
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const start = startMenu.value;
    const end = endMenu.value;
    selectedMode = modeMenu.value;
    console.log(selectedMode);
    /* const arrayStart = direcciones(start);
    const arrayEnd = direcciones(end) */

  
    directionsService
      .route({
        origin: start, //{ lat: arrayStart[0], lng: arrayStart[1]}
        destination: end, //{ lat: arrayEnd[0], lng: arrayEnd[1]}
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        console.log(response);
        console.log("La distancia es: " ,response.routes[0].legs[0].distance.text);
        console.log("Tiempo aproximado es: ", response.routes[0].legs[0].duration.text);
        sidebar.textContent = `La distancia es: ${response.routes[0].legs[0].distance.text} Tiempo aproximado es: ${response.routes[0].legs[0].duration.text}`;
        /* console.log(response.legs[0].duration.text); */
        directionsRenderer.setDirections(response);
      })
      .catch((e) =>  {
        window.alert("Directions request failed due to " + "No està disponible la ruta en " + selectedMode +" Cambie modo de viaje por favor " , e)
      }
      
      );
  }

 
//window.initMap = initMap;