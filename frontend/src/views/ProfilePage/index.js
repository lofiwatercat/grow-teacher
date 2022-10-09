import ProfileShow from "../../components/ProfileShow";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const ProfileShowPage = () => {
  const sessionUser = useSelector((state) => !!state.session.user);

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <ProfileShow/>
    </>
  );
};

export default ProfileShowPage;

