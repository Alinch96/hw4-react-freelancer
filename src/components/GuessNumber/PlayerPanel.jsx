import { useId, useState } from "react";
import clsx from "clsx";
import styles from "./PlayerPanel.module.css";

const PlayerPanel = ({
  id,
  guessedNumbers,
  handleChooseNumber,
  playedNumbers,
  isButtonDisabled,
  errorMessage,
  ref,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const userAnswerId = useId();

  const handleInputChange = (e) => {
    const trimmed = e.target.value.trim();
    const isEmptyInput = trimmed.length === 0;
    const value = isEmptyInput ? e.target.value : Number(trimmed);
    setUserAnswer(value);
  };

  const handleClick = () => {
    handleChooseNumber(userAnswer);
    setUserAnswer("");
  };

  const isActive = !isButtonDisabled;

  return (
    <div className={styles.playerWrapper}>
      <div className={styles.playerHeader}>
        <h3 className={styles.playerTitle}>Гравець {id}</h3>
        <span
          className={clsx(
            styles.turnTag,
            isActive && styles.turnTagActive
          )}
        >
          {isActive ? "Ваш хід" : "Очікування"}
        </span>
      </div>

      <div className={styles.fieldsGrid}>
        <div className={styles.playedNumbersWrapper}>
          <p className={styles.sectionTitle}>Вибрані цифри</p>
          {playedNumbers.length > 0 && (
            <ul className={styles.playedNumbersList}>
              {playedNumbers.map((num, i) => (
                <li key={i} className={styles.playedNumbersItem}>
                  {num}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.guessedNumbersWrapper}>
          <p className={styles.sectionTitle}>Вгадані цифри</p>
          {guessedNumbers.length > 0 && (
            <ul className={styles.guessedNumbersList}>
              {guessedNumbers.map((num, i) => (
                <li key={i} className={styles.guessedNumbersItem}>
                  {num}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.userAnswerWrapper}>
        <div className={styles.inputLabelRow}>
          <label htmlFor={userAnswerId} className={styles.userAnswerLabel}>
            Ваш хід
          </label>
          {errorMessage && (
            <span className={styles.errorMessage}>{errorMessage}</span>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            className={styles.answerInput}
            type="number"
            id={userAnswerId}
            min="0"
            max="9"
            value={userAnswer}
            onChange={handleInputChange}
          
          />
          <button
            type="button"
            onClick={handleClick}
            disabled={isButtonDisabled}
            className={styles.submitMoveButton}
          >
            Зробити хід
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
