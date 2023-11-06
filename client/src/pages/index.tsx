import { FetchNewCard } from "@/Utils/cardUtils";
import { FetchNewDeck } from "@/Utils/deckUtils";
import DeckImage from "@/components/DeckImage";
import PlayerHUD from "@/components/PlayerHUD";
import Score from "@/components/Score";
import Title from "@/components/Title";
import WinModal from "@/components/WinModal";
import { Card, Deck } from "@/types/types";
import React, { useEffect, useState } from "react";

function index() {
  const [deck, setDeck] = useState<Deck>();
  const [card, setCard] = useState<Card | null>(null);
  const [loadingNewCard, setLoadingNewCard] = useState(true);

  const [player_1] = useState("Player 1");
  const [player_2] = useState("Player 2");

  const [totalCardsDrawedPlayerOne, setTotalCardsDrawedPlayerOne] = useState(0);
  const [totalCardsDrawedPlayerTwo, setTotalCardsDrawedPlayerTwo] = useState(0);

  const [cardPlayerOne, setCardPlayerOne] = useState<Card | null>(null);
  const [cardPlayerTwo, setCardPlayerTwo] = useState<Card | null>(null);

  const [cardsSumPlayerOne, setCardsSumPlayerOne] = useState(0);
  const [cardsSumPlayerTwo, setCardsSumPlayerTwo] = useState(0);

  const [scorePlayerOne, setScorePlayerOne] = useState(0);
  const [scorePlayerTwo, setScorePlayerTwo] = useState(0);
  const [totalMatchs, setTotalMatchs] = useState(0);
  const [totalDraws, setTotalDraws] = useState(0);

  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [playerTwoTurn, setPlayerTwoTurn] = useState(false);

  const [stopDrawDisabledPlayerOne, setStopDrawDisabledPlayerOne] =
    useState(true);
  const [stopDrawDisabledPlayerTwo, setStopDrawDisabledPlayerTwo] =
    useState(true);

  const [winner, setWinner] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetMatch = () => {
    setCardPlayerOne(null);
    setCardPlayerTwo(null);
    setPlayerOneTurn(true);
    setPlayerTwoTurn(false);
    setStopDrawDisabledPlayerOne(true);
    setStopDrawDisabledPlayerTwo(true);
    setWinner(null);
    setCardsSumPlayerOne(0);
    setCardsSumPlayerTwo(0);
    setTotalCardsDrawedPlayerOne(0);
    setTotalCardsDrawedPlayerTwo(0);
  };

  const handleNewDeck = async () => {
    await FetchNewDeck(setDeck);
    setScorePlayerOne(0);
    setScorePlayerTwo(0);
    setTotalDraws(0);
    setTotalMatchs(0);
    handleResetMatch();
  };

  useEffect(() => {
    changeCard();
  }, [deck, playerOneTurn]);

  const handleWinner = () => {
    if (cardsSumPlayerOne === 21 || cardsSumPlayerTwo > 21) {
      setWinner(player_1);
      setScorePlayerOne((score) => score + 1);
      setTotalMatchs((matchs) => matchs + 1);
      return true;
    }
    if (cardsSumPlayerTwo === 21 || cardsSumPlayerOne > 21) {
      setWinner(player_2);
      setScorePlayerTwo((score) => score + 1);
      setTotalMatchs((matchs) => matchs + 1);
      return true;
    }
    if (
      (totalCardsDrawedPlayerOne && totalCardsDrawedPlayerTwo) >= 2 &&
      stopDrawDisabledPlayerOne &&
      stopDrawDisabledPlayerTwo
    ) {
      if (cardsSumPlayerOne < (21 && cardsSumPlayerTwo)) {
        setWinner(player_2);
        setScorePlayerTwo((score) => score + 1);
        setTotalMatchs((matchs) => matchs + 1);
        return true;
      }
      if (cardsSumPlayerTwo < (21 && cardsSumPlayerOne)) {
        setWinner(player_1);
        setScorePlayerOne((score) => score + 1);
        setTotalMatchs((matchs) => matchs + 1);
        return true;
      }
      if (cardsSumPlayerOne === cardsSumPlayerTwo) {
        setWinner("");
        setTotalDraws((draw) => draw + 1);
        setTotalMatchs((matchs) => matchs + 1);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (winner === null) {
      setIsModalOpen(handleWinner());
    }
  }, [
    cardsSumPlayerOne,
    cardsSumPlayerTwo,
    stopDrawDisabledPlayerOne,
    stopDrawDisabledPlayerTwo,
  ]);

  useEffect(() => {
    if (totalCardsDrawedPlayerOne == 2 && totalCardsDrawedPlayerTwo <= 2)
      setStopDrawDisabledPlayerOne(false);
    if (totalCardsDrawedPlayerTwo == 2 && totalCardsDrawedPlayerOne <= 2)
      setStopDrawDisabledPlayerTwo(false);
  }, [totalCardsDrawedPlayerOne, totalCardsDrawedPlayerTwo]);

  useEffect(() => {
    if (isModalOpen) {
      setStopDrawDisabledPlayerOne(true);
      setStopDrawDisabledPlayerTwo(true);
      setPlayerOneTurn(false);
      setPlayerTwoTurn(false);
      return;
    }
    handleResetMatch();
  }, [isModalOpen]);

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

    if (
      totalCardsDrawedPlayerOne >= 1 &&
      totalCardsDrawedPlayerTwo >= 2 &&
      stopDrawDisabledPlayerTwo
    ) {
      setPlayerOneTurn(true);
      setStopDrawDisabledPlayerTwo(true);
      setPlayerTwoTurn(false);
      return;
    }
    if (
      totalCardsDrawedPlayerTwo >= 1 &&
      totalCardsDrawedPlayerOne >= 2 &&
      stopDrawDisabledPlayerOne
    ) {
      setPlayerTwoTurn(true);
      setStopDrawDisabledPlayerOne(true);
      setPlayerOneTurn(false);
      return;
    }
    setPlayerOneTurn(!playerOneTurn);
    setPlayerTwoTurn(playerOneTurn);
  };

  const handleStopDraw = (
    setStopDrawPlayer: (stopDraw: boolean) => void,
    setPlayerTurn: (isPlayerTurn: boolean) => void,
    setOpponentPlayerTurn: (isOpponentPlayerTurn: boolean) => void
  ) => {
    setStopDrawPlayer(true);
    setPlayerTurn(false);
    setOpponentPlayerTurn(true);
  };

  const handlePlayersCardsSum = () => {
    if (winner === player_1)
      return { winner: cardsSumPlayerOne, loser: cardsSumPlayerTwo };
    return { winner: cardsSumPlayerTwo, loser: cardsSumPlayerOne };
  };

  const handlePlayersCardsDrawed = () => {
    if (winner == player_1)
      return {
        winner: totalCardsDrawedPlayerOne,
        loser: totalCardsDrawedPlayerTwo,
      };
    return {
      winner: totalCardsDrawedPlayerTwo,
      loser: totalCardsDrawedPlayerOne,
    };
  };

  const handleTotalCardsDrawed = () =>
    totalCardsDrawedPlayerOne + totalCardsDrawedPlayerTwo;

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
          playerName={player_1}
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
          handleStopDraw={() =>
            handleStopDraw(
              setStopDrawDisabledPlayerOne,
              setPlayerOneTurn,
              setPlayerTwoTurn
            )
          }
          isStopDrawDisabled={stopDrawDisabledPlayerOne}
        />
        <Score
          scorePlayerOne={scorePlayerOne}
          scorePlayerTwo={scorePlayerTwo}
          totalDraws={totalDraws}
          totalMatchs={totalMatchs}
          handleDeck={handleNewDeck}
        />
        <PlayerHUD
          key={"player_2"}
          card={cardPlayerTwo}
          hasDeck={deck ? true : false}
          secondPlayer
          playerName={player_2}
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
          playerTurn={playerTwoTurn}
          loadingCard={loadingNewCard}
          totalCardsDrawed={totalCardsDrawedPlayerTwo}
          handleStopDraw={() =>
            handleStopDraw(
              setStopDrawDisabledPlayerTwo,
              setPlayerTwoTurn,
              setPlayerOneTurn
            )
          }
          isStopDrawDisabled={stopDrawDisabledPlayerTwo}
        />
      </div>
      <WinModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        winner={winner}
        playersCardsDrawed={handlePlayersCardsDrawed}
        playersCardsSum={handlePlayersCardsSum}
        totalCardsDrawed={handleTotalCardsDrawed}
      />
    </div>
  );
}

export default index;
