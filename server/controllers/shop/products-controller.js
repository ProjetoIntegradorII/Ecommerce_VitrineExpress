const Product = require("../../models/Product");

// Função para obter produtos filtrados com base em critérios
const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // Adiciona filtros de categoria se fornecidos
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    // Adiciona filtros de marca se fornecidos
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    // Configura a ordenação com base no parâmetro sortBy
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1; // Ordena do menor para o maior preço
        break;
      case "price-hightolow":
        sort.price = -1; // Ordena do maior para o menor preço
        break;
      case "title-atoz":
        sort.title = 1; // Ordena do A ao Z
        break;
      case "title-ztoa":
        sort.title = -1; // Ordena do Z ao A
        break;
      default:
        sort.price = 1; // Valor padrão
        break;
    }

    // Busca produtos com filtros e ordenação
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Função para obter detalhes de um produto específico
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Exporta as funções para uso em outros módulos
module.exports = { getFilteredProducts, getProductDetails };
