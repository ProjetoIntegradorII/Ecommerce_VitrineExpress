import accImg from "../../assets/404-page-not-found.png";
function NotFound() {
  return (
      <div className="flex flex-col">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center" // Estiliza a imagem para cobrir todo o espaço disponível
        />
      <div style={styles.text}>Página não encontrada</div>
    </div>
    );
  };

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    top: '20%',
    left: '53%',
    transform: 'translate(-50%, -50%)',
    color: 'navy',
    fontSize: '2em',
    fontWeight: 'bold',
  },
};

export default NotFound;