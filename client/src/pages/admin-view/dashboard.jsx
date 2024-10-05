import ProductImageUpload from "@/components/admin-view/image-upload"; // Importa o componente para upload de imagem
import { Button } from "@/components/ui/button"; // Importa o botão
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice"; // Importa a ação de deletar imagens
import { useEffect, useState } from "react"; // Importa hooks do React
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null); // Estado para armazenar o arquivo da imagem
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // Estado para armazenar a URL da imagem carregada
  const [imageLoadingState, setImageLoadingState] = useState(false); // Estado para gerenciar o carregamento da imagem
  const dispatch = useDispatch(); // Hook para obter a função dispatch do Redux
  const { featureImageList } = useSelector((state) => state.commonFeature); // Seleciona a lista de imagens de destaque do estado do Redux

  // Função para fazer o upload da imagem de destaque
  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages()); // Atualiza a lista de imagens de destaque
        setImageFile(null); // Reseta o arquivo da imagem
        setUploadedImageUrl(""); // Reseta a URL da imagem carregada
      }
    });
  }

  // Função para deletar uma imagem de destaque
  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then((data) => {
      console.log("Resposta da deleção:", data); // Adicione este log
      if (data?.payload?.success) {
        dispatch(getFeatureImages()); // Atualiza a lista de imagens após a deleção
      }
    });
  }

  // Efeito colateral para buscar as imagens de destaque quando o componente é montado
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

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
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload {/* Botão para fazer o upload da imagem */}
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {console.log("Lista de imagens de destaque:", featureImageList)}{" "}
        {/* Adicione este log */}
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem.id}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button
                  onClick={() => {
                    handleDeleteFeatureImage(featureImgItem._id);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white"
                >
                  Deletar
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
