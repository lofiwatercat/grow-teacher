import splashImage from "../../assets/images/splash-bg.jpg";
import "./SplashPage.scss";

const SplashPage = () => {
  return (
    <>
      <div className="splash-background">
        <img id="splash-image" src={splashImage} alt="background" />
        <div className="splash-middle-text">
          <div>
            <h1>Text here</h1>
          </div>
          <div>
            <button>Start for free</button>
          </div>
        </div>
      </div>
      <div className="splash-about">
        <div className="splash-about-title">
          <h1>Title</h1>
        </div>
        <div className="instructions-container">
          <div className="instruction">
            <div className="instruction-item">
              <div className="instruction-number">
                <h1>1</h1>
              </div>
              <h3>Title</h3>
              <p>Create a post with a funding goal and equipment checklist.</p>
            </div>
          </div>
          <div className="instruction">
            <div className="instruction-item">
              <div className="instruction-number">
                <h1>2</h1>
              </div>
              <h3>Title</h3>
              <p>
                Help out teachers in need by contributing item(s)and checking
                that item off their list.
              </p>
            </div>
          </div>
          <div className="instruction">
            <div className="instruction-item">
              <div className="instruction-number">
                <h1>3</h1>
              </div>
              <h3>Title</h3>
              <p>Share the love</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
