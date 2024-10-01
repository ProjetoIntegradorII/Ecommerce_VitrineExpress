import CommonForm from "@/components/common/form"; // Importa um componente de formulário reutilizável
import { loginFormControls } from "@/config"; // Importa os controles do formulário de login (campos e configurações)
import { useState } from "react"; // Importa o hook useState do React
import { Link } from "react-router-dom"; // Importa o componente Link para navegação entre páginas
import { useDispatch } from "react-redux"; // Importa o hook useDispatch do Redux para despachar ações
import { loginUser } from "@/store/auth-slice"; // Importa a ação de login do slice de autenticação
import { useToast } from "@/hooks/use-toast"; // Importa o hook useToast para exibir mensagens de notificação

// Define o estado inicial do formulário, com os campos 'email' e 'password' vazios
const initialState = {
  email: "",
  password: "",
};

// Função principal que define o componente de Login
function AuthLogin() {
  // Usa o hook useState para armazenar os dados do formulário
  const [formData, setFormData] = useState(initialState);

  // Usa o hook useDispatch para despachar ações do Redux
  const dispatch = useDispatch();

  // Usa o hook useToast para exibir mensagens de sucesso ou erro ao usuário
  const { toast } = useToast();

  // Função chamada quando o formulário é submetido
  function onSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Dispara a ação de login através do Redux e trata a resposta
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // Se o login for bem-sucedido, exibe uma mensagem de sucesso
        toast({
          title: data?.payload?.message,
        });
      } else {
        // Se houver erro, exibe uma mensagem de erro
        toast({
          title: data?.payload?.message,
          variant: "destructive", // Define que a mensagem é de erro
        });
      }
    });
  }

  // Renderiza o componente de login
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          {/* Exibe uma mensagem para o usuário que não tem conta, com um link para o registro */}
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Renderiza o formulário comum com os campos configurados */}
      <CommonForm
        formControls={loginFormControls} // Controles do formulário de login (campos)
        buttonText={"Sign In"} // Define o texto do botão como "Sign In"
        formData={formData} // Dados do formulário
        setFormData={setFormData} // Função para atualizar os dados do formulário
        onSubmit={onSubmit} // Função chamada ao submeter o formulário
      />
    </div>
  );
}

// Exporta o componente para ser usado em outras partes da aplicação
export default AuthLogin; // Exporta o componente como padrão
