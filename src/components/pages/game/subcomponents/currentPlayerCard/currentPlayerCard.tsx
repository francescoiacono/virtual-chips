import { Player } from '@/components/pages/setup/setup';
import styles from './currentPlayerCard.module.css';

interface Props {
  currentPlayer: Player;
}
export default function CurrentPlayerCard({ currentPlayer }: Props) {
  return (
    <div className={styles.playerCard}>
      <div className={styles.container}>
        <div className={styles.playerInfo}>
          <h2>{currentPlayer.name}</h2>
          {currentPlayer.isDealer && (
            <div className={styles.dealerButton}>D</div>
          )}
          <div className={styles.smallBlindButton}>SB</div>
          <div className={styles.bigBlindButton}>BB</div>
        </div>
        <div className={styles.gradientBorder}></div>
        <ul className={styles.totalChips}>
          <li>
            Total Chips: <span>30540450</span>
          </li>
          <li>
            To call: <span>400</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
