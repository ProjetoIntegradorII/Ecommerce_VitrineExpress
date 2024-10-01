// Importa os modelos Cart e Product para interagir com as coleções no banco de dados
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Função para adicionar um item ao carrinho
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Valida se os dados fornecidos são válidos
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Busca o produto no banco de dados
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Busca o carrinho do usuário
    let cart = await Cart.findOne({ userId });

    // Se o carrinho não existir, cria um novo
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Verifica se o produto já está no carrinho
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Se o produto não estiver no carrinho, adiciona-o; caso contrário, atualiza a quantidade
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    // Salva o carrinho atualizado
    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Função para buscar os itens do carrinho
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Valida se o userId foi fornecido
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!",
      });
    }

    // Busca o carrinho do usuário e popula os detalhes dos produtos
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Verifica se o carrinho foi encontrado
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Filtra itens válidos que possuem produto associado
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    // Se houver itens inválidos, atualiza o carrinho removendo-os
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    // Formata os itens do carrinho para a resposta
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Função para atualizar a quantidade de um item no carrinho
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Valida se os dados fornecidos são válidos
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Busca o carrinho do usuário
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Verifica se o item está no carrinho
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Retorna um erro se o item não estiver no carrinho
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present!",
      });
    }

    // Atualiza a quantidade do item no carrinho
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    // Popula os detalhes dos produtos após a atualização
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Formata os itens do carrinho para a resposta
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Função para deletar um item do carrinho
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Valida se os dados fornecidos são válidos
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Busca o carrinho do usuário e popula os detalhes dos produtos
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Verifica se o carrinho foi encontrado
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Filtra os itens do carrinho, removendo o produto especificado
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    // Salva o carrinho atualizado
    await cart.save();

    // Popula os detalhes dos produtos após a remoção
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Formata os itens do carrinho para a resposta
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Exporta as funções para uso em outros módulos
module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};
