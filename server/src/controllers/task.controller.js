// VALIDACIONES Y GESTIONES HTTP 

const service = require ('../services/task.service'); // llamamos a las funciones creadas en task.service

function getTasks (req, res) { // llama al servicio para recuperar todas las tareas almacenadas.
    const tasks = service.obtenerTodas (); 
    res.json(tasks); // devuelve las tareas al cliente en formato JSON
}

function createTask (req, res)  {
    const { texto } = req.body; // extrae texto del cuerpo (body)

    if (!texto) { // validacion que haya texto 
        return res.status(400).json({error: 'Texto requerido'}); // mensaje (400) si no hay texto 
    }
    const nueva = service.crearTarea ({ texto }); // llamar al servicio para crear tarea
    res.status(201).json(nueva); // devuelve tarea creada con codigo 201 formato JSON

}

function deleteTask (req, res, next) {
    try {
        service.eliminarTarea(req.params.id); // obtener ID de la ruta
        res.status(204).send(); // se elimina correctamente (mensaje 204 NO CONTENT)
    } catch (err) { // si hay un error, pasa al middleware de manejo usando err
        next(err); // se consigue que no se bloquee el controlador para que servidor y controladores sigan funcionando. 
    }
}

module.exports = {
    getTasks, 
    createTask,
    deleteTask
}; 
