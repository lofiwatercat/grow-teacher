import splashImage from "../../assets/images/splash-bg.jpg";
import "./SplashPage.scss";
import { useHistory } from "react-router-dom";

const SplashPage = () => {
  const history = useHistory();

  return (
    <>
      <div className="splash-background">
        <img id="splash-image" src={splashImage} alt="background" />
        <div className="splash-middle-text">
          <div className="splash-middle-title">
            <h1>Join the community!</h1>
          </div>
          <div>
            <button onClick={() => history.push('/login')}>Start here</button>
          </div>
        </div>
      </div>
      <div className="splash-about">
        <div className="splash-about-title-container">
          <div className="splash-about-title">
            <h1>GrowTeacher</h1>
            <h3>Get started in 3 easy steps</h3>
          </div>
        </div>
        <div className="instructions-container">
          <div className="instruction">
            <div className="instruction-item">
              <div className="instruction-number">
                <h1>1</h1>
              </div>
              <div className="instruction-title">
                <h3>Title</h3>
              </div>
              <p>Create a post with a funding goal and/or equipment checklist.</p>
            </div>
          </div>
          <div className="instruction">
            <div className="instruction-item">
              <div className="instruction-number">
                <h1>2</h1>
              </div>
              <div className="instruction-title">
                <h3>Contribute</h3>
              </div>
              <p>Create a post with a funding goal and equipment checklist.</p>
            </div>
          </div>
          <div className="instruction">
            <div className="instruction-item">
              <div className="instruction-number">
                <h1>3</h1>
              </div>
              <div className="instruction-title">
                <h3>Share with friends and family</h3>
              </div>
              <p>Create a post with a funding goal and equipment checklist.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
