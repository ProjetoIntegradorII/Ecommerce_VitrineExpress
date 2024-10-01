// Importa os componentes necessários do React Router
import { Route, Routes } from "react-router-dom";
// Importa layouts e páginas para diferentes seções da aplicação
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth"; // Componente para verificar autenticação
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux"; // Hooks do Redux
import { useEffect } from "react"; // Hook para efeitos colaterais
import { checkAuth } from "./store/auth-slice"; // Ação para verificar autenticação
import { Skeleton } from "@/components/ui/skeleton"; // Componente de carregamento
import PaypalReturnPage from "./pages/shopping-view/paypal-return"; // Página de retorno do PayPal
import PaymentSuccessPage from "./pages/shopping-view/payment-success"; // Página de sucesso de pagamento
import SearchProducts from "./pages/shopping-view/search"; // Página de busca de produtos

function App() {
  // Obtém o estado de autenticação do Redux
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // Efeito para verificar a autenticação ao montar o componente
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Exibe um esqueleto de carregamento enquanto a autenticação está sendo verificada
  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user); // Log de depuração

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Rota principal */}
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        {/* Rotas de autenticação */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        {/* Rotas do administrador */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        {/* Rotas da loja */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        {/* Rota para página não autenticada */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
