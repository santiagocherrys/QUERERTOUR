import { getCardsMedellinSites } from "../apiConnection/API.js"

// Importar la función declarada en getTownsCards y la función cleanHTML 
import { urlBase, cleanHTML } from "../apiConnection/API.js"


// Selectores
const cardsContainerSitesMede = document.querySelector(
    ".container-sites-medellin-cards"
);

// Función que pinta las cards de los sitios de interés de Medellín en el HTML
export async function renderCardsMedellinSites() {
    const cardsMedellinSites = await getCardsMedellinSites();

    cleanHTML(cardsContainerSitesMede);

    cardsMedellinSites.forEach((cardMedellinSite) => {
        cardsContainerSitesMede.innerHTML += `
              <div class="card text-center" style="width: 18rem;">
                  <div class="card-body">
                      <a href="#" role="button" class="btn imgBtnModalSitiosMed" data-bs-toggle="modal" data-bs-target="#exampleModal3" id=${cardMedellinSite.id}> 
                          <img src="${cardMedellinSite.imagen}" class="card-img-top img-med-site" alt="...">
                      </a>
                      <h5 class="card-title">${cardMedellinSite.nombre}</h5>
                  </div>
              </div>
          `;
    });


    /* A cada botón con el atributo imgBtnModalSitiosMed creado anteriormente en la card, se recorre para añadirle el evento click
  */

    const botonesSitesMed = document.querySelectorAll(".imgBtnModalSitiosMed");
    console.log(botonesSitesMed);

    botonesSitesMed.forEach((botonSiteMed) => {
        botonSiteMed.addEventListener('click', (e) => {
            console.log("El ID es", botonSiteMed.getAttribute("id"));

            btnMoreDetailsSitesMed(botonSiteMed.getAttribute("id"));
        })
    });
}


async function btnMoreDetailsSitesMed(id) {
    try {
        const data = await getPlacesMedellin();

        console.log("Hola desde btnMoreDetailsSitesMed");
        console.log(data);

        const descripcionSitiosMed = document.querySelector('#descSitiosMed');
        console.log("linea 57");
        console.log(descripcionSitiosMed);
        const exampleModalLabel3 = document.querySelector('#exampleModalLabel3');
        console.log("linea 60");
        console.log(exampleModalLabel3);
        /* exampleModalLabel3.textContent = "Sitio de interés yaaaaaaaaaaa: ";
        descripcionSitiosMed.innerHTML = `<h1> Hola Mundo </h1>`; */
        data.forEach((sitioIntMede) => {
            console.log("linea 63");
            console.log(sitioIntMede);
            /* Descripcion Sitios Medellin */
            /* console.log("este es el id",id , " y su condicional ", (id == sitioIntMede.id)); */
            /* console.log("tipo de id: ",typeof(id)); */
            console.log("id id ", id);
            if (id == sitioIntMede.id) {
                descripcionSitiosMed.innerHTML = `
                    <table class="table">
                    <tbody>
                    <tr>
                        <td> <strong> Video: </strong>
                        <iframe width="465" height="315" padding="0" src=" ${sitioIntMede.videoSitioMed}" title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        </td>
                    </tr>
                    <tr>
                        <td>  <strong> Descripción: </strong>${sitioIntMede.descripcion}</td>
                    </tr>
                    </tbody>
                </table>
                `;

                /* Pintar titulo de card */
                exampleModalLabel3.textContent = "Sitio de interés: " + sitioIntMede.nombre;
            }

        })
    } catch (error) {
        console.log(error);
    }
}

export async function getPlacesMedellin() {
    const response = await fetch(`${urlBase}/sitiosInteresMed`);
    const data = await response.json();

    return data;
}

