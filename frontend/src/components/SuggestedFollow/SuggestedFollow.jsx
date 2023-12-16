import styles from "./SuggestedFollow.module.css";
import Item from "../Item/Item";
import erenImage from "../../assets/images/eren.jpeg";

function SuggestedFollow() {
  function handleClick() {
    //TODO
  }
  const hello = [];
  return (
    <div className={styles.container}>
      <Item text={"sindrigils"} svg={<img src={erenImage} alt="" />} />
      <div className={styles.user}>
        <span>Suggested for you</span>
        <span className={styles.user_see_all}>See All</span>
      </div>
      {/* TODO */}
      {hello.map((_, idx) => (
        <Item
          key={idx}
          text={""}
          svg={<img src={""} alt="" />}
          follow={handleClick}
        />
      ))}
      <div className={styles.footer}>
        <span>
          About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy
          &bull; Terms &bull; Locations &bull; Language &bull; Meta Verified
        </span>
        <p>&copy; 2023 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
export default SuggestedFollow;
