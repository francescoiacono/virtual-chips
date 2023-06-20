'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './game.module.css';

export default function Game() {
  const searchParams = useSearchParams();

  const [pageData, setPageData] = useState({
    numberOfPlayers: searchParams.get('numberOfPlayers'),
    startingChips: searchParams.get('startingChips'),
    smallBlind: searchParams.get('smallBlind'),
    players: JSON.parse(searchParams.get('players')),
  });

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(pageData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {pageData.players.map((player: any, key) => {
          return (
            <div key={key} className={styles.playerCard}>
              <div>{player.name}</div>
              <div>Chips: {pageData.startingChips}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
