const formulario = document.getElementById ("form-tarea"); //constante 
const input = document.getElementByIdn("input-tarea"); 
const lista = document.getElementById ("lista-tareas"); 

formulario.addEventListener("submit", function(e) {
    e.preventDefault () //evita que la pagina se recargue

    const texto = input.value.trim(); //trim se utiliza para quitar espacios delante y detras del texto
    if (texto!== "") {
        crearTarea(texto); 
        input.value = ""; //limpiar el input para escribir otra
    }
}); 

function crearTarea(texto) {
    const div = document.createElement ("div")

    const p = document.createElement ("p")
    p.textContent = texto; 

    const boton = document.createElement ("button"); 
    boton.textContent = "Eliminar"; 

    boton.addEventListener ("click", function() {
        div.remove(); 
        guardarTareas(); 
    
}); 

    div.appendChild(p); 
    div.appendChild(boton); 

    lista.appendChild(div); 
    guardarTareas(); 

}