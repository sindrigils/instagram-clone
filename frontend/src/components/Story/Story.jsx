import styles from "./Story.module.css";

function formatUsername(username) {
  return username.length > 10 ? username.slice(0, 8) + "..." : username;
}
const username = "username";

function Story() {
  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyImage}>
        <img src="https://picsum.photos/50" alt="" />
      </div>
      <p className={styles.storyUsername}>{formatUsername(username)}</p>
    </div>
  );
}

export default Story;
