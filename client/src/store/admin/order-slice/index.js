import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importando funcionalidades do Redux Toolkit
import axios from "axios"; // Importando axios para requisições HTTP

const initialState = {
  orderList: [], // Lista de pedidos
  orderDetails: null, // Detalhes de um pedido específico
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin", // Tipo da ação
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get` // URL da API
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Ação para obter detalhes de um pedido
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}v/api/admin/orders/details/${id}` // URL da API
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Ação para atualizar o status do pedido
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`, // URL da API
      {
        orderStatus, // Status do pedido a ser atualizado
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Criação do slice do Redux
const adminOrderSlice = createSlice({
  name: "adminOrderSlice", // Nome do slice
  initialState, // Estado inicial
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null; // Reseta os detalhes do pedido
    },
  },
  extraReducers: (builder) => {
    // Gerenciamento de ações assíncronas
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true; // Estado de carregamento
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false; // Carregamento concluído
        state.orderList = action.payload.data; // Atualiza a lista de pedidos
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false; // Carregamento concluído com erro
        state.orderList = []; // Reseta a lista de pedidos
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true; // Estado de carregamento
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false; // Carregamento concluído
        state.orderDetails = action.payload.data; // Atualiza os detalhes do pedido
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false; // Carregamento concluído com erro
        state.orderDetails = null; // Reseta os detalhes do pedido
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions; // Exporta a ação de reset

export default adminOrderSlice.reducer; // Exporta o reducer
