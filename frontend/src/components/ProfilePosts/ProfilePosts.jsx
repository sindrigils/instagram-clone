import { useSelector } from "react-redux";
import CameraSvg from "../../assets/svgs/CameraSvg";
import ProfilePost from "../ProfilePost/ProfilePost";
import styles from "./ProfilePosts.module.css";

function ProfilePosts({ setAddPostModal }) {
  const { posts } = useSelector((state) => state.profile);
  return (
    <>
      <div className={styles.posts_options}>
        <span>POSTS</span>
        <span>SAVED</span>
      </div>
      {posts.length > 0 ? (
        <div className={styles.user_posts}>
          {posts.map((postObject, idx) => (
            <ProfilePost
              key={idx}
              url={postObject.images}
              likes={postObject.likes}
              comments={postObject.comments}
            />
          ))}
        </div>
      ) : (
        <div className={styles.share_photos_container}>
          <CameraSvg />
          <p className={styles.share_photos_header}>Share Photos</p>
          <p className={styles.share_photos_description}>
            When you share photos, they will appear on your profile.
          </p>
          <p
            className={styles.share_photos_link}
            onClick={() => setAddPostModal(true)}
          >
            Share your first photo
          </p>
        </div>
      )}
    </>
  );
}

export default ProfilePosts;
