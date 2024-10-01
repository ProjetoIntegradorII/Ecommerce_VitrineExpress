import ProductFilter from "@/components/shopping-view/filter"; // Importa o componente de filtro de produtos
import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Importa o componente de detalhes do produto
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Importa o componente de tile de produto
import { Button } from "@/components/ui/button"; // Importa o botão estilizado
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Importa componentes de menu suspenso
import { useToast } from "@/hooks/use-toast"; // Importa hook para mostrar mensagens ao usuário
import { sortOptions } from "@/config"; // Importa opções de ordenação
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importa ações do slice de carrinho
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice"; // Importa ações do slice de produtos
import { ArrowUpDownIcon } from "lucide-react"; // Importa ícone de setas
import { useEffect, useState } from "react"; // Importa hooks do React
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux
import { useSearchParams } from "react-router-dom"; // Importa hook para manipulação de parâmetros de busca

// Função auxiliar para criar parâmetros de busca
function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams"); // Debug: Mostra os parâmetros de busca

  return queryParams.join("&"); // Retorna a string de parâmetros de busca
}

function ShoppingListing() {
  const dispatch = useDispatch(); // Inicializa o hook de dispatch do Redux
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts // Obtém a lista de produtos e detalhes do estado Redux
  );
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém itens do carrinho
  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário do estado Redux
  const [filters, setFilters] = useState({}); // Estado para armazenar filtros
  const [sort, setSort] = useState(null); // Estado para armazenar a ordenação
  const [searchParams, setSearchParams] = useSearchParams(); // Hook para gerenciar parâmetros de busca
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Estado para controlar o diálogo de detalhes do produto
  const { toast } = useToast(); // Inicializa o hook de toast para exibir mensagens

  const categorySearchParam = searchParams.get("category"); // Obtém o parâmetro de busca da categoria

  // Função para manipular a ordenação
  function handleSort(value) {
    setSort(value);
  }

  // Função para manipular filtros
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      // Se a seção ainda não estiver nos filtros
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption); // Adiciona a opção aos filtros
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1); // Remove a opção dos filtros
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters)); // Armazena filtros no sessionStorage
  }

  // Função para buscar detalhes do produto
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId); // Debug: Mostra o ID do produto
    dispatch(fetchProductDetails(getCurrentProductId)); // Despacha a ação para buscar detalhes do produto
  }

  // Função para adicionar um produto ao carrinho
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems); // Debug: Mostra itens do carrinho
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          // Se a quantidade desejada exceder o estoque
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`, // Mensagem de erro
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id)); // Atualiza os itens do carrinho
        toast({
          title: "Product is added to cart", // Mensagem de sucesso
        });
      }
    });
  }

  // Efeito para configurar os filtros e a ordenação ao montar o componente
  useEffect(() => {
    setSort("price-lowtohigh"); // Define a ordenação inicial
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {}); // Restaura filtros do sessionStorage
  }, [categorySearchParam]);

  // Efeito para atualizar os parâmetros de busca ao mudar os filtros
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters); // Cria a string de parâmetros de busca
      setSearchParams(new URLSearchParams(createQueryString)); // Atualiza os parâmetros de busca
    }
  }, [filters]);

  // Efeito para buscar produtos filtrados e ordenados
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }) // Despacha a ação para buscar produtos
      );
  }, [dispatch, sort, filters]);

  // Efeito para abrir o diálogo de detalhes do produto quando os detalhes são recebidos
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(productList, "productListproductListproductList"); // Debug: Mostra a lista de produtos

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} /> {/* Componente de filtro */}
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products {/* Mostra a quantidade de produtos */}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" /> {/* Ícone de ordenação */}
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id} // Adiciona uma chave única para cada item de ordenação
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart} // Passa a função para adicionar ao carrinho
                  key={productItem.id} // Adiciona uma chave única para cada produto
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog} // Controla a abertura do diálogo
        setOpen={setOpenDetailsDialog} // Função para fechar o diálogo
        productDetails={productDetails} // Detalhes do produto a serem exibidos
      />
    </div>
  );
}

export default ShoppingListing; // Exporta o componente
