import { FetchNewCard } from "@/Utils/cardUtils";
import { FetchNewDeck } from "@/Utils/deckUtils";
import DeckImage from "@/components/DeckImage";
import PlayerHUD from "@/components/PlayerHUD";
import Score from "@/components/Score";
import Title from "@/components/Title";
import { Card, Deck } from "@/types/types";
import React, { useEffect, useState } from "react";

function index() {
  const [deck, setDeck] = useState<Deck>();
  const [card, setCard] = useState<Card | null>(null);
  const [totalCardsDrawedPlayerOne, setTotalCardsDrawedPlayerOne] = useState(0);
  const [totalCardsDrawedPlayerTwo, setTotalCardsDrawedPlayerTwo] = useState(0);
  const [loadingNewCard, setLoadingNewCard] = useState(true);
  const [cardPlayerOne, setCardPlayerOne] = useState<Card | null>(null);
  const [cardPlayerTwo, setCardPlayerTwo] = useState<Card | null>(null);
  const [cardsSumPlayerOne, setCardsSumPlayerOne] = useState(0);
  const [cardsSumPlayerTwo, setCardsSumPlayerTwo] = useState(0);
  const [scorePlayerOne, setScorePlayerOne] = useState(0);
  const [scorePlayerTwo, setScorePlayerTwo] = useState(0);
  const [playerOneTurn, setPlayerOneTurn] = useState(true);

  const handleNewDeck = async () => {
    await FetchNewDeck(setDeck);
    setCardPlayerOne(null);
    setCardPlayerTwo(null);
    setPlayerOneTurn(true);
    setCardsSumPlayerOne(0);
    setCardsSumPlayerTwo(0);
    setTotalCardsDrawedPlayerOne(0);
    setTotalCardsDrawedPlayerTwo(0);
  };

  useEffect(() => {
    changeCard();
  }, [deck, playerOneTurn]);

  const handleWinner = (
    playerSum: number,
    playerScore: number,
    setPlayerScore: (score: number) => void
  ) => {
    if (playerSum == 21) {
      setPlayerScore(playerScore + 1);
      return;
    }
  };

  useEffect(() => {
    handleWinner(cardsSumPlayerOne, scorePlayerOne, setScorePlayerOne);
    handleWinner(cardsSumPlayerTwo, scorePlayerTwo, setScorePlayerTwo);
  }, [cardsSumPlayerOne, cardsSumPlayerTwo]);

  const changeCard = async () => {
    if (deck) {
      setLoadingNewCard(true);
      try {
        await FetchNewCard(deck, setCard);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingNewCard(false);
      }
    }
  };

  const handleNewCard = (
    setPlayerCard: (card: Card) => void,
    setCardsSum: (value: number) => void,
    currentSum: number,
    totalCardsDrawed: number,
    setTotalCardsDrawed: (total: number) => void
  ) => {
    if (card) {
      setPlayerCard(card);
      setCardsSum(currentSum + card.value);
      setTotalCardsDrawed(totalCardsDrawed + 1);
    }
    setPlayerOneTurn(!playerOneTurn);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-10">
      <Title>{"Blackjack game"}</Title>
      <div className="flex flex-col w-fit justify-center items-center">
        <DeckImage hasDeck={deck ? true : false} />
      </div>

      <div className="w-full h-full flex flex-row mt-28">
        <PlayerHUD
          key={"player_1"}
          card={cardPlayerOne}
          hasDeck={deck ? true : false}
          secondPlayer={false}
          playerName="player 1"
          cardsSum={cardsSumPlayerOne}
          drawNewCard={() =>
            handleNewCard(
              setCardPlayerOne,
              setCardsSumPlayerOne,
              cardsSumPlayerOne,
              totalCardsDrawedPlayerOne,
              setTotalCardsDrawedPlayerOne
            )
          }
          playerTurn={playerOneTurn}
          loadingCard={loadingNewCard}
          totalCardsDrawed={totalCardsDrawedPlayerOne}
        />
        <Score
          scorePlayerOne={scorePlayerOne}
          scorePlayerTwo={scorePlayerTwo}
          handleDeck={handleNewDeck}
        />
        <PlayerHUD
          key={"player_2"}
          card={cardPlayerTwo}
          hasDeck={deck ? true : false}
          secondPlayer
          playerName="player 2"
          cardsSum={cardsSumPlayerTwo}
          drawNewCard={() =>
            handleNewCard(
              setCardPlayerTwo,
              setCardsSumPlayerTwo,
              cardsSumPlayerTwo,
              totalCardsDrawedPlayerTwo,
              setTotalCardsDrawedPlayerTwo
            )
          }
          playerTurn={!playerOneTurn}
          loadingCard={loadingNewCard}
          totalCardsDrawed={totalCardsDrawedPlayerTwo}
        />
      </div>
    </div>
  );
}

export default index;
