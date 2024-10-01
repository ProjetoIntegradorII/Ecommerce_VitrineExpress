// Importa a função configureStore do Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importa os redutores (slices) necessários para a store
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/adress-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "@/store/common-slice";

// Configura a store do Redux
const store = configureStore({
  reducer: {
    // Mapeia os redutores para chaves que podem ser acessadas no estado
    auth: authReducer, // Redutor de autenticação

    adminProducts: adminProductsSlice, // Redutor para produtos do admin
    adminOrder: adminOrderSlice, // Redutor para pedidos do admin

    shopProducts: shopProductsSlice, // Redutor para produtos da loja
    shopCart: shopCartSlice, // Redutor para o carrinho da loja
    shopAddress: shopAddressSlice, // Redutor para endereços da loja
    shopOrder: shopOrderSlice, // Redutor para pedidos da loja
    shopSearch: shopSearchSlice, // Redutor para busca de produtos na loja
    shopReview: shopReviewSlice, // Redutor para avaliações de produtos

    commonFeature: commonFeatureSlice, // Redutor para recursos comuns da aplicação
  },
});

// Exporta a store para ser utilizada em outros módulos da aplicação
export default store;
