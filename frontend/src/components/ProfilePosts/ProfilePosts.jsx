import { useSelector } from "react-redux";
import CameraSvg from "../../assets/svgs/CameraSvg";
import ProfilePost from "../ProfilePost/ProfilePost";
import styles from "./ProfilePosts.module.css";

function ProfilePosts({ setAddPostModal }) {
  const { posts } = useSelector((state) => state.profile);
  return (
    <>
      <div className={styles.postsOptions}>
        <span>POSTS</span>
        <span>SAVED</span>
      </div>
      {posts.length > 0 ? (
        <div className={styles.userPosts}>
          {posts.map((postObject, idx) => (
            <ProfilePost
              key={idx}
              id={postObject.post_id}
              url={postObject.images}
              likes={postObject.likes}
              comments={postObject.comments}
            />
          ))}
        </div>
      ) : (
        <div className={styles.sharePhotosContainer}>
          <CameraSvg />
          <p className={styles.sharePhotosHeader}>Share Photos</p>
          <p className={styles.sharePhotosDescription}>
            When you share photos, they will appear on your profile.
          </p>
          <p
            className={styles.sharePhotosLink}
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
