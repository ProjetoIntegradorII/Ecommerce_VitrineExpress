// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa as funções do controlador de carrinho que lidam com operações relacionadas ao carrinho de compras.
const {
  addToCart,          // Função para adicionar um item ao carrinho.
  fetchCartItems,     // Função para recuperar todos os itens do carrinho de um usuário.
  deleteCartItem,     // Função para excluir um item específico do carrinho.
  updateCartItemQty,  // Função para atualizar a quantidade de um item no carrinho.
} = require("../../controllers/shop/cart-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas ao carrinho.
const router = express.Router();

// Define a rota para adicionar um item ao carrinho (método POST).
router.post("/add", addToCart);

// Define a rota para recuperar todos os itens do carrinho de um usuário (método GET).
// O :userId é um parâmetro de rota que identifica o usuário.
router.get("/get/:userId", fetchCartItems);

// Define a rota para atualizar a quantidade de um item no carrinho (método PUT).
router.put("/update-cart", updateCartItemQty);

// Define a rota para excluir um item específico do carrinho (método DELETE).
// Os parâmetros :userId e :productId identificam o usuário e o produto a ser excluído do carrinho, respectivamente.
router.delete("/:userId/:productId", deleteCartItem);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
