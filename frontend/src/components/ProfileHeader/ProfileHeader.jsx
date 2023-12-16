import { useParams } from "react-router-dom";
import SettingsSvg from "../../assets/svgs/SettingsSvg";
import styles from "./ProfileHeader.module.css";
import { useSelector } from "react-redux";

function ProfileHeader({ openAddPostModal }) {
  const { str: paramsUsername } = useParams();
  const {
    profilePic,
    ownProfile,
    postsAmount,
    followers,
    following,
    isFollowing,
    bio,
  } = useSelector((state) => state.profile);

  return (
    <div className={styles.header}>
      <img
        className={styles.profile_pic}
        src={`http://localhost:8000/${profilePic}`}
        alt="profile pic"
      />
      <div className={styles.profile}>
        <div className={styles.subheader_1}>
          <span className={styles.subheader_1__username}>{paramsUsername}</span>
          <span>
            <button className={styles.profile_btn}>
              {ownProfile
                ? "Edit profile"
                : isFollowing
                ? "Unfollow"
                : "Follow"}
            </button>
          </span>
          <span>
            <button className={styles.profile_btn} onClick={openAddPostModal}>
              {ownProfile ? "Add post" : "Message"}
            </button>
          </span>
          <SettingsSvg />
        </div>
        <div className={styles.subheader_2}>
          <span>{postsAmount} posts</span>
          <span className={styles.follow}>{followers} followers</span>
          <span className={styles.follow}>{following} following</span>
        </div>

        <div className={styles.bio}>{bio}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
