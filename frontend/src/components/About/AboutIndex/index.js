import AboutIndexItem from "../AboutIndexItem";
import "./AboutIndex.scss";

const AboutIndex = () => {
  const dev1 = {
    name: "alan",
    fullName: "Alan Tran-Kiem",
    role: "Team Lead",
    git: "https://github.com/loFiWaterCat",
    linkedin: "https://www.linkedin.com/in/alan-tran-kiem-971210252/",
    angellist: "https://angel.co/u/alan-tran-kiem",
    email: "mailto:alan001tk@gmail.com",
    funFact:
      "Love jamming out to music, hit me up for jam sessions. And bass guitars rock.",
    futureGoals: "Make my own video game using Rust.",
  };
  const dev2 = {
    name: "derek",
    fullName: "Derek Li",
    role: "Frontend Lead",
    git: "https://www.github.com/deli123",
    linkedin: "https://www.linkedin.com/in/derli/",
    angellist: "https://angel.co/u/derek-li-30",
    email: "mailto:liderek63@gmail.com",
    funFact: "I have a very good sense of balance",
    futureGoals:
      "To utilize my technical skills in creating products that improve people's lives, and eventually own a company.",
  };
  const dev3 = {
    name: "zuzu",
    fullName: "Zuzu Chaoui",
    role: "Backend Lead",
    git: "https://github.com/zoumus",
    linkedin: "https://www.linkedin.com/in/zuzu-chaoui-302134249/",
    angellist: "https://angel.co/u/zuzu-chaoui",
    email: "mailto:zehourchaoui@gmail.com",
    funFact: "I have never drank coffee.",
    futureGoals:
      "To grow with a company where I can continue to learn, take an additional responsibilities, and contribute as much value as possible to the team.",
  };
  const devs = [dev1, dev2, dev3];

  return (
    <>
      <div className="about-devs">
        {devs.map((dev, i) => (
          <AboutIndexItem dev={dev} key={i} />
        ))}
      </div>
    </>
  );
};

export default AboutIndex;
