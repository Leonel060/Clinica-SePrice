document.addEventListener('DOMContentLoaded', function() {
  const btnAceptar = document.getElementById('btnAceptar');
  const formularioInsumo = document.getElementById('formularioInsumos');

  if (btnAceptar) {
    formularioInsumo.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto

      // Obtener valores de los campos de entrada
      const nombre = document.getElementById('nombre').value;
      const stock = document.getElementById('stock').value;

      // Validar que todos los campos obligatorios estén llenos
      if (!nombre || !stock) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }

      // Enviar los datos del insumo al backend
      fetch('/api/guardarInsumo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          stock
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Insumo registrado correctamente');
        formularioInsumo.reset(); // Restablecer el formulario después de enviar los datos
      })
      .catch(error => {
        console.error('Error al intentar registrar insumo:', error);
        alert('Ocurrió un error al intentar registrar el insumo');
      });

    });
  } else {
    console.error('Elemento con ID "btnAceptar" no encontrado');
  }
});
