import { useEffect, useRef, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import styles from "./Messenger.module.css";
import MessageList from "./MessageList";
import InputArea from "./InputArea";

const Messenger = () => {
  const [messageList, setMessageList] = useState([]);

  const handleAddMessage = (text) => {
    const newMessageObj = {
      id: new Date().getTime(),
      text,
      likes: 0,
      dislikes: 0,
    };
    setMessageList((prev) => [...prev, newMessageObj]);
  };

  const inputRef = useRef(null);
  const scrollRef = useRef(null); 

  const handleDeleteMessage = (id) =>
    setMessageList((prev) => prev.filter((message) => message.id !== id));

  const handleLikeClick = (id) =>
    setMessageList((prev) =>
      prev.map((message) =>
        message.id !== id ? message : { ...message, likes: message.likes + 1 }
      )
    );

  const handleDislikeClick = (id) => {
    setMessageList((prev) =>
      prev.map((message) =>
        message.id !== id
          ? message
          : { ...message, dislikes: message.dislikes + 1 }
      )
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollTop = el.scrollHeight;
  }, [messageList]);

  return (
    <div className={styles.chatWrapper}>
      <header className={styles.chatHeader}>
        <div className={styles.chatTitleBlock}>
          <h2 className={styles.chatTitle}>Messenger</h2>
          <p className={styles.chatSubtitle}>
            Невеличкий чат з лайками / дизлайками
          </p>
        </div>
        <div className={styles.chatIconBadge} aria-hidden="true">
          <FiMessageCircle />
        </div>
      </header>

      <div className={styles.chatBody}>
        <div ref={scrollRef} className={styles.messagesScroll}>
          {!!messageList.length && (
            <MessageList
              list={messageList}
              {...{ handleDeleteMessage, handleLikeClick, handleDislikeClick }}
            />
          )}
        </div>

        <InputArea {...{ handleAddMessage, inputRef }} />
      </div>
    </div>
  );
};

export default Messenger;
