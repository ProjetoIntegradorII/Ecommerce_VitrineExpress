import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Importa componentes de UI
import { useEffect } from "react"; // Importa o hook useEffect
import { useLocation } from "react-router-dom"; // Importa o hook useLocation

function PaypalReturnPage() {
  const location = useLocation(); // Captura a localização atual
  const params = new URLSearchParams(location.search); // Cria um objeto URLSearchParams para analisar a string de consulta
  const paymentId = params.get("paymentId"); // Obtém o paymentId dos parâmetros da URL
  const payerId = params.get("PayerID"); // Obtém o payerId dos parâmetros da URL

  useEffect(() => {
    // Efeito para capturar o pagamento quando paymentId e payerId estão presentes
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId")); // Obtém o ID do pedido do sessionStorage

      // Realiza uma requisição GET para capturar o pagamento usando a rota `/shop/paypal-return`
      fetch(`/shop/paypal-return?paymentId=${paymentId}&PayerID=${payerId}&orderId=${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            sessionStorage.removeItem("currentOrderId"); // Remove o ID do pedido do sessionStorage
            window.location.href = "/shop/payment-success"; // Redireciona para a página de sucesso
          }
        })
        .catch((error) => {
          console.error("Erro ao capturar o pagamento:", error);
        });
    }
  }, [paymentId, payerId]); // Dependências do efeito

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processando pagamento... Aguarde!</CardTitle>{" "}
        {/* Mensagem de processamento */}
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage; // Exporta o componente
