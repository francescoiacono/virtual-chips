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
          {currentPlayer.isSmallBlind && (
            <div className={styles.smallBlindButton}>SB</div>
          )}
          {currentPlayer.isBigBlind && (
            <div className={styles.bigBlindButton}>BB</div>
          )}
        </div>
        <div className={styles.gradientBorder}></div>
        <ul className={styles.totalChips}>
          <li>
            Total Chips: <span>{currentPlayer.chips}</span>
          </li>
          <li>
            To call: <span>999</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
