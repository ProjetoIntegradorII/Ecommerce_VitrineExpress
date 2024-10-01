// Importa funções do Redux Toolkit para criar uma fatia (slice) e ações assíncronas
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Importa a biblioteca Axios para fazer requisições HTTP
import axios from "axios";

// Define o estado inicial para o slice comum
const initialState = {
  isLoading: false, // Indica se uma requisição está em andamento
  featureImageList: [], // Armazena a lista de imagens em destaque
};

// Cria uma ação assíncrona para obter as imagens em destaque
export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages", // Identificador da ação
  async () => {
    // Faz uma requisição GET para obter as imagens em destaque
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para adicionar uma nova imagem em destaque
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage", // Identificador da ação
  async (image) => {
    // Faz uma requisição POST para adicionar uma nova imagem em destaque
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image } // Envia a imagem no corpo da requisição
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria um slice comum usando Redux Toolkit
const commonSlice = createSlice({
  name: "commonSlice", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {}, // Não há redutores definidos neste slice
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao fazer a requisição
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.featureImageList = action.payload.data; // Atualiza a lista de imagens em destaque com os dados da resposta
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento
        state.featureImageList = []; // Limpa a lista de imagens em caso de falha
      });
  },
});

// Exporta o redutor do slice para ser usado na store
export default commonSlice.reducer;
