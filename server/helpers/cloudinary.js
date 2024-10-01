const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: "divlu7osh",
  api_key: "968898592485153",
  api_secret: "1Aeo1Sv2G9jljxYPw7HeC5r3LGw",
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
