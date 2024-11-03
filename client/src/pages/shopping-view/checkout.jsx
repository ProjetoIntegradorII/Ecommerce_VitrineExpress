import Address from "@/components/shopping-view/address"; // Importa o componente de endereço
import img from "../../assets/account.jpg"; // Importa a imagem de cabeçalho
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux
import UserCartItemsContent from "@/components/shopping-view/cart-items-content"; // Importa componente que exibe os itens do carrinho
import { Button } from "@/components/ui/button"; // Importa o botão estilizado
import { useState } from "react"; // Importa o hook useState do React
import { createNewOrder } from "@/store/shop/order-slice"; // Importa ação para criar um novo pedido
import { useToast } from "@/hooks/use-toast"; // Importa hook para mostrar mensagens ao usuário

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém os itens do carrinho do estado Redux
  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário do estado Redux
  const { approvalURL } = useSelector((state) => state.shopOrder); // Obtém a URL de aprovação do estado Redux
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null); // Estado para armazenar o endereço selecionado
  const [isPaymentStart, setIsPaymemntStart] = useState(false); // Estado para rastrear se o pagamento foi iniciado
  const dispatch = useDispatch(); // Inicializa o hook de dispatch do Redux
  const { toast } = useToast(); // Inicializa o hook de toast para exibir mensagens

  // Calcula o total do carrinho
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Função para iniciar o pagamento via PayPal
  function handleInitiatePaypalPayment() {
    // Verifica se o carrinho está vazio
    if (cartItems.length === 0) {
      toast({
        title: "Seu carrinho está vazio. Adicione itens para continuar!",
        variant: "destructive", // Define a mensagem como erro
      });
      return;
    }

    // Verifica se um endereço foi selecionado
    if (currentSelectedAddress === null) {
      toast({
        title: "Selecione um endereço para prosseguir.",
        variant: "destructive", // Define a mensagem como erro
      });
      return;
    }

    // Cria os dados do pedido a serem enviados para o Redux
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending", // Status inicial do pedido
      paymentMethod: "paypal", // Método de pagamento
      paymentStatus: "pending", // Status do pagamento
      totalAmount: totalCartAmount, // Total do pedido
      orderDate: new Date(), // Data do pedido
      orderUpdateDate: new Date(), // Data de atualização do pedido
      paymentId: "", // ID do pagamento (para PayPal)
      payerId: "", // ID do pagador (para PayPal)
    };

    // Despacha a ação para criar um novo pedido
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true); // Atualiza o estado para iniciar o pagamento
      } else {
        setIsPaymemntStart(false); // Reseta o estado se houve falha
      }
    });
  }

  // Redireciona para a URL de aprovação do PayPal se estiver disponível
  if (approvalURL) {
    window.location.href = approvalURL; // Navega para a URL de aprovação
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />{" "}
        {/* Imagem de cabeçalho */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* Componente de endereço */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress} // Função para atualizar o endereço selecionado
        />
        <div className="flex flex-col gap-4">
          {/* Renderiza os itens do carrinho */}
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} /> // Adiciona uma chave única para cada item
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">R${totalCartAmount}</span>{" "}
              {/* Exibe o total do carrinho */}
            </div>
          </div>
          <div className="mt-4 w-full">
            {/* Botão de checkout */}
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processando pagamento ..." // Texto quando o pagamento está sendo processado
                : "Finalizar compra"}{" "}
              {/* Texto quando está pronto para checkout */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout; // Exporta o componente para uso em outras partes da aplicação
