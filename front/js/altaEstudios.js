document.addEventListener('DOMContentLoaded', function () {
    const btnAceptar = document.getElementById('btn-agregar');

    if (btnAceptar) {
        btnAceptar.addEventListener('click', function () {
            // Obtener valores de los campos de entrada
            const nombre = document.getElementById('nombre').value;
            const indicaciones = document.getElementById('indicaciones').value;

            // Validar que todos los campos obligatorios estén llenos
            if (!nombre || !indicaciones) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }

            // Enviar los datos del estudio al backend
            fetch('/api/guardarEstudio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    indicaciones
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                alert('Estudio registrado correctamente');
            })
            
        });
    } else {
        console.error('Elemento con ID "btnAceptar" no encontrado');
    }
});
