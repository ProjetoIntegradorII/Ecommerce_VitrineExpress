// Importa componentes e hooks necessários
import { Outlet } from "react-router-dom"; // Componente para renderizar rotas aninhadas
import AdminSideBar from "./sidebar"; // Importa a barra lateral administrativa
import AdminHeader from "./header"; // Importa o cabeçalho administrativo
import { useState } from "react"; // Hook useState para gerenciar estado

// Define o componente AdminLayout, responsável por estruturar o layout principal da interface administrativa
function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false); // Estado para controlar a visibilidade da barra lateral

  return (
    <div className="flex min-h-screen w-full">
      {/* Container principal com display flex, ocupando a altura mínima da tela e largura total */}

      {/* admin sidebar */}
      <AdminSideBar
        open={openSidebar} // Passa o estado atual da barra lateral (aberta ou fechada)
        setOpen={setOpenSidebar} // Função para atualizar o estado de visibilidade da barra lateral
        className={`w-full md:w-64 ${
          openSidebar ? "block" : "hidden md:block"
        }`}
        // Define a largura da barra lateral e controla a visibilidade com classes condicionais, exibindo ou escondendo em telas menores
      />

      <div className="flex flex-1 flex-col">
        {/* Container do conteúdo principal, com flex-grow para ocupar o máximo de espaço */}

        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        {/* Renderiza o cabeçalho, passando a função setOpenSidebar para controlar a visibilidade da barra lateral */}

        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6 w-full">
          {/* Área principal para exibir o conteúdo dinâmico da página */}
          <Outlet />{" "}
          {/* Renderiza o conteúdo da rota aninhada, que será definido pelas rotas específicas */}
        </main>
      </div>
    </div>
  );
}

// Exporta o componente AdminLayout como padrão
export default AdminLayout;
