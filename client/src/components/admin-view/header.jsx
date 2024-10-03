// Importa ícones e componentes necessários
import { AlignJustify, LogOut } from "lucide-react"; // Ícones para o menu e logout
import { Button } from "../ui/button"; // Componente de botão personalizado
import { useDispatch } from "react-redux"; // Hook para despachar ações do Redux
import { logoutUser } from "@/store/auth-slice"; // Ação de logout do slice de autenticação

// Define o componente AdminHeader
function AdminHeader({ setOpen }) {
  const dispatch = useDispatch(); // Hook para obter a função dispatch do Redux

  // Função para lidar com o logout do usuário
  function handleLogout() {
    dispatch(logoutUser()); // Despacha a ação de logout
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      {/* Container do cabeçalho com layout flexível, espaçamento e borda inferior */}
      
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        {/* Botão para abrir o menu em telas pequenas, visível apenas em telas menores */}
        <AlignJustify /> {/* Ícone para indicar o menu */}
        <span className="sr-only">Alternar Menu</span> {/* Texto acessível para leitores de tela */}
      </Button>

      <div className="flex flex-1 justify-end">
        {/* Div com flex-grow para ocupar o máximo de espaço disponível e alinhar o conteúdo à direita */}
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
          // Botão de logout com ícone e texto, estilizado com espaçamento, sombra e alinhamento flexível
        >
          <LogOut /> {/* Ícone de logout */}
          Sair {/* Texto do botão */}
        </Button>
      </div>
    </header>
  );
}

// Exporta o componente AdminHeader como padrão
export default AdminHeader;
