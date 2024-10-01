import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Importa componentes de abas para navegação
import accImg from "../../assets/account.jpg"; // Importa a imagem de cabeçalho
import Address from "@/components/shopping-view/address"; // Importa o componente que exibe o endereço do usuário
import ShoppingOrders from "@/components/shopping-view/orders"; // Importa o componente que exibe os pedidos do usuário

// Componente principal para a conta de compras do usuário
function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* Cabeçalho com imagem de fundo */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center" // Estiliza a imagem para cobrir todo o espaço disponível
        />
      </div>
      {/* Container para o conteúdo da conta do usuário */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          {/* Componente de abas com valor padrão definido para "orders" */}
          <Tabs defaultValue="orders">
            {/* Lista de abas para navegação */}
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger> {/* Aba de pedidos */}
              <TabsTrigger value="address">Address</TabsTrigger> {/* Aba de endereço */}
            </TabsList>
            {/* Conteúdo da aba de pedidos */}
            <TabsContent value="orders">
              <ShoppingOrders /> {/* Renderiza o componente de pedidos */}
            </TabsContent>
            {/* Conteúdo da aba de endereço */}
            <TabsContent value="address">
              <Address /> {/* Renderiza o componente de endereço */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Exporta o componente para ser utilizado em outras partes da aplicação
export default ShoppingAccount;
