import { FiThumbsUp, FiThumbsDown, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";
import styles from "./MessageItem.module.css";

const MessageItem = ({
  message,
  align, 
  handleDeleteMessage,
  handleLikeClick,
  handleDislikeClick,
}) => {
  return (
    <article
      className={clsx(
        styles.messageBubble,
        styles[align] 
      )}
    >
      <p className={styles.messageText}>{message.text}</p>

      <div className={styles.messageFooter}>
        <div className={styles.actionsLeft}>
          <button
            type="button"
            aria-label="Like message"
            onClick={() => handleLikeClick(message.id)}
            className={clsx(styles.iconButton, styles.likeButton)}
          >
            <FiThumbsUp />
            <span>{message.likes || 0}</span>
          </button>

          <button
            type="button"
            aria-label="Dislike message"
            onClick={() => handleDislikeClick(message.id)}
            className={clsx(styles.iconButton, styles.dislikeButton)}
          >
            <FiThumbsDown />
            <span>{message.dislikes || 0}</span>
          </button>
        </div>

        <div className={styles.actionsRight}>
          <button
            type="button"
            aria-label="Delete message"
            onClick={() => handleDeleteMessage(message.id)}
            className={clsx(styles.iconButton, styles.deleteButton)}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </article>
  );
};

export default MessageItem;
