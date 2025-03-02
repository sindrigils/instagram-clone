import styles from "./Post.module.css";
import HeartSvg from "../../assets/svgs/HeartSvg";
import CommentSvg from "../../assets/svgs/CommentSvg";
import MessageSvg from "../../assets/svgs/MessageSvg";
import BookmarkSvg from "../../assets/svgs/BookmarkSvg";
import MoreSvg from "../../assets/svgs/MoreSvg";

const postObj = {
  username: "username",
  image: "",
  createdAt: "1d",
  likes: "313,838",
  description: "Some description",
  comments: "3,323",
};

function checkDescriptionLength(description) {
  const descriptionLength = description.length;
  return descriptionLength >= 85 ? true : false;
}

function formatLongDescription(description) {
  const shortenDescription = description.slice(0, 75) + "...";
  return shortenDescription;
}

function Post() {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <span>
          <img
            className={styles.profilePic}
            src="https://picsum.photos/50"
            alt=""
          />
        </span>
        <span className={styles.postHeaderUsername}>{postObj.username}</span>
        &#x2022;
        <span className={styles.postHeaderDate}>{postObj.createdAt}</span>
        <span className={styles.more}>
          <MoreSvg />
        </span>
      </div>
      <div className={styles.postImages}>
        <img src="https://picsum.photos/1900" alt="" />
      </div>
      <div className={styles.postIconsContainer}>
        <div className={styles.postIcons}>
          <HeartSvg />
          <CommentSvg />
          <MessageSvg />
        </div>
        <span className={styles.icon}>
          <BookmarkSvg />
        </span>
      </div>
      <div className={styles.postDescriptionComments}>
        <div className={styles.likesAmount}>{postObj.likes} likes</div>
        <div className={styles.description}>
          <span>
            <span className={styles.descriptionUsername}>
              {postObj.username}
            </span>
            {checkDescriptionLength(postObj.description) ? (
              <>
                {formatLongDescription(postObj.description)}{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className={styles.commentColor}
                >
                  more
                </span>
              </>
            ) : (
              postObj.description
            )}
          </span>
        </div>

        <div className={styles.comments}>
          View all {postObj.comments} comments
        </div>
        <div className={styles.commentColor}>Add a comment...</div>
      </div>
    </div>
  );
}

export default Post;
