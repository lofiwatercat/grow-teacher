import "./AboutPage.scss";
import AboutIndex from "../../components/About/AboutIndex";

const AboutPage = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-text">
          <h1>What's this website about?</h1>
          <p>
            Teachers in public schools need to use their personal finances to
            make up for the lack of school materials that their students need.
            To remedy this issue, this application allows teachers to create
            posts with a funding goal and equipment checklist. Parents can
            either make a direct donation or pick up the supplies and give them
            directly to the teacher, checking that item off from the post adding
            to the funding goal.
          </p>
        </div>
        <div className="about-index-header">
          <h1>Check out the devs!</h1>
        </div>
        <AboutIndex />
      </div>
    </>
  );
};

export default AboutPage;
