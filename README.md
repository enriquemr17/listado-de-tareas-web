    # taskflow

## 📋 Descripción
TaskFlow es una aplicación web para gestionar tareas con **categorías**, **prioridades**, **modo oscuro** y **filtrado avanzado**. Permite añadir, eliminar y buscar tareas, y guardar las tareas creadas en **localStorage** para que persistan al recargar la página.

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
- Las tareas predefinidas en HTML también tienen botón de eliminar, pero **no se duplican** al recargar.

### 3. Modo oscuro
- Botón “ALTERNAR MODO OSCURO”.
- Utiliza la clase `dark` de Tailwind CSS para aplicar estilos automáticamente.

### 4. Filtrado de tareas
- Filtrar por:
  - **Texto**: búsqueda en la descripción.
  - **Categoría**: menú desplegable.
  - **Prioridad**: menú desplegable.
- Filtrado combinado: se pueden usar simultáneamente.
- Si no hay coincidencias, aparece el mensaje: “No hay tareas que coincidan”.

### 5. Persistencia de datos
- Solo las tareas creadas desde el formulario se guardan en **localStorage**.
- Las tareas predefinidas en HTML permanecen fijas y no se duplican.

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
2. La tarea se agrega al DOM y se marca con la clase `.nueva`.  
3. `guardarTareas()` guarda únicamente las tareas nuevas en localStorage.  
4. Al recargar, `DOMContentLoaded` carga las tareas almacenadas en localStorage.  
5. Las tareas predefinidas del HTML **no se guardan** para evitar duplicados.  
6. El usuario puede eliminar cualquier tarea con el botón “Eliminar”.  
7. El filtrado funciona en tiempo real por texto, categoría y prioridad.

---

## Clases CSS importantes

| Clase       | Descripción |
|------------|-------------|
| `.tarea`   | Representa una tarea en la lista |
| `.nueva`   | Tareas creadas desde el formulario (se guardan en localStorage) |
| `.categoria` | Span que contiene la categoría de la tarea |
| `.prioridad` | Span que contiene la prioridad de la tarea |

---

## Instrucciones de uso

1. Abrir `index.html` en el navegador.
2. Añadir nuevas tareas desde el formulario inferior.
3. Filtrar tareas por texto, categoría o prioridad desde la barra superior.
4. Alternar entre modo claro y oscuro con el botón superior.
5. Las tareas nuevas se guardan automáticamente, mientras que las predefinidas permanecen fijas.