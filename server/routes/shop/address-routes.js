// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa as funções do controlador de endereços que lidam com operações relacionadas a endereços.
const {
  addAddress,      // Função para adicionar um novo endereço.
  fetchAllAddress, // Função para recuperar todos os endereços de um usuário.
  editAddress,     // Função para editar um endereço existente.
  deleteAddress,   // Função para excluir um endereço específico.
} = require("../../controllers/shop/address-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas a endereços.
const router = express.Router();

// Define a rota para adicionar um novo endereço (método POST).
router.post("/add", addAddress);

// Define a rota para recuperar todos os endereços de um usuário (método GET).
// O :userId é um parâmetro de rota que identifica o usuário.
router.get("/get/:userId", fetchAllAddress);

// Define a rota para excluir um endereço específico de um usuário (método DELETE).
// Os parâmetros :userId e :addressId identificam o usuário e o endereço a ser excluído, respectivamente.
router.delete("/delete/:userId/:addressId", deleteAddress);

// Define a rota para atualizar um endereço específico de um usuário (método PUT).
// Os parâmetros :userId e :addressId identificam o usuário e o endereço a ser atualizado, respectivamente.
router.put("/update/:userId/:addressId", editAddress);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
