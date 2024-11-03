// Importa funções do Redux Toolkit para criar uma fatia (slice) e ações assíncronas
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Importa a biblioteca Axios para fazer requisições HTTP
import axios from "axios";

// Define o estado inicial para o slice de endereços
const initialState = {
  isLoading: false, // Indica se uma requisição está em andamento
  addressList: [], // Armazena a lista de endereços
};

// Cria uma ação assíncrona para adicionar um novo endereço
export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress", // Identificador da ação
  async (formData) => {
    // Faz uma requisição POST para adicionar um novo endereço
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
      formData // Dados do formulário
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para buscar todos os endereços de um usuário
export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses", // Identificador da ação
  async (userId) => {
    // Faz uma requisição GET para obter todos os endereços do usuário
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para editar um endereço existente
export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress", // Identificador da ação
  async ({ userId, addressId, formData }) => {
    // Faz uma requisição PUT para atualizar o endereço
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData // Dados do formulário
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para deletar um endereço
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress", // Identificador da ação
  async ({ userId, addressId }) => {
    // Faz uma requisição DELETE para remover o endereço
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria um slice de endereços usando Redux Toolkit
const addressSlice = createSlice({
  name: "address", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {}, // Não há redutores definidos neste slice
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao fazer a requisição
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a adição
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a adição falhar
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento ao buscar os endereços
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento após a busca
        state.addressList = action.payload.data; // Atualiza a lista de endereços com os dados recebidos
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false; // Termina o carregamento se a busca falhar
        state.addressList = []; // Limpa a lista de endereços em caso de erro
      });
  },
});

// Exporta o redutor do slice para ser usado na store
export default addressSlice.reducer;
