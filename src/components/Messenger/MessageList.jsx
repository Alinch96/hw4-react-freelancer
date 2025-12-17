import MessageItem from "./MessageItem";
import styles from "./MessageList.module.css";

const MessageList = ({
  list,
  handleDeleteMessage,
  handleLikeClick,
  handleDislikeClick,
}) => {
  return (
    <ul className={styles.messageList}>
      {list.map((message, index) => (
        <li key={message.id} className={styles.messageItem}>
          <MessageItem
            message={message}
            align={index % 2 === 0 ? "messageLeft" : "messageRight"}
            handleDeleteMessage={handleDeleteMessage}
            handleLikeClick={handleLikeClick}
            handleDislikeClick={handleDislikeClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
