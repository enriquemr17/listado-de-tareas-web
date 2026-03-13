const formulario = document.getElementById("form-tarea"); //constante 
const formularioBuscar = document.getElementById("form-buscar"); 
const input = document.getElementById("input-tarea"); 
const lista = document.getElementById("lista-tareas"); 
const listaCompletadas = document.getElementById("lista-completadas");
const inputBuscar = document.getElementById("input-buscar"); 
const sinCoincidencias = document.getElementById("sin-coincidencias");
const selectCategoria = document.getElementById("categoria")
const selectPrioridad = document.getElementById ("prioridad"); 
const filtrarCategoria = document.getElementById("filtroCategoria"); 
const filtrarPrioridad = document.getElementById("filtroPrioridad");
const filtrarEstado = document.getElementById("filtroEstado");
const botonCompletarTodas = document.getElementById("completar-todas"); 
const botonEliminarCompletadas = document.getElementById("eliminar-completadas");
 
 

formulario.addEventListener("submit", function(e) {
    e.preventDefault(); //evita que la pagina se recargue

    const texto = input.value.trim(); //trim se utiliza para quitar espacios delante y detras del texto
    if (!texto) return; // no crear tareas vacías

    const categoria = selectCategoria.value; 
    const prioridad = selectPrioridad.value;
   
    crearTarea(texto, categoria, prioridad); 
    guardarTareas(); 
    input.value = ""; //limpiar el input para escribir otra
}); 

// BOTÓN COMPLETAR TODAS
botonCompletarTodas.addEventListener("click", () => {
    document.querySelectorAll("#lista-tareas .tarea").forEach(div => {
        const listaCompletadas = document.getElementById("lista-completadas");
        const p = div.querySelector("p") || div.querySelector("h3");

        // Añadir tachado al texto
        p.classList.add("line-through", "opacity-60");

        // Mover a lista de completadas
        listaCompletadas.appendChild(div);

        // Quitar botones que no deberían aparecer en completadas
        const botonCompletar = div.querySelector(".btn-completar");
        const botonEditar = div.querySelector(".btn-editar");
        if (botonCompletar) botonCompletar.remove();
        if (botonEditar) botonEditar.remove();
    });

    guardarTareas(); // actualizar LocalStorage
});

// BOTÓN ELIMINAR TODAS LAS COMPLETADAS
botonEliminarCompletadas.addEventListener("click", () => {
    listaCompletadas.querySelectorAll(".tarea").forEach(div => div.remove());
    guardarTareas();
    filtrarTareas();
});
// CREAR TAREA
function crearBoton (texto, clases, accion) {
    const boton = document.createElement("button"); 
    boton.type = "button"; // evitar submits accidentales

    boton.textContent = texto; 
    boton.classList.add(...clases); 

    boton.addEventListener("click", accion); 

    return boton; 
}

function marcarComoPendiente(div) {
    const p = div.querySelector("p") || div.querySelector("h3");
    if (p) p.classList.remove("line-through", "opacity-60");

    const botonPendiente = div.querySelector(".btn-pendiente");
    if (botonPendiente) botonPendiente.remove();

    const botonEliminar = Array.from(div.querySelectorAll("button")).find(b => b.textContent === "Eliminar") || null;

    if (!div.querySelector(".btn-editar") && p) {
        const botonEditar = crearBoton("Editar", [
            "btn-editar",
            "bg-blue-500",
            "text-white",
            "px-3",
            "py-1",
            "rounded",
            "hover:bg-blue-600"
        ], () => {
            const nuevoTexto = prompt("Editar tarea:", p.textContent);
            if (nuevoTexto && nuevoTexto.trim() !== "") {
                p.textContent = nuevoTexto;
                guardarTareas();
            }
        });

        if (botonEliminar) div.insertBefore(botonEditar, botonEliminar);
        else div.appendChild(botonEditar);
    }

    if (!div.querySelector(".btn-completar") && p) {
        const botonCompletar = crearBoton("Completar", [
            "btn-completar",
            "bg-green-500",
            "text-white",
            "px-3",
            "py-1",
            "rounded",
            "hover:bg-green-600"
        ], () => {
            marcarComoCompletada(div);
            listaCompletadas.appendChild(div);
            guardarTareas();
        });

        if (botonEliminar) div.insertBefore(botonCompletar, botonEliminar);
        else div.appendChild(botonCompletar);
    }
}

function marcarComoCompletada(div) {
    const p = div.querySelector("p") || div.querySelector("h3");
    if (p) p.classList.add("line-through", "opacity-60");

    const botonCompletar = div.querySelector(".btn-completar");
    const botonEditar = div.querySelector(".btn-editar");
    if (botonCompletar) botonCompletar.remove();
    if (botonEditar) botonEditar.remove();

    if (!div.querySelector(".btn-pendiente")) {
        const botonPendiente = crearBoton("Pendiente", [
            "btn-pendiente",
            "bg-orange-500",
            "text-white",
            "px-3",
            "py-1",
            "rounded",
            "hover:bg-orange-800"
        ], () => {
            marcarComoPendiente(div);
            lista.appendChild(div);
            guardarTareas();
        });

        div.appendChild(botonPendiente);
    }
}

