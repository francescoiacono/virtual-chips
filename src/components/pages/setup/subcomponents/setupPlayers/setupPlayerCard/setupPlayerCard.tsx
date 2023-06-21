'use client';

import { useEffect, useState } from 'react';
import { Player } from '../../../setup';

import styles from './setupPlayerCard.module.css';

interface Props {
  player: Player;
  id: number;
  updatePlayer: (index: number, player: any) => void;
}

export default function SetupPlayerCard({ player, id, updatePlayer }: Props) {
  const [playerData, setPlayerData] = useState(player);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerData({
      ...playerData,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  useEffect(() => {
    updatePlayer(id - 1, playerData);
  }, [playerData]);

  return (
    <div className={styles.card}>
      <h3>👤 Player {id}</h3>
      <label className={styles.nameLabel}>
        <span>Name</span>
        <input type='text' name='name' onChange={onChangeHandler} />
      </label>
      <label>
        <span>is dealer?</span>
        <input
          type='checkbox'
          name='isDealer'
          onChange={onChangeHandler}
          checked={player.isDealer}
        />
      </label>
    </div>
  );
}
