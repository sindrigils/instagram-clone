import styles from "./StoryList.module.css";
import Story from "../Story/Story";

const hello = [1, 2, 3, 4, 5, 6, 7, 8];

function StoryList() {
  return (
    <div className={styles.container}>
      {hello.map((index) => (
        <Story key={index} />
      ))}
    </div>
  );
}

export default StoryList;
