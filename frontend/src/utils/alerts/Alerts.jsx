import CustomAlert from "./CustomAlert";

const FlashMessage = ({ messages, onClose }) => {
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
        >
          {message}
        </CustomAlert>
      ))}
    </>
  );
};

export default FlashMessage;
