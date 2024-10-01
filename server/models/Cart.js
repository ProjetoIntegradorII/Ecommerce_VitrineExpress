// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require("mongoose");

// Define o esquema do Cart (carrinho de compras) usando mongoose
const CartSchema = new mongoose.Schema(
  {
    // Referência ao usuário que possui o carrinho, deve ser um ObjectId de um documento do modelo "User"
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Indica que este campo é uma referência ao modelo User
      required: true, // Este campo é obrigatório
    },
    // Array de itens que o usuário adicionou ao carrinho
    items: [
      {
        // Referência ao produto, deve ser um ObjectId de um documento do modelo "Product"
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Indica que este campo é uma referência ao modelo Product
          required: true, // Este campo é obrigatório
        },
        // Quantidade do produto no carrinho
        quantity: {
          type: Number, // Tipo numérico
          required: true, // Este campo é obrigatório
          min: 1, // A quantidade mínima deve ser 1
        },
      },
    ],
  },
  {
    // Opções do esquema
    timestamps: true, // Cria os campos createdAt e updatedAt automaticamente
  }
);

// Exporta o modelo Cart com base no CartSchema definido
module.exports = mongoose.model("Cart", CartSchema);
