import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./GuessNumbers.module.css";
import PlayerPanel from "./PlayerPanel";
import DisplayBoard from "./DisplayBoard";
import LooserMessage from "./LooserMessage";

const generateRandomDigit = () => Math.floor(Math.random() * 10);

const GuessNumbers = () => {
  const [numbersToGuess, setNumbersToGuess] = useState(() => [
    generateRandomDigit(),
    generateRandomDigit(),
    generateRandomDigit(),
  ]);
  const [usersPlayedNumbers, setUsersPlayedNumbers] = useState([
    { id: 1, playedNumbers: [] },
    { id: 2, playedNumbers: [] },
  ]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [errorMessages, setErrorMessages] = useState([
    { id: 1, message: "" },
    { id: 2, message: "" },
  ]);
  const inputRef_1 = useRef(null);
  const inputRef_2 = useRef(null);

  const playedNumbers_1 = usersPlayedNumbers[0].playedNumbers;
  const playedNumbers_2 = usersPlayedNumbers[1].playedNumbers;

  const isNumberGuessed = (number) =>
    playedNumbers_1.includes(number) || playedNumbers_2.includes(number);

  const numbersOnBoard = numbersToGuess.map((number) =>
    isNumberGuessed(number)
      ? { number, isNumberGuessed: true }
      : { number, isNumberGuessed: false }
  );

  const isGameFinished = numbersOnBoard.every(
    ({ isNumberGuessed }) => isNumberGuessed
  );

  const isButtonDisabled = (id) => {
    if (!isGameStarted || isGameFinished) return true;
    const activeId = playedNumbers_1.length === playedNumbers_2.length ? 2 : 1;
    return id === activeId;
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
  };

  const handleNewGame = () => {
    setIsGameStarted(false);
    setUsersPlayedNumbers([
      { id: 1, playedNumbers: [] },
      { id: 2, playedNumbers: [] },
    ]);
    setNumbersToGuess([
      generateRandomDigit(),
      generateRandomDigit(),
      generateRandomDigit(),
    ]);
    setErrorMessages([
      { id: 1, message: "" },
      { id: 2, message: "" },
    ]);
  };

  const getHandleChooseNumber = (id) => {
    return (chosenNumber) => {
      const isEmpty =
        typeof chosenNumber === "string" && chosenNumber.trim().length === 0;

      const hasBeenPlayed =
        playedNumbers_1.includes(chosenNumber) ||
        playedNumbers_2.includes(chosenNumber);

      setErrorMessages((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                message: hasBeenPlayed
                  ? "Число вже було вибранo"
                  : isEmpty
                  ? "Введіть число"
                  : "",
              }
            : user
        )
      );

      if (hasBeenPlayed || isEmpty) {
        if (id === 1) inputRef_1.current?.focus();
        else inputRef_2.current?.focus();
        return;
      }

      if (id === 1) {
        inputRef_2.current?.focus();
      } else {
        inputRef_1.current?.focus();
      }

      setUsersPlayedNumbers((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...user, playedNumbers: [...user.playedNumbers, chosenNumber] }
            : user
        )
      );
    };
  };

  const getUserProps = (id) => {
    const index = usersPlayedNumbers.findIndex((user) => user.id === id);

    return {
      id,
      guessedNumbers: usersPlayedNumbers[index].playedNumbers.filter((num) =>
        numbersToGuess.includes(num)
      ),
      playedNumbers: usersPlayedNumbers[index].playedNumbers,
      handleChooseNumber: getHandleChooseNumber(id),
      isButtonDisabled: isButtonDisabled(id),
      errorMessage: errorMessages[index].message,
      ref: id === 1 ? inputRef_1 : inputRef_2,
    };
  };

  const usersProps = [getUserProps(1), getUserProps(2)];

  const getLooserId = () => {
    if (!isGameFinished) return;
    const [user_1, user_2] = usersPlayedNumbers;
    return user_1.playedNumbers.length === user_2.playedNumbers.length ? 2 : 1;
  };

  useEffect(() => {
    if (isGameStarted) {
      inputRef_1.current?.focus();
    }
  }, [isGameStarted]);

  const activePlayerId =
    playedNumbers_1.length === playedNumbers_2.length ? 1 : 2;

  return (
    <div className={styles.gameField}>
      <header className={styles.gameHeader}>
        <div>
          <h2 className={styles.gameTitle}>Гра в числа</h2>
          <p className={styles.gameSubtitle}>
            Вгадай 3 цифри раніше за суперника
          </p>
        </div>
        <span className={styles.roundBadge}>
          {isGameStarted ? "Поточна партія" : "Очікування старту"}
        </span>
      </header>

      <div className={styles.gameStatusBar}>
        <div
          className={clsx(
            styles.statusPill,
            isGameStarted && !isGameFinished
              ? styles.statusPillActive
              : styles.statusPillDisabled
          )}
        >
          <span className={styles.statusDot} />
          {isGameFinished
            ? "Гру завершено"
            : isGameStarted
            ? `Хід гравця ${activePlayerId}`
            : "Натисніть «Розпочати гру»"}
        </div>
      </div>

      <div className={styles.looserMessageHolder}>
        {isGameFinished ? (
          <LooserMessage looserId={getLooserId()} />
        ) : (
          <span className={styles.placeholder} />
        )}
      </div>

      <DisplayBoard numbersOnBoard={numbersOnBoard} />

      <div className={styles.playersPanels}>
        {usersProps.map((user) => (
          <PlayerPanel key={user.id} {...user} />
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <button
          type="button"
          onClick={handleGameStart}
          disabled={isGameStarted}
          className={clsx(styles.gameButton, styles.gameButtonPrimary)}
        >
          Poзпочати гру
        </button>
        <button
          type="button"
          onClick={handleNewGame}
          disabled={!isGameStarted}
          className={clsx(styles.gameButton, styles.gameButtonSecondary)}
        >
          Розпочати нову партію
        </button>
      </div>

      <p className={styles.gameFooterHint}>
        Гравці ходять по черзі. Цифра від 0 до 9, повтори заборонені.
      </p>
    </div>
  );
};

export default GuessNumbers;
