/* Javascript */

/* Importaciones */
import { getTowns } from "../../api/api.js";
import { urlPueblos } from "../../api/url.js";
import { estadoBoton, playAudio } from "./audio.js";
import { initMap } from "./pueblo.js";

/* Selectores*/

const listaMedellin = document.getElementById('listaMedellin');
const listaPueblos = document.getElementById('listaPueblos');
const ListaPueblosCel = document.getElementById('ListaPueblosCel');
const audios = document.getElementById('audios');
const reproducir = document.querySelectorAll('.reproducir');
export const startMenu = document.querySelector('#start');
export const endMenu = document.querySelector('#end');
export const modeMenu = document.querySelector('#mode');
export const sidebar = document.querySelector("#sidebar");
/* -----------------------------------Fin Selectores---------------------------------- */


//ContentLoaded
document.addEventListener("DOMContentLoaded", async ()=>{
  const urlParams = new URLSearchParams(window.location.search);
    const townValue = urlParams.get('town');
    console.log("Esto es el valor que envio por town : " , townValue);
    const pueblos = await getTowns();
    pintarContenido(townValue, pueblos);
});

/* Menu navegación */

/* Lista desplegable sitios de medellín Medellín */


sitiosMedellin.forEach( lugar => {
    listaMedellin.innerHTML += `<li><a href="/index.html">${lugar.nombreLugar}</a>`;  
});

/* Lista desplegable pueblos terminal del sur */

async function ListaPueblos(){
  const pueblos = await getTowns();

  pueblos.forEach(lugar =>{
    /* listaPueblos.innerHTML += `<li><a href=${lugar.url}>${lugar.nombreLugar}</a></li>`; */

    //pinta menu grande
    const li = document.createElement('LI');
    const aref = document.createElement('a');
    
    aref.textContent= lugar.nombre;
    li.appendChild(aref);
    listaPueblos.appendChild(li);

    aref.addEventListener('click',(e)=>{
      e.preventDefault();
      console.log("Esto es lo que hundiste: ", e.target.textContent);
      pintarContenido(e.target.textContent, pueblos);
    });
    
     //pinta menu pequeño celular
    const li_cel = document.createElement('LI');
    const aref_cel = document.createElement('a');
    
    aref_cel.textContent= lugar.nombre;
    //Para que ponga la manito y no el boton de selección
    aref_cel.style = "cursor:pointer";
    li_cel.appendChild(aref_cel);
    ListaPueblosCel.appendChild(li_cel);

    aref_cel.addEventListener('click',(e)=>{
      e.preventDefault();
      console.log("Esto es lo que hundiste: ", e.target.textContent);
      pintarContenido(e.target.textContent, pueblos);
    });


});
}


/*-----------------Fin Lista desplegable pueblos terminal del sur-------------------------------*/


/* Audios */
const myAudio = document.getElementById("myAudio"); 
const playSonido = document.getElementById('sonido');
let estadoSonido = false;
playSonido.addEventListener('click',()=>{
  if(estadoSonido == false){
    myAudio.play();
    estadoSonido = true;
  }else{
    myAudio.pause();
    estadoSonido = false;
  }
  
})



/* Asignar evento de click a cada boton de sonido de los sitios de interes */
let contador = 0;
reproducir.forEach(elemento =>{

  elemento.addEventListener("click", (e)=>{
    /* Esto hace que no se suba al inicio de la página */
    e.preventDefault();
    console.log(elemento.getAttribute("sound"));

    playAudio(elemento.getAttribute("sound"), estadoBoton[(Number(elemento.getAttribute("sound")))-1])

    if(estadoBoton[(Number(elemento.getAttribute("sound")))-1] == true){
      estadoBoton[(Number(elemento.getAttribute("sound")))-1] = false;
    }else{
      estadoBoton[(Number(elemento.getAttribute("sound")))-1] = true;
    }
  })
});

/* Reproducir video cuando es visible en la página */
const video = document.querySelector('video');

function verificarVisibilidad(entries){
  /* Devuelve un arreglo con una sola posicion */
  let entry = entries[0];
  if(entry.isIntersecting){
    //el elemento es visible
    console.log("Elemento visible");
    video.play();
  }else{
    //el elemento no es visible
    console.log("Elemento no visible");
    video.pause();
  }
}

let observer = new IntersectionObserver(verificarVisibilidad,{});

video.addEventListener('click', playOrPause);

function playOrPause(){
  if (!video.paused && !video.ended){
    video.pause();
} else {
    video.play();
}
}




/* ----------------------Menu sidenav-------------------- */
const open =document.querySelector('#open');
const close = document.querySelector('.closebtn');
open.addEventListener('click',()=>{
  document.getElementById("mySidenav").style.width = "250px";
})
 
close.addEventListener('click',()=>{
  document.getElementById("mySidenav").style.width = "0";
})
 


/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

/*----------------------Fin Menu sidenav----------------- */


