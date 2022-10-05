import PostsFormEdit from "../../components/PostsFormEdit";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PostsFormEditPage = () => {
  const sessionUser = useSelector((state) => !!state.session.user);

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <PostsFormEdit />
    </>
  );
};

export default PostsFormEditPage;
