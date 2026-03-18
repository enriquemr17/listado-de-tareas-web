### REFLEXION SOBRE IA Y PROGRAMACION
1. Áreas donde la IA ayudó más
	•	Generación rápida de documentación: facilitó la creación inicial del README y la descripción de funciones clave (crearTarea(), guardarTareas(), filtrarTareas()).
	•	Sugerencias de mejoras: propuso ideas para botones masivos, filtrado avanzado y mejoras en UX (modo oscuro, persistencia con localStorage).
	•	Refactorización de funciones repetitivas: ayudó a estructurar funciones largas y a mejorar nombres de variables.

2. Casos donde la IA falló
	•	Gestión del DOM compleja: al manipular tareas completadas y el botón “Pendiente”, algunas sugerencias de IA podían generar duplicaciones de botones o pérdida de referencias.
	•	Errores de sintaxis: en ejemplos generados, a veces olvidaba comas, llaves o devolvía código con errores en el flujo de eventos.
	•	Contexto incompleto: no siempre entendía el flujo completo de localStorage y la persistencia de estado.

3. Lecciones aprendidas
	•	La IA funciona mejor cuando se combina con revisión manual: siempre hay que verificar que el código generado respete la lógica existente.
	•	Es más útil para documentación, prompts de refactor y generación de ejemplos, que para manipulación directa de DOM compleja sin supervisión.
	•	Definir claramente roles y restricciones en los prompts mejora la precisión de las respuestas.

4. Conclusión personal
	•	Prefiero usar IA para tareas de documentación, refactorización o ideas de mejora.
	•	Para lógica crítica, interacciones complejas y persistencia de datos, siempre reviso y ajusto manualmente.
	•	La IA acelera procesos repetitivos, pero la supervisión humana es indispensable para mantener estabilidad y calidad del proyecto.
