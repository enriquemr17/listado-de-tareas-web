/* =====================================================
   LISTADO DE TAREAS — app.js
===================================================== */

// ─── REFERENCIAS DOM ───
const formulario             = document.getElementById("form-tarea");
const formularioBuscar       = document.getElementById("form-buscar");
const input                  = document.getElementById("input-tarea");
const lista                  = document.getElementById("lista-tareas");
const listaCompletadas       = document.getElementById("lista-completadas");
const inputBuscar            = document.getElementById("input-buscar");
const sinCoincidencias       = document.getElementById("sin-coincidencias");
const selectCategoria        = document.getElementById("categoria");
const selectPrioridad        = document.getElementById("prioridad");
const filtrarCategoria       = document.getElementById("filtroCategoria");
const filtrarPrioridad       = document.getElementById("filtroPrioridad");
const filtrarEstado          = document.getElementById("filtroEstado");
const botonCompletarTodas    = document.getElementById("completar-todas");
const botonEliminarCompletadas = document.getElementById("eliminar-completadas");
const cntPendientes          = document.getElementById("cnt-pendientes");
const cntCompletadas         = document.getElementById("cnt-completadas");


// ─── FUNCIONES API (BACKEND) ───

async function getTasks() {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) throw new Error("Error al obtener tareas");
  return response.json();
}

async function createTask(texto, categoria, prioridad) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ texto, categoria, prioridad })
  });

  if (!response.ok) throw new Error("Error al crear tarea");
  return response.json();
}

async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error("Error al eliminar tarea");
}

async function updateTask(id, datos) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  });

  if (!response.ok) throw new Error("Error al actualizar tarea");
  return response.json();
}

// Modal
const modalEditar            = document.getElementById("modal-editar");
const modalEditarTexto       = document.getElementById("modal-editar-texto");
const modalEditarPrioridad   = document.getElementById("modal-editar-prioridad");
const modalEditarGuardar     = document.getElementById("modal-editar-guardar");
const modalEditarCancelar    = document.getElementById("modal-editar-cancelar");
let tareaEditando = null;

// Sidebar / hamburguesa
const sidebar        = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const botonMenu      = document.getElementById("boton-menu");

// ─── MODO OSCURO ───
const botonDark = document.getElementById("boton-dark");

function aplicarModoOscuroGuardado() {
  const on = localStorage.getItem("modoOscuro") === "true";
  document.documentElement.classList.toggle("dark", on);
  if (botonDark) {
    botonDark.textContent = on ? "☀ Modo claro" : "☾ Modo oscuro";
    botonDark.setAttribute("aria-pressed", String(on));
  }
}
aplicarModoOscuroGuardado();

botonDark?.addEventListener("click", () => {
  const on = document.documentElement.classList.toggle("dark");
  localStorage.setItem("modoOscuro", String(on));
  botonDark.textContent = on ? "☀ Modo claro" : "☾ Modo oscuro";
  botonDark.setAttribute("aria-pressed", String(on));
});

// ─── HAMBURGUESA ───
botonMenu?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  sidebarOverlay.classList.toggle("open");
});
sidebarOverlay?.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("open");
});

// ─── CONTADORES ───
function actualizarContadores() {
  if (cntPendientes)  cntPendientes.textContent  = lista.querySelectorAll(".tarea").length;
  if (cntCompletadas) cntCompletadas.textContent = listaCompletadas.querySelectorAll(".tarea").length;
}

// ─── GUARDAR EN LOCALSTORAGE ───
function guardarTareas() {
  const tareas = [];
  document.querySelectorAll(".tarea").forEach(div => {
    const texto     = div.querySelector("p")?.textContent || div.querySelector("h3")?.textContent;
    const categoria = div.querySelector(".categoria")?.textContent;
    const prioridad = div.querySelector(".prioridad")?.textContent;
    const completada = div.parentElement?.id === "lista-completadas";
    if (!texto || !categoria || !prioridad) return;
    tareas.push({ texto, categoria, prioridad, completada });
  });
  actualizarContadores();
}

// ─── HELPERS ───
function crearBoton(texto, clases, accion) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = texto;
  boton.classList.add(...clases);
  boton.addEventListener("click", accion);
  return boton;
}

function getBotonesContainer(tareaDiv) {
  return tareaDiv.querySelector(".tarea-botones");
}

function actualizarPrioridad(prioridadSpan, prioridad) {
  prioridadSpan.textContent = prioridad;
  prioridadSpan.classList.remove("bg-red-500", "bg-yellow-500", "bg-green-500");
  if (prioridad === "Alta")  prioridadSpan.classList.add("bg-red-500");
  if (prioridad === "Media") prioridadSpan.classList.add("bg-yellow-500");
  if (prioridad === "Baja")  prioridadSpan.classList.add("bg-green-500");
}

