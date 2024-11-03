import { Button } from "@/components/ui/button"; // Importa o botão estilizado
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Shirt,
  NotebookText,
  PackageSearch,
  PencilRuler,
  Sparkles,
} from "lucide-react"; // Importa ícones do Lucide
import { Card, CardContent } from "@/components/ui/card"; // Importa componentes de cartão
import { useEffect, useState } from "react"; // Importa hooks do React
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice"; // Importa ações do slice de produtos
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Importa o componente de tile de produto
import { useNavigate } from "react-router-dom"; // Importa hook de navegação
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importa ações do slice de carrinho
import { useToast } from "@/hooks/use-toast"; // Importa hook para mostrar mensagens ao usuário
import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Importa o componente de detalhes do produto
import { getFeatureImages } from "@/store/common-slice"; // Importa ação para obter imagens em destaque

// Define categorias com ícones
const categoriesWithIcon = [
  { id: "papelaria", label: "Papelaria", icon: NotebookText },
  { id: "aviamento", label: "Aviamento", icon: Shirt },
  { id: "outros", label: "Outros", icon: PackageSearch },
];

// Define marcas com ícones
const brandsWithIcon = [
  { id: "fabercastell", label: "Faber-Castell", icon: PencilRuler },
  { id: "tilibra", label: "Tilibra ", icon: PencilRuler },
  { id: "pilot", label: "Pilot", icon: PencilRuler },
  { id: "circulo", label: "Círculo", icon: Sparkles },
  { id: "saojose", label: "São José", icon: Sparkles },
  { id: "pecci", label: "Pecci", icon: Sparkles },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para o slide atual
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts // Obtém a lista de produtos e detalhes do estado Redux
  );
  const { featureImageList } = useSelector((state) => state.commonFeature); // Obtém a lista de imagens em destaque do estado Redux

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Estado para controlar o diálogo de detalhes do produto

  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário do estado Redux

  const dispatch = useDispatch(); // Inicializa o hook de dispatch do Redux
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const { toast } = useToast(); // Inicializa o hook de toast para exibir mensagens

  // Navega para a página de listagem com o filtro atual
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters"); // Remove filtros anteriores
    const currentFilter = {
      [section]: [getCurrentItem.id], // Define o novo filtro
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter)); // Armazena o novo filtro na sessão
    navigate(`/shop/listing`); // Navega para a página de listagem
  }

  // Busca os detalhes do produto
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId)); // Despacha a ação para buscar detalhes do produto
  }

  // Adiciona um produto ao carrinho
  function handleAddtoCart(getCurrentProductId) {
    // Verifica se o usuário está logado
    if (!user) {
      toast({
        title: "Você precisa estar logado para adicionar produtos ao carrinho.", // Mensagem de erro
        variant: "destructive",
      });
      return; // Retorna sem fazer nada se o usuário não estiver logado
    }

    // Se o usuário estiver logado, prossegue com a adição ao carrinho
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id)); // Atualiza os itens do carrinho
        toast({
          title: "Produto adicionado ao carrinho", // Mensagem de sucesso
        });
      }
    });
  }

  // Efeito para abrir o diálogo de detalhes do produto
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Efeito para o slide automático das imagens em destaque
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 10000); // Muda o slide a cada 10 segundos

    return () => clearInterval(timer); // Limpa o timer ao desmontar o componente
  }, [featureImageList]);

  // Efeito para buscar todos os produtos filtrados ao montar o componente
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh", // Ordena produtos por preço, do mais baixo para o mais alto
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages()); // Busca as imagens em destaque ao montar o componente
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Carrossel de imagens em destaque */}
      <div className="relative w-full h-[350px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        {/* Botão para o slide anterior */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        {/* Botão para o próximo slide */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* Seção para categorias */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categoryItem.id} // Adiciona uma chave única para cada cartão
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção para marcas */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Marcas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={brandItem.id} // Adiciona uma chave única para cada cartão
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção para produtos em destaque */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Produtos em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id} // Adiciona uma chave única para cada produto
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog} // Controla a abertura do diálogo
        setOpen={setOpenDetailsDialog} // Função para fechar o diálogo
        productDetails={productDetails} // Detalhes do produto a serem exibidos
      />
    </div>
  );
}

export default ShoppingHome;
