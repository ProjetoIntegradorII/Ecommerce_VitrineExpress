// Importa ícones, componentes e bibliotecas necessários
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"; // Ícones para diferentes estados do upload
import { Input } from "../ui/input"; // Componente de entrada personalizado
import { Label } from "../ui/label"; // Componente de rótulo
import { useEffect, useRef } from "react"; // Hooks do React
import { Button } from "../ui/button"; // Componente de botão
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import { Skeleton } from "../ui/skeleton"; // Componente de esqueleto para mostrar carregamento

// Componente de upload de imagem para produto
function ProductImageUpload({
  imageFile, // Arquivo de imagem selecionado
  setImageFile, // Função para definir o arquivo de imagem
  imageLoadingState, // Estado de carregamento da imagem
  uploadedImageUrl, // URL da imagem após o upload
  setUploadedImageUrl, // Função para definir a URL da imagem
  setImageLoadingState, // Função para definir o estado de carregamento
  isEditMode, // Estado que define se está no modo de edição
  isCustomStyling = false, // Define se estilos personalizados estão habilitados
}) {
  const inputRef = useRef(null); // Referência para o campo de input de arquivo

  // Função chamada quando um arquivo é selecionado
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0]; // Obtém o primeiro arquivo selecionado
    if (selectedFile) setImageFile(selectedFile); // Define o arquivo de imagem selecionado
  }

  // Função para prevenir o comportamento padrão ao arrastar arquivos
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Função para lidar com o drop de arquivos
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0]; // Obtém o primeiro arquivo arrastado
    if (droppedFile) setImageFile(droppedFile); // Define o arquivo de imagem
  }

  // Função para remover o arquivo de imagem selecionado
  function handleRemoveImage() {
    setImageFile(null); // Remove o arquivo de imagem
    if (inputRef.current) {
      inputRef.current.value = ""; // Reseta o input de arquivo
    }
  }

  // Função para fazer o upload da imagem para o Cloudinary
  async function uploadImageToCloudinary() {
    setImageLoadingState(true); // Define o estado de carregamento como verdadeiro
    const data = new FormData(); // Cria um novo FormData
    data.append("my_file", imageFile); // Adiciona o arquivo de imagem ao FormData
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image", // URL de upload da imagem
      data
    );

    // Se o upload for bem-sucedido, define a URL da imagem
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false); // Finaliza o estado de carregamento
    }
  }

  // Efeito que dispara o upload da imagem sempre que um novo arquivo é selecionado
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      {/* Container principal do upload com largura completa ou personalizada */}
      <Label className="text-lg font-semibold mb-2 block">
        Carregar imagem
      </Label>
      {/* Rótulo do input de upload de imagem */}

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        {/* Área de drag-and-drop para o upload de imagens, desativada se estiver no modo de edição */}

        <Input
          id="image-upload"
          type="file"
          className="hidden" // Input de arquivo escondido
          ref={inputRef} // Referência do input de arquivo
          onChange={handleImageFileChange} // Define o arquivo de imagem ao alterar
          disabled={isEditMode} // Desativa o input se estiver no modo de edição
        />

        {!imageFile ? (
          // Se nenhum arquivo for selecionado, exibe a área de drag-and-drop
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Arraste e solte ou clique para fazer upload da imagem</span>
          </Label>
        ) : imageLoadingState ? (
          // Se a imagem estiver carregando, exibe o esqueleto de carregamento
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          // Exibe o arquivo de imagem selecionado e a opção de removê-lo
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>{" "}
            {/* Nome do arquivo */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage} // Remove o arquivo ao clicar
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remover arquivo</span>{" "}
              {/* Texto acessível */}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Exporta o componente ProductImageUpload como padrão
export default ProductImageUpload;
