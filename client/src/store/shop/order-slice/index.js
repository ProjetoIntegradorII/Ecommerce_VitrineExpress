// Importa a biblioteca Axios para fazer requisições HTTP e funções do Redux Toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define o estado inicial para o slice de pedidos
const initialState = {
  approvalURL: null, // URL de aprovação para o pagamento
  isLoading: false, // Indica se uma requisição está em andamento
  orderId: null, // ID do pedido criado
  orderList: [], // Lista de pedidos do usuário
  orderDetails: null, // Detalhes do pedido específico
};

// Cria uma ação assíncrona para criar um novo pedido
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder", // Identificador da ação
  async (orderData) => {
    // Faz uma requisição POST para criar um novo pedido
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
      orderData
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para capturar um pagamento
export const capturePayment = createAsyncThunk(
  "/order/capturePayment", // Identificador da ação
  async ({ paymentId, payerId, orderId }) => {
    // Faz uma requisição POST para capturar o pagamento do pedido
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
      {
        paymentId, // ID do pagamento
        payerId, // ID do pagador
        orderId, // ID do pedido
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para obter todos os pedidos de um usuário específico
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId", // Identificador da ação
  async (userId) => {
    // Faz uma requisição GET para obter a lista de pedidos do usuário
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para obter os detalhes de um pedido específico
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails", // Identificador da ação
  async (id) => {
    // Faz uma requisição GET para obter os detalhes do pedido
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria um slice de pedidos usando Redux Toolkit
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null; // Redefine os detalhes do pedido
    },
  },
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao criar um pedido
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a criação do pedido
        state.approvalURL = action.payload.approvalURL; // Armazena a URL de aprovação
        state.orderId = action.payload.orderId; // Armazena o ID do pedido criado
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId) // Salva o ID do pedido atual no sessionStorage
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a criação falhar
        state.approvalURL = null; // Limpa a URL de aprovação em caso de erro
        state.orderId = null; // Limpa o ID do pedido em caso de erro
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar pedidos
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca
        state.orderList = action.payload.data; // Atualiza a lista de pedidos do usuário
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.orderList = []; // Limpa a lista de pedidos em caso de erro
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar detalhes do pedido
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca de detalhes
        state.orderDetails = action.payload.data; // Atualiza os detalhes do pedido
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.orderDetails = null; // Limpa os detalhes do pedido em caso de erro
      });
  },
});

// Exporta a ação de redefinir detalhes do pedido
export const { resetOrderDetails } = shoppingOrderSlice.actions;

// Exporta o redutor do slice para ser usado na store
export default shoppingOrderSlice.reducer;
