import { Navigate, useLocation } from "react-router-dom"; // Importa componentes para navegação e localização

// Componente CheckAuth que verifica a autenticação do usuário e redireciona conforme necessário.
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation(); // Obtém a localização atual para verificar a URL.

  console.log(location.pathname, isAuthenticated); // Loga o caminho atual e o estado de autenticação.

  // Define as páginas públicas que não requerem autenticação
  const publicPages = [
    "/",
    "/shop/home",
    "/shop/listing",
    "/shop/search",
    "/shop/about",
  ];

  // Verifica se a página atual é pública
  const isPublicPage = publicPages.includes(location.pathname);

  // Se o caminho atual for uma página pública
  if (isPublicPage) {
    // Se o usuário estiver autenticado e for um administrador, redireciona para o dashboard do admin
    if (isAuthenticated && user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }

    // Se o usuário estiver autenticado e for um usuário comum, permite o acesso às páginas públicas
    if (isAuthenticated && user?.role !== "admin") {
      return <>{children}</>;
    }

    // Se o usuário não estiver autenticado, permite o acesso às páginas públicas sem redirecionar
    return <>{children}</>;
  }

  // Se o usuário não estiver autenticado e tentar acessar uma página restrita
  if (!isAuthenticated) {
    // Redireciona para a página de login, mantendo a página atual para redirecionar de volta após o login
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }

  // Se o usuário estiver autenticado e tentar acessar as páginas de login ou registro
  if (
    isAuthenticated &&
    (location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register"))
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
    location.pathname.includes("/admin")
  ) {
    // Redireciona para uma página de não autorizado
    return <Navigate to="/unauth-page" />;
  }

  // Se o usuário estiver autenticado, for um admin e tentar acessar uma página da loja
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    // Redireciona para o dashboard do admin
    return <Navigate to="/admin/dashboard" />;
  }

  // Se nenhuma das condições acima for atendida, renderiza os filhos do componente (conteúdo da página)
  return <>{children}</>;
}

export default CheckAuth; // Exporta o componente CheckAuth como padrão.
