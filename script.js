const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("inputTarea");
const listaTareas = document.getElementById("listaTareas");
const pendientes = document.getElementById("pendientes");
const mensajeVacio = document.getElementById("mensajeVacio");

let tareas = [];

function cargarTareas() {
    const datos = localStorage.getItem("tareas");
    if (datos) {
        tareas = JSON.parse(datos);
    }
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach(function (tarea) {
        const li = document.createElement("li");
        li.classList.add("tarea");
        if (tarea.completada) {
            li.classList.add("completada");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.addEventListener("change", function () {
            cambiarEstado(tarea.id);
        });

        const texto = document.createElement("span");
        texto.classList.add("texto");
        texto.textContent = tarea.texto;

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () {
            eliminarTarea(tarea.id);
        });

        li.appendChild(checkbox);
        li.appendChild(texto);
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    });

    actualizarContador();
}

function actualizarContador() {
    const sinCompletar = tareas.filter(function (tarea) {
        return !tarea.completada;
    });
    pendientes.textContent = sinCompletar.length;

    mensajeVacio.style.display = tareas.length === 0 ? "block" : "none";
}

function agregarTarea(texto) {
    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };
    tareas.push(nuevaTarea);
    guardarTareas();
    mostrarTareas();
}

function eliminarTarea(id) {
    tareas = tareas.filter(function (tarea) {
        return tarea.id !== id;
    });
    guardarTareas();
    mostrarTareas();
}

function cambiarEstado(id) {
    tareas.forEach(function (tarea) {
        if (tarea.id === id) {
            tarea.completada = !tarea.completada;
        }
    });
    guardarTareas();
    mostrarTareas();
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const texto = inputTarea.value.trim();

    if (texto === "") {
        alert("Escribe una tarea antes de agregarla.");
        return;
    }

    agregarTarea(texto);
    inputTarea.value = "";
    inputTarea.focus();
});

cargarTareas();
mostrarTareas();
