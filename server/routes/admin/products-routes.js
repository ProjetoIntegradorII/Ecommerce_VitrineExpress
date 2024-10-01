// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa os controladores que lidam com operações relacionadas a produtos do admin.
const {
  handleImageUpload, // Função para lidar com o upload de imagens.
  addProduct, // Função para adicionar um novo produto.
  editProduct, // Função para editar um produto existente.
  fetchAllProducts, // Função para buscar todos os produtos.
  deleteProduct, // Função para deletar um produto.
} = require("../../controllers/admin/products-controller");

// Importa o módulo de upload de imagens que utiliza Cloudinary.
const { upload } = require("../../helpers/cloudinary");

// Cria uma instância do roteador Express para definir rotas relacionadas a produtos.
const router = express.Router();

// Define a rota para o upload de imagens (método POST).
// Usa o middleware 'upload.single' para processar o upload de uma única imagem.
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Define a rota para adicionar um novo produto (método POST).
router.post("/add", addProduct);

// Define a rota para editar um produto específico (método PUT).
router.put("/edit/:id", editProduct);

// Define a rota para deletar um produto específico (método DELETE).
router.delete("/delete/:id", deleteProduct);

// Define a rota para buscar todos os produtos (método GET).
router.get("/get", fetchAllProducts);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
