document.getElementById("formularioPaciente").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Capturar los valores de los inputs
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let cobertura = document.getElementById("cobertura").value;

    // Cargar el archivo XML existente
    fetch('../dataBase/pacientes.xml')
        .then(response => response.text())
        .then(xmlString => {
            // Crear un nuevo objeto DOMParser para analizar el XML existente
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlString, "text/xml");

            // Obtener el nodo <Pacientes> del documento XML
            let pacientesNode = xmlDoc.getElementsByTagName("Pacientes")[0];

            // Obtener el último ID existente
            let lastPatient = pacientesNode.lastElementChild;
            let lastId = lastPatient ? parseInt(lastPatient.querySelector("id").textContent) : 0;

            // Incrementar el último ID para obtener el nuevo ID
            let newId = lastId + 1;

            // Crear un nuevo nodo <Paciente> y agregar los datos capturados como hijos
            let pacienteNode = xmlDoc.createElement("Paciente");
            pacienteNode.setAttribute("id", newId); // Asignar el nuevo ID al paciente

            let idNode = xmlDoc.createElement("id");
            idNode.textContent = newId;
            pacienteNode.appendChild(idNode);

            let nombreNode = xmlDoc.createElement("nombre");
            nombreNode.textContent = nombre;
            pacienteNode.appendChild(nombreNode);

            let apellidoNode = xmlDoc.createElement("apellido");
            apellidoNode.textContent = apellido;
            pacienteNode.appendChild(apellidoNode);

            let dniNode = xmlDoc.createElement("dni");
            dniNode.textContent = dni;
            pacienteNode.appendChild(dniNode);

            let telefonoNode = xmlDoc.createElement("telefono");
            telefonoNode.textContent = telefono;
            pacienteNode.appendChild(telefonoNode);

            let emailNode = xmlDoc.createElement("email");
            emailNode.textContent = email;
            pacienteNode.appendChild(emailNode);

            let coberturaNode = xmlDoc.createElement("cobertura");
            coberturaNode.textContent = cobertura;
            pacienteNode.appendChild(coberturaNode);

            // Agregar el nuevo nodo <Paciente> al nodo <Pacientes>
            pacientesNode.appendChild(pacienteNode);

            // Convertir el documento XML modificado de vuelta a una cadena XML
            let modifiedXmlString = new XMLSerializer().serializeToString(xmlDoc);

            // Aquí podrías enviar el modifiedXmlString al servidor para guardar los cambios en el archivo pacientes.xml
            console.log(modifiedXmlString);
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar cualquier error que ocurra durante la carga y modificación del XML
        });
});
