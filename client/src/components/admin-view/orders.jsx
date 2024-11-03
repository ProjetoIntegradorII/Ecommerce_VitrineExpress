import { useEffect, useState } from "react"; // Importa hooks do React para lidar com estado e ciclo de vida do componente
import { Button } from "../ui/button"; // Importa o componente de botão personalizado
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Importa componentes de cartão (Card) para layout e estruturação da UI
import { Dialog } from "../ui/dialog"; // Importa o componente de diálogo (modal)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Importa componentes de tabela para exibir dados em formato tabular
import AdminOrderDetailsView from "@/components/admin-view/order-details"; // Importa o componente que exibe os detalhes de uma ordem
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux para despachar ações e acessar o estado global
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice"; // Importa ações relacionadas a pedidos da store do Redux
import { Badge } from "../ui/badge"; // Importa o componente de badge (etiqueta) para exibir status visualmente

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Estado local que controla a abertura do modal de detalhes
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder); // Usa o hook useSelector para obter a lista de pedidos e detalhes de uma ordem específica do estado global
  const dispatch = useDispatch(); // Usa o hook useDispatch para despachar ações para o Redux

  // Função para buscar os detalhes de uma ordem específica pelo ID
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  // useEffect para buscar todas as ordens assim que o componente é montado
  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  // useEffect para abrir o modal quando os detalhes de uma ordem são obtidos
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      {" "}
      {/* Estrutura principal em um cartão */}
      <CardHeader>
        {" "}
        {/* Cabeçalho do cartão */}
        <CardTitle>Todos os Pedidos</CardTitle> {/* Título do cartão */}
      </CardHeader>
      <CardContent>
        {" "}
        {/* Conteúdo do cartão */}
        <Table>
          {" "}
          {/* Tabela para exibir a lista de pedidos */}
          <TableHeader>
            {" "}
            {/* Cabeçalho da tabela */}
            <TableRow>
              {" "}
              {/* Linha do cabeçalho */}
              <TableHead>ID do Pedido</TableHead>{" "}
              {/* Cabeçalho para o ID da ordem */}
              <TableHead>Data do Pedido</TableHead>{" "}
              {/* Cabeçalho para a data da ordem */}
              <TableHead>Status do Pedido</TableHead>{" "}
              {/* Cabeçalho para o status da ordem */}
              <TableHead>Preço do Pedido</TableHead>{" "}
              {/* Cabeçalho para o preço total */}
              <TableHead>
                <span className="sr-only">Detalhes</span>{" "}
                {/* Cabeçalho oculto para acessibilidade, referente ao botão de detalhes */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {" "}
            {/* Corpo da tabela, onde os dados das ordens são renderizados */}
            {orderList && orderList.length > 0 // Verifica se a lista de pedidos existe e tem itens
              ? orderList.map(
                  (
                    orderItem // Mapeia os pedidos para renderizá-los na tabela
                  ) => (
                    <TableRow>
                      {" "}
                      {/* Linha de dados para cada pedido */}
                      <TableCell>{orderItem?._id}</TableCell>{" "}
                      {/* Célula contendo o ID da ordem */}
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>{" "}
                      {/* Célula contendo a data da ordem, formatada */}
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          }`}
                        >
                          {" "}
                          {/* Etiqueta (badge) colorida para exibir o status da ordem */}
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>R${orderItem?.totalAmount}</TableCell>{" "}
                      {/* Célula contendo o preço total da ordem */}
                      <TableCell>
                        {" "}
                        {/* Célula contendo o botão de visualizar detalhes */}
                        <Dialog
                          open={openDetailsDialog} // Controla a abertura do modal
                          onOpenChange={() => {
                            setOpenDetailsDialog(false); // Fecha o modal quando o estado mudar
                            dispatch(resetOrderDetails()); // Reseta os detalhes da ordem quando o modal for fechado
                          }}
                        >
                          <Button
                            onClick={
                              () => handleFetchOrderDetails(orderItem?._id) // Busca os detalhes da ordem quando o botão for clicado
                            }
                          >
                            Ver Detalhes
                          </Button>
                          <AdminOrderDetailsView orderDetails={orderDetails} />{" "}
                          {/* Componente que exibe os detalhes da ordem */}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                )
              : null}{" "}
            {/* Exibe null se não houver pedidos */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView; // Exporta o componente AdminOrdersView como o padrão
