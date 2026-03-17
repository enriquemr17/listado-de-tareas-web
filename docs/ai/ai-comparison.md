## Comparativa entre asistentes de IA (ChatGPT vs Cursor)

## Objetivo
Documentar una comparativa práctica entre ChatGPT y Cursor en tareas típicas de desarrollo: explicación de conceptos, detección de bugs y generación de código.

## Metodología
- Mismos prompts para ambos asistentes.
- Registrar prompts y respuestas completas.
- Evaluar con criterios: claridad, profundidad, ejemplos, corrección técnica y utilidad.

## Criterios de evaluación
- Claridad
- Profundidad
- Ejemplos
- Corrección técnica
- Calidad del código generado
- Errores / alucinaciones

## Experimento 1: Explicación de conceptos técnicos
### Concepto 1:
- Concepto técnico:  event loop.

- Explicación ChatGPT: el event loop es un mecanismo de JavaScript que permite ejecutar código asíncrono sin bloquear el hilo principal.
Revisa constantemente si el call stack está vacío y, si lo está, ejecuta funciones pendientes de la callback queue.
Así, tareas como setTimeout, fetch o eventos pueden ejecutarse mientras el resto del código sigue corriendo.

- Explicación Cursor: el event loop es el mecanismo de JavaScript (en el navegador o Node.js) que coordina la ejecución de código sin bloquear el hilo principal.
Primero ejecuta el código “normal” (call stack) y, cuando queda libre, va procesando tareas pendientes (callbacks/promesas) de una cola.
Así permite manejar eventos y operaciones asíncronas (timers, fetch, I/O) de forma eficiente.

- Valoración: la explicación de Cursor me parece algo menos técnica y teniendo en cuenta que busco una explicación, me parece mejor opción¡. 

### Concepto 2: 
- Concepto técnico: prompt.

- Explicación ChatGPT: un prompt es un mensaje o cuadro de diálogo que solicita al usuario que ingrese información.
En JavaScript, se usa la función prompt() para capturar texto del usuario.

- Explicación Cursor: un prompt es la instrucción o texto que le das a una IA para indicarle qué debe hacer y con qué contexto.
Cuanto más claro y específico sea, mejor suele ser la respuesta.

- Valoración: mucho mejor ChatGPT ya que lo lleva al ámbito de la programación.

### Concepto 3: 
- Concepto técnico: DOM

- Explicacón ChatGPT: el DOM (Document Object Model) es la representación en forma de árbol de todos los elementos de una página web.
Permite que JavaScript lea y modifique el contenido, la estructura y el estilo de la página.

- Explicación Cursor: el DOM (Document Object Model) es la representación del documento HTML como un árbol de objetos (nodos).
JavaScript puede leerlo y modificarlo para cambiar la página (texto, estilos, elementos) dinámicamente.

- Valoración: las dos opciones son válidas. 

## Experimento 2: Detección y explicación de bugs
### Bug 1
- Código: <!-- for="prioridad" class="sr-only">Prioridad</label>
             <select id="prioridad" class="p-2 border rounded bg-white dark:bg-gray-700">
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select> 

- Prompt: dime donde esta el fallo, dime por qué y corrigelo 

- Respuesta ChatGPT: te falta el inicio de la etiqueta <label>. Solo pusiste el cierre </label> al final. Por lo tanto, el navegador no reconoce que esto es un <label> asociado al <select>.

- Respuesta Cursor: el fallo en el fragmento que pegaste es de sintaxis HTML: empieza con for="prioridad" ... pero le falta el inicio de la etiqueta <label. Eso hace que el navegador interprete ese texto como “basura” fuera de una etiqueta, y el </label> cierre no empareja con nada (HTML inválido). Voy a buscar si en tu index.html existe esa versión rota para corregirla.

En tu fragmento falta <label al principio:

Dónde está el fallo: en for="prioridad" class="sr-only">Prioridad</label>
Por qué: for="prioridad" es un atributo válido solo dentro de una etiqueta <label ...>. Al no existir <label, ese </label> queda “colgando” y el HTML queda mal formado (y la asociación label→select no funciona bien para accesibilidad).

- Veredicto: las dos encuentran el fallo perfectamente ya que el fallo, como bien dicen, viene del label. 

### Bug 2
- Código: 
function guardarTareas () {
    const tareas = []; // se pone [] porque estamos creando un array pero al no haber nada dentro, esta vacío
    document.querySelectorAll(".tarea").forEach (div => { //busca todo los p dentro de .tarea y metelos dentro del array
       
        const texto = div.querySelector("p")?.textContent || div.querySelector("h3")?.textContent; 
        const categoria = div.querySelector(".categoria")?.textContent; 
        const prioridad = div.querySelector(".prioridad")?.textContent;
        
        const completada = div.parentElement.id === "lista-completadas"; 

        if (!texto || !categoria|| !prioridad) return; 
        tareas.push ({
            texto: texto, 
            categoria: categoria, 
            prioridad: prioridad, 
            completada: completada}); // push para meter lo que este dentro de tarea en el array. Push se usa en arrays
    }); 
    localStorage.setItem("tareas", JSON.stringify(tareas)); 
    
}

