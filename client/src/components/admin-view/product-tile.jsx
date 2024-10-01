import { Button } from "../ui/button"; // Importa o componente de botão personalizado
import { Card, CardContent, CardFooter } from "../ui/card"; // Importa componentes de cartão, conteúdo e rodapé para estrutura de layout

// Função para exibir um card de produto individual no layout administrativo
function AdminProductTile({
  product, // Objeto de produto contendo detalhes como título, imagem, preço, etc.
  setFormData, // Função que define os dados do formulário de edição de produto
  setOpenCreateProductsDialog, // Função para abrir o modal de criação/edição de produto
  setCurrentEditedId, // Função para definir o ID do produto atual que está sendo editado
  handleDelete, // Função para excluir o produto
}) {
  return (
    <Card className="w-full max-w-sm mx-auto"> {/* Estrutura do card, com largura máxima de 100% e centralizado */}
      <div>
        <div className="relative"> {/* Container para a imagem */}
          <img
            src={product?.image} // Exibe a imagem do produto
            alt={product?.title} // Texto alternativo da imagem
            className="w-full h-[300px] object-cover rounded-t-lg" // Estilos para a imagem (largura total, altura fixa, e bordas arredondadas no topo)
          />
        </div>
        <CardContent> {/* Conteúdo do card */}
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2> {/* Título do produto */}
          <div className="flex justify-between items-center mb-2"> {/* Div que contém os preços (normal e de venda) */}
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : "" // Aplica "line-through" se o produto estiver em promoção
              } text-lg font-semibold text-primary`} // Estilo do preço
            >
              ${product?.price} {/* Exibe o preço original do produto */}
            </span>
            {product?.salePrice > 0 ? ( // Se o preço promocional for maior que 0, exibe o preço promocional
              <span className="text-lg font-bold">${product?.salePrice}</span> // Preço com promoção
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center"> {/* Rodapé do card */}
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true); // Abre o modal para editar o produto
              setCurrentEditedId(product?._id); // Define o ID do produto a ser editado
              setFormData(product); // Preenche o formulário de edição com os dados do produto
            }}
          >
            Edit {/* Botão para editar o produto */}
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button> {/* Botão para deletar o produto */}
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile; // Exporta o componente como padrão
