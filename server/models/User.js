// Importa a biblioteca mongoose, que é uma ODM (Object Data Modeling) para MongoDB e Node.js.
const mongoose = require("mongoose");

// Define um esquema para o modelo User, que descreve a estrutura dos documentos de usuário no banco de dados.
const UserSchema = new mongoose.Schema({
  userName: {
    type: String, // Tipo de dado: String
    required: true, // Este campo é obrigatório
    unique: true, // Este campo deve ser único (não pode haver dois usuários com o mesmo nome)
  },
  email: {
    type: String, // Tipo de dado: String
    required: true, // Este campo é obrigatório
    unique: true, // Este campo deve ser único (não pode haver dois usuários com o mesmo email)
  },
  password: {
    type: String, // Tipo de dado: String
    required: true, // Este campo é obrigatório
  },
  role: {
    type: String, // Tipo de dado: String
    default: "user", // Valor padrão para este campo é "user", caso não seja especificado
  },
});

// Cria o modelo User baseado no esquema UserSchema. O modelo representa a coleção 'users' no MongoDB.
const User = mongoose.model("User", UserSchema);

// Exporta o modelo User para que possa ser utilizado em outras partes da aplicação.
module.exports = User;
