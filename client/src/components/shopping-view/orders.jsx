import { useEffect, useState } from "react"; // Importa hooks React
import { Button } from "../ui/button"; // Importa o componente Button para ações do usuário
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Importa componentes de card para organização visual
import { Dialog } from "../ui/dialog"; // Importa o componente Dialog para exibir detalhes em um modal
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Importa componentes de tabela para exibir a lista de pedidos
import ShoppingOrderDetailsView from "./order-details"; // Importa o componente que exibe detalhes do pedido
import { useDispatch, useSelector } from "react-redux"; // Importa hooks Redux para gerenciar o estado
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice"; // Importa ações do Redux para obter pedidos
import { Badge } from "../ui/badge"; // Importa o componente Badge para exibir status

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Estado para controlar o diálogo de detalhes do pedido
  const dispatch = useDispatch(); // Hook para despachar ações Redux
  const { user } = useSelector((state) => state.auth); // Obtém o usuário autenticado do estado
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder); // Obtém a lista de pedidos e detalhes do estado

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId)); // Dispara ação para obter detalhes do pedido
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id)); // Obtém todos os pedidos do usuário quando o componente é montado
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true); // Abre o diálogo se os detalhes do pedido forem carregados
  }, [orderDetails]);

  return (
    <Card>
      {" "}
      {/* Componente de card que envolve a tabela de pedidos */}
      <CardHeader>
        <CardTitle>Histórico de Pedidos</CardTitle>{" "}
        {/* Título do histórico de pedidos */}
      </CardHeader>
      <CardContent>
        <Table>
          {" "}
          {/* Componente de tabela para exibir a lista de pedidos */}
          <TableHeader>
            <TableRow>
              <TableHead>ID do Pedido</TableHead>{" "}
              {/* Cabeçalho da tabela para ID do pedido */}
              <TableHead>Data do Pedido</TableHead>{" "}
              {/* Cabeçalho da tabela para data do pedido */}
              <TableHead>Status do Pedido</TableHead>{" "}
              {/* Cabeçalho da tabela para status do pedido */}
              <TableHead>Preço do Pedido</TableHead>{" "}
              {/* Cabeçalho da tabela para preço do pedido */}
              <TableHead>
                <span className="sr-only">Detalhes</span>{" "}
                {/* Acessibilidade: título para detalhes */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map(
                  (
                    orderItem // Mapeia cada item da lista de pedidos
                  ) => (
                    <TableRow key={orderItem._id}>
                      {" "}
                      {/* Cada linha da tabela para um pedido */}
                      <TableCell>{orderItem?._id}</TableCell>{" "}
                      {/* Exibe ID do pedido */}
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>{" "}
                      {/* Exibe data do pedido */}
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
                          {orderItem?.orderStatus}{" "}
                          {/* Exibe status do pedido com um badge */}
                        </Badge>
                      </TableCell>
                      <TableCell>R${orderItem?.totalAmount}</TableCell>{" "}
                      {/* Exibe preço total do pedido */}
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false); // Fecha o diálogo ao mudar o estado
                            dispatch(resetOrderDetails()); // Reseta detalhes do pedido ao fechar o diálogo
                          }}
                        >
                          <Button
                            onClick={
                              () => handleFetchOrderDetails(orderItem?._id) // Obtém detalhes do pedido ao clicar no botão
                            }
                          >
                            Ver Detalhes
                          </Button>
                          <ShoppingOrderDetailsView
                            orderDetails={orderDetails}
                          />{" "}
                          {/* Componente para exibir detalhes do pedido */}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                )
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders; // Exporta o componente para ser usado em outras partes da aplicação
