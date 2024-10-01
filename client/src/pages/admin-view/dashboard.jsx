import ProductImageUpload from "@/components/admin-view/image-upload"; // Importa o componente para upload de imagem
import { Button } from "@/components/ui/button"; // Importa o botão
import { addFeatureImage, getFeatureImages } from "@/store/common-slice"; // Importa ações do slice do Redux
import { useEffect, useState } from "react"; // Importa hooks do React
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null); // Estado para armazenar o arquivo da imagem
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // Estado para armazenar a URL da imagem carregada
  const [imageLoadingState, setImageLoadingState] = useState(false); // Estado para gerenciar o carregamento da imagem
  const dispatch = useDispatch(); // Hook para obter a função dispatch do Redux
  const { featureImageList } = useSelector((state) => state.commonFeature); // Seleciona a lista de imagens de destaque do estado do Redux

  console.log(uploadedImageUrl, "uploadedImageUrl"); // Debug: mostra a URL da imagem carregada

  // Função para fazer o upload da imagem de destaque
  function handleUploadFeatureImage() {
    // Dispara a ação para adicionar a imagem de destaque
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      // Verifica se a ação foi bem-sucedida
      if (data?.payload?.success) {
        dispatch(getFeatureImages()); // Atualiza a lista de imagens de destaque
        setImageFile(null); // Reseta o arquivo da imagem
        setUploadedImageUrl(""); // Reseta a URL da imagem carregada
      }
    });
  }

  // Efeito colateral para buscar as imagens de destaque quando o componente é montado
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList"); // Debug: mostra a lista de imagens de destaque

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile} // Passa o estado do arquivo da imagem
        setImageFile={setImageFile} // Passa a função para atualizar o estado do arquivo da imagem
        uploadedImageUrl={uploadedImageUrl} // Passa a URL da imagem carregada
        setUploadedImageUrl={setUploadedImageUrl} // Passa a função para atualizar a URL da imagem carregada
        setImageLoadingState={setImageLoadingState} // Passa a função para atualizar o estado de carregamento
        imageLoadingState={imageLoadingState} // Passa o estado de carregamento da imagem
        isCustomStyling={true} // Flag para estilização personalizada
        // isEditMode={currentEditedId !== null} // Comentado: pode ser usado para modo de edição
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload // Botão para fazer o upload da imagem
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 // Verifica se há imagens de destaque
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem.id}> {/* Adiciona uma chave única */}
                <img
                  src={featureImgItem.image} // URL da imagem
                  className="w-full h-[300px] object-cover rounded-t-lg" // Estilização da imagem
                />
              </div>
            ))
          : null} {/* Se não houver imagens, não renderiza nada */}
      </div>
    </div>
  );
}

export default AdminDashboard; // Exporta o componente
