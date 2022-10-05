import PostsForm from "../../components/PostsForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PostsFormPage = () => {
  const sessionUser = useSelector((state) => !!state.session.user);

  if (!sessionUser) return <Redirect to="/login" />;
  
  return (
    <>
      <PostsForm />
    </>
  );
};

export default PostsFormPage;
