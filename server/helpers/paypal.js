const paypal = require("paypal-rest-sdk");
require("dotenv").config(); // Carrega as variáveis de ambiente

// Configuração do PayPal usando variáveis do .env
paypal.configure({
  mode: process.env.PAYPAL_MODE, // 'sandbox' ou 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

module.exports = paypal;
