import { filterOptions } from "@/config"; // Importa opções de filtro de uma configuração
import { Fragment } from "react"; // Importa Fragment do React
import { Label } from "../ui/label"; // Importa o componente Label
import { Checkbox } from "../ui/checkbox"; // Importa o componente Checkbox
import { Separator } from "../ui/separator"; // Importa o componente Separator

// Componente para aplicar filtros em produtos
function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm"> {/* Container do filtro com fundo e sombra */}
      <div className="p-4 border-b"> {/* Cabeçalho do filtro */}
        <h2 className="text-lg font-extrabold">Filters</h2> {/* Título do filtro */}
      </div>
      <div className="p-4 space-y-4"> {/* Espaçamento interno e entre filtros */}
        {Object.keys(filterOptions).map((keyItem) => ( // Itera sobre as chaves de filterOptions
          <Fragment key={keyItem}> {/* Usando Fragment para agrupar elementos */}
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3> {/* Título da categoria de filtro */}
              <div className="grid gap-2 mt-2"> {/* Grid para opções de filtro */}
                {filterOptions[keyItem].map((option) => ( // Itera sobre as opções de filtro
                  <Label className="flex font-medium items-center gap-2" key={option.id}> {/* Label para cada opção */}
                    <Checkbox
                      checked={
                        filters && // Verifica se filters existem e têm opções
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1 // Verifica se a opção está selecionada
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)} // Chama a função de filtro ao alterar o estado do checkbox
                    />
                    {option.label} {/* Rótulo da opção */}
                  </Label>
                ))}
              </div>
            </div>
            <Separator /> {/* Separador entre categorias de filtro */}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter; // Exporta o componente ProductFilter como padrão
