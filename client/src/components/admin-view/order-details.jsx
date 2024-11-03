// Importa hooks e componentes necessários
import { useState } from "react"; // Hook useState para gerenciar o estado local
import CommonForm from "../common/form"; // Componente de formulário reutilizável
import { DialogContent } from "../ui/dialog"; // Componente de conteúdo de diálogo
import { Label } from "../ui/label"; // Componente de rótulo
import { Separator } from "../ui/separator"; // Componente de separador visual
import { Badge } from "../ui/badge"; // Componente para exibir um badge
import { useDispatch, useSelector } from "react-redux"; // Hooks do Redux para despachar ações e acessar o estado
import {
  getAllOrdersForAdmin, // Ação para obter todas as ordens
  getOrderDetailsForAdmin, // Ação para obter os detalhes de uma ordem específica
  updateOrderStatus, // Ação para atualizar o status de uma ordem
} from "@/store/admin/order-slice"; // Importa as ações do slice de ordens
import { useToast } from "@/hooks/use-toast"; // Hook para exibir notificações

// Estado inicial do formulário para atualizar o status da ordem
const initialFormData = {
  status: "",
};

// Componente para exibir os detalhes de uma ordem
function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData); // Estado do formulário
  const { user } = useSelector((state) => state.auth); // Obtém as informações do usuário autenticado
  const dispatch = useDispatch(); // Hook para despachar ações
  const { toast } = useToast(); // Hook para exibir notificações

  // Função para atualizar o status da ordem
  function handleUpdateStatus(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    const { status } = formData; // Obtém o status atualizado do formulário

    // Despacha a ação para atualizar o status da ordem
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        // Se a atualização for bem-sucedida
        dispatch(getOrderDetailsForAdmin(orderDetails?._id)); // Atualiza os detalhes da ordem
        dispatch(getAllOrdersForAdmin()); // Atualiza a lista de todas as ordens
        setFormData(initialFormData); // Reseta o formulário
        toast({
          title: data?.payload?.message, // Exibe uma notificação com a mensagem de sucesso
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      {/* Container principal do conteúdo do diálogo */}
      <div className="grid gap-6">
        {/* Informações da ordem */}
        <div className="grid gap-2">
          {/* ID da ordem */}
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ID do Pedido</p>
            <Label>{orderDetails?._id}</Label> {/* Exibe o ID da ordem */}
          </div>
          {/* Data da ordem */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Data do Pedido</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>{" "}
            {/* Exibe a data da ordem */}
          </div>
          {/* Preço total da ordem */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Preço do Pedido</p>
            <Label>${orderDetails?.totalAmount}</Label>{" "}
            {/* Exibe o valor total da ordem */}
          </div>
          {/* Método de pagamento */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Método de Pagamento</p>
            <Label>{orderDetails?.paymentMethod}</Label>{" "}
            {/* Exibe o método de pagamento */}
          </div>
          {/* Status de pagamento */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Status do Pagamento</p>
            <Label>{orderDetails?.paymentStatus}</Label>{" "}
            {/* Exibe o status de pagamento */}
          </div>
          {/* Status da ordem */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Status do Pedido</p>
            <Label>
              {/* Exibe o status da ordem com estilos visuais diferentes dependendo do status */}
              <Badge
                className={`py-1 px-3 ${
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
        <Separator /> {/* Separador visual */}
        {/* Detalhes da ordem */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Detalhes do Pedido</div>
            <ul className="grid gap-3">
              {/* Lista os itens do carrinho associados à ordem */}
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Título: {item.title}</span>{" "}
                      {/* Título do produto */}
                      <span>Quantidade: {item.quantity}</span>{" "}
                      {/* Quantidade */}
                      <span>Preço: R${item.price}</span> {/* Preço */}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        {/* Informações de envio */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Informações de Envio</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {/* Exibe as informações de envio associadas à ordem */}
              <span>{user.userName}</span> {/* Nome do usuário */}
              <span>{orderDetails?.addressInfo?.address}</span> {/* Endereço */}
              <span>{orderDetails?.addressInfo?.city}</span> {/* Cidade */}
              <span>{orderDetails?.addressInfo?.pincode}</span> {/* CEP */}
              <span>{orderDetails?.addressInfo?.phone}</span> {/* Telefone */}
              <span>{orderDetails?.addressInfo?.notes}</span>{" "}
              {/* Notas adicionais */}
            </div>
          </div>
        </div>
        {/* Formulário para atualizar o status da ordem */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Status do Pedido", // Rótulo do campo
                name: "status", // Nome do campo
                componentType: "select", // Tipo do componente (select)
                options: [
                  { id: "pending", label: "Pendente" }, // Opção "Pending"
                  { id: "inProcess", label: "Em processo" }, // Opção "In Process"
                  { id: "inShipping", label: "Enviado" }, // Opção "In Shipping"
                  { id: "delivered", label: "Entregue" }, // Opção "Delivered"
                  { id: "rejected", label: "Rejeitado" }, // Opção "Rejected"
                ],
              },
            ]}
            formData={formData} // Estado do formulário
            setFormData={setFormData} // Função para atualizar o estado do formulário
            buttonText={"Atualizar Status do Pedido"} // Texto do botão
            onSubmit={handleUpdateStatus} // Função chamada ao enviar o formulário
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView; // Exporta o componente AdminOrderDetailsView como padrão
