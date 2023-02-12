const nombre_input = document.querySelector("#nombre");
const marca_input = document.querySelector("#marca");
const ubicacion_input = document.querySelector("#ubicacion");
const cantidad_input = document.querySelector("#cantidad");
const comentarios_input = document.querySelector("#comentarios");
const operacional_input = document.querySelector("#operacional");

const agregar_boton = document.querySelector("#agregar");
const actualizar_boton = document.querySelector("#actualizar");
const borrar_boton = document.getElementById("#borrar");

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

        const nombre = nombre_input.value;
        const marca = marca_input.value;
        const ubicacion = ubicacion_input.value;
        const cantidad = cantidad_input.value;
        const comentarios = comentarios_input.value;
        const operacional = operacional_input.value;
        
        const equipo = {
            "nombre": nombre,
            "marca": marca,
            "ubicacion": ubicacion,
            "cantidad": cantidad,
            "comentarios": comentarios,
            "operacional": operacional
        }

        equipos.push(equipo);

        localStorage.setItem('equipos',JSON.stringify(equipos));

        render(equipos);
        form.reset();
        content_container_div.hidden = true;
    });

    /*borrar_boton.addEventListener('click', () => {
        localStorage.setItem("equipos",JSON.stringify([]));
        content_container_div.innerHTML = '';

        const parrafo = document.createElement("p");
        const texto_parrafo = document.createTextNode("No hay elementos para mostrar.");
        parrafo.appendChild(texto_parrafo);

        content_container_div.append(parrafo);
    });

    agregar_confirmar.addEventListener('click', (e) =>{
        e.preventDefault();

    });*/
});

function render(equipos){
    document.querySelector("tbody").innerHTML="";
    for(let i = 0; i<equipos.length;i++){

        /*const div_equipo = document.createElement("div");
        const texto_nombre_marca = document.createTextNode(`${equipos[i].nombre}-${equipos[i].marca}`);

        const borrar_boton = document.createElement("button");
        const texto_borrar_boton = document.createTextNode("Eliminar");
        borrar_boton.appendChild(texto_borrar_boton);

        const actualizar_boton = document.createElement("button");
        const texto_actualizar_boton = document.createTextNode("Actualizar");
        actualizar_boton.appendChild(texto_actualizar_boton);*/
        /*
        div_equipo.appendChild(texto_nombre_marca);
        div_equipo.appendChild(actualizar_boton);
        div_equipo.appendChild(borrar_boton);
        
        content_container_div.appendChild(div_equipo);
        */

        const borrar_boton = document.createElement("button");
        const texto_borrar_boton = document.createTextNode("Eliminar");
        borrar_boton.appendChild(texto_borrar_boton);

        const actualizar_boton = document.createElement("button");
        const texto_actualizar_boton = document.createTextNode("Actualizar");
        actualizar_boton.appendChild(texto_actualizar_boton);

        const fila=document.createElement('tr');
        fila.innerHTML = `
        <td>${equipos[i].nombre}</td>
        <td>${equipos[i].marca}</td>
        <td>${equipos[i].ubicacion}</td>
        <td>${equipos[i].cantidad}</td>
        <td>${equipos[i].comentarios}</td>
        <td>${equipos[i].operacional}</td>
        <td>
            <button type="button" id="actualizar" onclick="actualizarEquipo(${i})">Actualizar</button>
            <button type="button" id="borrar" onclick="borrarLocalStorage(${i},${equipos})">Eliminar</button>
        </td>
        `;
        document.querySelector("tbody").appendChild(fila);

        /*borrar_boton.onclick = () =>{
            borrarLocalStorage(i,equipos);
        }*/
    }
    content_container_div.hidden = true;
}

function borrarLocalStorage(i,equipos){
    equipos.splice(i,1);
    localStorage.setItem('equipos',JSON.stringify(equipos));
    render(equipos);
}

/*function actualizarEquipo(i){
    const input_tabla_nombre = document.querySelector(`#nombre-${i}`);
    const input_tabla_marca = document.querySelector(`#marca-${i}`);
    const input_tabla_ubicacion = document.querySelector(`#ubicacion-${i}`);
    const input_tabla_cantidad = document.querySelector(`#cantidad-${i}`);
    const input_tabla_comentarios = document.querySelector(`#comentarios-${i}`);
    const input_tabla_operacional = document.querySelector(`#operacional-${i}`);

    const equipos = JSON.parse(localStorage.getItem("equipos")) || [];

    equipos.splice(i,1,{
        "nombre": nombre_input.value,
        "marca": marca_input.value,
        "ubicacion": ubicacion_input.value,
        "cantidad": cantidad_input.value,
        "comentarios": comentarios_input.value,
        "operacional": operacional_input.value
    });

    localStorage.setItem("equipos",JSON.stringify(equipos));

    document.querySelector("tbody").innerHTML = '';
    render(equipos);
}*/

function actualizarEquipo(i){
    //actualizar_boton.onclick = () => {
        nombre_input.value = equipos[i].nombre;
        marca_input.value = equipos[i].marca;
        ubicacion_input.value = equipos[i].ubicacion;
        cantidad_input.value = equipos[i].cantidad;
        comentarios_input.value = equipos[i].comentarios;
        operacional_input.value = equipos[i].operacional;
    
        agregar_boton.disabled=true

        const guardar_boton = document.createElement("button");
        const texto_guardar_boton = document.createTextNode("Guardar");
        guardar_boton.appendChild(texto_guardar_boton);

        guardar_boton.id = i;

        guardar_boton.onclick = (e) =>{
            e.preventDefault();
            const equipo = {
                "nombre": nombre_input.value,
                "marca": marca_input.value,
                "ubicacion": ubicacion_input.value,
                "cantidad": cantidad_input.value,
                "comentarios": comentarios_input.value,
                "operacional": operacional_input.value
            }
            equipos.splice(i,1,equipo);
            localStorage.setItem('equipos',JSON.stringify(equipos));
            render(equipos);
            guardar_boton.hidden=true;
            agregar_boton.disabled=false;
        }
        form.appendChild(guardar_boton);
        form.reset();
    //}
}