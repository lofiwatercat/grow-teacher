import splashImage from "../../assets/images/splash-bg.jpg";
import "./SplashPage.scss";

const SplashPage = () => {
  return (
    <>
      <div className="splash-background">
        <img id="splash-image" src={splashImage} />
        <div className="splash-middle-text">
          <div>
            <h1>Text here</h1>
          </div>
          <div>
            <button>Start for free</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
