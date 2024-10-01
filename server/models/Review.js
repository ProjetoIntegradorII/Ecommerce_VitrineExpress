// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require("mongoose");

// Define o esquema para as avaliações de produtos (ProductReview) usando mongoose
const ProductReviewSchema = new mongoose.Schema(
  {
    productId: String, // ID do produto que está sendo avaliado
    userId: String,    // ID do usuário que fez a avaliação
    userName: String,  // Nome do usuário que fez a avaliação
    reviewMessage: String, // Mensagem da avaliação
    reviewValue: Number,   // Valor da avaliação (ex: 1 a 5)
  },
  { timestamps: true } // Adiciona timestamps automáticos para criação e atualização
);

// Exporta o modelo ProductReview com base no ProductReviewSchema definido
module.exports = mongoose.model("ProductReview", ProductReviewSchema);
