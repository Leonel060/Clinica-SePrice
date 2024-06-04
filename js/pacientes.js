function agregarPacientesAlDOM() {
    // Ruta del archivo XML
    let archivoXML = "../dataBase/pacientes.xml";

    // Crear un objeto XMLHttpRequest para cargar el archivo XML
    let xmlhttp = new XMLHttpRequest();

    // Definir la función de callback que se ejecutará cuando se cargue el archivo XML
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Convertir la respuesta en un objeto XMLDocument
            let xmlDoc = this.responseXML;

            // Obtener la lista de pacientes del archivo XML
            let pacientes = xmlDoc.getElementsByTagName("paciente");

            // Iterar sobre la lista de pacientes y agregarlos al DOM
            for (let i = 0; i < pacientes.length; i++) {
                let paciente = pacientes[i];

                // Obtener los datos del paciente
                let id = paciente.getElementsByTagName("id")[0].textContent;
                let tipo = paciente.getElementsByTagName("tipo")[0].textContent;
                let activo = paciente.getElementsByTagName("activo")[0].textContent;

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
                divId.textContent = id;
                let divTipo = document.createElement("div");
                divTipo.className = "col";
                divTipo.textContent = tipo;
                let divActivo = document.createElement("div");
                divActivo.className = "col";
                divActivo.textContent = activo;

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
                    // Redireccionar a ver.html
                    window.location.href = "../paginas/pacientes/detalle-pacientes.html";
                });

                // Agregar las columnas al divRow
                divRow.appendChild(divId);
                divRow.appendChild(divTipo);
                divRow.appendChild(divActivo);
                divRow.appendChild(divBoton);

                // Agregar el divRow al divContainer
                divContainer.appendChild(divRow);

                // Agregar el divContainer al divPaciente
                divPaciente.appendChild(divContainer);

                // Agregar el paciente al contenedor principal
                document.getElementById("contenedorPacientes").appendChild(divPaciente);
            }
        }
    };

    // Abrir y enviar la solicitud para cargar el archivo XML
    xmlhttp.open("GET", archivoXML, true);
    xmlhttp.send();
}

// Llamar a la función para agregar pacientes al DOM cuando la página se haya cargado completamente
window.onload = function() {
    agregarPacientesAlDOM();
};
