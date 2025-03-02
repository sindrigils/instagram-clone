import { Link } from "react-router-dom";
import styles from "./Item.module.css";

function Item({ text, svg, link, follow, onClick, selected = false }) {
  return (
    <Link to={link} className={styles.link}>
      <div
        className={`${styles.itemContainer} ${
          selected ? styles.itemSelected : ""
        }`}
        onClick={onClick ? () => onClick(text) : null}
      >
        <span>
          <span className={styles.itemImg}>
            {text === "Profile" ? (
              <img src={`http://localhost:8000${svg}`} alt="profile pic" />
            ) : (
              svg
            )}
          </span>
        </span>
        <span className={styles.itemText}>{text}</span>
        {follow && (
          <span className={styles.follow} onClick={follow}>
            Follow
          </span>
        )}
      </div>
    </Link>
  );
}

export default Item;
