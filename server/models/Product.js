// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require("mongoose");

// Define o esquema do produto (Product) usando mongoose
const ProductSchema = new mongoose.Schema(
  {
    image: String, // URL da imagem do produto
    title: String, // Título do produto
    description: String, // Descrição do produto
    category: String, // Categoria a que o produto pertence
    brand: String, // Marca do produto
    price: Number, // Preço original do produto
    salePrice: Number, // Preço em promoção do produto
    totalStock: Number, // Quantidade total disponível em estoque
  },
  { timestamps: true } // Adiciona timestamps automáticos para criação e atualização
);

// Exporta o modelo Product com base no ProductSchema definido
module.exports = mongoose.model("Product", ProductSchema);
