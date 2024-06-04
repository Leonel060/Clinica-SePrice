document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch("../dataBase/contraseña.xml")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");

            const storedEmail = xmlDoc.querySelector('email').textContent;
            const storedPassword = xmlDoc.querySelector('contraseña').textContent;

            
            if (email === storedEmail && password === storedPassword) {
                window.location.href = 'index.html';
            } else {
                alert('Email o Contraseña incorrecta. Por favor, intente nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo XML:', error);
            alert('Hubo un problema al verificar las credenciales. Por favor, intente nuevamente.');
        });
});