document.addEventListener("DOMContentLoaded", () => {
    
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareasGuardadas.forEach(tarea => {

        if(!tareatexto) return; //evita tareas vacias

        // Creamos la tarea normalmente
        const nuevaTarea = crearTarea(tarea.texto, tarea.categoria, tarea.prioridad);

        if (tarea.completada) {
            marcarComoCompletada(nuevaTarea);
            listaCompletadas.appendChild(nuevaTarea);
        }
});
});

- Prompt: encuentra el fallo, dime por que está mal y corrigelo. 

- Respuesta ChatGPT: "tareatexto" no existe. Probablemente querías usar "tarea.texto". Al usar una variable inexistente, tu código lanzará un error y no cargará las tareas guardadas.

- Respuesta Cursor: tareatexto no existe: no has declarado ninguna variable con ese nombre, así que al ejecutarse esa línea tendrás un ReferenceError y se corta la carga de tareas. Lo correcto es comprobar la propiedad del objeto que estás recorriendo: tarea.texto.

- Veredicto: dos opciones válidas.

### Bug 3
- Código: 
botonCompletarTodas("click", () => {
    document.querySelectorAll("#lista-tareas .tarea").forEach(div => {
        marcarComoCompletada(div);
        listaCompletadas.appendChild(div);
    });

    guardarTareas(); // actualizar LocalStorage
}); 

- Prompt: encuentra el fallo, dime por que está mal y corrigelo. 

- Respuesta ChatGPT: aquí parece que botonCompletarTodas no es un método estándar de JS. Lo correcto sería seleccionar el botón y usar addEventListener.

- Respuesta Cursor: parece que falta addEventListener (o estás llamando a una función que no existe).

- Veredicto: chatGPT lo desarrolla algo mejor pero las dos opciones son válidas.

## Experimento 3: Generación de código desde lenguaje natural
### Función 1
- Prompt: con este codigo, creame una función nueva que sirva para poder cambiar la prioridad de las tareas: (Codigo completo de JavaScript)

- Respuesta ChatGPT: sensación de código mezclado y algo mal depurado.
- Respuesta Cursor: código limpio con opción a inlcuirlo dentro del código y opción de añadirlo dentro del botón de editar.

- Comparación / conclusiones: decido incorporar en el código la opción de Cursor al ser más limpia y poder integarla directamente. 
    La opción de chatGPT me daba problemas al implementarla manualmente ya que no se veía como yo queria. 

### Concepto 2:
- Prompt: quiero que esa nueva opción de editar la prioridad se pueda ver o seleccionar junto con editar el texto, sin tener que darle a aceptar para pasar a editar la prioridad.

- Respuesta ChatGPT: Mala implementación debido a que la app deja de funcionar correctamente sin dejar añadir tareas y borrando las anteriores, dando lugar a no poder comprobar que se aplique la función. Además añade la función de cambiar la categoria la cual yo no he pedido. 

- Respuesta Cursor: Implementación perfecta en el código haciendolo completamente funcional. Dandome opciones entre algo más profesional o más básico. El modal se ve algo pequeño, pero se soluciona con una corrección.

- Comparación / conclusiones: Vuelvo a elegir la opción de cursor ya que a parte de ser funcional y no destrozar el código, me da la opción a hacerlo de diferentes maneras. La IA de cursor ha sido algo más lenta y darme la resspuesta que ChatGPT. 

### Concepto 3:
- Prompt: separación entre texto y botones y agrupación de botones al lado derecho de la tarea. 

- Respuesta ChatGPT: implementación media, con fallos a la hora de hacer el codigo teniendo que pedir más de una vez que se vuelvan a reescribir para tener buena funcionalidad. 

- Respuesta Cursor: buena implementación con diferentes opciones, generando nuevos estilos.    

- Comparación / conclusiones: vuelvo a elegir la opción de Cursor. Al estar coordinada con el código existente es bastante más precisa, lo entiende bastante mejor que ChatGPT. De primeras, chatGPT crea los botones de una mejor manera, aun así, la elección sigue siendo la misma, Cursor. 

## Conclusiones finales
- Qué asistente fue mejor: los dos en general. 

- Puntos fuertes / débiles: 
    -ChatGPT: 
        -Fuertes: Explicaciones extensas y algo más entendibles, buena interpretación de código y funcionamiento rápido. 
        -Débiles: mala integración con el código, teniendo que pedir de forma muy explícita que es lo que necesitas para que consiga hacer bien el código. Falta de integración con el código. 

    -Cursor: 
        - Fuertes: buenas explicaciones, buena manera de interpretar el código y acceso a Git y al propio código, pudiendo implementarlo en cualquier momento. 
        -Débiles: en algunas ocasiones tarda "demasiado" en liberar el código o enviar el mensaje. 

- Qué usaría en un proyecto real y cuándo: usaría los dos en diferentes ocasiones, siempre como apoyo y no para realizar las tareas que debería de hacer yo, pero le daría algo más de uso a Cursor ya que está integrado con git y con el propio código y puede cambiar el código sin que el programador tenga que hacer nada.