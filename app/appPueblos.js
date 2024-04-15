// Importar mapas
import { initMap } from "../js/PuebloRuta.js";
// Importar la función declarada en getTownsCards y la función cleanHTML 
import { urlBase, cleanHTML } from "../apiConnection/API.js";


// Selectores
const cardsContainer = document.querySelector(".container-town-cards");
//const modalBodyContainerMaps = document.querySelector(".modal-body-container-maps");

// Función que pinta las cards de los pueblos en el HTML
export function printTownsCards(townsCardsList) {

    
    cleanHTML(cardsContainer);

    console.log("Cards container: ", cardsContainer);
    townsCardsList.forEach((townCard) => {
        cardsContainer.innerHTML += `
        <div class="card text-center" style="width: 18rem;">
          <div class="card-body">
            <a href="#" role="button" class="btn imgBtnModal" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${townCard.id} pueblo=${townCard.nombre}> 
                <img src="${townCard.imagen}" class="card-img-top img-town" alt="..."> 
            </a>
            <h5 class="card-title">${townCard.nombre}</h5>
          </div>
        </div>
      `;

        /* Ponerle evento al boton */
    });

    /* A cada botón con el atributo imgBtnModal creado anteriormente en la card, se recorre para añadirle el evento click
    */
    const botones = document.querySelectorAll('.imgBtnModal');
    console.log(botones);
    
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            console.log("Tu id es: ", boton.getAttribute('id'));
            console.log(("Tu pueblo: ", boton.getAttribute('pueblo')));
            btnMoreDetails(boton.getAttribute("id"), boton.getAttribute("pueblo"));
        })

    });

}

// Función para pintar los datos del modal asociados al botón de cada card
export async function btnMoreDetails(id, lugar) {
    console.log("Este es el pueblo", lugar);
    try {
        
        const data = await getTowns();

        console.log("Soy data desde btnMoreDetails",);

        const descripcion = document.querySelector('#descripcion');
        const exampleModalLabel = document.querySelector('#exampleModalLabel');
        data.forEach((pueblo) => {

            /* descripcion pueblo */
            if (id == pueblo.id) {
                descripcion.innerHTML = `
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><strong> Descripción: </strong> ${pueblo.descripcionCaro}</td>
                                <td><a href="${pueblo.url}" type="button" class="btn btn-primary"> Ir </a></td>
                            </tr>
                        </tbody>
                    </table> 
            `;

                /* Pintar titulo de card */
                exampleModalLabel.textContent = "Pueblo: " + pueblo.nombre;
            }

            if (pueblo.nombre == lugar) {
                initMap(pueblo.mapaPueblo);
            }
        })

    } catch (error) {
        console.log(error);
    }
}

/* Funcion obtener dato pueblos */

export async function getTowns() {
    const response = await fetch(`${urlBase}/pueblos`);
    const towns = await response.json();

    return towns;
}



