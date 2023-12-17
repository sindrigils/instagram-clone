import CustomAlert from "./CustomAlert";

const FlashMessage = ({ messages, onClose, styles }) => {
  const handleClose = (index) => {
    onClose((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };
  return (
    <>
      {messages.map((message, index) => (
        <CustomAlert
          key={index}
          variant={"danger"}
          onClose={() => handleClose(index)}
          customStyles={styles}
        >
          {message}
        </CustomAlert>
      ))}
    </>
  );
};

export default FlashMessage;
