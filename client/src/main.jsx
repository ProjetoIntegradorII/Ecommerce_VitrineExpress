// Importa as bibliotecas e componentes necessários
import { createRoot } from "react-dom/client"; // Para renderizar o aplicativo React
import App from "./App.jsx"; // Componente principal da aplicação
import "./index.css"; // Estilos globais da aplicação
import { BrowserRouter } from "react-router-dom"; // Para habilitar o roteamento
import { Provider } from "react-redux"; // Para fornecer a store Redux
import store from "./store/store.js"; // A store Redux configurada
import { Toaster } from "./components/ui/toaster.jsx"; // Componente para exibir notificações

// Cria a raiz da aplicação React e renderiza o componente.
createRoot(document.getElementById("root")).render(
  // Envolve a aplicação no BrowserRouter para habilitar o roteamento.
  <BrowserRouter>
    {/* Envolve a aplicação no Provider para disponibilizar a store Redux a todos os componentes. */}
    <Provider store={store}>
      {/* Renderiza o componente principal da aplicação. */}
      <App />
      {/* Renderiza o componente Toaster para exibir notificações. */}
      <Toaster />
    </Provider>
  </BrowserRouter>
);
