// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa as funções do controlador de produtos que lidam com operações relacionadas a produtos.
const {
  getFilteredProducts, // Função para recuperar produtos filtrados com base em critérios específicos.
  getProductDetails,   // Função para recuperar detalhes de um produto específico.
} = require("../../controllers/shop/products-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas a produtos.
const router = express.Router();

// Define a rota para obter produtos filtrados (método GET).
router.get("/get", getFilteredProducts);

// Define a rota para obter detalhes de um produto específico (método GET).
// O :id é um parâmetro de rota que identifica o produto.
router.get("/get/:id", getProductDetails);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
