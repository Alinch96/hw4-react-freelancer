import { useState } from "react";
import { FiSend } from "react-icons/fi";
import clsx from "clsx";
import styles from "./InputArea.module.css";

const InputArea = ({ handleAddMessage, inputRef }) => {
  const [inputValue, setInputValue] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) return;
    handleAddMessage(inputValue);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const isButtonDisabled = inputValue.trim().length === 0;

  return (
    <form className={styles.inputAreaWrapper} onSubmit={handleMessageSubmit}>
      <textarea
        ref={inputRef}
        rows={2}
        className={styles.textarea}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Напишіть повідомлення..."
      />
      <button
        type="submit"
        disabled={isButtonDisabled}
        className={clsx(styles.sendButton)}
        aria-label="Надіслати повідомлення"
      >
        <FiSend />
      </button>
    </form>
  );
};

export default InputArea;
