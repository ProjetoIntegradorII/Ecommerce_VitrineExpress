// Importa o modelo Feature para interagir com a coleção de características no banco de dados
const Feature = require("../../models/Feature");

// Função para adicionar uma nova imagem de característica
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body; // Extrai a imagem do corpo da requisição

    console.log(image, "image"); // Registra a imagem no console para fins de depuração

    // Cria uma nova instância do modelo Feature com a imagem fornecida
    const featureImages = new Feature({
      image,
    });

    // Salva a nova imagem de característica no banco de dados
    await featureImages.save();

    // Retorna uma resposta de sucesso com os dados da nova imagem
    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Função para obter todas as imagens de características
const getFeatureImages = async (req, res) => {
  try {
    // Busca todas as imagens de características no banco de dados
    const images = await Feature.find({});

    // Retorna uma resposta de sucesso com as imagens obtidas
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Exporta as funções para uso em outros módulos
module.exports = { addFeatureImage, getFeatureImages };