function crearTarea(texto, categoria, prioridad) {
    const div = document.createElement("div");
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
    
    const botonEliminar = crearBoton ("Eliminar", [
        "bg-red-400",
        "dark:bg-red-600",
        "text-white",
        "px-3",
        "py-1",
        "rounded",
        "hover:bg-red-500"
    ],
    function () {
        div.remove(); 
        guardarTareas(); 
    }

); 
    // BOTON DE EDITAR

    const botonEditar = crearBoton ("Editar", [
        "btn-editar",
        "bg-blue-500",
        "text-white",
        "px-3",
        "py-1",
        "rounded",
        "hover:bg-blue-600"
    ],
    function() {
        const nuevoTexto = prompt("Editar tarea:", p.textContent); 

        if (nuevoTexto && nuevoTexto.trim() !== "") {
            p.textContent = nuevoTexto; 
            guardarTareas(); 
        }
    }
); 

    // BOTON DE COMPLETAR

    const botonCompletar = crearBoton ("Completar", [
        "btn-completar",
        "bg-green-500",
        "text-white",
        "px-3",
        "py-1",
        "rounded",
        "hover:bg-green-600"
    ], 
    function () {
        marcarComoCompletada(div);
        listaCompletadas.appendChild(div);
        guardarTareas(); 
    }



    )

    div.appendChild(p); //pone p dentro de div
    div.appendChild(categoriaSpan); 
    div.appendChild(prioridadSpan); 
    
    div.appendChild(botonEditar); 
    div.appendChild(botonCompletar); 
    div.appendChild(botonEliminar); 

    lista.appendChild(div); // pone todo el div dentro de la seccion de tareas de la pagina
    return div; // RECIBE LA TAREA CREADA Y LA NUEVA

}

function guardarTareas () {
    const tareas = []; // se pone [] porque estamos creando un array pero al no haber nada dentro, esta vacío
    document.querySelectorAll(".tarea").forEach (div => { //busca todo los p dentro de .tarea y metelos dentro del array
       
        const texto = div.querySelector("p")?.textContent || div.querySelector("h3")?.textContent; 
        const categoria = div.querySelector(".categoria")?.textContent; 
        const prioridad = div.querySelector(".prioridad")?.textContent;
        
        const completada = div.parentElement.id === "lista-completadas"; 

        if (!texto || !categoria|| !prioridad) return; 
        tareas.push ({
            texto: texto, 
            categoria: categoria, 
            prioridad: prioridad, 
            completada: completada}); // push para meter lo que este dentro de tarea en el array. Push se usa en arrays
    }); 
    localStorage.setItem("tareas", JSON.stringify(tareas)); 
    
}

document.addEventListener("DOMContentLoaded", () => {
    
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareasGuardadas.forEach(tarea => {

        if(!tarea.texto) return; //evita tareas vacias

        // Creamos la tarea normalmente
        const nuevaTarea = crearTarea(tarea.texto, tarea.categoria, tarea.prioridad);

        if (tarea.completada) {
            marcarComoCompletada(nuevaTarea);
            listaCompletadas.appendChild(nuevaTarea);
        }
});
});


// BUSCAR TAREA 
 function filtrarTareas() {
    const texto = inputBuscar.value.toLowerCase();
    const categoriaSeleccionada = filtrarCategoria.value;
    const prioridadSeleccionada = filtrarPrioridad.value;
    const estadoSeleccionado = filtrarEstado?.value || "";

    let coincidencias = 0;

    document.querySelectorAll("#lista-tareas .tarea, #lista-completadas .tarea").forEach(div => {
        const tareaTexto = (div.querySelector("h3") || div.querySelector("p")).textContent.toLowerCase();
        const categoria = div.querySelector(".categoria").textContent;
        const prioridad = div.querySelector(".prioridad").textContent;
        const completada = div.parentElement?.id === "lista-completadas";

        const coincideTexto = texto === "" || tareaTexto.includes(texto);
        const coincideCategoria = categoriaSeleccionada === "" || categoria === categoriaSeleccionada;
        const coincidePrioridad = prioridadSeleccionada === "" || prioridad === prioridadSeleccionada;
        const coincideEstado =
            estadoSeleccionado === "" ||
            (estadoSeleccionado === "completada" && completada) ||
            (estadoSeleccionado === "pendiente" && !completada);

        if (coincideTexto && coincideCategoria && coincidePrioridad && coincideEstado) {
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
filtrarEstado.addEventListener("change", filtrarTareas);

// evitar que el botón "Buscar" recargue la página
formularioBuscar.addEventListener("submit", function (e) {
    e.preventDefault();
    filtrarTareas();
});




/*BOTON MODO OSCURO*/
const botonDark = document.getElementById("boton-dark");

function aplicarModoOscuroGuardado() {
    const darkGuardado = localStorage.getItem("modoOscuro");
    if (darkGuardado === "true") {
        document.documentElement.classList.add("dark");
        botonDark?.setAttribute("aria-pressed", "true");
    } else {
        document.documentElement.classList.remove("dark");
        botonDark?.setAttribute("aria-pressed", "false");
    }
}

aplicarModoOscuroGuardado();

botonDark.addEventListener("click", () => {
    const activado = document.documentElement.classList.toggle("dark");
    localStorage.setItem("modoOscuro", String(activado));
    botonDark.setAttribute("aria-pressed", String(activado));
}); 