/*-------------------Poner dinamicamente contenido----------------- */
const textos = document.querySelectorAll(".sitiosInteres");
const titulosSitios = document.querySelectorAll(".titulos_SitiosInteres");
const imagenesSitios = document.querySelectorAll(".animacionSitios");
const parrafo1 =  document.querySelector(".parrafo1");
const tituloPrinc = document.querySelector("#tituloPrinc");
const imgPrinc = document.querySelectorAll('.imgPrinc');
const tituloImgPrinc = document.querySelectorAll('.tituloImgPrinc');
const imgPrincPeq = document.querySelectorAll('.imgPrincPeq');
const sizeVideo = document.querySelector('.sizeVideo');

/* textos.forEach((texto,index)=>{
  texto.textContent = `este es el texto ${index+1}`;
}); */

/*Funcion llamar textos sitios de interes*/

function pintarContenido(lugar,pueblos){
  

  /* Filtrar por lugar */
  const pueblo = pueblos.filter(buscarPueblo);

  console.log("este es el filtro lugar:" , pueblo);
  const sitios = pueblo[0].sitiosInteres;
  console.log("Estos son los sitios de interes" , sitios);
  
  function buscarPueblo(resultado){
    if(lugar){
      return resultado.nombre === lugar;
    }else{
      return resultado;
    }
  }

  /*Poner dinamismo a galeria pantalla pequeña*/
console.log("Hola Mundo");
const ponerTexto = document.getElementById('ponerTexto');


imgPrincPeq.forEach((imagen,index) =>{
  imagen.addEventListener('mouseover',()=>{
    console.log("Estoy encima del elemento");
    ponerTexto.textContent = sitios[index].lugar;
  })

  imagen.addEventListener('mouseleave',()=>{
    ponerTexto.textContent = "";
  })
})

/*--------------Fin Poner dinamismo a galeria pantalla pequeña----------------*/

observer.observe(video);

  

  /* Poner titulo principal */
  tituloPrinc.textContent = "Pueblo - " + pueblo[0].nombre;

  /* Poner video */
  sizeVideo.src = pueblo[0].video;

  /* Poner textos sitios de interes */
  textos.forEach((texto,index) =>{
    /* Con el join se pasa del array a  un solo string que contenga toda la cadena de caracteres en una sola */
    texto.textContent = sitios[index].descripcion.join("");
  });


  /* Poner titulos de sitios de interes */
  titulosSitios.forEach((titulo, index) =>{
    titulo.textContent = sitios[index].lugar;
  });

  /* Poner imagenes en la galeria principal */
  imgPrinc.forEach((img,index)=>{
    img.src = sitios[index].imagen;
  });

  /* Poner imagenes en la galeria principal pantalla pequeña */

  imgPrincPeq.forEach((img,index)=>{
    img.src = sitios[index].imagen;
  });

  /* Poner titulos debajo de la galeria principal */
  tituloImgPrinc.forEach((titulo,index)=>{
    titulo.textContent = sitios[index].lugar;
  });

  /* Agregar imagenes de los sitios de interes */
  imagenesSitios.forEach((imagen,index)=>{
    imagen.src = sitios[index].imagen;
  })

  /* Agregar historia del pueblo */
  parrafo1.innerHTML = pueblo[0].descripcion.join("");
  console.log("Descripcion del pueblo " ,pueblo[0].descripcion.join(""));

  /* Agregar audios sitios de interes */
  /* Agregar audios en el html */


/* Borrar los audios anteriores */
audios.innerHTML="";
for(let i =0 ; i<=5 ;i++){

  if(i == 0){
    const audio = document.createElement('audio');
    audio.setAttribute("src",`/audio/${pueblo[0].audio}`);
    audios.appendChild(audio);
  }else{ 
    const audio = document.createElement('audio');
    audio.setAttribute("src",`/audio/${sitios[(i-1)].audio}`);
    audios.appendChild(audio);
  
    //let sonido = "sonido" + i.toString();
    /* audios.innerHTML+= `
    <audio>
    <source src="/audio/${sonido}.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio>`; */
  }
  
 
}

/* -------------------------Poner Dinamicamente Mapas---------- */

startMenu.innerHTML="";
endMenu.innerHTML="";
for(let i=0; i<5 ;i++){
  const option = document.createElement('option');
  const option2 = document.createElement('option');
  option.value = sitios[i].ubicacion;
  option.textContent = sitios[i].lugar;
  option2.value = sitios[i].ubicacion;
  option2.textContent = sitios[i].lugar;
  startMenu.appendChild(option);
  endMenu.appendChild(option2);
}

initMap(pueblo[0].mapaPueblo.latitud, pueblo[0].mapaPueblo.longitud);

/*--------------------Fin Poner Dinamicamente Mapas-------------*/
}

/*------------Fin poner dinamicamente texto-------------------- */



ListaPueblos();
