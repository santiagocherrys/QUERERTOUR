// Importar los mapas
import { initMap2 } from "../js/pueblosReferenciados.js";
import { initMap4 } from "../js/medellinReferenciados.js";
// Importar la función printTownsCards que pinta las cards
import { printTownsCards } from "../app/appPueblos.js";

import { renderCardsMedellinSites } from "../app/appSitiosMedellin.js";
import { getTowns } from "../app/appPueblos.js";
import { getPlacesMedellin } from "../app/appSitiosMedellin.js";

export const urlBase = "https://json-server-querertour.onrender.com";

/* PUEBLOS */
//1. definir el evento que ocurre para llamar la Api

//document.addEventListener("DOMContentLoaded", getTownsCards);
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const greetingValue = urlParams.get('greeting');
    console.log("Esto es el valor que envio desde acerca de : " ,greetingValue);
    pintarNav();
    getTownsCards();
    renderCardsMedellinSites();
  });


/* Paso 2 json-server: obtener datos (pueblos) desde rest api - GET */
export async function getTownsCards() {
    try {
        initMap2();
        initMap4(); 
        const data = await getTowns();

        printTownsCards(data);
    } catch (error) {
        console.log(error);
    }
}



/* SITIOS DE INTERÉS DE MEDELLÍN */
//1. definir el evento que ocurre para llamar la Api

/* Paso 2 json-server: obtener datos (sitios de Medellín) desde rest api - GET */
export async function getCardsMedellinSites() {

    console.log("Hola desde getCardsMedellinSites");

    try {
        
        const data = await getPlacesMedellin();
        console.log("Datos del objeto json de sitios de interes medellin");
        console.log("Hola desde data de sitios de interes medellin");
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


// Función general para limpiar el HTML

export function cleanHTML(box) {
    while (box.firstChild) {
        box.removeChild(box.firstChild);
    }
}

/* Pintar las listas desplegables del menu nav */
/* Lista desplegable pueblos terminal del sur */
const listaPueblos = document.getElementById('listaPueblos');/* Menu navegación */

/* Lista desplegable sitios de medellín Medellín */
const listaMedellin = document.getElementById('listaMedellin');



async function pintarNav(){
    let data = await getTowns();
    data.forEach(lugar =>{
        listaPueblos.innerHTML += `<li><a href=${lugar.url}>${lugar.nombre}</a></li>`;
    });

    data = await getPlacesMedellin();

    data.forEach( lugar => {
        listaMedellin.innerHTML += `<li><a href="#cards_medellin">${lugar.nombre}</a>`;  
    });
}


