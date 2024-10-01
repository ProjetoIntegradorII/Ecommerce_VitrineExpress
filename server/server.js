// Importa o framework Express para criar um servidor web.
const express = require("express");
// Importa o Mongoose para gerenciar a conexão com o MongoDB.
const mongoose = require("mongoose");
// Importa o cookie-parser para analisar cookies em requisições.
const cookieParser = require("cookie-parser");
// Importa o CORS para habilitar requisições entre origens diferentes.
const cors = require("cors");

// Importa os roteadores definidos para gerenciar diferentes partes da API.
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// Cria uma conexão com o banco de dados MongoDB.
// É possível criar um arquivo separado para gerenciar a conexão, mas aqui é feito diretamente.
mongoose
  .connect("mongodb+srv://projetointegradorii014:Proj&toII014.@ecommerce.brzpa.mongodb.net/")
  .then(() => console.log("MongoDB connected")) // Exibe uma mensagem de sucesso na conexão.
  .catch((error) => console.log(error)); // Exibe um erro caso a conexão falhe.

const app = express(); // Cria uma instância do aplicativo Express.
const PORT = process.env.PORT || 5000; // Define a porta do servidor; usa a variável de ambiente ou 5000 por padrão.

// Configura as opções de CORS para permitir requisições de um domínio específico.
app.use(
  cors({
    origin: "http://localhost:5173", // Permite requisições apenas desse domínio.
    methods: ["GET", "POST", "DELETE", "PUT"], // Permite métodos HTTP especificados.
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ], // Define os cabeçalhos permitidos.
    credentials: true, // Permite envio de cookies junto com as requisições.
  })
);

app.use(cookieParser()); // Ativa o cookie-parser.
app.use(express.json()); // Habilita a análise do corpo das requisições como JSON.

// Define as rotas da API para autenticação e gerenciamento de produtos e pedidos.
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Inicia o servidor na porta especificada e exibe uma mensagem indicando que está em execução.
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
