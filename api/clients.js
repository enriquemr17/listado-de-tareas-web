const BASE_URL = 'http://localhost:3000/api/v1';
async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) throw new Error('Error al obtener tareas');
  return response.json();
}

async function createTask(texto, categoria, prioridad) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto, categoria, prioridad })
  });
  if (!response.ok) throw new Error('Error al crear tarea');
  return response.json();
}

async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar tarea');
}

async function updateTask (id, datos) {
  const response = await fetch (`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' }, // decirle al servidor que se manda en formato JSON
    body: JSON.stringify(datos) // HTTP no entiende objetos JAVASCRIPT y con json.strinfigy los convierte a texto 
  }); 
  if (!response.ok) throw new Error ('Error al actualizar tarea'); 
  return response.json(); 
}