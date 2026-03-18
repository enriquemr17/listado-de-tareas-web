### Atajos de teclado usados con más frecuencia:  
    - cmd + I: chat en linea con la IA en parte de código seleccionada. 
    - cmd + enter: aplicar cambios sugeridos por la IA. 
    - cmd + F: buscar texto o caracteres en el archivo. 

### EJEMPLOS DONDE CURSOR HA MEJORADO MI CÓDIGO 
    - Integración completa de botón de "tarea pendiente": 

        const lista = document.getElementById("lista-tareas"); 
        const listaCompletadas = document.getElementById("lista-completadas");
        const inputBuscar = document.getElementById("input-buscar"); 
        const sinCoincidencias = document.getElementById("sin-coincidencias");
        const selectCategoria = document.getElementById("categoria")
        const selectPrioridad = document.getElementById ("prioridad"); 
        const filtrarCategoria = document.getElementById("filtroCategoria"); 
        const filtrarPrioridad = document.getElementById("filtroPrioridad");
        const botonCompletarTodas = document.getElementById("completar-todas"); 
 
 

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

    - Implementacion de código para agrupación de botones: 

     // Contenedor de botones (derecha en desktop, arriba en móvil)
    const botonesDiv = document.createElement("div");
    botonesDiv.classList.add(
        "tarea-botones",
        "flex",
        "flex-row",
        "flex-wrap",
        "gap-2",
        "md:flex-col",
        "md:flex-nowrap",
        "md:items-stretch"
    );

    // Contenedor de contenido (texto + badges)
    const contenidoDiv = document.createElement("div");
    contenidoDiv.classList.add(
        "flex",
        "flex-col",
        "gap-2",
        "flex-1",
        "min-w-0"
    );

    const badgesDiv = document.createElement("div");
    badgesDiv.classList.add("flex", "flex-wrap", "gap-2", "items-center");



### REFACTORIZACION DE TASKFLOW USANDO IA

1. Detección de problemas iniciales: 
    1.1 Funciones muy largas.
    1.2 Código duplicado al crear tareas.
    1.3 Lógica repetida para mover tareas   entre listas.
    1.4 Nombres de algunas variables poco claros.
    1.5 Falta de validaciones en el formulario. 

2. Refacterizaciones realizadas:

A) SIMPLIFICAR CREACION DE BOTONES.

Antes:
Se repetía mucho código para crear botones manualmente.

Después:
Se centralizó en una función reutilizable:
(function crearBoton(texto, clases, accion) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.classList.add(...clases);
    boton.addEventListener("click", accion);
    return boton;
})

 Mejora:
	·    Menos duplicación
	·	Código más limpio y reutilizable

B) SEPARAR LOGICA DE COMPLETAR TAREAS.

Antes:
Toda la lógica estaba dentro del botón.

Después: 
(function completarTarea(div, p) {
    const listaCompletadas = document.getElementById("lista-completadas");

    p.classList.add("line-through", "opacity-60");

    div.querySelector(".btn-completar")?.remove();
    div.querySelector(".btn-editar")?.remove();

    listaCompletadas.appendChild(div);
})

 Mejora:
	•	Código reutilizable
	•	Más fácil de entender

C) MEJORAR NOMBRES DE VARIABLES.

Antes: const p = document.createElement("p");

Después: const textoTarea = document.createElement("p");

Mejora: Código más legible. 

D) AÑADIR VALIDACIONES AL FORMULARIO

Antes: se comprobaba si el texto estaba vacío. 

Después: 
(if (!texto || texto.length < 3) {
    alert("La tarea debe tener al menos 3 caracteres");
    return;
})

Mejora: evita datos inválidos. 


E) EVITAR DUPLICACIÓN DE BOTONES

Antes: se creaban multiples botones "Pendiente".

Después: if (!div.querySelector(".btn-pendiente")) {
    // crear botón
}


Mejora: 
	•	Evita bugs en el DOM
	•	Código más robusto


3. Uso de la IA en el proceso.
    •	Detectar código duplicado.
	•	Proponer funciones reutilizables.
	•	Sugerir mejores nombres de variables.
	•	Identificar posibles bugs en el DOM.

4. Conclusión. 
	•	Reducir duplicación de código.
	•	Mejorar la legibilidad.
	•	Hacer el código más mantenible.
	•	Detectar errores que antes pasaban desapercibidos.


### CONECTAR SERVIDORES MCP

1. ¿Qué es MCP?
    El Model Context Protocol (MCP) es un sistema que permite a herramientas de IA (como Cursor) conectarse a fuentes externas de información, como:
	•	Sistema de archivos.
	•	Repositorios de GitHub.
	•	APIs externas.

2. Consultas realizadas. 

- Consulta 1

    Prompt:

    Analiza la estructura completa del proyecto TaskFlow

    Resultado:
	    •	Detectó archivos principales (index.html, app.js, styles.css)
	    •	Identificó la lógica principal en crearTarea


-  Consulta 2

    Prompt:

    Encuentra código duplicado en el proyecto

    Resultado:
	    •	Detectó repetición en la creación de botones
	    •	Sugirió usar función reutilizable


- Consulta 3

    Prompt:

    Busca posibles errores en el manejo del DOM

    Resultado:
	    •	Detectó duplicación de botones
	    •	Problemas al mover tareas entre listas


- Consulta 4

    Prompt:

    Sugiere mejoras en la estructura del código

    Resultado:
	    •	Separar funciones
	    •	Reducir tamaño de crearTarea


- Consulta 5

    Prompt:

    Explica cómo mejorar la persistencia con LocalStorage

    Resultado:
	    •	Recomendó separar datos de UI
	    •	Mejor control del estado completada


### ACTUALIZACION DEL REAMDE
	
    1.	Generación inicial de README
	    •	Se utilizó la IA para crear la primera versión del README de TaskFlow, incluyendo descripción, funcionalidades y flujo de trabajo.
	    •	La IA ayudó a organizar secciones y tablas (por ejemplo, clases CSS importantes).
	2.	Documentación de funciones
	    •	Se pidió a la IA que describiera funciones principales de app.js:
	    •	crearTarea(): agrega tareas al DOM y configura botones de acción.
	    •	guardarTareas(): guarda todas las tareas en localStorage.
	    •	filtrarTareas(): filtra tareas por texto, categoría y prioridad en tiempo real.
	    •	La descripción generada por IA se revisó y ajustó manualmente para mayor precisión y consistencia.
	3.	Inclusión de mejoras recientes
	    •	Se documentaron cambios recientes, como:
	    •	Botón Pendiente para deshacer tareas completadas.
	    •	Filtrado combinado y búsqueda en tiempo real.
	    •	Acciones masivas (completar todas, eliminar todas las completadas).
	    •	Modo oscuro con clase dark de Tailwind CSS.
	4.	Validación manual
	    •	Cada sección generada por IA fue revisada y corregida:
	    •	Terminología técnica precisa.
	    •	Ejemplos de uso reales del proyecto (HTML, JS, CSS).
	    •	Evitar errores o confusiones que la IA podría introducir.
	5.	Resumen final
	    •	Gracias a la IA, la documentación se creó de manera rápida y estructurada.
	    •	El proceso combinado (IA + revisión manual) asegura que la documentación refleje fielmente el proyecto y las mejoras aplicadas.

