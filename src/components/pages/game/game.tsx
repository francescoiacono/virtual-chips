'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Player } from '@/components/pages/setup/setup';
import StageTracker from './subcomponents/stageTracker/stageTracker';
import PotTracker from './subcomponents/potTracker/potTracker';
import styles from './game.module.css';
import BlindsDisplay from './subcomponents/blindsDisplay/blindsDisplay';
import CurrentPlayerCard from './subcomponents/currentPlayerCard/currentPlayerCard';
import PlayerActions from './subcomponents/playerActions/playerActions';

export default function Game() {
  const searchParams = useSearchParams();

  const [pageData, setPageData] = useState({
    numberOfPlayers: searchParams.get('numberOfPlayers'),
    startingChips: searchParams.get('startingChips'),
    smallBlind: searchParams.get('smallBlind'),
    players: JSON.parse(searchParams.get('players') || '[]') as Player[],
  });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [potValue, setPotValue] = useState(0);
  const [stage, setStage] = useState('Pre-flop');

  const endTurn = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % pageData.players.length);
  };

  return (
    <section className={styles.container}>
      <div className={styles.topActions}>
        <StageTracker />
        <PotTracker pot={0} />
        <div>Players</div>
        <BlindsDisplay smallBlind={Number(pageData.smallBlind)} />
      </div>
      <div className={styles.card}>
        <CurrentPlayerCard
          currentPlayer={pageData.players[currentPlayerIndex]}
        />
      </div>
      <PlayerActions />
    </section>
  );
}
