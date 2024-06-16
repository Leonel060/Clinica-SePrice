function agregarProfesionalesAlDOM() {
    let endpoint = '/api/profesionales';

    // Realizar la solicitud GET al endpoint utilizando fetch
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let profesionales = data.data; // Array de Profesionales

            // Iterar sobre la lista de Profesionales y agregarlos al DOM
            profesionales.forEach(profesional => {
                // Crear la estructura HTML para el profesional
                let divProfesional = document.createElement("div");
                divProfesional.className = "botonC";
                let divContainer = document.createElement("div");
                divContainer.className = "container";
                let divRow = document.createElement("div");
                divRow.className = "row";

                // Agregar los datos del profesional como columnas
                let divId = document.createElement("div");
                divId.className = "col";
                divId.textContent = profesional.id_profesional;
                let divNombre = document.createElement("div");
                divNombre.className = "col";
                divNombre.textContent = profesional.nombre;
                let divApellido = document.createElement("div");
                divApellido.className = "col";
                divApellido.textContent = profesional.apellido;
                let divDni = document.createElement("div");
                divDni.className = "col";
                divDni.textContent = profesional.dni;
                let divTelefono = document.createElement("div");
                divTelefono.className = "col";
                divTelefono.textContent = profesional.telefono;
                let divEmail = document.createElement("div");
                divEmail.className = "col";
                divEmail.textContent = profesional.email;

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
                    // Redireccionar a la página de detalle del profesional
                    window.location.href = `../paginas/Profesionales/detalle_profesionales.html?id=${profesional.id_profesional}`;
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

                // Agregar el divContainer al divprofesional
                divProfesional.appendChild(divContainer);

                // Agregar el profesional al contenedor principal
                document.getElementById("contenedorProfesionales").appendChild(divProfesional);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de Profesionales:', error);
        });
}

// Llamar a la función para agregar Profesionales al DOM cuando la página se haya cargado completamente
window.onload = function() {
    agregarProfesionalesAlDOM();
};
