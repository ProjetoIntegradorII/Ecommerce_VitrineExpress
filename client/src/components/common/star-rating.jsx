import { StarIcon } from "lucide-react"; // Importa o ícone de estrela da biblioteca Lucide
import { Button } from "../ui/button"; // Importa o componente de botão personalizado

// Define o componente StarRatingComponent que recebe a avaliação e uma função para mudar a avaliação
function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating"); // Loga a avaliação atual para depuração

  // Mapeia um array de 1 a 5 para renderizar as estrelas de avaliação
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      className={`p-2 rounded-full transition-colors ${ // Estilos do botão
        star <= rating // Verifica se a estrela atual deve ser preenchida
          ? "text-yellow-500 hover:bg-black" // Estilo para estrelas preenchidas
          : "text-black hover:bg-primary hover:text-primary-foreground" // Estilo para estrelas vazias
      }`}
      variant="outline" // Define o estilo do botão como contornado
      size="icon" // Define o tamanho do botão
      onClick={handleRatingChange ? () => handleRatingChange(star) : null} // Chama a função para mudar a avaliação ao clicar
    >
      <StarIcon
        className={`w-6 h-6 ${ // Tamanho do ícone da estrela
          star <= rating ? "fill-yellow-500" : "fill-black" // Preenche a estrela com a cor apropriada
        }`}
      />
    </Button>
  ));
}

// Exporta o componente StarRatingComponent como padrão
export default StarRatingComponent;
