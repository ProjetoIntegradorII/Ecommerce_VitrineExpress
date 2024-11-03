import { Card, CardContent, CardFooter } from "../ui/card"; // Importa componentes de cartão
import { Button } from "../ui/button"; // Importa o componente Button para ações do usuário
import { brandOptionsMap, categoryOptionsMap } from "@/config"; // Importa mapas para categorias e marcas de produtos
import { Badge } from "../ui/badge"; // Importa o componente Badge para exibir etiquetas

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      {" "}
      {/* Cartão para exibir as informações do produto */}
      <div onClick={() => handleGetProductDetails(product?._id)}>
        {" "}
        {/* Ao clicar, chama a função para obter detalhes do produto */}
        <div className="relative">
          <img
            src={product?.image} // Imagem do produto
            alt={product?.title} // Texto alternativo da imagem
            className="w-full h-[300px] object-cover rounded-t-lg" // Estilos da imagem
          />
          {product?.totalStock === 0 ? ( // Verifica se o produto está fora de estoque
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Fora de estoque {/* Etiqueta para produto fora de estoque */}
            </Badge>
          ) : product?.totalStock < 10 ? ( // Verifica se o estoque é baixo
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Restam ${product?.totalStock} itens`}{" "}
              {/* Etiqueta para estoque baixo */}
            </Badge>
          ) : product?.salePrice > 0 ? ( // Verifica se o produto está em promoção
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Promoção {/* Etiqueta para produtos em promoção */}
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          {" "}
          {/* Conteúdo do cartão */}
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>{" "}
          {/* Título do produto */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}{" "}
              {/* Categoria do produto */}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]} {/* Marca do produto */}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : "" // Aplica o estilo de linha cruzada se houver preço de venda
              } text-lg font-semibold text-primary`}
            >
              R${product?.price} {/* Preço original do produto */}
            </span>
            {product?.salePrice > 0 ? ( // Se houver um preço de venda, exibe o preço em promoção
              <span className="text-lg font-semibold text-primary">
                R${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {" "}
        {/* Rodapé do cartão */}
        {product?.totalStock === 0 ? ( // Se o produto estiver fora de estoque
          <Button className="w-full opacity-60 cursor-not-allowed">
            Fora de estoque {/* Botão desativado */}
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)} // Chama a função para adicionar ao carrinho
            className="w-full"
          >
            Adicionar {/* Botão para adicionar ao carrinho */}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile; // Exporta o componente
