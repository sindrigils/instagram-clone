import { useSelector } from "react-redux";
import styles from "./Homepage.module.css";
import Post from "../../components/Post/Post";
import StoryList from "../../components/StoryList/StoryList";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestedFollow from "../../components/SuggestedFollow/SuggestedFollow";
import LoginForm from "../../components/LoginForm/LoginForm";
import Spinner from "../../components/Spinner/Spinner";

function Home() {
  const { isLoading, userId } = useSelector((state) => state.user);
  if (isLoading) return <Spinner />;
  return (
    <>
      {userId ? (
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className={styles.main_container}>
            <div className={styles.story_list}>
              <StoryList />
            </div>
            <div className={styles.posts}>
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
          <div className={styles.suggested_container}>
            <SuggestedFollow />
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default Home;
