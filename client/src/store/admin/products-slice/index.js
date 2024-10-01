import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importando funcionalidades do Redux Toolkit
import axios from "axios"; // Importando axios para requisições HTTP

const initialState = {
  isLoading: false, // Estado de carregamento
  productList: [], // Lista de produtos
};

// Ação assíncrona para adicionar um novo produto
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add", // URL da API
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo
        },
      }
    );

    return result?.data; // Retorna os dados da resposta
  }
);

// Ação assíncrona para buscar todos os produtos
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get" // URL da API
    );

    return result?.data; // Retorna os dados da resposta
  }
);

// Ação assíncrona para editar um produto
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`, // URL da API
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo
        },
      }
    );

    return result?.data; // Retorna os dados da resposta
  }
);

// Ação assíncrona para excluir um produto
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}` // URL da API
    );

    return result?.data; // Retorna os dados da resposta
  }
);

// Criação do slice do Redux
const AdminProductsSlice = createSlice({
  name: "adminProducts", // Nome do slice
  initialState, // Estado inicial
  reducers: {}, // Nenhum reducer para ações síncronas
  extraReducers: (builder) => {
    // Gerenciamento de ações assíncronas
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true; // Estado de carregamento
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Carregamento concluído
        state.productList = action.payload.data; // Atualiza a lista de produtos
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false; // Carregamento concluído com erro
        state.productList = []; // Reseta a lista de produtos
      });
  },
});

export default AdminProductsSlice.reducer; // Exporta o reducer
