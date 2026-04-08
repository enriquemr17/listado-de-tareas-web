const express = require ('express'); // importa EXPRESS
const router = express.Router(); // crea un Router modular que maneja rutas de manera independiente
const controller = require('../controllers/task.controller'); 

router.get('/', controller.getTasks);
router.post('/', controller.createTask); 
router.delete('/:id', controller.deleteTask); 
router.patch('/:id', controller.updateTask); // patch y no put porque queremos actualizar, si usamos put perdemos el resto de cosas que no cambiemos

module.exports = router; 

// 1. ('/') significa "raiz del conjunto de rutas de ese router: "