// Importa o modelo Order, que representa a coleção de pedidos no banco de dados
const Order = require("../../models/Order");

// Função para obter todos os pedidos de todos os usuários
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    // Busca todos os pedidos no banco de dados
    const orders = await Order.find({});

    // Verifica se não foram encontrados pedidos
    if (!orders.length) {
      // Retorna uma resposta 404 se não houver pedidos
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    // Retorna uma resposta 200 com os pedidos encontrados
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    // Caso ocorra um erro, loga o erro no console e retorna uma resposta 500
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Função para obter os detalhes de um pedido específico para o administrador
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    // Extrai o ID do pedido dos parâmetros da requisição
    const { id } = req.params;

    // Busca o pedido pelo ID
    const order = await Order.findById(id);

    // Verifica se o pedido foi encontrado
    if (!order) {
      // Retorna uma resposta 404 se o pedido não existir
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Retorna uma resposta 200 com os detalhes do pedido
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    // Loga o erro e retorna uma resposta 500 em caso de falha
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Função para atualizar o status de um pedido
const updateOrderStatus = async (req, res) => {
  try {
    // Extrai o ID do pedido e o novo status do corpo da requisição
    const { id } = req.params;
    const { orderStatus } = req.body;

    // Busca o pedido pelo ID
    const order = await Order.findById(id);

    // Verifica se o pedido foi encontrado
    if (!order) {
      // Retorna uma resposta 404 se o pedido não existir
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Atualiza o status do pedido no banco de dados
    await Order.findByIdAndUpdate(id, { orderStatus });

    // Retorna uma resposta 200 confirmando que o status foi atualizado
    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    // Loga o erro e retorna uma resposta 500 em caso de falha
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Exporta as funções para que possam ser usadas em outras partes do aplicativo
module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
