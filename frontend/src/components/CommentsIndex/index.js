import CommentsForm from "../CommentsForm";
import CommentsIndexItem from "../CommentsIndexItem";

const CommentsIndex = ({comments}) => {
  return (
    <>
    <div className="comments-container">
      {comments && comments.map(comment => {
        return <CommentsIndexItem comment={comment} key={comment._id}/>
      })}
      <CommentsForm />
    </div>
    </>
  )
}

export default CommentsIndex;