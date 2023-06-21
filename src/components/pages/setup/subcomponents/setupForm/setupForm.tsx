'use client';

import { useState, useEffect } from 'react';
import { Player } from '../../setup';
import { useRouter } from 'next/navigation';
import SetupPlayers from '../setupPlayers/setupPlayers';
import styles from './setupForm.module.css';

// Definition: Contains the form for setting up the game
export default function SetupForm() {
  const router = useRouter();

  // STATE
  const [pageData, setPageData] = useState({
    numberOfPlayers: 2,
    startingChips: 10,
    smallBlind: 5,
    players: [
      {
        name: '',
        chips: 0,
        isDealer: false,
        isSmallBlind: false,
        isBigBlind: false,
      },
      {
        name: '',
        chips: 0,
        isDealer: false,
        isSmallBlind: false,
        isBigBlind: false,
      },
    ] as Player[],
  });

  // FORM SUBMISSION HANDLER
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const players = giveSettingValuesToPlayers(pageData.players);

    const queryParams = new URLSearchParams({
      numberOfPlayers: pageData.numberOfPlayers.toString(),
      startingChips: pageData.startingChips.toString(),
      smallBlind: pageData.smallBlind.toString(),
      players: JSON.stringify(players),
    });

    router.push('/game' + '?' + queryParams.toString());
  };

  // INPUT CHANGE HANDLER
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // If the number of players is changed, then the players array is updated
    if (event.target.name === 'numberOfPlayers') {
      let numberOfPlayers = Number(event.target.value);

      // If the value is not a number, then the state is reset
      if (Number.isNaN(numberOfPlayers)) {
        setPageData({
          ...pageData,
          numberOfPlayers: 2,
        });
      }

      // If the value is a number
      else {
        // If the value is greater than 10, then it is set to 10
        if (numberOfPlayers > 10) {
          numberOfPlayers = 10;
        }
        // If the value is less than 2, then it is set to 2
        if (numberOfPlayers < 2) {
          numberOfPlayers = 2;
        }

        // The state is updated
        setPageData((prevState) => {
          const players = prevState.players.slice(0, numberOfPlayers);

          if (numberOfPlayers > players.length) {
            // Add new players to the array
            for (let i = players.length; i < numberOfPlayers; i++) {
              players.push({
                name: '',
                chips: 0,
                isDealer: false,
                isSmallBlind: false,
                isBigBlind: false,
              });
            }
          } else if (numberOfPlayers < players.length) {
            // Remove players from the array
            players.splice(numberOfPlayers);
          }

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

  const giveSettingValuesToPlayers = (players: Player[]) => {
    let updatedPlayers = [...players];

    // Give all a name if no name and starting chips if no chips
    updatedPlayers.map((player, key) => {
      const updatedPlayer = player;
      if (player.name === '') {
        updatedPlayer.name = `Player ${key + 1}`;
      }
      if (player.chips === 0) {
        updatedPlayer.chips = pageData.startingChips;
      }
      return updatedPlayer;
    });

    let dealerIndex = updatedPlayers.findIndex((player) => player.isDealer);
    const numberOfPlayers = updatedPlayers.length;

    if (dealerIndex === -1) {
      // If no one is a dealer, set the first player as the dealer
      dealerIndex = 0;
      updatedPlayers[dealerIndex].isDealer = true;
    }

    if (numberOfPlayers === 2) {
      // If there are only 2 players and a dealer exists, set the next player as the small blind and the one after as the big blind
      const smallBlindIndex = dealerIndex % numberOfPlayers;
      const bigBlindIndex = (dealerIndex + 1) % numberOfPlayers;
      updatedPlayers[smallBlindIndex].isSmallBlind = true;
      updatedPlayers[bigBlindIndex].isBigBlind = true;
    } else {
      // More than 3 players a dealer exists, set the next player as the small blind and the one after as the big blind
      const smallBlindIndex = (dealerIndex + 1) % numberOfPlayers;
      const bigBlindIndex = (dealerIndex + 2) % numberOfPlayers;
      updatedPlayers[smallBlindIndex].isSmallBlind = true;
      updatedPlayers[bigBlindIndex].isBigBlind = true;
    }

    return updatedPlayers;
  };

  // SINGLE PLAYER CARD INFO CHANGE HANDLER (passed into SetupPlayers component)
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

  return (
    <>
      <h3>Choose your settings:</h3>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <div className={styles.container}>
          <div className={styles.rules}>
            <label>
              <span>Number of players</span>
              <input
                type='number'
                name='numberOfPlayers'
                onChange={onChangeHandler}
                min='2'
                max='10'
                value={pageData.numberOfPlayers}
              />
            </label>
            <label>
              <span>Starting chips (p.p.)</span>
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
                max={pageData.startingChips / 2}
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
