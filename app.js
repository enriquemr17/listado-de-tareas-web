const formulario = document.getElementById ("form-tarea"); //constante 
const formularioBuscar= document.getElementById("form-buscar"); 
const input = document.getElementById("input-tarea"); 
const lista = document.getElementById ("lista-tareas"); 
const div = document.createElement ("div"); 
const inputBuscar = document.getElementById("input-buscar"); 
const sinCoincidencias = document.getElementById("sin-coincidencias");
const selectCategoria = document.getElementById("categoria")
const selectPrioridad = document.getElementById ("prioridad"); 
const filtrarCategoria = document.getElementById("filtroCategoria"); 
const filtrarPrioridad = document.getElementById("filtroPrioridad");
 
 

formulario.addEventListener("submit", function(e) {
    e.preventDefault () //evita que la pagina se recargue

    const texto = input.value.trim(); //trim se utiliza para quitar espacios delante y detras del texto
    const categoria = selectCategoria.value; 
    const prioridad = selectPrioridad.value;
   
    crearTarea(texto, categoria, prioridad); 
    input.value = ""; //limpiar el input para escribir otra
    
   
}); 
// CREAR TAREA

function crearTarea(texto, categoria, prioridad) {
    const div = document.createElement ("div")
     div.classList.add(
        "tarea",
        "nueva",
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

    //CATEGORIA 
    const categoriaSpan = document.createElement("span"); 
    categoriaSpan.textContent = categoria; 
    categoriaSpan.classList.add("categoria"); 


    //PRIORIDAD
    const prioridadSpan = document.createElement("span"); 
    prioridadSpan.textContent = prioridad; 
    prioridadSpan.classList.add("prioridad"); 

    prioridadSpan.classList.add("text-white", "px-2", "py-1", "rounded", "font-bold"); 

    if (prioridad === "Alta") prioridadSpan.classList.add ("bg-red-500"); 
    if (prioridad === "Media") prioridadSpan.classList.add ("bg-yellow-500"); 
    if (prioridad === "Baja") prioridadSpan.classList.add ("bg-green-500"); 
        //BOTON DE ELIMINAR 
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
    div.appendChild(categoriaSpan); 
    div.appendChild(prioridadSpan); 
    div.appendChild(boton); 
    

    lista.appendChild(div); // pone todo el div dentro de la seccion de tareas de la pagina
    guardarTareas(); 

}

function guardarTareas () {
    const tareas = []; // se pone [] porque estamos creando un array pero al no haber nada dentro, esta vacío
    document.querySelectorAll(".tarea.nueva").forEach (div => { //busca todo los p dentro de .tarea y metelos dentro del array
        const texto = div.querySelector("p")?.textContent || div.querySelector("h3")?.textContent; 
        const categoria = div.querySelector(".categoria")?.textContent; 
        const prioridad = div.querySelector(".prioridad")?.textContent;
        
        if (!texto || !categoria|| !prioridad) return; 
        tareas.push ({texto: texto, categoria: categoria, prioridad: prioridad}); // push para meter lo que este dentro de tarea en el array. Push se usa en arrays
    }); 
    localStorage.setItem("tareas", JSON.stringify(tareas)); 
    
}

document.addEventListener("DOMContentLoaded", () => {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || []; 
    
        tareasGuardadas.forEach(tarea =>{
            if (!tarea.texto) return; 
            crearTarea(tarea.texto, tarea.categoria, tarea.prioridad); 
       
        }); 
    
}); 

    //AÑADIR BOTON DE ELIMINAR A TAREAS DE HTML 
    document.querySelectorAll("#lista-tareas .tarea button").forEach(boton => {
    boton.addEventListener("click", function() {
        this.parentElement.remove();
        guardarTareas();
    });

});

// BUSCAR TAREA 
 function filtrarTareas() {
    const texto = inputBuscar.value.toLowerCase();
    const categoriaSeleccionada = filtrarCategoria.value;
    const prioridadSeleccionada = filtrarPrioridad.value;

    let coincidencias = 0;

    document.querySelectorAll("#lista-tareas .tarea").forEach(div => {
        const tareaTexto = (div.querySelector("h3") || div.querySelector("p")).textContent.toLowerCase();
        const categoria = div.querySelector(".categoria").textContent;
        const prioridad = div.querySelector(".prioridad").textContent;

        const coincideTexto = texto === "" || tareaTexto.includes(texto);
        const coincideCategoria = categoriaSeleccionada === "" || categoria === categoriaSeleccionada;
        const coincidePrioridad = prioridadSeleccionada === "" || prioridad === prioridadSeleccionada;

        if (coincideTexto && coincideCategoria && coincidePrioridad) {
            div.style.display = "flex";
            coincidencias++;
        } else {
            div.style.display = "none";
        }
    });

    sinCoincidencias.style.display = coincidencias === 0 ? "block" : "none";
}
inputBuscar.addEventListener("input", filtrarTareas);
filtrarCategoria.addEventListener("change", filtrarTareas);
filtrarPrioridad.addEventListener("change", filtrarTareas);




/*BOTON MODO OSCURO*/
document.getElementById("boton-dark").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark"); 
}); 


