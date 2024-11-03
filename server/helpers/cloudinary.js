const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config(); // Carrega as variáveis de ambiente

// Configuração do Cloudinary usando variáveis do .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Armazenamento em memória com Multer
const storage = new multer.memoryStorage();

// Função para fazer upload da imagem
async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

// Configuração do Multer
const upload = multer({ storage });

// Exportando o upload e a função de upload da imagem
module.exports = { upload, imageUploadUtil };
