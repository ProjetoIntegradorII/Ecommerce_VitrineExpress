// Importa os módulos necessários para lidar com pagamentos e modelos
const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Função para criar um novo pedido
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Configura os detalhes do pagamento para o PayPal
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "R$",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "R$",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    // Cria o pagamento no PayPal
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Erro ao criar pagamento PayPal",
        });
      } else {
        // Cria um novo pedido no banco de dados
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        // Obtém a URL de aprovação do pagamento
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Ocorreu algum erro!",
    });
  }
};

// Função para capturar o pagamento após a confirmação
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    // Busca o pedido pelo ID
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "O pedido não pode ser encontrado",
      });
    }

    // Atualiza os detalhes do pedido
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    // Atualiza o estoque dos produtos
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Não há estoque suficiente para este produto ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Remove o carrinho associado ao pedido
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    // Salva as alterações no pedido
    await order.save();

    res.status(200).json({
      success: true,
      message: "Pedido confirmado",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Ocorreu algum erro!",
    });
  }
};

// Função para obter todos os pedidos de um usuário
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Busca todos os pedidos do usuário
    const orders = await Order.find({ userId });
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Nenhum pedido encontrado!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Ocorreu algum erro!",
    });
  }
};

// Função para obter os detalhes de um pedido específico
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca o pedido pelo ID
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pedido não encontrado!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Ocorreu algum erro!",
    });
  }
};

// Exporta as funções para uso em outros módulos
module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
