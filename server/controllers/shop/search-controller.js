const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    // Validação da palavra-chave
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Criação da expressão regular para a busca
    const regEx = new RegExp(keyword, "i");

    // Criação da consulta de busca
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    // Busca os produtos que correspondem à consulta
    const searchResults = await Product.find(createSearchQuery);

    // Resposta com os resultados da busca
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { searchProducts };
