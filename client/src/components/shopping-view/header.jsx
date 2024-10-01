import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"; // Ícones utilizados no header
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"; // Hooks do react-router-dom
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"; // Componentes de UI para sheets
import { Button } from "../ui/button"; // Botão de UI
import { useDispatch, useSelector } from "react-redux"; // Hooks para Redux
import { shoppingViewHeaderMenuItems } from "@/config"; // Itens de menu importados de configuração
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"; // Componentes para menu suspenso
import { Avatar, AvatarFallback } from "../ui/avatar"; // Componentes de avatar
import { logoutUser } from "@/store/auth-slice"; // Ação para logout
import UserCartWrapper from "./cart-wrapper"; // Componente do carrinho de usuário
import { useEffect, useState } from "react"; // Hooks de efeito e estado
import { fetchCartItems } from "@/store/shop/cart-slice"; // Ação para buscar itens do carrinho
import { Label } from "../ui/label"; // Componente de Label

// Componente que renderiza os itens de menu
function MenuItems() {
  const navigate = useNavigate(); // Hook para navegação
  const location = useLocation(); // Hook para obter a localização atual
  const [searchParams, setSearchParams] = useSearchParams(); // Hook para manipular parâmetros de busca

  // Função para navegar para a página do item de menu clicado
  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters"); // Remove filtros do sessionStorage
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id], // Define a categoria do filtro
          }
        : null;

    // Salva os filtros no sessionStorage
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    // Atualiza os parâmetros de busca ou navega para a nova página
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// Componente para o conteúdo à direita do cabeçalho
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth); // Obtém os dados do usuário do estado Redux
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém os itens do carrinho do estado Redux
  const [openCartSheet, setOpenCartSheet] = useState(false); // Estado para controlar a abertura do carrinho
  const navigate = useNavigate(); // Hook para navegação
  const dispatch = useDispatch(); // Hook para despachar ações

  // Função para fazer logout do usuário
  function handleLogout() {
    dispatch(logoutUser()); // Despacha a ação de logout
  }

  // Efeito para buscar os itens do carrinho quando o usuário mudar
  useEffect(() => {
    dispatch(fetchCartItems(user?.id)); // Busca itens do carrinho para o usuário
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0} {/* Exibe o número de itens no carrinho */}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : [] // Passa os itens do carrinho para o wrapper
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()} {/* Exibe a inicial do nome do usuário */}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account {/* Link para a conta do usuário */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout {/* Item para fazer logout */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Componente principal do cabeçalho de compras
function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth); // Verifica se o usuário está autenticado

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span> {/* Título do cabeçalho */}
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems /> {/* Renderiza os itens do menu */}
            <HeaderRightContent /> {/* Renderiza o conteúdo à direita */}
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems /> {/* Renderiza os itens do menu em telas grandes */}
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent /> {/* Renderiza o conteúdo à direita em telas grandes */}
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader; // Exporta o componente ShoppingHeader como padrão
