import accImg from "../../assets/pagina_em_construcao.png";

function ShoppingAbout({ imgWidth = "80%", imgHeight = "80%" }) {
    return (
      <div style={styles.container}>
        <div className="flex justify-center items-center h-full w-full">
          <img
            src={accImg}
            alt="Página em Construção"
            style={{ width: imgWidth, height: imgHeight, objectFit: "contain" }}
            className="object-center"
          />
        </div>
      </div>
    );
  }

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
};

export default ShoppingAbout;
