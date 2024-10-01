// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa a função de busca de produtos do controlador responsável por operações de pesquisa.
const { searchProducts } = require("../../controllers/shop/search-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas à pesquisa de produtos.
const router = express.Router();

// Define a rota para buscar produtos com base em uma palavra-chave (método GET).
// O :keyword é um parâmetro de rota que representa a palavra-chave utilizada na pesquisa.
router.get("/:keyword", searchProducts);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
