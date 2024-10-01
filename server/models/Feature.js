// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require("mongoose");

// Define o esquema do Feature (características) usando mongoose
const FeatureSchema = new mongoose.Schema(
  {
    // Campo para armazenar a URL da imagem da característica
    image: String,
  },
  { 
    // Opções do esquema
    timestamps: true, // Cria os campos createdAt e updatedAt automaticamente
  }
);

// Exporta o modelo Feature com base no FeatureSchema definido
module.exports = mongoose.model("Feature", FeatureSchema);
