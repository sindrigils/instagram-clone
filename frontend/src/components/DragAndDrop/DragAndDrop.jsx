import { useRef, useState } from "react";
import styles from "./DragAndDrop.module.css";

function DragAndDrop({ images, setImages }) {
  const [imagesURL, setImagesURL] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(e) {
    const files = e.target.files;
    if (files.length === 0) return;
    const newImages = Array.from(files);

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [...prevImages, newImages[i]]);
        setImagesURL((prevUrls) => [
          ...prevUrls,
          { url: URL.createObjectURL(newImages[i]) },
        ]);
      }
    }
  }

  function deleteImage(idx) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== idx));
    setImagesURL((prevUrls) => prevUrls.filter((_, i) => i !== idx));
  }

  function onDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function onDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    const newImages = Array.from(files);
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [...prevImages, newImages[i]]);
        setImagesURL((prevUrls) => [
          ...prevUrls,
          { url: URL.createObjectURL(newImages[i]) },
        ]);
      }
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <p>Drag & and Drop image uploading</p>
      </div>
      <div
        className={styles.drag_area}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <span className={styles.select}>Drop images here</span>
        ) : (
          <>
            {" "}
            Drag & Drop image here or
            <span className={styles.select} role="button" onClick={selectFiles}>
              Browse
            </span>
          </>
        )}

        <input
          type="file"
          name="file"
          className={styles.file}
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        />
      </div>
      <div className={styles.container}>
        {imagesURL.map((image, idx) => (
          <div className={styles.image} key={idx}>
            <span className={styles.delete} onClick={() => deleteImage(idx)}>
              &times;
            </span>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragAndDrop;
