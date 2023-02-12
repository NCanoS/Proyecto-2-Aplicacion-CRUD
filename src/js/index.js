var i;
const nombre_input = document.querySelector("#nombre");
const marca_input = document.querySelector("#marca");
const ubicacion_input = document.querySelector("#ubicacion");
const cantidad_input = document.querySelector("#cantidad");
const comentarios_input = document.querySelector("#comentarios");
const operacional_input = document.querySelector("#operacional");

const agregar_boton = document.querySelector("#agregar");
const cancelar_boton = document.querySelector("#cancelar");
const actualizar_boton = document.querySelector("#actualizar");
const borrar_boton = document.getElementById("#borrar");

const form = document.querySelector("form");

const content_container_div = document.getElementById("content-container");
const content_table = document.getElementById("content-table");
const equipos = JSON.parse(localStorage.getItem("equipos"));

document.addEventListener('DOMContentLoaded', () =>{
    const equipos = JSON.parse(localStorage.getItem("equipos"));

    if(equipos === null){
        const parrafo = document.createElement("p");
        const texto_parrafo = document.createTextNode("No hay elementos para mostrar.");

        parrafo.appendChild(texto_parrafo);

        content_container_div.append(parrafo);
    } else{
        mostrarEquipos(equipos);
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

        mostrarEquipos(equipos);
        form.reset();
        content_container_div.hidden = true;
    });
});

function mostrarEquipos(equipos){
    document.querySelector("tbody").innerHTML="";
    for(let i = 0; i<equipos.length;i++){

        /*

        const actualizar_boton = document.createElement("button");
        const texto_actualizar_boton = document.createTextNode("Actualizar");
        actualizar_boton.appendChild(texto_actualizar_boton);
        */
    

        const fila=document.createElement('tr');
        fila.innerHTML = `
        <td>${equipos[i].nombre}</td>
        <td>${equipos[i].marca}</td>
        <td>${equipos[i].ubicacion}</td>
        <td>${equipos[i].cantidad}</td>
        <td>${equipos[i].comentarios}</td>
        <td>${equipos[i].operacional}</td>
        <td>
            <button id="actualizar" onclick="actualizarEquipo(${i})">Actualizar</button>
            <button id="borrar" onclick="borrarLocalStorage(${i})">Eliminar</button>
        </td>
        `;
        document.querySelector("tbody").appendChild(fila);
    }
    content_container_div.hidden = true;
}

function borrarLocalStorage(i){
    var equipos = JSON.parse(localStorage.getItem('equipos')) || [];
    equipos.splice(i,1);
    localStorage.setItem('equipos',JSON.stringify(equipos));
    form.reset();
    mostrarEquipos(equipos);
}


function actualizarEquipo(i){
    var equipos = JSON.parse(localStorage.getItem('equipos')) || [];
        nombre_input.value=equipos[i].nombre;
        marca_input.value=equipos[i].marca;
        ubicacion_input.value=equipos[i].ubicacion;
        cantidad_input.value=equipos[i].cantidad;
        comentarios_input.value=equipos[i].comentarios;
        operacional_input.value=equipos[i].operacional;

        agregar_boton.hidden=true
        agregar_boton.disabled=true

        const guardar_boton = document.createElement("button");
        const texto_guardar_boton = document.createTextNode("Guardar");
        guardar_boton.appendChild(texto_guardar_boton);
        
        const cancelar_boton = document.createElement("button");
        const texto_cancelar_boton = document.createTextNode("Cancelar");
        cancelar_boton.appendChild(texto_cancelar_boton);
        

        guardar_boton.id = "actualizar";
        cancelar_boton.id = "cancelar";

        guardar_boton.onclick = (e) =>{
            e.preventDefault();
            const nuevo_nombre_input = nombre_input.value;
            const nuevo_marca_input = marca_input.value;
            const nuevo_ubicacion_input = ubicacion_input.value;
            const nuevo_cantidad_input = cantidad_input.value;
            const nuevo_comentarios_input = comentarios_input.value;
            const nuevo_operacional_input = operacional_input.value;
            const equipo = {
                "nombre": nuevo_nombre_input,
                "marca": nuevo_marca_input,
                "ubicacion": nuevo_ubicacion_input,
                "cantidad": nuevo_cantidad_input,
                "comentarios": nuevo_comentarios_input,
                "operacional": nuevo_operacional_input
            }
            equipos.splice(i,1,equipo);
            localStorage.setItem('equipos',JSON.stringify(equipos));
            mostrarEquipos(equipos);
            guardar_boton.hidden=true;
            cancelar_boton.hidden=true;
            agregar_boton.hidden=false;
            agregar_boton.disabled=false;
            form.reset();
        }

        cancelar_boton.onclick= () => {
            form.reset();
            guardar_boton.hidden=true;
            agregar_boton.hidden=false;
            agregar_boton.disabled=false;
            cancelar_boton.hidden=true;
        }

        form.appendChild(guardar_boton);
        form.appendChild(cancelar_boton);
}