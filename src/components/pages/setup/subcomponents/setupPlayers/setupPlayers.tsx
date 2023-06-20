import SetupPlayerCard from './setupPlayerCard/setupPlayerCard';
import { Player } from '../../setup';

import styles from './setupPlayers.module.css';

interface Props {
  players: Player[];
  updatePlayer: (index: number, player: Player) => void;
}

export default function SetupPlayers({ players, updatePlayer }: Props) {
  return (
    <div className={styles.container}>
      {players.map((player, key) => (
        <SetupPlayerCard
          updatePlayer={updatePlayer}
          player={player}
          key={key}
          id={key + 1}
        />
      ))}
    </div>
  );
}
