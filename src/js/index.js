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

        const parrafo = document.createElement("p");
        const texto_parrafo = document.createTextNode("No hay elementos para mostrar.");
        parrafo.appendChild(texto_parrafo);

        content_container_div.append(parrafo);
    });

    agregar_confirmar.addEventListener('click', (e) =>{
        e.preventDefault();

    });
});

function render(equipos){
    for(let i = 0; i<equipos.length;i++){

        const div_equipo = document.createElement("div");
        const texto_nombre_marca = document.createTextNode(`${equipos[i].nombre}-${equipos[i].marca}`);

        const borrar_boton = document.createElement("button");
        const texto_borrar_boton = document.createTextNode("Eliminar");
        borrar_boton.appendChild(texto_borrar_boton);

        const actualizar_boton = document.createElement("button");
        const texto_actualizar_boton = document.createTextNode("Actualizar");
        actualizar_boton.appendChild(texto_actualizar_boton);

        borrar_boton.onclick = () =>{
            deleteLocalStorage(i,equipos);
        }

        actualizar_boton.onclick = () => {
            nombre_input.value = equipos[i].nombre;
            marca_input.value = equipos[i].marca;
            ubicacion_input.value = equipos[i].ubicacion;
            cantidad_input.value = equipos[i].cantidad;
            comentarios_input.value = equipos[i].comentarios;
            operacional_input.value = equipos[i].operacional;
        
            agregar_boton.disabled=true

            const guardar_boton = document.createElement("button"):
            const texto_guardar_boton = document.createTextNode("Guardar");
            guardar_boton.appendChild(texto_guardar_boton);

            guardar_boton.id = i;

            guardar_boton.onclick = (e) =>{
                e.preventDefault();
                const equipo = new Equipo(
                    nombre_input.value,
                    marca_input.value,
                    ubicacion_input.value,
                    cantidad_input.value,
                    comentarios_input.value,
                    operacional_input.value
                    );
                equipos.splice(i,1,equipo);
                localStorage.setItem('equipos',JSON.stringify(equipos));
                content_container_div.innerHTML="";
                render(equipos);
                guardar_boton.hidden=true;
                agregar_boton.disabled=false;
            }
            form.appendChild(guardar_boton);
        }
        div_equipo.appendChild(texto_nombre_marca);
        div_equipo.appendChild(actualizar_boton);
        div_equipo.appendChild(borrar_boton);

        content_container_div.appendChild(div_equipo);
    }
}