import { Button } from "@/components/ui/button"; // Importa o botão estilizado
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Importa componentes de cartão
import { useNavigate } from "react-router-dom"; // Importa hook para navegação

function PaymentSuccessPage() {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  return (
    <Card className="p-10"> {/* Cartão com preenchimento de 10 */}
      <CardHeader className="p-0"> {/* Cabeçalho do cartão sem preenchimento */}
        <CardTitle className="text-4xl">
        O pagamento foi realizado com sucesso!</CardTitle> {/* Título do cartão */}
      </CardHeader>
      <Button className="mt-5" onClick={() => navigate("/shop/account")}> {/* Botão para navegar para a página de pedidos */}
        Detalhes do Pedido
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage; // Exporta o componente
