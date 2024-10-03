import { useEffect, useState } from "react"; // Importa hooks para gerenciamento de estado e efeitos colaterais
import CommonForm from "../common/form"; // Importa o formulário comum
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Importa componentes de cartão
import { addressFormControls } from "@/config"; // Importa as configurações do formulário de endereço
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux para gerenciamento de estado
import {
  addNewAddress, // Ação para adicionar um novo endereço
  deleteAddress, // Ação para excluir um endereço
  editaAddress, // Ação para editar um endereço
  fetchAllAddresses, // Ação para buscar todos os endereços
} from "@/store/shop/adress-slice"; // Importa as ações do slice de endereço
import AddressCard from "./address-card"; // Importa o componente AddressCard
import { useToast } from "@/hooks/use-toast"; // Importa o hook de notificação

// Dados iniciais para o formulário de endereço
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

// Componente principal para gerenciar endereços
function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData); // Estado do formulário
  const [currentEditedId, setCurrentEditedId] = useState(null); // ID do endereço sendo editado
  const dispatch = useDispatch(); // Hook para despachar ações do Redux
  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário autenticado
  const { addressList } = useSelector((state) => state.shopAddress); // Obtém a lista de endereços do Redux
  const { toast } = useToast(); // Hook para mostrar notificações

  // Função para gerenciar a adição ou edição de um endereço
  function handleManageAddress(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Verifica se o usuário já possui 3 endereços
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData); // Reseta o formulário
      toast({
        title: "You can add max 3 addresses", // Mensagem de erro
        variant: "destructive",
      });
      return; // Sai da função
    }

    // Se um endereço está sendo editado
    currentEditedId !== null
      ? dispatch(
          editaAddress({ // Dispara a ação de edição
            userId: user?.id, // ID do usuário
            addressId: currentEditedId, // ID do endereço a ser editado
            formData, // Dados do formulário
          })
        ).then((data) => {
          // Verifica se a edição foi bem-sucedida
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id)); // Atualiza a lista de endereços
            setCurrentEditedId(null); // Reseta o ID do endereço sendo editado
            setFormData(initialAddressFormData); // Reseta o formulário
            toast({
              title: "Address updated successfully", // Mensagem de sucesso
            });
          }
        })
      : dispatch(
          addNewAddress({ // Dispara a ação de adição de novo endereço
            ...formData, // Dados do formulário
            userId: user?.id, // ID do usuário
          })
        ).then((data) => {
          // Verifica se a adição foi bem-sucedida
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id)); // Atualiza a lista de endereços
            setFormData(initialAddressFormData); // Reseta o formulário
            toast({
              title: "Address added successfully", // Mensagem de sucesso
            });
          }
        });
  }

  // Função para gerenciar a exclusão de um endereço
  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ // Dispara a ação de exclusão
        userId: user?.id, // ID do usuário
        addressId: getCurrentAddress._id, // ID do endereço a ser excluído
      })
    ).then((data) => {
      // Verifica se a exclusão foi bem-sucedida
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id)); // Atualiza a lista de endereços
        toast({
          title: "Endereço excluído com sucesso", // Mensagem de sucesso
        });
      }
    });
  }

  // Função para gerenciar a edição de um endereço
  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id); // Define o ID do endereço a ser editado
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  // Função para validar o formulário
  function isFormValid() {
    return Object.keys(formData) // Verifica se todos os campos do formulário estão preenchidos
      .map((key) => formData[key].trim() !== "") // Remove espaços em branco e verifica se não estão vazios
      .every((item) => item); // Retorna verdadeiro se todos os itens forem verdadeiros
  }

  // Efeito colateral para buscar todos os endereços ao montar o componente
  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id)); // Busca todos os endereços
  }, [dispatch]);

  console.log(addressList, "addressList"); // Log da lista de endereços

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Mapeia e renderiza os cartões de endereço se existirem */}
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id} // Chave única para cada cartão
                selectedId={selectedId} // ID do endereço selecionado
                handleDeleteAddress={handleDeleteAddress} // Função de exclusão
                addressInfo={singleAddressItem} // Informações do endereço
                handleEditAddress={handleEditAddress} // Função de edição
                setCurrentSelectedAddress={setCurrentSelectedAddress} // Função para definir o endereço selecionado
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {/* Título do formulário dependendo se está editando ou adicionando */}
          {currentEditedId !== null ? "Editar endereço" : "Adicionar novo endereço"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls} // Controles do formulário
          formData={formData} // Dados do formulário
          setFormData={setFormData} // Função para atualizar os dados do formulário
          buttonText={currentEditedId !== null ? "Editar" : "Adicionar"} // Texto do botão dependendo da ação
          onSubmit={handleManageAddress} // Função a ser chamada ao enviar o formulário
          isBtnDisabled={!isFormValid()} // Desabilita o botão se o formulário não for válido
        />
      </CardContent>
    </Card>
  );
}

export default Address; // Exporta o componente Address como padrão
