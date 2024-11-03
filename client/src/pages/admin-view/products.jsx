import ProductImageUpload from "@/components/admin-view/image-upload"; // Importa o componente para upload de imagens de produtos
import AdminProductTile from "@/components/admin-view/product-tile"; // Importa o componente que exibe cada produto
import CommonForm from "@/components/common/form"; // Importa um componente de formulário reutilizável
import { Button } from "@/components/ui/button"; // Importa o componente de botão
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // Importa componentes para criar um diálogo lateral (sheet)
import { useToast } from "@/hooks/use-toast"; // Importa hook para mostrar notificações
import { addProductFormElements } from "@/config"; // Importa a configuração dos elementos do formulário de produtos
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice"; // Importa as ações do slice para gerenciar produtos
import { Fragment, useEffect, useState } from "react"; // Importa hooks do React
import { useDispatch, useSelector } from "react-redux"; // Importa hooks para gerenciar estado com Redux

// Define os valores iniciais do formulário
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  // Hooks de estado
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false); // Estado para controlar a visibilidade do diálogo
  const [formData, setFormData] = useState(initialFormData); // Estado para armazenar os dados do formulário
  const [imageFile, setImageFile] = useState(null); // Estado para armazenar o arquivo de imagem
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // URL da imagem carregada
  const [imageLoadingState, setImageLoadingState] = useState(false); // Estado para controle de carregamento de imagem
  const [currentEditedId, setCurrentEditedId] = useState(null); // ID do produto atualmente sendo editado

  const { productList } = useSelector((state) => state.adminProducts); // Obtém a lista de produtos do estado do Redux
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const { toast } = useToast(); // Obtém a função de toast para notificações

  function onSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Se um produto está sendo editado, chama a ação de editar
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          // Se a edição for bem-sucedida, atualiza a lista de produtos e reseta o formulário
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          // Se a adição for bem-sucedida, atualiza a lista de produtos e mostra uma notificação
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Produto adicionado com sucesso",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    // Chama a ação para deletar um produto
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts()); // Atualiza a lista de produtos após a exclusão
      }
    });
  }

  function isFormValid() {
    // Verifica se todos os campos obrigatórios do formulário estão preenchidos
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    // Busca todos os produtos ao montar o componente
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          {" "}
          {/* Botão para abrir o diálogo de adição de produtos */}
          Adicionar Novo Produto
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map(
              (
                productItem // Mapeia a lista de produtos e renderiza um componente para cada um
              ) => (
                <AdminProductTile
                  setFormData={setFormData} // Passa a função para atualizar os dados do formulário
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog} // Passa a função para abrir o diálogo
                  setCurrentEditedId={setCurrentEditedId} // Passa a função para definir o ID do produto editado
                  product={productItem} // Passa o produto atual
                  handleDelete={handleDelete} // Passa a função de exclusão
                />
              )
            )
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog} // Controla a abertura do diálogo
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null); // Reseta o ID do produto editado
          setFormData(initialFormData); // Reseta os dados do formulário
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null
                ? "Editar Produto"
                : "Adicionar Novo Produto"}{" "}
              {/* Título do diálogo */}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile} // Passa o arquivo de imagem
            setImageFile={setImageFile} // Passa a função para definir o arquivo de imagem
            uploadedImageUrl={uploadedImageUrl} // Passa a URL da imagem carregada
            setUploadedImageUrl={setUploadedImageUrl} // Passa a função para definir a URL da imagem
            setImageLoadingState={setImageLoadingState} // Passa a função para definir o estado de carregamento da imagem
            imageLoadingState={imageLoadingState} // Passa o estado de carregamento da imagem
            isEditMode={currentEditedId !== null} // Define se está no modo de edição
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit} // Passa a função de envio do formulário
              formData={formData} // Passa os dados do formulário
              setFormData={setFormData} // Passa a função para atualizar os dados do formulário
              buttonText={currentEditedId !== null ? "Editar" : "Adicionar"} // Define o texto do botão com base no modo de edição
              formControls={addProductFormElements} // Passa os controles do formulário
              isBtnDisabled={!isFormValid()} // Desabilita o botão se o formulário não for válido
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts; // Exporta o componente como padrão
