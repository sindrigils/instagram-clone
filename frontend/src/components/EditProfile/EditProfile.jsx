import { useSelector } from "react-redux";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

import styles from "./EditProfile.module.css";

import useCurrentProfile from "../../services/useCurrentProfile";

function EditProfile() {
  const { setProfile } = useCurrentProfile();
  const [currentProfilePic, setCurrentProfilePic] = useState(null);
  const { userId, profilePic, bio, isLoading } = useSelector(
    (state) => state.user
  );
  const [currentBio, setCurrentBio] = useState(bio ? bio : "");
  const [currentCharCount, setCurrentCharCount] = useState(
    bio ? bio.length : 0
  );

  if (isLoading) return <Spinner />;

  const handleTextareaInput = (e) => {
    const currentCount = e.target.value.length;
    setCurrentBio(e.target.value);
    setCurrentCharCount(currentCount);
  };

  function handleProfilePicChange(e) {
    const file = e.target.files[0];
    setCurrentProfilePic(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bioValue = formData.get("bio");
    const imageFile = formData.get("image");

    formData.append("bio", bioValue);
    formData.append("image", imageFile);
    setProfile(userId, formData);
  }

  return (
    <form className={styles.form} action="" onSubmit={handleSubmit}>
      <p className={styles.header}>Edit Profile</p>
      <div className={styles.changePhoto}>
        <div className={styles.profile}>
          <img
            className={styles.profilePic}
            src={
              currentProfilePic
                ? URL.createObjectURL(currentProfilePic)
                : `http://localhost:8000/${profilePic}`
            }
            alt=""
          />{" "}
          <p className={styles.bold}>sindriigils</p>
        </div>

        <label className={styles.change}>
          Change photo
          <input
            className={styles.fileInput}
            name="image"
            type="file"
            onChange={handleProfilePicChange}
          />
        </label>
      </div>
      <div className={styles.bio}>
        <p className={styles.bold}>Bio</p>
        <textarea
          className={styles.bioTextarea}
          name="bio"
          id=""
          rows="3"
          placeholder={currentBio ? "" : "Bio"}
          defaultValue={currentBio || "Bio"}
          maxLength={150}
          onInput={handleTextareaInput}
        ></textarea>
        <span className={styles.chaCount}>{currentCharCount} / 150</span>
      </div>
      <div className={styles.submitContainer}>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default EditProfile;
