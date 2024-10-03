// Importa ícones da biblioteca Lucide
import {
    BadgeCheck,             // Ícone usado para representar pedidos (orders)
    ChartNoAxesCombined,     // Ícone usado para representar o painel administrativo (dashboard)
    LayoutDashboard,         // Ícone usado para o item de dashboard
    ShoppingBasket,          // Ícone usado para o item de produtos (products)
  } from "lucide-react";      // Importa da biblioteca lucide-react, que contém uma coleção de ícones SVG
  
  import { Fragment } from "react"; // Fragment é usado para agrupar vários elementos sem adicionar um nó extra no DOM
  import { useNavigate } from "react-router-dom"; // Hook para navegação entre rotas no React Router
  
  // Importa componentes de UI como Sheet, SheetContent, SheetHeader, e SheetTitle
  // que são usados para construir a barra lateral (sidebar) com um layout móvel e responsivo
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
  
  // Define os itens do menu da barra lateral administrativa em um array
  const adminSidebarMenuItems = [
    {
        id: "dashboard",   // Identificador único para o item
        label: "Dashboard", // Rótulo exibido no menu
        path: "/admin/dashboard", // Rota para a qual o item redireciona
        icon: <LayoutDashboard />, // Ícone associado ao item de dashboard
    },
    {
        id: "products", // Identificador para o item de produtos
        label: "Produtos", // Rótulo "Products"
        path: "/admin/products", // Caminho para a página de produtos
        icon: <ShoppingBasket />, // Ícone de cesta de compras para produtos
    },
    {
        id: "orders", // Identificador para o item de pedidos
        label: "Pedidos", // Rótulo "Orders"
        path: "/admin/orders", // Caminho para a página de pedidos
        icon: <BadgeCheck />, // Ícone de confirmação para pedidos
    },
  ];
  
  // Componente que renderiza os itens do menu da barra lateral
  function MenuItems({ setOpen }) {
    const navigate = useNavigate(); // Hook para navegação entre páginas
  
    return (
        <nav className="mt-8 flex-col flex gap-2"> {/* Navegação com margem superior e flexbox vertical */}
            {adminSidebarMenuItems.map((menuItem) => ( // Mapeia cada item do menu
                <div
                    key={menuItem.id} // Usando id exclusivo como chave para cada item
                    onClick={() => {
                        navigate(menuItem.path); // Ao clicar, navega para a rota especificada
                        setOpen ? setOpen(false) : null; // Fecha a barra lateral se o estado setOpen estiver definido
                    }}
                    className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground" // Estilos de hover e espaçamento
                >
                    {menuItem.icon} {/* Exibe o ícone associado ao item */}
                    <span>{menuItem.label}</span> {/* Exibe o rótulo do item */}
                </div>
            ))}
        </nav>
    );
  }
  
  // Componente principal que representa a barra lateral administrativa
  function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate(); // Hook para navegação entre rotas
  
    return (
        <Fragment> {/* Fragmento usado para evitar criar um nó DOM desnecessário */}
            <Sheet open={open} onOpenChange={setOpen}> {/* Componente de folha deslizante para barra lateral móvel */}
                <SheetContent side="left" className="w-64"> {/* Barra lateral deslizando do lado esquerdo */}
                    <div className="flex flex-col h-full"> {/* Flexbox vertical ocupando toda a altura */}
                        <SheetHeader className="border-b"> {/* Cabeçalho da barra lateral com borda inferior */}
                            <SheetTitle className="flex gap-2 mt-5 mb-5"> {/* Título do painel com margens superior e inferior */}
                                <ChartNoAxesCombined size={30} /> {/* Ícone do painel administrativo */}
                                <h1 className="text-2xl font-extrabold">Painel Admin</h1> {/* Texto do título com fonte em negrito */}
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} /> {/* Renderiza os itens do menu */}
                    </div>
                </SheetContent>
            </Sheet>
            {/* Barra lateral fixa exibida em telas grandes */}
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div
                    onClick={() => navigate("/admin/dashboard")} // Ao clicar, navega para o dashboard
                    className="flex cursor-pointer items-center gap-2"
                >
                    <ChartNoAxesCombined size={30} /> {/* Ícone do painel */}
                    <h1 className="text-2xl font-extrabold">Painel Admin</h1> {/* Título do painel */}
                </div>
                <MenuItems /> {/* Renderiza os itens do menu na barra lateral fixa */}
            </aside>
        </Fragment>
    );
  }
  
  // Exporta o componente AdminSideBar como padrão
  export default AdminSideBar;
  