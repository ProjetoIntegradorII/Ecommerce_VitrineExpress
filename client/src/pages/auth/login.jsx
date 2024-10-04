import CommonForm from "@/components/common/form"; // Importa um componente de formulário reutilizável
import { loginFormControls } from "@/config"; // Importa os controles do formulário de login (campos e configurações)
import { useState, useEffect } from "react"; // Importa os hooks useState e useEffect do React
import { Link, useNavigate } from "react-router-dom"; // Importa o componente Link e useNavigate para navegação
import { useDispatch, useSelector } from "react-redux"; // Importa os hooks useDispatch e useSelector do Redux
import { loginUser } from "@/store/auth-slice"; // Importa a ação de login do slice de autenticação
import { useToast } from "@/hooks/use-toast"; // Importa o hook useToast para exibir mensagens de notificação
import { Button } from "@/components/ui/button";

// Define o estado inicial do formulário, com os campos 'email' e 'password' vazios
const initialState = {
  email: "",
  password: "",
};

// Função principal que define o componente de Login
function AuthLogin() {
  const [formData, setFormData] = useState(initialState); // Armazena os dados do formulário
  const dispatch = useDispatch(); // Hook para despachar ações
  const navigate = useNavigate(); // Hook para navegação
  const { isAuthenticated } = useSelector((state) => state.auth); // Verifica se o usuário está autenticado
  const { toast } = useToast(); // Hook para exibir mensagens de toast

  // Função chamada quando o formulário é submetido
  function onSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Dispara a ação de login através do Redux e trata a resposta
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // Exibe uma mensagem de sucesso
        toast({
          title: data?.payload?.message,
        });
      } else {
        // Exibe uma mensagem de erro
        toast({
          title: data?.payload?.message,
          variant: "destructive", // Define que a mensagem é de erro
        });
      }
    });
  }

  // Efeito para redirecionar o usuário para a página "Home" após o login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/shop/home"); // Redireciona para a página "Home" se o login for bem-sucedido
    }
  }, [isAuthenticated, navigate]); // Dependências: redireciona sempre que o estado de autenticação mudar

  // Função para voltar à página Home
  function handleBackToHome() {
    navigate("/shop/home");
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 relative">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Faça login na sua conta
        </h1>
        <p className="mt-2">
          {/* Exibe uma mensagem para o usuário que não tem conta, com um link para o registro */}
          Ainda não possui cadastro, se
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Registre
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

      {/* Botão para voltar para a página Home */}
      <Button
        onClick={handleBackToHome}
        className="fixed bottom-4 right-4 bg-primary text-white py-2 px-4 rounded-full shadow-md hover:bg-primary-dark"
      >
        Voltar para Home
      </Button>
    </div>
  );
}

// Exporta o componente para ser usado em outras partes da aplicação
export default AuthLogin; // Exporta o componente como padrão
