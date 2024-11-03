import accImg from "../../assets/unauthorized-page.png";

function UnauthPage() {
  return (
    <div className="flex flex-col h-screen">
      {" "}
      {/* Garante que o contêiner ocupe toda a altura da tela */}
      <img
        src={accImg}
        className="h-full w-full object-cover object-center" // Estiliza a imagem para cobrir todo o espaço disponível
        alt="Página não autorizada"
      />
    </div>
  );
}

export default UnauthPage;
