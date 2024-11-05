const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

// Rota para criar um novo pedido
router.post("/create", createOrder);

// Rota para capturar o pagamento de um pedido
router.post("/capture", capturePayment);

// Rota para capturar o retorno do PayPal e redirecionar para o frontend
router.get("/paypal-return", (req, res) => {
  const { paymentId, token, PayerID } = req.query;

  // Redireciona para o frontend com os parâmetros necessários
  res.redirect(`${process.env.CLIENT_BASE_URL}/shop/paypal-return?paymentId=${paymentId}&token=${token}&PayerID=${PayerID}`);
});

// Rota para listar todos os pedidos de um usuário específico
router.get("/list/:userId", getAllOrdersByUser);

// Rota para recuperar os detalhes de um pedido específico
router.get("/details/:id", getOrderDetails);

module.exports = router;
