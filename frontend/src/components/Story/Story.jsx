import styles from "./Story.module.css";
import userLogo from "../../assets/images/logo.jpeg";

function formatUsername(username) {
  return username.length > 10 ? username.slice(0, 8) + "..." : username;
}
const username = "sindrigils";

function Story() {
  return (
    <div className={styles.story_container}>
      <div className={styles.story_image}>
        <img src={userLogo} alt="" />
      </div>
      <p className={styles.story_username}>{formatUsername(username)}</p>
    </div>
  );
}

export default Story;
