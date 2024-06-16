document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener y mostrar insumos en el DOM
    function agregarInsumosAlDOM() {
      let endpoint = '/api/insumos';
  
      fetch(endpoint)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          let insumos = data.data; // Array de insumos obtenidos del backend
  
          // Iterar sobre los insumos y agregarlos al DOM
          insumos.forEach(insumo => {
            // Crear elementos HTML para mostrar cada insumo
            let divInsumo = document.createElement("div");
            divInsumo.className = "botonC";
            let divContainer = document.createElement("div");
            divContainer.className = "container";
            let divRow = document.createElement("div");
            divRow.className = "row";
  
            // Crear columnas para mostrar los datos del insumo
            let divId = document.createElement("div");
            divId.className = "col";
            divId.textContent = insumo.id_insumo;
            let divNombre = document.createElement("div");
            divNombre.className = "col";
            divNombre.textContent = insumo.nombre;
            let divStock = document.createElement("div");
            divStock.className = "col";
            divStock.textContent = insumo.stock;
  
            // Crear botón con imagen para ver detalles del insumo
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
  
            // Agregar evento de clic al botón para redirigir a la página de detalle
            boton.addEventListener("click", function() {
              window.location.href = `../paginas/insumos/detalle_insumo.html?id=${insumo.id_insumo}`;
            });
  
            // Agregar columnas al divRow
            divRow.appendChild(divId);
            divRow.appendChild(divNombre);
            divRow.appendChild(divStock);
            divRow.appendChild(divBoton);
  
            // Agregar divRow al divContainer
            divContainer.appendChild(divRow);
  
            // Agregar divContainer al divInsumo
            divInsumo.appendChild(divContainer);
  
            // Agregar divInsumo al contenedor principal en el DOM
            document.getElementById("contenedorInsumos").appendChild(divInsumo);
          });
        })
        .catch(error => {
          console.error('Error al obtener datos de insumos:', error);
        });
    }
  
    // Llamar a la función para agregar insumos al DOM cuando la página se haya cargado completamente
    window.onload = function() {
      agregarInsumosAlDOM();
    };
  });
  