function agregarPacientesAlDOM() {
    // Endpoint para obtener datos de pacientes desde el backend
    let endpoint = '/api/pacientes';

    // Realizar la solicitud GET al endpoint utilizando fetch
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let pacientes = data.data; // Array de pacientes

            // Iterar sobre la lista de pacientes y agregarlos al DOM
            pacientes.forEach(paciente => {
                // Crear la estructura HTML para el paciente
                let divPaciente = document.createElement("div");
                divPaciente.className = "botonC";
                let divContainer = document.createElement("div");
                divContainer.className = "container";
                let divRow = document.createElement("div");
                divRow.className = "row";

                // Agregar los datos del paciente como columnas
                let divId = document.createElement("div");
                divId.className = "col";
                divId.textContent = paciente.id_paciente;
                let divNombre = document.createElement("div");
                divNombre.className = "col";
                divNombre.textContent = paciente.nombre;
                let divApellido = document.createElement("div");
                divApellido.className = "col";
                divApellido.textContent = paciente.apellido;
                let divDni = document.createElement("div");
                divDni.className = "col";
                divDni.textContent = paciente.dni;
                let divTelefono = document.createElement("div");
                divTelefono.className = "col";
                divTelefono.textContent = paciente.telefono;
                let divEmail = document.createElement("div");
                divEmail.className = "col";
                divEmail.textContent = paciente.email;

                // Crear el botón con su imagen
                let divBoton = document.createElement("div");
                divBoton.className = "col";
                let boton = document.createElement("button");
                boton.className = "btn botonD";
                boton.type = "button";
                let img = document.createElement("img");
                img.src = "icon/eye-fill.svg";
                img.alt = "ojo";
                boton.appendChild(img);
                divBoton.appendChild(boton);
                // Añadir evento de clic al botón
                boton.addEventListener("click", function() {
                    // Redireccionar a la página de detalle del paciente
                    window.location.href = `../paginas/pacientes/detalle-pacientes.html?id=${paciente.id_paciente}`;
                });

                // Agregar las columnas al divRow
                divRow.appendChild(divId);
                divRow.appendChild(divNombre);
                divRow.appendChild(divApellido);
                divRow.appendChild(divDni);
                divRow.appendChild(divTelefono);
                divRow.appendChild(divEmail);
                divRow.appendChild(divBoton);

                // Agregar el divRow al divContainer
                divContainer.appendChild(divRow);

                // Agregar el divContainer al divPaciente
                divPaciente.appendChild(divContainer);

                // Agregar el paciente al contenedor principal
                document.getElementById("contenedorPacientes").appendChild(divPaciente);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de pacientes:', error);
        });
}

// Llamar a la función para agregar pacientes al DOM cuando la página se haya cargado completamente
window.onload = function() {
    agregarPacientesAlDOM();
};
