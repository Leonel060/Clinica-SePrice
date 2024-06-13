function agregarProfesionalesAlDOM() {
    // Ruta del archivo XML
    let archivoXML = "../dataBase/profesionales.xml";

    // Crear un objeto XMLHttpRequest para cargar el archivo XML
    let xmlhttp = new XMLHttpRequest();

    // Definir la función de callback que se ejecutará cuando se cargue el archivo XML
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Convertir la respuesta en un objeto XMLDocument
            let xmlDoc = this.responseXML;

            // Obtener la lista de profesionales del archivo XML
            let profesionales = xmlDoc.getElementsByTagName("profesional");

            // Iterar sobre la lista de profesionales y agregarlos al DOM
            for (let i = 0; i < profesionales.length; i++) {
                let profesional = profesionales[i];

                // Obtener los datos del profesional
                let id = profesional.getElementsByTagName("id")[0].textContent;
                let tipo = profesional.getElementsByTagName("tipo")[0].textContent;
                let activo = profesional.getElementsByTagName("activo")[0].textContent;

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
                    window.location.href = "../paginas/profesionales/detalle_profesionales.html";
                });

                // Agregar las columnas al divRow
                divRow.appendChild(divId);
                divRow.appendChild(divTipo);
                divRow.appendChild(divActivo);
                divRow.appendChild(divBoton);

                // Agregar el divRow al divContainer
                divContainer.appendChild(divRow);

                // Agregar el divContainer al divProfesional
                divProfesional.appendChild(divContainer);

                // Agregar el profesional al contenedor principal
                document.getElementById("contenedorProfesionales").appendChild(divProfesional);
            }
        }
    };

    // Abrir y enviar la solicitud para cargar el archivo XML
    xmlhttp.open("GET", archivoXML, true);
    xmlhttp.send();
}

// Llamar a la función para agregar profesionales al DOM cuando la página se haya cargado completamente
window.onload = function() {
    agregarProfesionalesAlDOM();
};
