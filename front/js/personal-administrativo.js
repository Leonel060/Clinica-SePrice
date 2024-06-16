function agregarAdministrativosAlDOM() {
    let endpoint = '/api/administracion';

    // Realizar la solicitud GET al endpoint utilizando fetch
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let personalAdministrativo = data.data; // Array de divAdministrativos

            // Iterar sobre la lista de divAdministrativos y agregarlos al DOM
            personalAdministrativo.forEach(administrativo => {
                // Crear la estructura HTML para el divAdministrativo
                let divAdministrativo = document.createElement("div");
                divAdministrativo.className = "botonC";
                let divContainer = document.createElement("div");
                divContainer.className = "container";
                let divRow = document.createElement("div");
                divRow.className = "row";

                // Agregar los datos del divAdministrativo como columnas
                let divId = document.createElement("div");
                divId.className = "col";
                divId.textContent = administrativo.id_personal_admin;
                let divNombre = document.createElement("div");
                divNombre.className = "col";
                divNombre.textContent = administrativo.nombre;
                let divApellido = document.createElement("div");
                divApellido.className = "col";
                divApellido.textContent = administrativo.apellido;
                let divDni = document.createElement("div");
                divDni.className = "col";
                divDni.textContent = administrativo.dni;
                let divTelefono = document.createElement("div");
                divTelefono.className = "col";
                divTelefono.textContent = administrativo.telefono;
                let divEmail = document.createElement("div");
                divEmail.className = "col";
                divEmail.textContent = administrativo.email;
                let divEstado = document.createElement("div");
                divEstado.className = "col";
                divEstado.textContent = administrativo.estado;

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
                    window.location.href = `../paginas/administracion/detalle_personal.html?id=${administrativo.id_personal_admin}`;
                });

                // Agregar las columnas al divRow
                divRow.appendChild(divId);
                divRow.appendChild(divNombre);
                divRow.appendChild(divApellido);
                divRow.appendChild(divDni);
                divRow.appendChild(divTelefono);
                divRow.appendChild(divEmail);
                divRow.appendChild(divEstado);
                divRow.appendChild(divBoton);

                // Agregar el divRow al divContainer
                divContainer.appendChild(divRow);

                // Agregar el divContainer al divAdministrativo
                divAdministrativo.appendChild(divContainer);

                // Agregar el profesional al contenedor principal
                document.getElementById("contenedorAdministrativos").appendChild(divAdministrativo);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de Administrativos:', error);
        });
}

// Llamar a la función para agregar Profesionales al DOM cuando la página se haya cargado completamente
window.onload = function() {
    agregarAdministrativosAlDOM();
};
