import { VscGithub } from "react-icons/vsc";
import { AiOutlineLinkedin } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { FaAngellist } from "react-icons/fa";
import "./AboutIndexItem.scss";

const AboutIndexItem = ({ dev }) => {
  return (
    <>
      <div className="dev-container">
        <div className="dev-profile">
          <div className="dev-image-container">
            <div className={`dev-image ${dev.name}`}></div>
          </div>
          <div className="dev-details">
            <h1>{dev.fullName}</h1>
            <p>{dev.role}</p>
            <div className="dev-bottom-half">
              <div className="dev-facts">
                <p>{`Fun Fact: ${dev.funFact}`}</p>
                <p>{`Future Goals: ${dev.futureGoals}`}</p>
              </div>
              <ul className="dev-personal-links">
                <li>
                  <a target="_blank" rel="noreferrer" href={dev.git}>
                    <VscGithub color="black" fontSize={"30px"} />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href={dev.linkedin}>
                    <AiOutlineLinkedin color="black" fontSize={"30px"} />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href={dev.angellist}>
                    <FaAngellist color="black" fontSize={"30px"} />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href={dev.email}>
                    <HiOutlineMail color="black" fontSize={"30px"} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutIndexItem;
