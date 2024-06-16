document.addEventListener('DOMContentLoaded', function() {
    const btnAceptar = document.getElementById('btnAceptar');

    if (btnAceptar) {
        btnAceptar.addEventListener('click', function() {
            // Obtener valores de los campos de entrada
            const tipo_turno = document.getElementById('tipo_turno').value;
            const turno_solic = document.getElementById('turno_solic').value;
            const indicaciones = document.getElementById('indicaciones').value;
            const profesional = document.getElementById('profesional').value;
            const disp_turno = document.getElementById('disp_turno').value;
            const cobertura = document.getElementById('cobertura').value;

            // Validar que todos los campos obligatorios estén llenos
            if (!tipo_turno || !turno_solic || !indicaciones || !profesional || !disp_turno) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }

            // Enviar los datos del paciente al backend
            fetch('/api/solicitudTurno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tipo_turno,
                    turno_solic,
                    indicaciones,
                    profesional,
                    disp_turno,
                    id_cobertura: cobertura,
                    
            })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                alert('turno registrado correctamente');
            })
            .catch(error => {
                console.error('Error al intentar registrar paciente:', error);
                alert('Ocurrió un error al intentar registrar el turno');
            });
        });
    } else {
        console.error('Elemento con ID "btnAceptar" no encontrado');
    }
});
