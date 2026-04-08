// LOGICA DE LA APLICACIÓN

let tasks = [];  //crear array que funcione como BD

function obtenerTodas () {
    return tasks; // devuelve todas las tareas (controlador da las tareas y el servicio las muestra)
}

function crearTarea(data) { // creación de objeto (tarea) con datos
    const nueva = {
        id: Date.now().toString(),
        texto: data.texto, // lo que viene del fronted (texto del usuario)
        categoria: data.categoria || 'Personal',
        prioridad: data.prioridad || 'Media'

    }; 
    tasks.push(nueva);  // guardar tarea en la BD simulada
    return nueva; // para poder enviarlo al fronted.
}

function eliminarTarea(id) { // eliminar tareas a base de strings (ID)
    const index = tasks.findIndex(t => t.id.toString() === id); // busca la posicion del ID en el array (BD)

    if (index === -1) { // si el valor del indice es -1 notificar con mensaje de error. 
        throw new Error ('NOT_FOUND'); 
    }
    tasks.splice(index, 1); // eliminar la tarrea dela array (BD). TASK ES COMO SI FUESE "ELSE"
}

function actualizarTarea(id,datos) {
    const tarea = tasks.find(t => t.id.toString()===id); // convertimos el id en string para buscarla
    if (!tarea) throw new Error ('NOT_FOUND'); 

    if (datos.texto !== undefined) tarea.texto = datos.texto;  // si los datos no cambian, mantener valores
    if (datos.categoria !== undefined) tarea.categoria = datos.categoria; 
    if (datos.prioridad !== undefined) tarea.prioridad = datos.prioridad; 
    if (datos.completada !== undefined) tarea.completada = datos.completada; 

    return tarea; 
}

module.exports = {  // esto sirve para poder exportar los "valores" seleccionados a otros archivos del proyecto usando require()
    obtenerTodas,
    crearTarea,
    eliminarTarea,
    actualizarTarea
}; 

