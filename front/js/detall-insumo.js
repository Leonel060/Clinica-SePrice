window.addEventListener('load', function() {
    // Obtener la cadena de consulta de la URL actual
    var queryString = window.location.search;

    // Crear un objeto URLSearchParams para manejar los parámetros de la cadena de consulta
    var params = new URLSearchParams(queryString);

    // Obtener el valor del parámetro 'id'
    var parametro1 = params.get('id');

    // Mostrar el valor en la consola
    console.log(parametro1);

    if (parametro1) {
        // Llamar a la función para agregar pacientes al DOM pasando el id del paciente
        agregarInsumosAlDOM(parametro1);
    } else {
        console.error('ID de insumo no proporcionado en la URL');
    }
});

function agregarInsumosAlDOM(idInsumo) {
    // Endpoint para obtener datos de pacientes desde el backend
    let endpoint = `/api/detalleInsumo?id=${idInsumo}`;

    // Realizar la solicitud GET al endpoint utilizando fetch
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
       

        .then(data => {
            console.log('Datos del insumo:', data);
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("stock").value = data.stock;

        })
        .catch(error => {
            console.error('Error al obtener datos del insumo:', error);
        });
        
        
}