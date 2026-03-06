const formulario = document.getElementById ("form-tarea"); //constante 
const input = document.getElementById("input-tarea"); 
const lista = document.getElementById ("lista-tareas"); 
const div = document.createElement ("div"); 
const inputBuscar = document.getElementById("input-buscar"); 
const sinCoincidencias = document.getElementById("sin-coincidencias"); 
 

formulario.addEventListener("submit", function(e) {
    e.preventDefault () //evita que la pagina se recargue

    const texto = input.value.trim(); //trim se utiliza para quitar espacios delante y detras del texto
    if (texto!== "") {
        crearTarea(texto); 
        input.value = ""; //limpiar el input para escribir otra
    }
   
}); 

function crearTarea(texto) {
    const div = document.createElement ("div")
     div.classList.add(
        "tarea",
        "flex",
        "justify-between",
        "items-center",
        "bg-gray-200",      // fondo claro
        "dark:bg-gray-800",  // fondo oscuro
        "dark:text-white",
        "p-4",
        "mb-3", 
        "rounded",
        "shadow"
        ); 
        
    const p = document.createElement ("p") //p siginifca parrafo o texto normalmente
    p.textContent = texto;
    p.classList.add("text-gray-900", "dark:text-white"); 

    const boton = document.createElement ("button"); 
    boton.textContent = "Eliminar";
    boton.classList.add (
        "bg-red-400",
        "dark:bg-red-600",
        "text-white",
        "px-3",
        "py-1",
        "rounded",
        "hover:bg-red-500",
        "dark:hover:bg-red-700",
        "transition"
    ); 

    boton.addEventListener ("click", function() {
        div.remove(); 
        guardarTareas(); 
    
}); 

    div.appendChild(p); //pone p dentro de div
    div.appendChild(boton); 
    

    lista.appendChild(div); // pone todo el div dentro de la seccion de tareas de la pagina
    guardarTareas(); 

}

function guardarTareas () {
    const tareas = []; // se pone [] porque estamos creando un array pero al no haber nada dentro, esta vacío
    document.querySelectorAll(".tarea p").forEach (function(parrafo){ //busca todo los p dentro de .tarea y metelos dentro del array
        tareas.push (parrafo.textContent); // push para meter lo que este dentro de "p" en el array. Push se usa en arrays
    }); 
    localStorage.setItem("tareas", JSON.stringify(tareas)); 
    div.classList.add("tarea");
}

document.addEventListener("DOMContentLoaded", function () {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")); 
    if (tareasGuardadas) {
        tareasGuardadas.forEach(function(tarea){
            crearTarea(tarea); 
        }); 
    }
})

inputBuscar.addEventListener("input", function() { //funciona mientras escribres
    const texto = inputBuscar.value.toLowerCase(); //hacer todo minusculas
    let coincidencias = 0; //creacion de variable de coincidencias

    document.querySelectorAll("#lista-tareas .tarea").forEach(function(div){ //busca todas las clases "tarea" dentro de lista de tareas
        const tareaTexto = (div.querySelector("h3") || div.querySelector("p")).textContent.toLowerCase(); 
        
        if(tareaTexto.includes(texto)) {
            div.style.display = "flex"; 
            coincidencias++; //añadimos +1 coincidencias.
        } else {
            div.style.display = "none"; 
        }
    });

    if(coincidencias === 0) {
        sinCoincidencias.style.display = "block"; //mostrar
    } else {
        sinCoincidencias.style.display = "none"; //ocultar
    }
}); 

document.getElementById("boton-dark").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark"); 
})
