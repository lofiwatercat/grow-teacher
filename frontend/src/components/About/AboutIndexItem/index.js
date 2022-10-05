import placeholder from "../../../assets/images/image-placeholder.png";
import { VscGithub } from "react-icons/vsc";
import { AiOutlineLinkedin } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { FaAngellist } from "react-icons/fa";
import "./AboutIndexItem.scss";

const AboutIndexItem = ({ devs }) => {
  return (
    <>
      {devs.map((dev) => (
        <div className="dev-container">
          <div className="dev-profile">
            <div className="dev-image-container">
              <img className="dev-image" src={placeholder} alt="dev-pic" />
            </div>
            <div className="dev-details">
              <h1>{dev.name}</h1>
              <p>{dev.role}</p>
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
      ))}
    </>
  );
};

export default AboutIndexItem;
