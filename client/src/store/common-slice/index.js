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
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );
    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para adicionar uma nova imagem em destaque
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage", // Identificador da ação
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image } // Envia a imagem no corpo da requisição
    );
    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para deletar uma imagem em destaque
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage", // Identificador da ação
  async (imageId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/common/feature/delete/${imageId}`
    );
    return { id: imageId, success: response.data.success }; // Retorna o ID da imagem deletada e o status de sucesso
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
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.featureImageList.push(action.payload.data); // Adiciona a nova imagem na lista
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Remove a imagem deletada da lista de imagens em destaque
          state.featureImageList = state.featureImageList.filter(
            (image) => image.id !== action.payload.id
          );
        }
      });
  },
});

// Exporta o redutor do slice para ser usado na store
export default commonSlice.reducer;