function normalizarPrioridad(valor) {
  if (valor == null) return null;
  const v = String(valor).trim().toLowerCase();
  if (v === "alta")  return "Alta";
  if (v === "media") return "Media";
  if (v === "baja")  return "Baja";
  return null;
}

// ─── MODAL EDITAR ───
function abrirModalEditar(div) {
  const p = div.querySelector("p") || div.querySelector("h3");
  const prioridadSpan = div.querySelector(".prioridad");
  if (!p || !prioridadSpan || !modalEditar) return;

  tareaEditando = div;
  modalEditarTexto.value     = p.textContent || "";
  modalEditarPrioridad.value = (prioridadSpan.textContent || "Media").trim();

  if (typeof modalEditar.showModal === "function") modalEditar.showModal();
  else modalEditar.setAttribute("open", "");

  modalEditarTexto.focus();
}

function guardarEdicionModal() {
  if (!tareaEditando) return;
  const p = tareaEditando.querySelector("p") || tareaEditando.querySelector("h3");
  const prioridadSpan = tareaEditando.querySelector(".prioridad");
  if (!p || !prioridadSpan) return;

  const nuevoTexto = (modalEditarTexto?.value || "").trim();
  if (!nuevoTexto) return;

  const nuevaPrioridad = normalizarPrioridad(modalEditarPrioridad?.value);
  if (!nuevaPrioridad) return;

  p.textContent = nuevoTexto;
  actualizarPrioridad(prioridadSpan, nuevaPrioridad);
  guardarTareas();
  filtrarTareas();
  cerrarModalEditar();
}

function cerrarModalEditar() {
  tareaEditando = null;
  if (!modalEditar) return;
  if (typeof modalEditar.close === "function") modalEditar.close();
  else modalEditar.removeAttribute("open");
}

modalEditarGuardar?.addEventListener("click", (e) => { e.preventDefault(); guardarEdicionModal(); });
modalEditarCancelar?.addEventListener("click", (e) => { e.preventDefault(); cerrarModalEditar(); });
modalEditar?.addEventListener("close", () => { tareaEditando = null; });

// ─── MARCAR COMO COMPLETADA / PENDIENTE ───
function marcarComoCompletada(div) {
  const p = div.querySelector("p") || div.querySelector("h3");
  if (p) p.classList.add("line-through", "opacity-60");

  div.querySelector(".btn-completar")?.remove();
  div.querySelector(".btn-editar")?.remove();

  const contBotones = getBotonesContainer(div) || div;
  if (!div.querySelector(".btn-pendiente")) {
    const botonPendiente = crearBoton("Pendiente", ["btn-pendiente"], () => {
      marcarComoPendiente(div);
      lista.appendChild(div);
      guardarTareas();
    });
    contBotones.appendChild(botonPendiente);
  }
}

function marcarComoPendiente(div) {
  const p = div.querySelector("p") || div.querySelector("h3");
  if (p) p.classList.remove("line-through", "opacity-60");

  div.querySelector(".btn-pendiente")?.remove();

  const contBotones = getBotonesContainer(div) || div;
  const botonEliminar = Array.from(contBotones.querySelectorAll("button"))
    .find(b => b.classList.contains("btn-eliminar")) || null;

  if (!div.querySelector(".btn-editar") && p) {
    const botonEditar = crearBoton("Editar", ["btn-editar"], () => abrirModalEditar(div));
    if (botonEliminar) contBotones.insertBefore(botonEditar, botonEliminar);
    else contBotones.appendChild(botonEditar);
  }

  if (!div.querySelector(".btn-completar") && p) {
    const botonCompletar = crearBoton("Completar", ["btn-completar"], () => {
      marcarComoCompletada(div);
      listaCompletadas.appendChild(div);
      guardarTareas();
    });
    if (botonEliminar) contBotones.insertBefore(botonCompletar, botonEliminar);
    else contBotones.appendChild(botonCompletar);
  }
}

