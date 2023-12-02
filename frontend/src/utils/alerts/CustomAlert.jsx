import styles from "./CustomAlert.module.css";

const CustomAlert = ({ children, onClose }) => {
  return (
    <div className={styles.alert_container}>
      <strong>{children}</strong>
      <span className={styles.close_icon} onClick={onClose}>
        &times;
      </span>
    </div>
  );
};

export default CustomAlert;
