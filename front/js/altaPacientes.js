document.addEventListener('DOMContentLoaded', function() {
    const btnAceptar = document.getElementById('btnAceptar');

    if (btnAceptar) {
        btnAceptar.addEventListener('click', function() {
            // Obtener valores de los campos de entrada
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const dni = document.getElementById('dni').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            const cobertura = document.getElementById('cobertura').value;

            // Validar que todos los campos obligatorios estén llenos
            if (!nombre || !apellido || !dni || !telefono || !email) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }

            // Enviar los datos del paciente al backend
            fetch('/api/guardarPaciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    dni,
                    telefono,
                    email,
                    id_cobertura: cobertura,
                    estado: 'Activo'
            })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                alert('Paciente registrado correctamente');
            })
            .catch(error => {
                console.error('Error al intentar registrar paciente:', error);
                alert('Ocurrió un error al intentar registrar al paciente');
            });
        });
    } else {
        console.error('Elemento con ID "btnAceptar" no encontrado');
    }
});
