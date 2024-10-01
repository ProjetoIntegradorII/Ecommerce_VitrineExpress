// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa os controladores que lidam com as operações relacionadas a pedidos do admin.
const {
  getAllOrdersOfAllUsers, // Função para obter todos os pedidos de todos os usuários.
  getOrderDetailsForAdmin, // Função para obter detalhes de um pedido específico para o admin.
  updateOrderStatus, // Função para atualizar o status de um pedido.
} = require("../../controllers/admin/order-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas a pedidos.
const router = express.Router();

// Define a rota para obter todos os pedidos de todos os usuários (método GET).
router.get("/get", getAllOrdersOfAllUsers);

// Define a rota para obter detalhes de um pedido específico (método GET).
router.get("/details/:id", getOrderDetailsForAdmin);

// Define a rota para atualizar o status de um pedido específico (método PUT).
router.put("/update/:id", updateOrderStatus);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
