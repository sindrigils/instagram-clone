import { useParams } from "react-router-dom";
import { useState } from "react";

import CreatePost from "../../components/CreatePost/CreatePost";
import Sidebar from "../../components/Sidebar/Sidebar";
import Spinner from "../../components/Spinner/Spinner";

import CrossSvg from "../../assets/svgs/CrossSvg";

import styles from "./ProfilePage.module.css";
import { useSelector } from "react-redux";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import useUserProfile from "../../services/useUserProfile";
import ErrorPage from "../ErrorPage/ErrorPage";
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts";

function ProfilePage() {
  const { isLoading, invalidUser } = useSelector((state) => state.profile);
  const [addPostModal, setAddPostModal] = useState(false);
  const { str: paramsUsername } = useParams();
  const { username } = useSelector((state) => state.user);

  useUserProfile(paramsUsername, username);

  if (isLoading) return <Spinner />;
  if (invalidUser) return <ErrorPage />;

  const openAddPostModal = function (e) {
    setAddPostModal(true);
  };

  const closeAddPostModal = function (e) {
    if (!e.target.classList.contains(styles.modalBackdrop)) return;
    setAddPostModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.profile_container}>
          <ProfileHeader openAddPostModal={openAddPostModal} />
          <div className={styles.highlights_container}>
            <div>
              <div className={styles.highlights_svg_container}>
                <CrossSvg />
              </div>
              <span>New</span>
            </div>
          </div>

          <div className={styles.posts_container}>
            <ProfilePosts />
          </div>
        </div>
      </div>

      {addPostModal && (
        <div className={styles.modalBackdrop} onClick={closeAddPostModal}>
          <CreatePost onClose={setAddPostModal} />
        </div>
      )}
    </>
  );
}

export default ProfilePage;
