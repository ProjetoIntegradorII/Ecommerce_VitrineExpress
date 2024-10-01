// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa as funções do controlador de revisões de produtos que lidam com operações relacionadas a avaliações de produtos.
const {
  addProductReview, // Função para adicionar uma nova avaliação de produto.
  getProductReviews, // Função para recuperar todas as avaliações de um produto específico.
} = require("../../controllers/shop/product-review-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas a revisões de produtos.
const router = express.Router();

// Define a rota para adicionar uma nova avaliação de produto (método POST).
router.post("/add", addProductReview);

// Define a rota para obter todas as avaliações de um produto específico (método GET).
// O :productId é um parâmetro de rota que identifica o produto cujas avaliações estão sendo recuperadas.
router.get("/:productId", getProductReviews);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
