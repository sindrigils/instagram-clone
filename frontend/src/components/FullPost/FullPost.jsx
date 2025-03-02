import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CommentSvg from "../../assets/svgs/CommentSvg";
import HeartSvg from "../../assets/svgs/HeartSvg";
import usePosts from "../../services/usePosts";
import styles from "./FullPost.module.css";
import Comment from "../Comment/Comment";
import Spinner from "../Spinner/Spinner";

function FullPost({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [addComment, setAddComment] = useState("");
  const { fetchPost } = usePosts();
  const { profilePic } = useSelector((state) => state.profile);
  const { str: username } = useParams();
  const [
    { description, created_at_comment, created_at_post, images, comments },
    setPost,
  ] = useState({});

  useEffect(
    function () {
      const fetchData = async () => {
        const { post } = await fetchPost(id);
        setPost(post);
        setIsLoading(() => false);
      };
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  if (isLoading) return <Spinner />;

  function handleAddCommentChange(e) {
    setAddComment(() => e.target.value);
  }

  function handleAddCommentForm(e) {}

  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        <img
          className={styles.post}
          src={`http://localhost:8000${images[0]["image"]}`}
          alt="post"
        />
      </div>
      <div className={styles.commentsContainer}>
        <div className={styles.header}>
          <img
            className={styles.profilePic}
            src={`http://localhost:8000${profilePic}`}
            alt="profile pic"
          />
          <span className={styles.username}>{username}</span>
        </div>
        <div className={styles.comments}>
          <Comment
            profilePic={profilePic}
            username={username}
            createdAt={created_at_comment}
            text={description}
            description={true}
          />
          {comments.map(
            (
              {
                username,
                profile_pic: profilePic,
                text,
                created_at: createdAt,
              },
              idx
            ) => (
              <Comment
                key={idx}
                profilePic={profilePic}
                username={username}
                createdAt={createdAt}
                text={text}
              />
            )
          )}
        </div>
        <div className={styles.likes}>
          <div className={styles.icons}>
            <span className={`${styles.heart} ${styles.icon}`}>
              {false ? <HeartSvg fill="red" stroke="red" /> : <HeartSvg />}
            </span>
            <span className={`${styles.comment} ${styles.icon}`}>
              <CommentSvg />
            </span>
          </div>
          <div className={styles.createdAt}>{created_at_post}</div>
        </div>
        <form className={styles.addCommentForm} onSubmit={handleAddCommentForm}>
          <textarea
            name="comment"
            type="text"
            placeholder="Add a comment..."
            value={addComment}
            onChange={handleAddCommentChange}
          />
          <button type="submit" className={addComment ? styles.btnActive : ""}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default FullPost;
