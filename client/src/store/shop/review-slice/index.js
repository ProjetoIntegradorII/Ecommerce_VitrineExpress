// Importa as funções necessárias do Redux Toolkit e a biblioteca Axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define o estado inicial para o slice de avaliações
const initialState = {
  isLoading: false, // Indica se uma requisição está em andamento
  reviews: [], // Lista de avaliações
};

// Cria uma ação assíncrona para adicionar uma nova avaliação
export const addReview = createAsyncThunk(
  "/order/addReview", // Identificador da ação
  async (formdata) => {
    // Faz uma requisição POST para adicionar a avaliação
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
      formdata
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para obter as avaliações de um produto
export const getReviews = createAsyncThunk(
  "/order/getReviews", // Identificador da ação
  async (id) => {
    // Faz uma requisição GET para obter as avaliações do produto pelo ID
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${id}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria um slice de avaliações usando Redux Toolkit
const reviewSlice = createSlice({
  name: "reviewSlice", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {}, // Sem reducers síncronos neste slice
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar as avaliações
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca
        state.reviews = action.payload.data; // Atualiza a lista de avaliações com os dados retornados
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.reviews = []; // Limpa a lista de avaliações em caso de erro
      });
  },
});

// Exporta o redutor do slice para ser usado na store
export default reviewSlice.reducer;
