const mongoose = require("mongoose");

// Definição do esquema de Endereço
const AddressSchema = new mongoose.Schema(
  {
    // ID do usuário associado ao endereço (pode ser referenciado a um documento de usuário)
    userId: String,
    // Endereço completo
    address: String,
    // Cidade do endereço
    city: String,
    // Código postal
    pincode: String,
    // Número de telefone associado ao endereço
    phone: String,
    // Notas adicionais sobre o endereço
    notes: String,
  },
  // Ativa timestamps para controle de criação e atualização
  { timestamps: true }
);

// Exporta o modelo de Endereço para ser usado em outras partes da aplicação
module.exports = mongoose.model("Address", AddressSchema);
