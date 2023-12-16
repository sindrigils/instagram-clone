import styles from "./Item.module.css";

function Item({ text, svg, follow }) {
  return (
    <div className={styles.item_container}>
      <span>
        <span className={styles.item_img}>
          {text === "Profile" ? (
            <img src={`http://localhost:8000${svg}`} alt="profile pic" />
          ) : (
            svg
          )}
        </span>
      </span>
      <span className={styles.item_text}>{text}</span>
      {follow && (
        <span className={styles.follow} onClick={follow}>
          Follow
        </span>
      )}
    </div>
  );
}

export default Item;
