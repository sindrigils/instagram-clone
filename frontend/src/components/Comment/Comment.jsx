import styles from "./Comment.module.css";
import HeartSvg from "../../assets/svgs/HeartSvg";

function Comment({
  profilePic,
  username,
  text,
  createdAt,
  description = false,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.profilePic}>
        <img src={`http://localhost:8000${profilePic}`} alt="" />
      </div>
      <div className={styles.comment}>
        <div className={styles.content}>
          <div className={styles.contentTest}>
            <div className={styles.contentHeader}>
              <span className={styles.username}>{username}</span>
              <span className={styles.text}>{text}</span>
            </div>
            <div className={styles.contentFooter}>
              <span>{createdAt}</span>
              {!description && (
                <>
                  <span>1.216 likes</span>
                  <span>Reply</span>
                </>
              )}
            </div>
          </div>
          {/* uncomment when I implement the feature to reply to a comment */}
          {/* {!description && (
            <div className={styles.viewReplies}>
              <div className={styles.line}></div>
              <div>View replies</div>
            </div>
          )} */}
        </div>
        {!description && (
          <div className={styles.heartSvg}>
            <HeartSvg />
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
