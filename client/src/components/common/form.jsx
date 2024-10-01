import { Input } from "../ui/input"; // Importa o componente de input
import { Label } from "../ui/label"; // Importa o componente de label
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // Importa componentes relacionados ao select
import { Textarea } from "../ui/textarea"; // Importa o componente de textarea
import { Button } from "../ui/button"; // Importa o componente de botão

// Define o componente CommonForm que aceita várias propriedades.
function CommonForm({
  formControls, // Controles do formulário (definições de input)
  formData, // Dados atuais do formulário
  setFormData, // Função para atualizar os dados do formulário
  onSubmit, // Função a ser chamada ao submeter o formulário
  buttonText, // Texto do botão de submissão
  isBtnDisabled, // Estado que define se o botão deve estar desabilitado
}) {
  // Função para renderizar inputs com base no tipo de componente
  function renderInputsByComponentType(getControlItem) {
    let element = null; // Inicializa a variável de elemento
    const value = formData[getControlItem.name] || ""; // Obtém o valor atual do formulário

    // Usa um switch para decidir qual tipo de input renderizar
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value, // Atualiza o estado com o novo valor
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value, // Atualiza o estado com o novo valor selecionado
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} /> {/* Valor padrão */}
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label} {/* Renderiza cada item do select */}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value, // Atualiza o estado com o novo valor
              })
            }
          />
        );
        break;

      default:
        // Caso não haja um tipo específico, renderiza um input padrão
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value, // Atualiza o estado com o novo valor
              })
            }
          />
        );
        break;
    }

    return element; // Retorna o elemento renderizado
  }

  return (
    <form onSubmit={onSubmit}> {/* Formulário que chama onSubmit ao ser enviado */}
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label> {/* Rótulo para o controle */}
            {renderInputsByComponentType(controlItem)} {/* Renderiza o input correspondente */}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"} {/* Botão de submissão */}
      </Button>
    </form>
  );
}

// Exporta o componente CommonForm como padrão para ser utilizado em outras partes da aplicação.
export default CommonForm;
