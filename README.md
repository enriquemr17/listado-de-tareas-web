## taskflow

## 📋 Descripción
TaskFlow es una aplicación web para gestionar tareas con **categorías**, **prioridades**, **estado (pendiente / completada)**, **modo oscuro** y **filtrado avanzado**. Permite añadir, editar, completar, volver a pendiente, eliminar tareas y guardar el estado en **localStorage** para que persista al recargar la página.

---

## Funcionalidades principales

### 1. Añadir tareas
- Crear tareas con:
  - **Texto**: descripción de la tarea.
  - **Categoría**: Profesional, Finanzas, Salud o Personal.
  - **Prioridad**: Alta, Media o Baja.
- Las nuevas tareas se guardan en **localStorage** y se muestran automáticamente en la lista.

### 2. Eliminar tareas
- Cada tarea tiene un botón “Eliminar”.
- Eliminar la tarea actualiza el DOM y el almacenamiento.

### 3. Completar y volver a pendiente
- Botón “Completar” mueve la tarea a **TAREAS COMPLETADAS** y elimina los botones “Completar” y “Editar”.
- En completadas aparece el botón “Pendiente”, que devuelve la tarea a **TAREAS** y restaura “Editar” + “Completar”.

### 4. Acciones masivas
- **Completar todas las tareas**: mueve todas las tareas pendientes a completadas.
- **Eliminar todas las completadas**: borra la lista de completadas en un solo clic.

### 5. Modo oscuro
- Botón “ALTERNAR MODO OSCURO”.
- Utiliza la clase `dark` de Tailwind CSS para aplicar estilos automáticamente.

### 6. Filtrado de tareas
- Filtrar por:
  - **Texto**: búsqueda en la descripción.
  - **Categoría**: menú desplegable.
  - **Prioridad**: menú desplegable.
- **Estado**: Todas / Pendientes / Completadas.
- Filtrado combinado: se pueden usar simultáneamente.
- Si no hay coincidencias, aparece el mensaje: “No hay tareas que coincidan”.

### 7. Persistencia de datos
- Las tareas se guardan en **localStorage** con sus campos (texto, categoría, prioridad, completada).
- Al recargar, las tareas se reconstruyen y vuelven a su lista correspondiente (pendientes o completadas).

### 6. Interfaz responsiva
- Estructura con **Flexbox** y **Tailwind CSS**.
- La barra de creación de tareas y filtros se adaptan a móviles y escritorio.

---

## Estructura del proyecto

---

## Tecnologías utilizadas
- HTML5
- CSS (Tailwind)
- JavaScript (Vanilla)
- localStorage

---

## Flujo de funcionamiento

1. El usuario crea una tarea usando el formulario (texto, categoría, prioridad).
2. La tarea se agrega al DOM.
3. `guardarTareas()` guarda el listado actual en localStorage (incluyendo si está completada o pendiente).
4. Al recargar, `DOMContentLoaded` carga las tareas almacenadas y las coloca en su lista según el estado.
5. El usuario puede editar, completar, volver a pendiente o eliminar cualquier tarea.
6. El filtrado funciona en tiempo real (y también con el botón “Buscar”) por texto, categoría, prioridad y estado.

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

1. Abrir `index.html` en el navegador.
2. Añadir nuevas tareas desde el formulario inferior.
3. Filtrar tareas por texto, categoría o prioridad desde la barra superior.
4. Alternar entre modo claro y oscuro con el botón superior.
5. Las tareas se guardan automáticamente en localStorage.

---

## Revisión / QA (casos solicitados)

### Lista vacía
- Abrir la app por primera vez (sin tareas en localStorage).
- **Resultado esperado**: no hay errores en consola, ambas listas aparecen vacías, el mensaje “No hay tareas que coincidan” solo aparece si aplicas un filtro que no encuentra nada.

### Tareas largas
- Crear una tarea con texto largo (por ejemplo 200–500 caracteres).
- **Resultado esperado**: la tarea se crea sin romper el layout; se puede completar/editar/eliminar igual.

### Recarga (persistencia)
- Crear tareas pendientes y completadas.
- Recargar la página.
- **Resultado esperado**: las pendientes vuelven a “TAREAS” y las completadas vuelven a “TAREAS COMPLETADAS”.

### Eliminación múltiple
- Crear varias tareas, completar algunas.
- Usar “Eliminar todas las completadas”.
- **Resultado esperado**: la lista de completadas queda vacía y `localStorage` se actualiza.

---

## Accesibilidad básica

- **Teclado**: todos los botones son `<button>` y se pueden activar con Enter/Espacio; los controles de formulario son navegables con Tab.
- **Focus visible**: botones principales tienen `focus:ring-*` para ver el foco con teclado.
- **Labels / aria**: inputs y selects tienen `label` (visualmente oculto con `sr-only`) y el mensaje “No hay tareas que coincidan” usa `role="status"` + `aria-live="polite"` para lectores de pantalla.