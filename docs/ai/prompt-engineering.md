¿Qué es el prompt engineering?

El prompt engineering consiste en diseñar instrucciones claras y estructuradas para obtener mejores respuestas de una IA.

En este proyecto se han utilizado distintos tipos de prompts para:
	•	Generar código
	•	Detectar errores
	•	Refactorizar funciones
	•	Documentar el proyecto


- Tipos de prompts utilizados

1. 🎭 Definir un rol

Prompt:

Actúa como un desarrollador frontend senior y revisa este código JavaScript

Por qué funciona:
	•	La IA responde con más criterio técnico
	•	Da explicaciones más profesionales
	•	Detecta problemas más profundos


2. Prompt con contexto específico

Prompt:

Tengo un problema con un botón que se duplica al mover tareas entre listas. Analiza este código y dime el fallo

Por qué funciona:
	•	Da contexto real del problema
	•	Evita respuestas genéricas
	•	Va directo al error


3. Few-shot prompting (con ejemplos)

Prompt:

Aquí tienes un ejemplo de cómo creo botones:
function crearBoton(…) {…}
Ahora crea uno similar para “archivar tarea”

Por qué funciona:
	•	La IA imita tu estilo
	•	Mantiene coherencia en el código
	•	Reduce errores


4. Pedir razonamiento paso a paso

Prompt:

Explica paso a paso qué ocurre cuando hago click en el botón completar

Por qué funciona:
	•	Permite entender mejor el código
	•	Ayuda a detectar errores lógicos


5. Prompt con restricciones

Prompt:

Refactoriza esta función sin añadir nuevas funciones y sin cambiar su comportamiento

Por qué funciona:
	•	Evita que la IA “se invente” soluciones complejas
	•	Mantiene el control del código


6. Refactorización de código

Prompt:

Simplifica esta función y elimina código duplicado

Por qué funciona:
	•	Mejora legibilidad
	•	Reduce errores


7. Detección de errores

Prompt:

Encuentra errores de sintaxis en este código

Por qué funciona:
	•	La IA se centra en fallos concretos
	•	Muy útil para bugs rápidos


8. Mejora de estructura

Prompt:

Propón una mejor organización para este archivo JavaScript

Por qué funciona:
	•	Ayuda a escalar el proyecto
	•	Introduce buenas prácticas


9. Análisis de comportamiento

Prompt:

¿Por qué este código no funciona después de recargar la página?

Por qué funciona:
	•	Ataca problemas reales (como el tuyo)
	•	Detecta errores de lógica


10. Generación de documentación

Prompt:

Genera una explicación clara de esta función para incluirla en documentación

Por qué funciona:
	•	Ahorra tiempo
	•	Mejora la calidad del README


- Problemas encontrados al usar IA
	•	A veces propone soluciones demasiado complejas
	•	Puede introducir errores si no se revisa
	•	Tiende a “parchear” en lugar de solucionar la raíz


- Recomendaciones
	•	Dar contexto siempre
	•	Ser específico
	•	Limitar lo que puede hacer la IA
	•	Revisar siempre el código generado
	•	No aceptar soluciones sin entenderlas


- Conclusión

El uso de prompt engineering ha permitido:
	•	Obtener mejores respuestas
	•	Reducir tiempo de desarrollo
	•	Mejorar la calidad del código

Sin embargo, sigue siendo necesario revisar manualmente todas las soluciones.



### AMPLIACION DE TASKFLOW CON AYUDA DE IA

1. BUSQUEDA DE TAREA POR TEXTO
CODIGO: function filtrarTareas() {
    const texto = inputBuscar.value.toLowerCase();

    document.querySelectorAll("#lista-tareas .tarea").forEach(div => {
        const tareaTexto = (div.querySelector("p") || div.querySelector("h3"))
            .textContent.toLowerCase();

        if (tareaTexto.includes(texto)) {
            div.style.display = "flex";
        } else {
            div.style.display = "none";
        }
    });
}

USO DE LA IA: 
	- MEJORA DE CONDICIONES.
	- OPTIMINZACION DE BUSQUEDA.


2. FILTRO POR CATRGORIA Y PRIORIDAD

CODIGO: 
const categoriaSeleccionada = filtrarCategoria.value;
const prioridadSeleccionada = filtrarPrioridad.value;

const coincideCategoria = categoriaSeleccionada === "" || categoria === categoriaSeleccionada;
const coincidePrioridad = prioridadSeleccionada === "" || prioridad === prioridadSeleccionada;

USO DE LA IA: 
	- AYUDA EN LA LOGICA CONDICIONAL.
	- MEJORA DE LA LEGIBILIDAD.


3. BOTON DE "COMPLETAR TODAS"

CODIGO: 
botonCompletarTodas.addEventListener("click", () => {
    document.querySelectorAll("#lista-tareas .tarea").forEach(div => {
        const listaCompletadas = document.getElementById("lista-completadas");
        const p = div.querySelector("p");

        p.classList.add("line-through", "opacity-60");
        listaCompletadas.appendChild(div);

        const botonCompletar = div.querySelector(".btn-completar");
        const botonEditar = div.querySelector(".btn-editar");

        if (botonCompletar) botonCompletar.remove();
        if (botonEditar) botonEditar.remove();
    });

    guardarTareas();
});

USO DE LA IA: 
	-IDENTIFICACION DE ELEMENTOS DEL DOM.
	- MEJORA EN MANIPULACION. 


4. BOTON "PENDIENTE"

CODIGO: 
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

USO DE LA IA: 
	- DETECCION DE BUGS.
	- MEJORA DEL FLUJO COMPLETAR/DESHACER.

5. MODO OSCURO

CODIGO: 
document.getElementById("boton-dark").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});

USO DE LA IA: 
	- IMPLEMENTACION RAPIDA.
	- USO DE CLASES DE TAILWIND.



RESULTADO: 

Gracias a estas mejoras:
	•	La aplicación es más completa
	•	Mejora la experiencia de usuario
	•	El código es más reutilizable


PROBLEMAS ENCONTRADOS: 
	•	Bugs al mover tareas entre listas
	•	Duplicación de botones
	•	Errores al recargar la página

La IA ayudó a detectar estos problemas, aunque algunas soluciones requerían revisión manual.