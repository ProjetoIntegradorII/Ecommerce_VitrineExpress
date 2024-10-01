import AdminOrdersView from "@/components/admin-view/orders"; // Importa o componente AdminOrdersView que é responsável por mostrar a lista de pedidos.

function AdminOrders() {
  return (
    <div>
      <AdminOrdersView /> {/* Renderiza o componente AdminOrdersView dentro de uma div */}
    </div>
  );
}

export default AdminOrders; // Exporta o componente AdminOrders como padrão
