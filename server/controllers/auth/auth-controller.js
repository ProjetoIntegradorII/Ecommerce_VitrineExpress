// Importa bibliotecas necessárias
const bcrypt = require("bcryptjs"); // Para criptografar senhas
const jwt = require("jsonwebtoken"); // Para gerar e verificar tokens JWT
const User = require("../../models/User"); // Modelo de usuário

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body; // Extrai os dados do corpo da requisição

  try {
    // Verifica se já existe um usuário com o mesmo email
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });

    // Criptografa a senha com um salt de 12
    const hashPassword = await bcrypt.hash(password, 12);
    // Cria um novo objeto de usuário com os dados fornecidos
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    // Salva o novo usuário no banco de dados
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Função para fazer login do usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extrai os dados do corpo da requisição

  try {
    // Verifica se o usuário existe com o email fornecido
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });

    // Compara a senha fornecida com a senha criptografada armazenada
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    // Gera um token JWT com os dados do usuário
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY", // Chave secreta para assinar o token
      { expiresIn: "60m" } // O token expira em 60 minutos
    );

    // Define o cookie com o token e retorna os dados do usuário
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Função para fazer logout do usuário
const logoutUser = (req, res) => {
  // Limpa o cookie do token e retorna a resposta
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Obtém o token do cookie
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded; // Armazena os dados decodificados na requisição
    next(); // Chama o próximo middleware
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

// Exporta as funções para uso em outros módulos
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
