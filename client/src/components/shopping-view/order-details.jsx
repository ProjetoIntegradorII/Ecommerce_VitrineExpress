import { useSelector } from "react-redux"; // Importa o hook useSelector para acessar o estado do Redux
import { Badge } from "../ui/badge"; // Importa o componente Badge para exibir status
import { DialogContent } from "../ui/dialog"; // Importa o componente DialogContent para organizar o conteúdo em um diálogo
import { Label } from "../ui/label"; // Importa o componente Label para exibir textos rotulados
import { Separator } from "../ui/separator"; // Importa o componente Separator para dividir seções visualmente

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário autenticado do estado Redux

  return (
    <DialogContent className="sm:max-w-[600px]">
      {" "}
      {/* Define o conteúdo do diálogo com largura máxima */}
      <div className="grid gap-6">
        {" "}
        {/* Cria um layout em grade com espaçamento */}
        <div className="grid gap-2">
          {" "}
          {/* Seção para exibir informações do pedido */}
          <div className="flex mt-6 items-center justify-between">
            {" "}
            {/* Exibe ID do pedido */}
            <p className="font-medium">ID do Pedido</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            {" "}
            {/* Exibe a data do pedido */}
            <p className="font-medium">Data do Pedido</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            {" "}
            {/* Exibe o preço total do pedido */}
            <p className="font-medium">Preço do Pedido</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            {" "}
            {/* Exibe o método de pagamento */}
            <p className="font-medium">Método de Pagamento</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            {" "}
            {/* Exibe o status do pagamento */}
            <p className="font-medium">Status do Pagamento</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            {" "}
            {/* Exibe o status do pedido */}
            <p className="font-medium">Status do Pedido</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  // Aplica estilos diferentes com base no status do pedido
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />{" "}
        {/* Separa a seção de informações do pedido da seção de detalhes */}
        <div className="grid gap-4">
          {" "}
          {/* Seção para exibir detalhes do pedido */}
          <div className="grid gap-2">
            <div className="font-medium">Detalhes do Pedido</div>
            <ul className="grid gap-3">
              {" "}
              {/* Lista os itens do pedido */}
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li
                      className="flex items-center justify-between"
                      key={item.id}
                    >
                      {" "}
                      {/* Exibe título, quantidade e preço de cada item */}
                      <span>Título: {item.title}</span>
                      <span>Quantidade: {item.quantity}</span>
                      <span>Preço: R${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          {" "}
          {/* Seção para exibir informações de envio */}
          <div className="grid gap-2">
            <div className="font-medium">Informações de Envio</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {" "}
              {/* Exibe informações do usuário e endereço */}
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView; // Exporta o componente para ser usado em outras partes da aplicação
