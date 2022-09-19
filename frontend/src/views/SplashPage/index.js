import splashImage from "../../assets/images/splash-bg.jpg";
import "./SplashPage.scss";
import NavBar from "../../components/NavBar"

const SplashPage = () => {
  return (
    <>
      <div className="splash-background">
        <img id="splash-image" src={splashImage} />
      </div>
    </>
  );
};

export default SplashPage;
