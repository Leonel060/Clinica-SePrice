function agregarEstudiossAlDOM() {
    // Endpoint para obtener datos de estudios desde el backend
    let endpoint = '/api/estudios';

    // Realizar la solicitud GET al endpoint utilizando fetch
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let estudios = data.data; // Array de estudios

            // Iterar sobre la lista de estudios y agregarlos al DOM
            estudios.forEach(estudio => {
                // Crear la estructura HTML 
                let divEstudio = document.createElement("div");
                divEstudio.className = "botonC";
                let divContainer = document.createElement("div");
                divContainer.className = "container";
                let divRow = document.createElement("div");
                divRow.className = "row";

                // Agregar los datos del estudio como columnas
                let divId = document.createElement("div");
                divId.className = "col";
                divId.textContent = estudio.id_insumo;
                let divNombre = document.createElement("div");
                divNombre.className = "col";
                divNombre.textContent = estudio.nombre;
                let divIndicacion = document.createElement("div");
                divIndicacion.className = "col";
                divIndicacion.textContent = estudio.indicaciones;
                

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
                    window.location.href = `../paginas/estudios/detalle_estudios.html?id=${estudio.id_estudio}`;
                });

                // Agregar las columnas al divRow
                divRow.appendChild(divId);
                divRow.appendChild(divNombre);
                divRow.appendChild(divIndicacion);
                divRow.appendChild(divBoton);

                // Agregar el divRow al divContainer
                divContainer.appendChild(divRow);

                // Agregar el divContainer al divPaciente
                divEstudio.appendChild(divContainer);

                // Agregar el paciente al contenedor principal
                document.getElementById("contenedorEstudios").appendChild(divEstudio);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de estudios:', error);
        });
}

// Llamar a la función para agregar pacientes al DOM cuando la página se haya cargado completamente
window.onload = function() {
    agregarEstudiossAlDOM();
};
