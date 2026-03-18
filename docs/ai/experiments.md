### EXPERIMENTOS CON LA IA EN PROGRAMACION


1. CREACION DE BOTONES REUTILIZABLES

A) SIN IA: 
const botonEliminar = document.createElement("button");
botonEliminar.textContent = "Eliminar";
botonEliminar.classList.add("bg-red-400", "text-white");
botonEliminar.addEventListener("click", function () {
    div.remove();
});

B) CON IA: 
function crearBoton(texto, clases, accion) {
    const boton = document.createElement("button");
    boton.type = "button";

    boton.textContent = texto;
    boton.classList.add(...clases);

    boton.addEventListener("click", accion);

    return boton;
}

TIEMPO: 
    SIN IA: 10 MINUTOS.
    CON IA: 2 MINUTOS. 


2. GUARDADO EN LOCAL STORAGE

A) SIN IA:
const tareas = [];
document.querySelectorAll(".tarea").forEach(div => {
    const texto = div.querySelector("p").textContent;
    tareas.push(texto);
});
localStorage.setItem("tareas", JSON.stringify(tareas));

B) CON IA: 
function guardarTareas() {
    const tareas = [];

    document.querySelectorAll(".tarea").forEach(div => {
        const texto = div.querySelector("p")?.textContent;
        const categoria = div.querySelector(".categoria")?.textContent;
        const prioridad = div.querySelector(".prioridad")?.textContent;

        const completada = div.parentElement.id === "lista-completadas";

        if (!texto || !categoria || !prioridad) return;

        tareas.push({
            texto: texto,
            categoria: categoria,
            prioridad: prioridad,
            completada: completada
        });
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

TIEMPO: 
    SIN IA: 10 MINUTOS.
    CON IA: MENOS DE 5.


3. BOTON COMPLETAR / PENDIENTE

A) SIN IA: 
botonCompletar.addEventListener("click", function () {
    p.classList.add("line-through");
    listaCompletadas.appendChild(div);
});

B) CON IA: 
const botonCompletar = crearBoton("Completar", [
    "btn-completar",
    "bg-green-500",
    "text-white"
], function () {

    const listaCompletadas = document.getElementById("lista-completadas");

    p.classList.add("line-through", "opacity-60");

    if (!div.querySelector(".btn-pendiente")) {
        const botonPendiente = crearBoton("Pendiente", [
            "btn-pendiente",
            "bg-orange-500",
            "text-white"
        ], () => {
            p.classList.remove("line-through", "opacity-60");
            lista.appendChild(div);
            botonPendiente.remove();
            guardarTareas();
        });

        div.appendChild(botonPendiente);
    }

    listaCompletadas.appendChild(div);
    guardarTareas();
});

TIEMPO: 
    SIN IA: 30 MINUTOS (AL HABERLO HECHO YO SOLO TUVE FALLOS)
    CON IA: 5 MINUTOS (PIDIENDO AYUDA A LA IA PARA MEJORAR EL CODIGO Y QUITAR LOS FALLOS)

