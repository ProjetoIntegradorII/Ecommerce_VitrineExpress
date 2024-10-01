import { Button } from "../ui/button"; // Importa o componente de botão personalizado
import { Card, CardContent, CardFooter } from "../ui/card"; // Importa componentes de cartão personalizados
import { Label } from "../ui/label"; // Importa o componente de rótulo

// Define o componente AddressCard que exibe informações de endereço
function AddressCard({
  addressInfo, // Informações do endereço
  handleDeleteAddress, // Função para excluir o endereço
  handleEditAddress, // Função para editar o endereço
  setCurrentSelectedAddress, // Função para definir o endereço atualmente selecionado
  selectedId, // ID do endereço selecionado
}) {
  return (
    <Card
      onClick={ // Define o que acontece ao clicar no cartão
        setCurrentSelectedAddress // Se a função estiver definida
          ? () => setCurrentSelectedAddress(addressInfo) // Atualiza o endereço selecionado
          : null // Não faz nada se não houver função
      }
      className={`cursor-pointer border-red-700 ${ // Estilos do cartão
        selectedId?._id === addressInfo?._id // Verifica se este cartão é o selecionado
          ? "border-red-900 border-[4px]" // Aplica estilo especial se for o selecionado
          : "border-black" // Caso contrário, aplica a borda preta
      }`}
    >
      <CardContent className="grid p-4 gap-4"> {/* Conteúdo do cartão com espaçamento */}
        <Label>Address: {addressInfo?.address}</Label> {/* Rótulo para o endereço */}
        <Label>City: {addressInfo?.city}</Label> {/* Rótulo para a cidade */}
        <Label>pincode: {addressInfo?.pincode}</Label> {/* Rótulo para o código postal */}
        <Label>Phone: {addressInfo?.phone}</Label> {/* Rótulo para o telefone */}
        <Label>Notes: {addressInfo?.notes}</Label> {/* Rótulo para notas adicionais */}
      </CardContent>
      <CardFooter className="p-3 flex justify-between"> {/* Rodapé do cartão com botão de ação */}
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button> {/* Botão para editar */}
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button> {/* Botão para excluir */}
      </CardFooter>
    </Card>
  );
}

// Exporta o componente AddressCard como padrão
export default AddressCard;
