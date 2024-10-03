import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import { Button } from "../ui/button"; // Importa o componente Button
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"; // Importa componentes para o layout do sheet
import UserCartItemsContent from "./cart-items-content"; // Importa o componente que exibe itens do carrinho

// Componente que envolve o carrinho de compras do usuário
function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // Calcula o total do carrinho
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) * // Usa o preço de venda se disponível, caso contrário, usa o preço normal
              currentItem?.quantity, // Multiplica pelo número de itens
          0 // Valor inicial da soma
        )
      : 0; // Retorna 0 se não houver itens

  return (
    <SheetContent className="sm:max-w-md"> {/* Conteúdo do sheet com largura máxima em telas pequenas */}
      <SheetHeader>
        <SheetTitle>Carrinho</SheetTitle> {/* Título do sheet */}
      </SheetHeader>
      <div className="mt-8 space-y-4"> {/* Espaço entre os itens do carrinho */}
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />) // Mapeia e exibe cada item do carrinho
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between"> {/* Flex container para total do carrinho */}
          <span className="font-bold">Total</span> {/* Texto "Total" */}
          <span className="font-bold">R${totalCartAmount.toFixed(2)}</span> {/* Exibe o total formatado com duas casas decimais */}
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout"); // Navega para a página de checkout
          setOpenCartSheet(false); // Fecha o sheet do carrinho
        }}
        className="w-full mt-6" // Estilização do botão
      >
        Finalizar Compra
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper; // Exporta o componente UserCartWrapper como padrão
