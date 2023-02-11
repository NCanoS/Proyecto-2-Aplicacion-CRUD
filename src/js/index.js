const nombre_input = document.querySelector("#nombre");
const marca_input = document.querySelector("#marca");
const ubicacion_input = document.querySelector("#ubicacion");
const cantidad_input = document.querySelector("#cantidad");
const comentarios_input = document.querySelector("#comentarios");
const operacional_input = document.querySelector("#operacional");

const agregar_boton = document.querySelector("#agregar");
const agregar_confirmar = document.querySelector("#confirmar");
const borrar_boton = document.getElementById("borrar-todo");

const form = document.querySelector("form");

const content_container_div = document.getElementById("content-container");
const content_table = document.getElementById("content-table");

document.addEventListener('DOMContentLoaded', () =>{
    const equipos = JSON.parse(localStorage.getItem("equipos"));

    if(equipos === null){
        const parrafo = document.createElement("p");
        const texto_parrafo = document.createTextNode("No hay elementos para mostrar.");

        parrafo.appendChild(texto_parrafo);

        content_container_div.append(parrafo);
    } else{
        render(equipos);
    }

    agregar_boton.addEventListener('click', (e) => {
        e.preventDefault();
        const equipos = JSON.parse(localStorage.getItem("equipos")) || [];
        const equipo = new Equipo(
            nombre_input.ariaValueMax,
            marca_input.value,
            ubicacion_input.value,
            cantidad_input.value,
            comentarios_input.value,
            operacional_input.value
        );

        equipos.push(equipo);

        localStorage.setItem('equipos',JSON.stringify(equipos));

        render(equipos);
    });

    borrar_boton.addEventListener('click', () => {
        localStorage.setItem("equipos",JSON.stringify([]));
        content_container_div.innerHTML = '';
    });
});