// ─── CREAR TAREA ───
function crearTarea(texto, categoria, prioridad, id = null) { // nul siginifica opcional
  const div = document.createElement("div");
  div.classList.add("tarea");
  div.dataset.id = id; //guardar el id en el div para usarlo con delete y patch

  // Texto
  const p = document.createElement("p");
  p.textContent = texto;
  p.classList.add("break-words");

  // Categoría
  const categoriaSpan = document.createElement("span");
  categoriaSpan.textContent = categoria;
  categoriaSpan.classList.add("categoria");

  // Prioridad
  const prioridadSpan = document.createElement("span");
  prioridadSpan.textContent = prioridad;
  prioridadSpan.classList.add("prioridad");
  actualizarPrioridad(prioridadSpan, prioridad);

  // Badges
  const badgesDiv = document.createElement("div");
  badgesDiv.classList.add("tarea-badges");
  badgesDiv.appendChild(categoriaSpan);
  badgesDiv.appendChild(prioridadSpan);

  // Contenido
  const contenidoDiv = document.createElement("div");
  contenidoDiv.classList.add("tarea-contenido");
  contenidoDiv.appendChild(p);
  contenidoDiv.appendChild(badgesDiv);

  // Botones
  const botonesDiv = document.createElement("div");
  botonesDiv.classList.add("tarea-botones");

  const botonEditar    = crearBoton("Editar",    ["btn-editar"],    () => abrirModalEditar(div));
  const botonCompletar = crearBoton("Completar", ["btn-completar"], () => {
    marcarComoCompletada(div);
    listaCompletadas.appendChild(div);
    guardarTareas();
  });
  const botonEliminar  = crearBoton("Eliminar",  ["btn-eliminar"], async () => {
    try {
      await deleteTask(div.dataset.id); 
      div.remove(); 
      actualizarContadores(); 
    } catch (error) {
      console.error ('Error al eliminar tarea', error); 
    } 
  }); 
  

  botonesDiv.appendChild(botonEditar);
  botonesDiv.appendChild(botonCompletar);
  botonesDiv.appendChild(botonEliminar);

  div.appendChild(contenidoDiv);
  div.appendChild(botonesDiv);
  lista.appendChild(div);

  return div;
}

// ─── FORMULARIO AÑADIR ───
formulario?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  const categoria = selectCategoria.value; 
  const prioridad = selectPrioridad.value; 
  if (!texto) return;

  try{
    const tareaCreada = await createTask (texto, selectCategoria.value, selectPrioridad.value); 
    crearTarea(tareaCreada.texto, tareaCreada.categoria, tareaCreada.prioridad, tareaCreada.id); 
    actualizarContadores(); 
    input.value = ""

  } catch (error) {
    console.error ('Error al crear tarea', error); 
  }
});

// ─── COMPLETAR TODAS ───
botonCompletarTodas?.addEventListener("click", () => {
  lista.querySelectorAll(".tarea").forEach(div => {
    marcarComoCompletada(div);
    listaCompletadas.appendChild(div);
  });
  guardarTareas();
});

// ─── ELIMINAR COMPLETADAS ───
botonEliminarCompletadas?.addEventListener("click", () => {
  listaCompletadas.querySelectorAll(".tarea").forEach(div => div.remove());
  guardarTareas();
  filtrarTareas();
});

// ─── FILTRAR / BUSCAR ───
function filtrarTareas() {
  const texto               = inputBuscar.value.toLowerCase();
  const categoriaSeleccionada = filtrarCategoria.value;
  const prioridadSeleccionada = filtrarPrioridad.value;
  const estadoSeleccionado    = filtrarEstado?.value || "";
  let coincidencias = 0;

  document.querySelectorAll("#lista-tareas .tarea, #lista-completadas .tarea").forEach(div => {
    const tareaTexto = (div.querySelector("p") || div.querySelector("h3")).textContent.toLowerCase();
    const categoria  = div.querySelector(".categoria").textContent;
    const prioridad  = div.querySelector(".prioridad").textContent;
    const completada = div.parentElement?.id === "lista-completadas";

    const coincideTexto     = texto === "" || tareaTexto.includes(texto);
    const coincideCategoria = categoriaSeleccionada === "" || categoria === categoriaSeleccionada;
    const coincidePrioridad = prioridadSeleccionada === "" || prioridad === prioridadSeleccionada;
    const coincideEstado    =
      estadoSeleccionado === "" ||
      (estadoSeleccionado === "completada" && completada) ||
      (estadoSeleccionado === "pendiente"  && !completada);

    if (coincideTexto && coincideCategoria && coincidePrioridad && coincideEstado) {
      div.style.display = "flex";
      coincidencias++;
    } else {
      div.style.display = "none";
    }
  });

  if (sinCoincidencias) {
    sinCoincidencias.style.display = coincidencias === 0 ? "block" : "none";
  }
}

inputBuscar?.addEventListener("input",  filtrarTareas);
filtrarCategoria?.addEventListener("change", filtrarTareas);
filtrarPrioridad?.addEventListener("change", filtrarTareas);
filtrarEstado?.addEventListener("change",    filtrarTareas);

formularioBuscar?.addEventListener("submit", (e) => {
  e.preventDefault();
  filtrarTareas();
});

// ─── CARGAR DESDE LOCALSTORAGE ───
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const tareas = await getTasks(); 
    tareas.forEach(tarea => {
      crearTarea(tarea.texto, tarea.categoria || 'Personal', tarea.prioridad || 'Media'); 
  }); 
  actualizarContadores(); 
  } catch(error) {
    console.error ('Error al cargar las tareas', error); 
  }
  });
  