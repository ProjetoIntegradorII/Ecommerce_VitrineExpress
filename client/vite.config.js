// Importa o módulo 'path' do Node.js para trabalhar com caminhos de arquivos
import path from "path";
// Importa o plugin React para o Vite, que permite a integração do React no projeto
import react from "@vitejs/plugin-react";
// Importa a função 'defineConfig' do Vite para definir a configuração do projeto
import { defineConfig } from "vite";

// Exporta a configuração do Vite
export default defineConfig({
  // Define os plugins que serão usados pelo Vite
  plugins: [react()], // Adiciona o plugin React à configuração

  // Define opções de resolução de módulos
  resolve: {
    // Define aliases para facilitar a importação de módulos
    alias: {
      // Cria um alias "@" que aponta para a pasta "./src", facilitando a importação de arquivos
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
