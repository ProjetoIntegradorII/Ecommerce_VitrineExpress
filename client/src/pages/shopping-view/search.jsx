import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Componente para exibir detalhes do produto
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Componente para exibir cada produto
import { Input } from "@/components/ui/input"; // Componente de entrada para buscar produtos
import { useToast } from "@/hooks/use-toast"; // Hook para exibir notificações
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Ações do Redux para o carrinho
import { fetchProductDetails } from "@/store/shop/products-slice"; // Ação para obter detalhes do produto
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice"; // Ações para pesquisa
import { useEffect, useState } from "react"; // Hooks do React
import { useDispatch, useSelector } from "react-redux"; // Hooks do Redux
import { useSearchParams } from "react-router-dom"; // Hook para manipulação de parâmetros da URL

function SearchProducts() {
  const [keyword, setKeyword] = useState(""); // Estado para armazenar a palavra-chave de busca
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Estado para controle do diálogo de detalhes do produto
  const [searchParams, setSearchParams] = useSearchParams(); // Hook para obter parâmetros da URL
  const dispatch = useDispatch(); // Hook para despachar ações do Redux
  const { searchResults } = useSelector((state) => state.shopSearch); // Obtém resultados da pesquisa do estado do Redux
  const { productDetails } = useSelector((state) => state.shopProducts); // Obtém detalhes do produto do estado do Redux
  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário do estado do Redux
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém itens do carrinho do estado do Redux
  const { toast } = useToast(); // Hook para exibir notificações

  // Efeito para buscar resultados com base na palavra-chave
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`)); // Atualiza os parâmetros da URL
        dispatch(getSearchResults(keyword)); // Busca resultados com base na palavra-chave
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults()); // Reseta resultados da pesquisa
    }
  }, [keyword]);

  // Função para adicionar produtos ao carrinho
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
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
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Função para obter detalhes do produto
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // Efeito para abrir o diálogo de detalhes do produto
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)} // Atualiza a palavra-chave com base na entrada do usuário
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
