import { Navigate, useLocation } from "react-router-dom"; // Importa componentes para navegação e localização

// Componente CheckAuth que verifica a autenticação do usuário e redireciona conforme necessário.
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation(); // Obtém a localização atual para verificar a URL.

  console.log(location.pathname, isAuthenticated); // Loga o caminho atual e o estado de autenticação.

  // Se o caminho atual for a raiz ("/")
  if (location.pathname === "/") {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      // Se o usuário for um administrador, redireciona para o dashboard do admin
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        // Caso contrário, redireciona para a página inicial da loja
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Se o usuário não estiver autenticado e não estiver acessando as páginas de login ou registro
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    // Redireciona para a página de login
    return <Navigate to="/auth/login" />;
  }

  // Se o usuário estiver autenticado e tentar acessar as páginas de login ou registro
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    // Se o usuário for um administrador, redireciona para o dashboard do admin
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      // Caso contrário, redireciona para a página inicial da loja
      return <Navigate to="/shop/home" />;
    }
  }

  // Se o usuário estiver autenticado, não for um admin e tentar acessar uma página de admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    // Redireciona para uma página não autorizada
    return <Navigate to="/unauth-page" />;
  }

  // Se o usuário estiver autenticado, for um admin e tentar acessar uma página da loja
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    // Redireciona para o dashboard do admin
    return <Navigate to="/admin/dashboard" />;
  }

  // Se nenhuma das condições acima for atendida, renderiza os filhos do componente
  return <>{children}</>;
}

export default CheckAuth; // Exporta o componente CheckAuth como padrão.
