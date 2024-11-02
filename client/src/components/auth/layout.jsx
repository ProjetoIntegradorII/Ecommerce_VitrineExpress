// Importa o componente Outlet do react-router-dom, responsável por renderizar o conteúdo das rotas filhas.
import { Outlet } from "react-router-dom";

// Define o componente AuthLayout, que será o layout usado para páginas de autenticação (login, cadastro, etc.).
function AuthLayout() {
  return (
    // Contêiner flexível que ocupa a altura mínima da tela e a largura completa.
    <div className="flex min-h-screen w-full">
      {/* Esta div será a área de boas-vindas, exibida apenas em telas grandes (lg).
          Contém uma mensagem de boas-vindas centralizada com um fundo preto. */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          {/* Título de boas-vindas da página de autenticação. */}
          <h1 className="text-4xl font-extrabold tracking-tight">
            Bem-vindo à <p>Vitrine Express</p>
          </h1>
        </div>
      </div>

      {/* Área flexível que ocupa o restante da tela (principalmente em dispositivos móveis)
          para renderizar o conteúdo principal da página de autenticação. */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        {/* O Outlet renderiza o conteúdo das rotas filhas (como formulários de login ou cadastro). */}
        <Outlet />
      </div>
    </div>
  );
}

// Exporta o componente AuthLayout como padrão para ser utilizado em outras partes da aplicação.
export default AuthLayout;
