import { Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();  // Obtém a localização atual

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Página inicial redireciona para "Home" */}
        <Route path="/" element={<Navigate to="/shop/home" />} />

        {/* Rotas de autenticação */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route 
            path="login" 
            element={
              <AuthLogin redirectTo={location.state?.from || "/shop/home"} /> // Redireciona para a última página pública ou Home
            }
          />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Rotas do administrador */}
        <Route
          path="/admin/*"
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

        {/* Páginas públicas da loja */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Rotas privadas da loja */}
        <Route
          path="/shop"
          element={<ShoppingLayout />}
        >
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingCheckout />
              </CheckAuth>
            }
          />
          <Route
            path="account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingAccount />
              </CheckAuth>
            }
          />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>

        {/* Página para usuários não autorizados */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
