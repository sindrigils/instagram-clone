import styles from "./Post.module.css";
import postImage from "../../assets/images/eren.jpeg";
import userLogo from "../../assets/images/logo.jpeg";
import HeartSvg from "../../assets/svgs/HeartSvg";
import CommentSvg from "../../assets/svgs/CommentSvg";
import MessageSvg from "../../assets/svgs/MessageSvg";
import BookmarkSvg from "../../assets/svgs/BookmarkSvg";
import MoreSvg from "../../assets/svgs/MoreSvg";

const postObj = {
  username: "teslamotors", // max 40
  image: "",
  createdAt: "1d",
  likes: "313,838",
  description:
    "This is the best fictional character in all of the anime, even in the whole world",
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
    <div className={styles.post_container}>
      <div className={styles.post_header}>
        <span>
          <img
            className={styles.profile_pic}
            src={userLogo}
            alt="post profile-pic"
          />
        </span>
        <span className={styles.post_header_username}>{postObj.username}</span>
        &#x2022;
        <span className={styles.post_header_date}>{postObj.createdAt}</span>
        <span className={styles.more}>
          <MoreSvg />
        </span>
      </div>
      <div className={styles.post_images}>
        <img src={postImage} alt="eren yeager" />
      </div>
      <div className={styles.post_icons_container}>
        <div className={styles.post_icons}>
          <HeartSvg />
          <CommentSvg />
          <MessageSvg />
        </div>
        <span className={styles.icon}>
          <BookmarkSvg />
        </span>
      </div>
      <div className={styles.post_description_comments}>
        <div className={styles.likes_amount}>{postObj.likes} likes</div>
        <div className={styles.description}>
          <span>
            <span className={styles.description_username}>
              {postObj.username}
            </span>
            {checkDescriptionLength(postObj.description) ? (
              <>
                {formatLongDescription(postObj.description)}{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className={styles.comment_color}
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
        <div className={styles.comment_color}>Add a comment...</div>
      </div>
    </div>
  );
}

export default Post;
