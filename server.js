const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const puerto = 3000;


// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

app.use(express.static(__dirname));

// Ruta para manejar la solicitud POST y enviar una cantidad a la API de Mercado Pago
app.post('/enviarCantidad', async (req, res) => {
  const cantidadDeseada = req.body.cantidad; // Supongamos que la cantidad se envía en el cuerpo de la solicitud

  try {
    // Configuración de la solicitud a la API de Mercado Pago
    const respuesta = await axios.post('https://api.mercadopago.com/checkout/preferences', {
      items: [{
        title: 'Producto Ejemplo',
        quantity: 1,
        currency_id: 'ARS', // Moneda (en este caso, pesos argentinos)
        unit_price: parseFloat(cantidadDeseada), // Cantidad deseada
      }],
    }, {
      headers: {
        'Authorization': 'Bearer TEST-4222675029954854-121312-1126a4eaf02b5f7531f37561dc270f5d-1225751772', // Reemplaza con tu token de acceso
        'Content-Type': 'application/json',
      },
    });

    // La respuesta de la API de Mercado Pago estará en respuesta.data
    console.log('Respuesta de la API de Mercado Pago:', respuesta.data);

    // Puedes enviar la respuesta de vuelta al cliente
    res.json(respuesta.data);
  } catch (error) {
    console.error('Error al comunicarse con la API de Mercado Pago:', error.message);
    if (error.response) {
        // Imprimir la respuesta completa en la consola para obtener más detalles
        console.error('Respuesta completa de la API de Mercado Pago:', error.response.data);
      }
    res.status(500).send('Error interno del servidor');
  }
});



// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/frontend.js');
  });

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
