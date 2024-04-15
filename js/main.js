/* -------------------- Show Menu -------------------- */

// Selectors
const navMenu = document.querySelector("#nav-menu");
const navToggle = document.querySelector("#nav-toggle");
const navClose = document.querySelector("#nav-close");

/* --------------- Validations MENU SHOW --------------- */
/* Validate if constant exist */

// Events

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* --------------- MENU HIDDEN --------------- */
/* Validate if constant exist */

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu"); // .remove para quitar la clase del css y que se oculte el menú
  });
}

/* --------------- Remove menu mobile --------------- */

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.querySelector("#nav-menu"); // se repite la declaracion de la constante
  // When we click on each nav__link, we remove the show-menu class
  // Cuando seleciono un ancor (link para navegar) se desaparece la clase show-menu
  navMenu.classList.remove("show-menu");
}

navLink.forEach((a) => {
  a.addEventListener("click", linkAction);
});

/* ----------------------Menu sidenav-------------------- */
const open =document.querySelector('#open');
const close = document.querySelector('.closebtn');
open.addEventListener('click',()=>{
  document.getElementById("mySidenav").style.width = "250px";
})
 
close.addEventListener('click',()=>{
  document.getElementById("mySidenav").style.width = "0";
})
 
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

