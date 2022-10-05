import AboutIndexItem from "../AboutIndexItem";
import "./AboutIndex.scss";

const AboutIndex = () => {
  const dev1 = {
    name: "Alan Tran-Kiem",
    role: "Team Lead",
    git: "https://github.com/loFiWaterCat",
    linkedin: "linked",
    angellist: "angellist",
    email: "email",
  };
  const dev2 = {
    name: "Derek Li",
    role: "Frontend Lead",
    git: "https://www.github.com/deli123",
    linkedin: "linked",
    angellist: "angellist",
    email: "email",
  };
  const dev3 = {
    name: "Zuzu Chaoui",
    role: "Backend Lead",
    git: "https://github.com/zoumus",
    linkedin: "linked",
    angellist: "angellist",
    email: "email",
  };

  const devs = [dev1, dev2, dev3];

  return (
    <>
      <div className="about-devs">
        <AboutIndexItem devs={devs} />
      </div>
    </>
  );
};

export default AboutIndex;
