import { Avatar, AvatarFallback } from "../ui/avatar"; // Importa componentes de avatar
import { Button } from "../ui/button"; // Importa o componente Button para ações do usuário
import { Dialog, DialogContent } from "../ui/dialog"; // Importa componentes de diálogo para exibir informações em um modal
import { Separator } from "../ui/separator"; // Importa o componente Separator para dividir seções
import { Input } from "../ui/input"; // Importa o componente Input para capturar a mensagem da revisão
import { useDispatch, useSelector } from "react-redux"; // Importa hooks Redux para gerenciar o estado
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importa ações do Redux para gerenciar o carrinho
import { useToast } from "@/hooks/use-toast"; // Importa hook de toast para feedback ao usuário
import { setProductDetails } from "@/store/shop/products-slice"; // Importa ação para redefinir detalhes do produto
import { Label } from "../ui/label"; // Importa o componente Label para rótulos
import StarRatingComponent from "../common/star-rating"; // Importa componente de classificação por estrelas
import { useEffect, useState } from "react"; // Importa hooks para gerenciar estado e efeitos colaterais
import { addReview, getReviews } from "@/store/shop/review-slice"; // Importa ações do Redux para gerenciar avaliações

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState(""); // Estado para armazenar a mensagem da revisão
  const [rating, setRating] = useState(0); // Estado para armazenar a classificação da revisão
  const dispatch = useDispatch(); // Hook para despachar ações Redux
  const { user } = useSelector((state) => state.auth); // Obtém o usuário autenticado do estado
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém os itens do carrinho do estado
  const { reviews } = useSelector((state) => state.shopReview); // Obtém as avaliações do estado

  const { toast } = useToast(); // Hook para exibir notificações

  // Função para lidar com mudanças na classificação
  function handleRatingChange(getRating) {
    setRating(getRating); // Atualiza a classificação
  }

  // Função para adicionar um produto ao carrinho
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // Verifica se o usuário está logado
    if (!user) {
      toast({
        title: "Por favor, faça login para adicionar itens ao carrinho", // Mensagem solicitando login
        variant: "destructive",
      });
      return; // Retorna se o usuário não estiver logado
    }

    let getCartItems = cartItems.items || []; // Obtém os itens do carrinho ou um array vazio

    // Verifica se o produto já está no carrinho e se a quantidade não excede o estoque
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Apenas ${getQuantity} pode ser adicionadas ao carrinho`, // Exibe um toast se o estoque for insuficiente
            variant: "destructive",
          });
          return;
        }
      }
    }

    // Adiciona o produto ao carrinho
    dispatch(
      addToCart({
        userId: user.id, // Agora garantido que user não é null
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id)); // Atualiza os itens do carrinho
        toast({
          title: "O produto foi adicionado ao carrinho", // Exibe um toast de confirmação
        });
      }
    });
  }

  // Função para fechar o diálogo
  function handleDialogClose() {
    setOpen(false); // Fecha o diálogo
    dispatch(setProductDetails()); // Redefine os detalhes do produto
    setRating(0); // Reseta a classificação
    setReviewMsg(""); // Reseta a mensagem da revisão
  }

  // Função para adicionar uma revisão
  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0); // Reseta a classificação
        setReviewMsg(""); // Reseta a mensagem da revisão
        dispatch(getReviews(productDetails?._id)); // Obtém as revisões atualizadas
        toast({
          title: "Comentário adicionado com sucesso!", // Exibe um toast de confirmação
        });
      }
    });
  }

  // Efeito colateral para obter as revisões do produto ao carregar os detalhes do produto
  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  // Calcula a média das avaliações
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>{" "}
            {/* Título do produto */}
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description} {/* Descrição do produto */}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              R${productDetails?.price} {/* Preço original */}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                R${productDetails?.salePrice} {/* Preço em promoção */}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />{" "}
              {/* Componente para exibir classificação média */}
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)}) {/* Exibe a média das avaliações */}
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Fora de estoque{" "}
                {/* Botão desativado se o produto estiver fora de estoque */}
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock // Adiciona ao carrinho se em estoque
                  )
                }
              >
                Adicionar ao Carrinho
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Comentários</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4" key={reviewItem._id}>
                    <Avatar className="w-10 h-10 border">
                      {" "}
                      {/* Exibe o avatar do revisor */}
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}{" "}
                        {/* Inicial do nome do revisor */}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>{" "}
                        {/* Nome do revisor */}
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />{" "}
                        {/* Exibe a classificação dada na revisão */}
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage} {/* Mensagem da revisão */}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>Sem Comentários</h1> // Mensagem caso não haja avaliações
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Avalie o produto</Label>{" "}
              {/* Rótulo para a seção de nova avaliação */}
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange} // Componente de classificação para nova avaliação
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)} // Atualiza a mensagem da revisão
                placeholder="Escreva um comentário..." // Placeholder do input
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""} // Desativa o botão se a mensagem estiver vazia
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog; // Exporta o componente
