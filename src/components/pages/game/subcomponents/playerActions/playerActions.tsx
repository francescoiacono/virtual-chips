import styles from './playerActions.module.css';

export default function PlayerActions() {
  return (
    <div className={styles.actions}>
      <button>Fold</button>
      <button>Check</button>
      <button>Call</button>
      <button>Raise</button>
    </div>
  );
}
