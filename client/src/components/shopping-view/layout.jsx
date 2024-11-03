import { Outlet } from "react-router-dom"; // Importa o componente Outlet para renderizar rotas filhas
import ShoppingHeader from "./header"; // Importa o cabeçalho da área de compras

// Define o componente ShoppingLayout, que organiza a estrutura principal das páginas de compras.
function ShoppingLayout() {
  return (
    // Contêiner flexível que organiza o layout em uma coluna e usa um fundo branco.
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Renderiza o cabeçalho comum para a área de compras, que provavelmente contém navegação, logotipo, etc. */}
      <ShoppingHeader />

      {/* A área principal onde o conteúdo das rotas filhas será renderizado.
          O Outlet renderiza dinamicamente o conteúdo das páginas específicas de compras. */}
      <main className="flex flex-col w-full">
        <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
      </main>
    </div>
  );
}

// Exporta o componente ShoppingLayout como padrão para ser usado em outras partes da aplicação.
export default ShoppingLayout;
