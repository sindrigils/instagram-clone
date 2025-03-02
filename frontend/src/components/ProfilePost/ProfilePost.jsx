import styles from "./ProfilePost.module.css";
import HeartSvg from "../../assets/svgs/HeartSvg";
import CommentSvgFilled from "../../assets/svgs/CommentSvgFilled";
import { useState } from "react";
import FullPost from "../FullPost/FullPost";

function ProfilePost({ url, likes, comments, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsAcitve] = useState(false);

  function handleClick() {
    setIsAcitve((state) => !state);
  }

  function closeFullPost(e) {
    if (!e.target.classList.contains(styles.modalBackdrop)) return;
    setIsAcitve((state) => !state);
  }

  return (
    <>
      <div
        className={styles.imageContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {isHovered && (
          <div className={styles.hoverBackground}>
            <span className={styles.postInformation}>
              <span>
                <HeartSvg fill="white" />
              </span>
              <span>{likes}</span>
            </span>
            <span className={styles.postInformation}>
              <CommentSvgFilled fill="white" />
              {comments}
            </span>
          </div>
        )}
        <img src={`http://localhost:8000${url}`} alt="" />
      </div>
      {isActive && (
        <div className={styles.modalBackdrop} onClick={closeFullPost}>
          <FullPost id={id} />
        </div>
      )}
    </>
  );
}

export default ProfilePost;
