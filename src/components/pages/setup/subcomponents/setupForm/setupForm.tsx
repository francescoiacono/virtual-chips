'use client';

import { useState, useEffect } from 'react';
import SetupPlayers from '../setupPlayers/setupPlayers';
import { Player } from '../../setup';
import styles from './setupForm.module.css';

// Definition: Contains the form for setting up the game
export default function SetupForm() {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [pageData, setPageData] = useState({
    numberOfPlayers: 0,
    startingChips: 10,
    smallBlind: 5,
    players: [] as Player[],
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // If the number of players is changed, then the players array is updated
    if (event.target.name === 'numberOfPlayers') {
      const numberOfPlayers = Number(event.target.value);
      if (Number.isNaN(numberOfPlayers)) {
        setPageData({
          ...pageData,
          numberOfPlayers: 0,
          players: [],
        });
      } else {
        setPageData((prevState) => {
          const players = Array.from(
            { length: numberOfPlayers },
            (_, index) => ({
              name: '',
              isDealer: false,
            })
          );

          return {
            ...prevState,
            numberOfPlayers,
            players,
          };
        });
      }
      return;
    }

    // Any other value updates the state
    setPageData({
      ...pageData,
      [event.target.name]:
        event.target.type === 'number'
          ? Number(event.target.value)
          : event.target.value,
    });
  };

  const updatePlayerStatus = (index: number, playerInfo: Player) => {
    const updatedPlayers = pageData.players.map((player, i) => {
      if (i === index) {
        return {
          ...player,
          name: playerInfo.name,
          isDealer: playerInfo.isDealer,
        };
      } else {
        return {
          ...player,
          isDealer: false,
        };
      }
    });

    setPageData({
      ...pageData,
      players: updatedPlayers,
    });
  };

  useEffect(() => {
    console.log(pageData);
  }, [pageData]);

  return (
    <>
      <h2>Setup</h2>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <div className={styles.container}>
          <div className={styles.rules}>
            <label>
              <span>Number of players</span>
              <input
                type='number'
                name='numberOfPlayers'
                onChange={onChangeHandler}
                min='0'
                max='10'
                value={pageData.numberOfPlayers}
              />
            </label>
            <label>
              <span>Starting chips</span>
              <input
                type='number'
                name='startingChips'
                onChange={onChangeHandler}
                min='10'
                value={pageData.startingChips}
              />
            </label>
            <label>
              <span>Small blind</span>
              <input
                type='number'
                name='smallBlind'
                onChange={onChangeHandler}
                min='5'
                value={pageData.smallBlind}
              />
            </label>
          </div>
          <SetupPlayers
            updatePlayer={updatePlayerStatus}
            players={pageData.players}
          />
        </div>
        <button type='submit'>Start</button>
      </form>
    </>
  );
}
