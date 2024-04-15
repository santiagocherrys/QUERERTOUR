export function initMap(sitio) {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9.8,
    center: { lat: 5.9674073, lng: -75.7097029 },
    disableDefaultUI: false,
  });

  directionsRenderer.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsRenderer, sitio);
}

export function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  sitio
) {
  /* const start = document.getElementById("start").value; */

  directionsService
    .route({
      origin: new google.maps.LatLng(6.2164895, -75.586498),
      destination: new google.maps.LatLng(sitio.latitud, sitio.longitud),
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      console.log(response);

      /* console.log(response.legs[0].duration.text); */
      directionsRenderer.setDirections(response);
      if (response) {
        console.log(
          "La distancia es: ",
          response.routes[0].legs[0].distance.text
        );
        console.log(
          "Tiempo aproximado es: ",
          response.routes[0].legs[0].duration.text
        );
        /* document.getElementById("sidebar").textContent = `La distancia es: ${response.routes[0].legs[0].distance.text} Tiempo aproximado es: ${response.routes[0].legs[0].duration.text}`; */
        document.getElementById(
          "distancia"
        ).textContent = `La distancia es: ${response.routes[0].legs[0].distance.text} Tiempo aproximado es: ${response.routes[0].legs[0].duration.text}`;
      }
    })
    .catch((e) => window.alert("Directions request failed due to " + e));
}
