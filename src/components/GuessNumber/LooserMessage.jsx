import styles from "./LooserMessage.module.css";

const LooserMessage = ({ looserId }) => {
  return (
    <h3 className={styles.looserMessage}>
      Гравець {looserId} програв!
    </h3>
  );
};

export default LooserMessage;


