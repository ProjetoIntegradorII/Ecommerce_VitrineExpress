// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require("mongoose");

// Define o esquema do pedido (Order) usando mongoose
const OrderSchema = new mongoose.Schema({
  userId: String, // ID do usuário que fez o pedido
  cartId: String, // ID do carrinho associado ao pedido
  cartItems: [ // Array de itens no carrinho
    {
      productId: String, // ID do produto
      title: String, // Título do produto
      image: String, // URL da imagem do produto
      price: String, // Preço do produto
      quantity: Number, // Quantidade do produto
    },
  ],
  addressInfo: { // Informações de endereço para entrega
    addressId: String, // ID do endereço
    address: String, // Endereço completo
    city: String, // Cidade
    pincode: String, // Código postal
    phone: String, // Telefone para contato
    notes: String, // Notas adicionais sobre o endereço
  },
  orderStatus: String, // Status do pedido (ex: pendente, enviado, concluído)
  paymentMethod: String, // Método de pagamento utilizado (ex: cartão, PayPal)
  paymentStatus: String, // Status do pagamento (ex: pago, pendente)
  totalAmount: Number, // Valor total do pedido
  orderDate: Date, // Data em que o pedido foi feito
  orderUpdateDate: Date, // Data da última atualização do pedido
  paymentId: String, // ID da transação de pagamento
  payerId: String, // ID do pagador
});

// Exporta o modelo Order com base no OrderSchema definido
module.exports = mongoose.model("Order", OrderSchema);
