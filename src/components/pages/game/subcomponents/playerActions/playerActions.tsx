'use client';
import styles from './playerActions.module.css';

interface Props {
  testEndTurn: () => void;
}

export default function PlayerActions({ testEndTurn }: Props) {
  return (
    <div className={styles.actions}>
      <button onClick={testEndTurn}>Fold</button>
      <button>Check</button>
      <button>Call</button>
      <button>Raise</button>
    </div>
  );
}
