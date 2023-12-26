function enviarCantidad() {
    const cantidadDeseada = document.getElementById('cantidad').value;
  
    // Realizar una solicitud POST al servidor
    fetch('http://localhost:3000/enviarCantidad', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cantidad: cantidadDeseada }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
  
      // Puedes realizar acciones adicionales aquí, según la respuesta del servidor
    })
    .catch(error => {
      console.error('Error al enviar la cantidad al servidor:', error);
    });
  }
  