# TaskFlow

## Despliegue en Vercel
https://listado-de-tareas-web.vercel.app

---

## Descripción
TaskFlow es una aplicación web para gestionar tareas con **categorías**, **prioridades**, **estado (pendiente / completada)**, **modo oscuro** y **filtrado avanzado**.  

Ahora las tareas se almacenan en un **backend Node/Express** y el frontend consume la API mediante **fetch**, garantizando persistencia incluso si se recarga la página.  

---

## Funcionalidades principales

### 1. Añadir tareas
- Crear tareas con:
  - **Texto**: descripción de la tarea.
  - **Categoría**: Profesional, Finanzas, Salud o Personal.
  - **Prioridad**: Alta, Media o Baja.
- Las nuevas tareas se envían al backend con **POST /api/v1/tasks**.
- El backend devuelve la tarea con un **ID único**, usado por el frontend para eliminar o actualizar.

### 2. Eliminar tareas
- Cada tarea tiene un botón “Eliminar”.
- Al hacer clic, se envía una petición **DELETE /api/v1/tasks/:id** al backend.
- El DOM se actualiza automáticamente y los contadores se ajustan.

### 3. Editar y actualizar tareas
- Se puede editar el **texto** o la **prioridad** de la tarea.
- Los cambios se envían al backend mediante **PATCH /api/v1/tasks/:id**.
- La tarea en el DOM se actualiza al instante tras la confirmación del servidor.

### 4. Completar y volver a pendiente
- Botón “Completar” mueve la tarea a **TAREAS COMPLETADAS** y elimina los botones “Completar” y “Editar”.
- Botón “Pendiente” devuelve la tarea a **TAREAS** y restaura “Editar” + “Completar”.
- Los cambios de estado actualmente se reflejan en el frontend, pero se pueden sincronizar con backend usando PATCH.

### 5. Acciones masivas
- **Completar todas las tareas**: mueve todas las pendientes a completadas.
- **Eliminar todas las completadas**: borra la lista de completadas y envía peticiones DELETE al backend según corresponda.

### 6. Modo oscuro
- Botón “ALTERNAR MODO OSCURO”.
- Utiliza la clase `dark` de Tailwind CSS.
- La preferencia se guarda en **localStorage** para persistir entre recargas.

### 7. Filtrado de tareas
- Filtrar por:
  - **Texto**: búsqueda en la descripción.
  - **Categoría**: menú desplegable.
  - **Prioridad**: menú desplegable.
  - **Estado**: Todas / Pendientes / Completadas.
- Se pueden combinar múltiples filtros.
- Si no hay coincidencias, aparece el mensaje: “No hay tareas que coincidan”.

### 8. Persistencia de datos
- Las tareas se almacenan en un **backend Node/Express** en memoria (simulando base de datos).
- Cada tarea tiene un **ID único** para identificarla en operaciones CRUD.
- Al recargar, el frontend hace un **GET /api/v1/tasks** para reconstruir la lista.

### 9. Interfaz responsiva
- Estructura con **Flexbox** y **Tailwind CSS**.
- Adaptable a móviles y escritorio.

---

## Estructura del proyecto
/project-root
├─ /public
│   ├─ index.html
│   ├─ app.js
│   └─ style.css
└─ /server
├─ src
│   └─ index.js
├─ routes
│   └─ task.routes.js
└─ controllers
└─ task.controller.js



---

## Tecnologías utilizadas
- HTML5
- CSS (Tailwind)
- JavaScript (Vanilla)
- Node.js + Express
- API REST simulada (array en memoria)

---

## Flujo de funcionamiento

1. El frontend carga y hace **GET /api/v1/tasks** para obtener todas las tareas.
2. Crear tarea:
   - El usuario rellena el formulario.
   - Se envía **POST /api/v1/tasks** con los datos.
   - La tarea se añade al DOM con el **ID del backend**.
3. Editar tarea:
   - Se abre un modal y se modifican campos.
   - Se envía **PATCH /api/v1/tasks/:id**.
   - El DOM se actualiza automáticamente.
4. Eliminar tarea:
   - Se envía **DELETE /api/v1/tasks/:id**.
   - La tarea se elimina del DOM y del backend.
5. Completar / volver a pendiente:
   - Cambia la posición de la tarea entre listas.
   - El estado puede sincronizarse con PATCH.
6. Filtrado y modo oscuro funcionan como antes.

---

## Clases CSS importantes

| Clase       | Descripción |
|------------|-------------|
| `.tarea`   | Representa una tarea en la lista |
| `.categoria` | Span que contiene la categoría de la tarea |
| `.prioridad` | Span que contiene la prioridad de la tarea |
| `.btn-completar` | Botón de completar |
| `.btn-editar` | Botón de editar |
| `.btn-pendiente` | Botón para volver a pendiente |

---

## Instrucciones de uso

1. Levantar el backend con Node/Express (`node src/index.js`).
2. Abrir `index.html` desde el navegador (no usar Live Server directamente, para que las peticiones API funcionen).
3. Añadir nuevas tareas desde el formulario inferior.
4. Editar, completar, volver a pendiente o eliminar tareas.
5. Filtrar tareas por texto, categoría, prioridad o estado.
6. Alternar entre modo claro y oscuro.
7. Todas las tareas se guardan automáticamente en el backend y se recargan al abrir la página.

---

## Revisión / QA

### Lista vacía
- Abrir la app por primera vez.
- **Resultado esperado**: no hay errores en consola, ambas listas vacías.

### Tareas largas
- Crear una tarea con texto largo.
- **Resultado esperado**: la tarea se muestra correctamente, se puede completar/editar/eliminar.

### Recarga (persistencia)
- Crear tareas pendientes y completadas.
- Recargar la página.
- **Resultado esperado**: todas las tareas se cargan desde el backend.

### Eliminación múltiple
- Crear varias tareas, completar algunas.
- Usar “Eliminar todas las completadas”.
- **Resultado esperado**: lista de completadas vacía y tareas eliminadas del backend si corresponde.

---

## Accesibilidad básica

- **Teclado**: todos los botones son `<button>` y se pueden activar con Enter/Espacio; los inputs son navegables con Tab.
- **Focus visible**: botones principales tienen `focus:ring-*`.
- **Labels / aria**: inputs y selects tienen `label` y el mensaje “No hay tareas que coincidan” usa `role="status"` + `aria-live="polite"`.