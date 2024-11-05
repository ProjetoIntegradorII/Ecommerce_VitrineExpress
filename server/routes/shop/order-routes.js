// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa as funções do controlador de pedidos que lidam com operações relacionadas a pedidos.
const {
  createOrder,         // Função para criar um novo pedido.
  getAllOrdersByUser,  // Função para recuperar todos os pedidos de um usuário específico.
  getOrderDetails,     // Função para recuperar detalhes de um pedido específico.
  capturePayment,      // Função para capturar o pagamento de um pedido.
} = require("../../controllers/shop/order-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas a pedidos.
const router = express.Router();

// Define a rota para criar um novo pedido (método POST).
router.post("/create", createOrder);

// Define a rota para capturar o pagamento de um pedido (método POST).
router.post("/capture", capturePayment);

// Define a rota para capturar o pagamento após o retorno do PayPal (método GET).
router.get("/paypal-return", capturePayment); // Adicione esta linha

// Define a rota para listar todos os pedidos de um usuário específico (método GET).
// O :userId é um parâmetro de rota que identifica o usuário.
router.get("/list/:userId", getAllOrdersByUser);

// Define a rota para recuperar os detalhes de um pedido específico (método GET).
// O :id é um parâmetro de rota que identifica o pedido.
router.get("/details/:id", getOrderDetails);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
