// Importa o utilitário de upload de imagem e o modelo Product
const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// Função para lidar com o upload de imagens
const handleImageUpload = async (req, res) => {
  try {
    // Converte a imagem em base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    
    // Utiliza a função de upload para enviar a imagem para o Cloudinary
    const result = await imageUploadUtil(url);

    // Retorna o resultado do upload
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    // Loga o erro e retorna uma resposta de erro
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Função para adicionar um novo produto
const addProduct = async (req, res) => {
  try {
    // Extrai as propriedades do corpo da requisição
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    // Cria um novo objeto de produto com as informações recebidas
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    // Salva o novo produto no banco de dados
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    // Loga o erro e retorna uma resposta de erro
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Função para buscar todos os produtos
const fetchAllProducts = async (req, res) => {
  try {
    // Busca todos os produtos no banco de dados
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    // Loga o erro e retorna uma resposta de erro
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Função para editar um produto
const editProduct = async (req, res) => {
  try {
    // Extrai o ID do produto dos parâmetros da requisição
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Busca o produto pelo ID
    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Atualiza as propriedades do produto, mantendo os valores atuais caso não sejam fornecidos
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    // Salva as alterações no banco de dados
    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    // Loga o erro e retorna uma resposta de erro
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Função para deletar um produto
const deleteProduct = async (req, res) => {
  try {
    // Extrai o ID do produto dos parâmetros da requisição
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    // Verifica se o produto foi encontrado
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Retorna uma mensagem de sucesso
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    // Loga o erro e retorna uma resposta de erro
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Exporta as funções para que possam ser usadas em outras partes do aplicativo
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
