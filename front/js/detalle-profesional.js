window.addEventListener('load', function() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var parametro = params.get('id');

    console.log(parametro);

    if (parametro) {
        agregarProfesionalesAlDOM(parametro);
    } else {
        console.error('ID de profesional no proporcionado en la URL');
    }
});

function agregarProfesionalesAlDOM(idProfesional) {
    let endpoint = `/api/detalleprofesional?id=${idProfesional}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos del profesional:', data);
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("apellido").value = data.apellido;
            document.getElementById("dni").value = data.dni;
            document.getElementById("telefono").value = data.telefono;
            document.getElementById("email").value = data.email;
            document.getElementById("estado").value = data.estado;

        })
        .catch(error => {
            console.error('Error al obtener datos de profesional:', error);
        });
        
}
