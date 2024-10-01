// Importa a biblioteca Axios para fazer requisições HTTP e funções do Redux Toolkit
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define o estado inicial para o slice do carrinho de compras
const initialState = {
  cartItems: [], // Armazena os itens do carrinho
  isLoading: false, // Indica se uma requisição está em andamento
};

// Cria uma ação assíncrona para adicionar um item ao carrinho
export const addToCart = createAsyncThunk(
  "cart/addToCart", // Identificador da ação
  async ({ userId, productId, quantity }) => {
    // Faz uma requisição POST para adicionar um item ao carrinho
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      {
        userId, // ID do usuário
        productId, // ID do produto
        quantity, // Quantidade do produto
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para buscar os itens do carrinho
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems", // Identificador da ação
  async (userId) => {
    // Faz uma requisição GET para obter os itens do carrinho do usuário
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/get/${userId}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para deletar um item do carrinho
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem", // Identificador da ação
  async ({ userId, productId }) => {
    // Faz uma requisição DELETE para remover um item do carrinho
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para atualizar a quantidade de um item no carrinho
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity", // Identificador da ação
  async ({ userId, productId, quantity }) => {
    // Faz uma requisição PUT para atualizar a quantidade de um item no carrinho
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update-cart",
      {
        userId, // ID do usuário
        productId, // ID do produto
        quantity, // Nova quantidade do produto
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria um slice do carrinho de compras usando Redux Toolkit
const shoppingCartSlice = createSlice({
  name: "shoppingCart", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {}, // Não há redutores definidos neste slice
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao fazer a requisição
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a adição
        state.cartItems = action.payload.data; // Atualiza a lista de itens do carrinho
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a adição falhar
        state.cartItems = []; // Limpa a lista de itens do carrinho em caso de erro
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar os itens do carrinho
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca
        state.cartItems = action.payload.data; // Atualiza a lista de itens do carrinho
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.cartItems = []; // Limpa a lista de itens do carrinho em caso de erro
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao atualizar a quantidade
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a atualização
        state.cartItems = action.payload.data; // Atualiza a lista de itens do carrinho
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a atualização falhar
        state.cartItems = []; // Limpa a lista de itens do carrinho em caso de erro
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao deletar um item do carrinho
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a deleção
        state.cartItems = action.payload.data; // Atualiza a lista de itens do carrinho
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a deleção falhar
        state.cartItems = []; // Limpa a lista de itens do carrinho em caso de erro
      });
  },
});

// Exporta o redutor do slice para ser usado na store
export default shoppingCartSlice.reducer;
