import styles from './DisplayBoard.module.css';
import clsx from 'clsx';

const DisplayBoard = ({ numbersOnBoard }) => {
  return (
    <ul className={styles.numbersBoard}>
      {numbersOnBoard.map(({ number, isNumberGuessed }, i) => (
        <li
          key={i}
          className={clsx(
            styles.boardNumber,
            isNumberGuessed ? styles.boardNumberGuessed : styles.boardNumberHidden
          )}
        >
          {isNumberGuessed ? number : null}
        </li>
      ))}
    </ul>
  );
};

export default DisplayBoard;
