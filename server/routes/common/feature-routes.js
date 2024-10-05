// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa as funções do controlador de recursos que lidam com a adição, recuperação e deleção de imagens de destaque.
const {
  addFeatureImage, // Função para adicionar uma nova imagem de destaque.
  getFeatureImages, // Função para recuperar imagens de destaque.
  deleteFeatureImage, // Função para deletar uma imagem de destaque.
} = require("../../controllers/common/feature-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas a recursos de destaque.
const router = express.Router();

// Define a rota para adicionar uma nova imagem de destaque (método POST).
router.post("/add", addFeatureImage);

// Define a rota para obter as imagens de destaque (método GET).
router.get("/get", getFeatureImages);

// Define a rota para deletar uma imagem de destaque (método DELETE).
router.delete("/delete/:id", deleteFeatureImage);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
