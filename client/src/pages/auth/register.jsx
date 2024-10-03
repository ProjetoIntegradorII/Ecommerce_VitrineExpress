import CommonForm from "@/components/common/form"; // Importa um componente de formulário reutilizável
import { useToast } from "@/hooks/use-toast"; // Importa o hook useToast para exibir mensagens de notificação
import { registerFormControls } from "@/config"; // Importa os controles do formulário de registro (campos e configurações)
import { registerUser } from "@/store/auth-slice"; // Importa a ação de registro do slice de autenticação
import { useState } from "react"; // Importa o hook useState do React
import { useDispatch } from "react-redux"; // Importa o hook useDispatch do Redux para despachar ações
import { Link, useNavigate } from "react-router-dom"; // Importa componentes para navegação entre páginas

// Define o estado inicial do formulário de registro
const initialState = {
  userName: "", // Nome de usuário
  email: "", // Email do usuário
  password: "", // Senha do usuário
};

// Componente principal para o registro de usuário
function AuthRegister() {
  // Cria um estado local para armazenar os dados do formulário
  const [formData, setFormData] = useState(initialState);

  // Obtém a função dispatch para despachar ações do Redux
  const dispatch = useDispatch();

  // Obtém a função de navegação do React Router
  const navigate = useNavigate();

  // Obtém a função de toast para mostrar mensagens ao usuário
  const { toast } = useToast();

  // Função chamada ao submeter o formulário
  function onSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Dispara a ação de registro do usuário e trata a resposta
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // Se o registro for bem-sucedido, exibe uma mensagem de sucesso e navega para a página de login
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login"); // Redireciona para a página de login
      } else {
        // Se ocorrer um erro, exibe uma mensagem de erro
        toast({
          title: data?.payload?.message,
          variant: "destructive", // Indica que é uma mensagem de erro
        });
      }
    });
  }

  // Exibe os dados do formulário no console para depuração
  console.log(formData);

  // Renderiza o componente de registro
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Criar nova conta
        </h1>
        <p className="mt-2">
          Já possui uma conta, faça
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login" // Link para a página de login
          >
            Login
          </Link>
        </p>
      </div>
      {/* Renderiza o formulário comum com os controles de registro */}
      <CommonForm
        formControls={registerFormControls} // Controles do formulário definidos na configuração
        buttonText={"Sign Up"} // Texto do botão "Sign Up"
        formData={formData} // Dados do formulário
        setFormData={setFormData} // Função para atualizar os dados do formulário
        onSubmit={onSubmit} // Função chamada ao submeter o formulário
      />
    </div>
  );
}

// Exporta o componente para uso em outras partes da aplicação
export default AuthRegister; // Exporta o componente como padrão
