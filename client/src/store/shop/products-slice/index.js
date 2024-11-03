// Importa a biblioteca Axios para realizar requisições HTTP e funções do Redux Toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define o estado inicial para o slice de produtos
const initialState = {
  isLoading: false, // Indica se uma requisição está em andamento
  productList: [], // Lista de produtos filtrados
  productDetails: null, // Detalhes de um produto específico
};

// Cria uma ação assíncrona para buscar todos os produtos filtrados
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts", // Identificador da ação
  async ({ filterParams, sortParams }) => {

    // Cria uma string de consulta com os parâmetros de filtro e ordenação
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    // Faz uma requisição GET para buscar os produtos filtrados
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    return result?.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para buscar os detalhes de um produto específico
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails", // Identificador da ação
  async (id) => {
    // Faz uma requisição GET para obter os detalhes do produto
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    return result?.data; // Retorna os dados da resposta
  }
);

// Cria um slice de produtos usando Redux Toolkit
const shoppingProductSlice = createSlice({
  name: "shoppingProducts", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null; // Redefine os detalhes do produto
    },
  },
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar produtos
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca
        state.productList = action.payload.data; // Atualiza a lista de produtos filtrados
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.productList = []; // Limpa a lista de produtos em caso de erro
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar detalhes do produto
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca de detalhes
        state.productDetails = action.payload.data; // Atualiza os detalhes do produto
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.productDetails = null; // Limpa os detalhes do produto em caso de erro
      });
  },
});

// Exporta a ação de redefinir detalhes do produto
export const { setProductDetails } = shoppingProductSlice.actions;

// Exporta o redutor do slice para ser usado na store
export default shoppingProductSlice.reducer;
