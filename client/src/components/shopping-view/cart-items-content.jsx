import { Minus, Plus, Trash } from "lucide-react"; // Importa ícones para decrementar, incrementar e deletar
import { Button } from "../ui/button"; // Importa o componente Button
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux para gerenciamento de estado
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice"; // Importa ações do slice de carrinho
import { useToast } from "@/hooks/use-toast"; // Importa o hook de notificação

// Componente que exibe os itens do carrinho do usuário
function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário autenticado
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém itens do carrinho do Redux
  const { productList } = useSelector((state) => state.shopProducts); // Obtém a lista de produtos do Redux
  const dispatch = useDispatch(); // Hook para despachar ações do Redux
  const { toast } = useToast(); // Hook para mostrar notificações

  // Função para atualizar a quantidade de um item no carrinho
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    // Se a ação for para incrementar
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || []; // Obtém itens do carrinho

      if (getCartItems.length) {
        // Verifica se existem itens no carrinho
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId // Encontra o índice do item atual no carrinho
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId // Encontra o índice do produto na lista de produtos
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock; // Obtém o total de estoque do produto

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock"); // Log do estoque total

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity; // Obtém a quantidade atual do item
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Apenas ${getQuantity} podem ser adicionados no carrinho`, // Mensagem de erro
              variant: "destructive",
            });
            return; // Sai da função
          }
        }
      }
    }

    // Dispara a ação de atualização de quantidade
    dispatch(
      updateCartQuantity({
        userId: user?.id, // ID do usuário
        productId: getCartItem?.productId, // ID do produto
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1 // Incrementa a quantidade
            : getCartItem?.quantity - 1, // Decrementa a quantidade
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "O item do carrinho foi atualizado com sucesso", // Mensagem de sucesso
        });
      }
    });
  }

  // Função para deletar um item do carrinho
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }) // Dispara a ação de exclusão
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "O item do carrinho foi excluído com sucesso", // Mensagem de sucesso
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      {" "}
      {/* Flex container para o item do carrinho */}
      <img
        src={cartItem?.image} // Imagem do item
        alt={cartItem?.title} // Texto alternativo da imagem
        className="w-20 h-20 rounded object-cover" // Estilização da imagem
      />
      <div className="flex-1">
        {" "}
        {/* Flex container para as informações do item */}
        <h3 className="font-extrabold">{cartItem?.title}</h3>{" "}
        {/* Título do item */}
        <div className="flex items-center gap-2 mt-1">
          {" "}
          {/* Flex container para os botões de quantidade */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full" // Estilização do botão
            size="icon"
            disabled={cartItem?.quantity === 1} // Desabilita o botão se a quantidade for 1
            onClick={() => handleUpdateQuantity(cartItem, "minus")} // Função chamada ao clicar no botão de diminuir
          >
            <Minus className="w-4 h-4" /> {/* Ícone de menos */}
            <span className="sr-only">Diminuir</span>{" "}
            {/* Texto oculto para acessibilidade */}
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>{" "}
          {/* Exibe a quantidade */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full" // Estilização do botão
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")} // Função chamada ao clicar no botão de aumentar
          >
            <Plus className="w-4 h-4" /> {/* Ícone de mais */}
            <span className="sr-only">Aumentar</span>{" "}
            {/* Texto oculto para acessibilidade */}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {" "}
        {/* Flex container para exibir preço e botão de deletar */}
        <p className="font-semibold">
          R$
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}{" "}
          {/* Exibe o preço total */}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)} // Função chamada ao clicar no ícone de deletar
          className="cursor-pointer mt-1" // Estilização do ícone
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent; // Exporta o componente UserCartItemsContent como padrão
