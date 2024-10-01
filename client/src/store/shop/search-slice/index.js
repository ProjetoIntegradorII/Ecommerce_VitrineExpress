// Importa as funções necessárias do Redux Toolkit e a biblioteca Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define o estado inicial para o slice de pesquisa
const initialState = {
  isLoading: false, // Indica se uma requisição de busca está em andamento
  searchResults: [], // Lista dos resultados da busca
};

// Cria uma ação assíncrona para obter os resultados da pesquisa
export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults", // Identificador da ação
  async (keyword) => {
    // Faz uma requisição GET para obter os resultados da busca com base na palavra-chave
    const response = await axios.get(
      `http://localhost:5000/api/shop/search/${keyword}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria um slice de pesquisa usando Redux Toolkit
const searchSlice = createSlice({
  name: "searchSlice", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {
    // Define um reducer para redefinir os resultados da busca
    resetSearchResults: (state) => {
      state.searchResults = []; // Limpa a lista de resultados da busca
    },
  },
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar os resultados
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca
        state.searchResults = action.payload.data; // Atualiza a lista de resultados da busca com os dados retornados
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.searchResults = []; // Limpa a lista de resultados da busca em caso de erro
      });
  },
});

// Exporta a ação para redefinir os resultados da busca
export const { resetSearchResults } = searchSlice.actions;

// Exporta o redutor do slice para ser usado na store
export default searchSlice.reducer;
