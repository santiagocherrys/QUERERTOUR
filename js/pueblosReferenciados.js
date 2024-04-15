import { getTowns } from "../app/appPueblos.js";

const btnOpenModal2 = document.querySelector("#btnOpenModal2");
const modal_body2 = document.querySelector(".modal-body2");
const exampleModalLabel2 = document.querySelector("#exampleModalLabel2");
const imgSlides = document.querySelectorAll(".d-block");
const texto = document.querySelectorAll("h4");

export async function initMap2() {
  // Request needed libraries.
  /* console.log(sitiosInteres); */
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );
  const map = new Map(document.getElementById("map2"), {
    zoom: 9.8,
    center: { lat: 5.9674073, lng: -75.7097029 },
    mapId: "4504f8b37365c3d0",
  });
  // Set LatLng and title text for the markers. The first marker (Boynton Pass)
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.

  const tourStops = [
    {
      position: { lat: 6.0404174, lng: -75.7026932 },
      title: "Amagá",
      id: "amaga",
      img: "images/mapaPueblos/marcadoresPueblos/Amaga.png",
      modalImg: "img/principal/Amaga.jpg",
    },
    {
      position: { lat: 5.6559828, lng: -75.8777244 },
      title: "Andes",
      id: "andes",
      img: "images/mapaPueblos/marcadoresPueblos/Andes.png",
      modalImg: "img/principal/Andes.jpg",
    },
    {
      position: { lat: 5.596767, lng: -75.819361 },
      title: "Jardín",
      id: "jardin",
      img: "images/mapaPueblos/marcadoresPueblos/Jardin.png",
      modalImg: "img/principal/Jardin.jpg",
    },
    { 
      position: { lat: 5.7913242, lng: -75.7860049 },
      title: "Jericó",
      id: "jerico",
      img: "images/mapaPueblos/marcadoresPueblos/Jerico.png",
      modalImg: "img/principal/Jerico.jpg",
    },
    {
      position: { lat: 6.0311182, lng: -75.4317638 },
      title: "La Ceja",
      id: "laceja",
      img: "images/mapaPueblos/marcadoresPueblos/LaCeja.png",
      modalImg: "img/principal/LaCeja.jpg",
    },
    {
      position: { lat: 5.6632863, lng: -75.7122541 },
      title: "Támesis",
      id: "tamesis",
      img: "images/mapaPueblos/marcadoresPueblos/Tamesis.png",
      modalImg: "img/principal/Tamesis.png",
    },
    {
      position: { lat: 5.9631723, lng: -75.7342431 },
      title: "Venecia",
      id: "venecia",
      img: "images/mapaPueblos/marcadoresPueblos/Venecia.png",
      modalImg: "img/principal/Venecia.jpg",
    }
  ];
  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();


  
  /* obtener datos pueblos */
  const pueblos = await getTowns();

  
  // Create the markers.
  
  tourStops.forEach(({ position, title, img, modalImg, id }, i) => {
    const pin = new PinElement({
      glyph: `${i + 1}`,
    });
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${title}`,
      content: pin.element,
      icon: `${img}`,
      modal: `${modalImg}`,
      id: `${id}`,
    });

    

    
    
    
    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      const pueblo = pueblos.filter(buscar);
      console.log("este es el filtro: ", pueblo);
      console.log(pueblo[0].sitiosInteres);
      function buscar(sitio) {
        if (marker.title) {
          return sitio.nombre === marker.title;
        } else {
          return sitio;
        }
      }

      infoWindow.close();
      /* infoWindow.setContent(marker.title); */
      /* infoWindow.open(marker.map, marker); */
      btnOpenModal2.click();
      exampleModalLabel2.textContent = marker.title;
      console.log("Su identificador", marker.id);
      /* modal_body2.innerHTML = ` <img src=${marker.modal} alt="Problema al cargar imagen"> `; */
      let i = 0;
      
      imgSlides.forEach((slide) => {

        slide.src = pueblo[0].sitiosInteres[i].imagen;
        texto[i].textContent = pueblo[0].sitiosInteres[i].lugar;
        i++;
        /* slide.src= "img/carrusel/img1.jpg"; */
      });
    });
  });
}


