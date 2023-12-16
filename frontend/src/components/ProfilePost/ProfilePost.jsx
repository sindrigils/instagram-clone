import styles from "./ProfilePost.module.css";
import HeartSvg from "../../assets/svgs/HeartSvg";
import CommentSvgFilled from "../../assets/svgs/CommentSvgFilled";
import { useState } from "react";

function ProfilePost({ url, likes, comments }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.image_container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className={styles.hover_background}>
          <span className={styles.post_information}>
            <span>
              <HeartSvg fill="white" />
            </span>
            <span>{likes}</span>
          </span>
          <span className={styles.post_information}>
            <CommentSvgFilled fill="white" />
            {comments}
          </span>
        </div>
      )}
      <img src={`http://localhost:8000${url}`} alt="" />
    </div>
  );
}

export default ProfilePost;
