// Importa o modelo Feature para interagir com a coleção de características no banco de dados
const Feature = require("../../models/Feature");

// Função para adicionar uma nova imagem de característica
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body; // Extrai a imagem do corpo da requisição

    // Cria uma nova instância do modelo Feature com a imagem fornecida
    const featureImages = new Feature({ image });

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
      message: "Ocorreu algum erro",
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
      message: "Ocorreu algum erro",
    });
  }
};

// Função para deletar uma imagem de característica
const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params; // Extrai o ID da imagem dos parâmetros da requisição

    // Tenta encontrar e deletar a imagem pelo ID
    const deletedImage = await Feature.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Imagem não encontrada",
      });
    }

    // Retorna uma resposta de sucesso indicando que a imagem foi deletada
    res.status(200).json({
      success: true,
      message: "Imagem deletada com sucesso",
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Ocorreu algum erro",
    });
  }
};

// Exporta as funções para uso em outros módulos
module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };
