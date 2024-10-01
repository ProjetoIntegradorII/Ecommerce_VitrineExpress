// Importa o framework Express para criar um servidor web e gerenciar rotas.
const express = require("express");

// Importa as funções do controlador de autenticação que lidam com o registro, login, logout e verificação de autenticação do usuário.
const {
  registerUser, // Função para registrar um novo usuário.
  loginUser, // Função para fazer o login de um usuário.
  logoutUser, // Função para fazer o logout de um usuário.
  authMiddleware, // Middleware para verificar a autenticação do usuário.
} = require("../../controllers/auth/auth-controller");

// Cria uma instância do roteador Express para definir rotas relacionadas à autenticação.
const router = express.Router();

// Define a rota para registrar um novo usuário (método POST).
router.post("/register", registerUser);

// Define a rota para fazer login de um usuário (método POST).
router.post("/login", loginUser);

// Define a rota para fazer logout de um usuário (método POST).
router.post("/logout", logoutUser);

// Define a rota para verificar a autenticação do usuário (método GET).
// Usa o middleware 'authMiddleware' para validar a autenticação antes de responder.
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user; // Obtém o usuário autenticado a partir da solicitação.
  
  // Retorna uma resposta de sucesso com os detalhes do usuário autenticado.
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação.
module.exports = router;
