import { useSelector } from "react-redux";
import { useState } from "react";

import FlashMessage from "../../utils/alerts/Alerts";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import styles from "./CreatePost.module.css";
import { axiosInstance } from "../../axios";

function CreatePost({ onClose }) {
  const [flashMessage, setFlashMessage] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const { userId } = useSelector((state) => state.user);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFlashMessage(() => []);

    if (images.length === 0) {
      setFlashMessage((prevMsgs) => [
        ...prevMsgs,
        "You need to upload an image!",
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("description", description);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    try {
      const response = await axiosInstance.post("posts/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      onClose(false);
      setImages(() => []);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {flashMessage.length > 0 && (
          <span className={styles.alert}>
            <FlashMessage messages={flashMessage} onClose={setFlashMessage} />
          </span>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.header}>Create new post</div>
          <label>
            <textarea
              className={styles.description}
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              rows="4"
              cols="40"
            />
          </label>
          <div className={styles.imagesContainer}>
            <DragAndDrop images={images} setImages={setImages} />
          </div>
          <button className={styles.submitBtn}>Add post</button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
