// Importa funções do Redux Toolkit para criar uma fatia (slice) e ações assíncronas
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Importa a biblioteca Axios para fazer requisições HTTP
import axios from "axios";

// Define o estado inicial para o slice de autenticação
const initialState = {
  isAuthenticated: false, // Indica se o usuário está autenticado
  isLoading: true, // Indica se a requisição está em andamento
  user: null, // Armazena os dados do usuário autenticado
  error: null, // Armazena mensagens de erro, se houver
  token: null,
};

// Cria uma ação assíncrona para registrar um usuário
export const registerUser = createAsyncThunk(
  "auth/register", // Identificador da ação
  async (formData) => {
    // Faz uma requisição POST para registrar um novo usuário
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`, // URL da API
      formData, // Dados do formulário
      {
        withCredentials: true, // Inclui cookies na requisição
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para fazer login de um usuário
export const loginUser = createAsyncThunk(
  "auth/login", // Identificador da ação
  async (formData) => {
    // Faz uma requisição POST para fazer login
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`, // URL da API
      formData, // Dados do formulário
      {
        withCredentials: true, // Inclui cookies na requisição
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para logout de um usuário
export const logoutUser = createAsyncThunk(
  "auth/logout", // Identificador da ação
  async () => {
    // Faz uma requisição POST para deslogar o usuário
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`, // URL da API
      {}, // Não é necessário enviar dados para logout
      {
        withCredentials: true, // Inclui cookies na requisição
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria uma ação assíncrona para verificar a autenticação do usuário
/*export const checkAuth = createAsyncThunk(
  "auth/checkauth", // Identificador da ação
  async () => {
    // Faz uma requisição GET para verificar se o usuário está autenticado
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/check-auth`, // URL da API
      {
        withCredentials: true, // Inclui cookies na requisição
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate", // Evita cache na resposta
        },
      }
    );

    return response.data; // Retorna os dados da resposta
  }
); */

export const checkAuth = createAsyncThunk(
  "auth/checkauth", // Identificador da ação
  async (token) => {
    // Faz uma requisição GET para verificar se o usuário está autenticado
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/check-auth`, // URL da API
      {
        withCredentials: true, // Inclui cookies na requisição
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate", // Evita cache na resposta
        },
      }
    );

    return response.data; // Retorna os dados da resposta
  }
);

// Cria um slice de autenticação usando Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetTokenAndCredentials: (state) => { // Corrige a sintaxe aqui
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Define como o estado deve ser alterado com base nas ações assíncronas
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento durante o registro
        state.error = null; // Reseta o erro ao iniciar o registro
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.user = null; // Limpa os dados do usuário após o registro
        state.isAuthenticated = false; // Usuário não está autenticado
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.user = null; // Limpa os dados do usuário após falha no registro
        state.isAuthenticated = false; // Usuário não está autenticado
        state.error = action.error.message; // Armazena a mensagem de erro
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento durante o login
        state.error = null; // Reseta o erro ao iniciar o login
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.user = action.payload.success ? action.payload.user : null; // Define o usuário se o login for bem-sucedido
        state.isAuthenticated = action.payload.success; // Atualiza o estado de autenticação
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.user = null; // Limpa os dados do usuário após falha no login
        state.isAuthenticated = false; // Usuário não está autenticado
        state.error = action.error.message; // Armazena a mensagem de erro
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true; // Inicia o carregamento durante a verificação de autenticação
        state.error = null; // Reseta o erro ao iniciar a verificação
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.user = action.payload.success ? action.payload.user : null; // Define o usuário se a verificação for bem-sucedida
        state.isAuthenticated = action.payload.success; // Atualiza o estado de autenticação
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.user = null; // Limpa os dados do usuário após falha na verificação
        state.isAuthenticated = false; // Usuário não está autenticado
        state.error = action.error.message; // Armazena a mensagem de erro
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false; // Termina o carregamento
        state.user = null; // Limpa os dados do usuário após logout
        state.isAuthenticated = false; // Usuário não está autenticado
      });
  },
});

// Exporta a ação setUser para ser utilizada em componentes
export const { setUser, resetTokenAndCredentials } = authSlice.actions;
// Exporta o redutor do slice para ser usado na store
export default authSlice.reducer;
