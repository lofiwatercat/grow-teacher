import splashImage from "../../assets/images/splash-bg.jpg";
import "./SplashPage.scss";

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
