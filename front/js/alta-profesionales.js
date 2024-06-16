document.addEventListener('DOMContentLoaded', function() {
    const btnAceptar = document.getElementById('btnAceptar');

    if (btnAceptar) {
        btnAceptar.addEventListener('click', function() {
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const dni = document.getElementById('dni').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            

            if (!nombre || !apellido || !dni || !telefono || !email) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }

            // Enviar los datos del profesional al backend
            fetch('/api/guardarProfesional', {
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
                    estado: 'Activo'
            })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                alert('Profesional registrado correctamente');
            })
            .catch(error => {
                console.error('Error al intentar registrar profesional:', error);
                alert('Ocurrió un error al intentar registrar al profesional');
            });
        });
    } else {
        console.error('Elemento con ID "btnAceptar" no encontrado');
    }
});
