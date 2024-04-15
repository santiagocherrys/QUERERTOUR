/* Selectores*/
const btnOpenModal4 = document.querySelector("#btnOpenModal4");
const modal_body4 = document.querySelector(".modal-body4");
const exampleModalLabel4 = document.querySelector('#exampleModalLabel4');

/* Funcion que despliega los mapas */
export async function initMap4() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  const map = new Map(document.getElementById("map4"), {
    zoom: 12.5,
    center: { lat: 6.2442872, lng: -75.6224112 },
    mapId: "4504f8b37365c3d0",
  });
  // Set LatLng and title text for the markers. The first marker (Boynton Pass)
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.
  
  const tourStops = [
    {
      position: { lat: 6.2479483, lng: -75.6220137 },
      title: "Escaleras electricas",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/EscalerasElectricas.png", 
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/EscalerasElectricas.jpg"
    },
    {
      position: { lat: 6.26895, lng: -75.5646712 },
      title: "Jardin Botánico", 
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/JardinBotanico.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/JardinBotanico.jpg"
    },
    {
      position: { lat: 6.2459917, lng: -75.556538 },
      title: "Museo Casa de la Memoria",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/MuseoCasaMemoria.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/MuseoCasaMemoria.jpg"
    },
    {
      position: { lat: 6.1901443, lng: -75.5694506 },
      title: "Museo el Castillo",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/MuseoElCastillo.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/MuseoElCastillo.jpg"
    },
    {
      position: { lat: 6.2804401, lng: -75.5026875 },
      title: "Parque Arvi",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/ParqueArvi.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/ParqueArvi.jpg"
    },
    {
      position: { lat: 6.2233441, lng: -75.5794341 },
      title: "Parque de la conservación",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/ParqueConservacion.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/ParqueConservacion.jpg"
    },
    {
      position: { lat: 6.2695683, lng: -75.5657755 },
      title: "Parque Explora",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/ParqueExplora.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/ParqueExplora.jpeg"
    },
    {
      position: { lat: 6.2446509, lng: -75.5772046 },
      title: "Parque de los Pies Descalzos",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/ParquePiesDescalzos.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/ParquePiesDescalzos.jpg"
    },
    {
      position: { lat: 6.2693388, lng: -75.5658986 },
      title: "Planetario de Medellin",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/PlanetarioMedellin.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/PlanetarioMedellin.jpg"
    },
    {
      position: { lat: 6.2521454, lng: -75.568213 },
      title: "Plaza Botero",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/PlazaBotero.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/PlazaBotero.jpg"
    },
    {
      position: { lat: 6.2358497, lng: -75.5800663 },
      title: "Pueblito Paisa",
      img: "images/mapaSitiosIntMed/marcadoresSitiosIntMed/Pueblitopaisa.png",
      modalImg: "images/mapaSitiosIntMed/imgMapaPpalSitiosMed/Pueblitopaisa.jpg"
    },
  ];
  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();

  // Create the markers.
  tourStops.forEach(({ position, title, img, modalImg}, i) => {
    const pin = new PinElement({
      glyph: `${i + 1}`,
    });
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${title}`,
      content: pin.element,
      icon:`${img}`,
      modal: `${modalImg}`
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      /* infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker); */
      btnOpenModal4.click();
      exampleModalLabel4.textContent = marker.title;
      modal_body4.innerHTML = ` <img src=${marker.modal} class="d-block w-100 imgMapasMedellin" alt="Problema al cargar imagen"> `;
    });
  });
}

