import Image from "next/image";
import DrawCard from "./DrawCard";
import { Card } from "@/types/types";
interface IPlayerHUD {
  card: Card | null;
  hasDeck: boolean;
  secondPlayer: boolean;
  playerName: string;
  cardsSum: number;
  drawNewCard: () => void;
  playerTurn: boolean;
  loadingCard: boolean;
  totalCardsDrawed: number;
}

const PlayerHUD: React.FC<IPlayerHUD> = ({
  card,
  secondPlayer,
  playerName,
  cardsSum,
  playerTurn,
  hasDeck,
  loadingCard,
  drawNewCard,
  totalCardsDrawed,
}) => {
  return (
    <div
      className={`w-2/5 bg-green-900 h-full rounded-lg flex p-5 border-2 border-green-950 ${
        secondPlayer ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div className="flex flex-col w-2/3">
        <p
          className={`${
            secondPlayer ? "text-start" : "text-end"
          } text-white text-2xl font-extrabold`}
        >
          {playerName}
        </p>
        <div className="flex flex-col justify-center pt-10 pl-10">
          <p className="text-2xl text-white font-semibold">
            {`Sum of cards: ${cardsSum}`}
          </p>
          <p className="text-2xl text-white font-semibold">{`Total cards drawed: ${totalCardsDrawed}`}</p>
          <DrawCard
            loadingCard={loadingCard}
            onclick={drawNewCard}
            playerTurn={playerTurn}
            hasDeck={hasDeck}
          />
        </div>
      </div>
      {card ? (
        <Image
          src={card.image}
          alt={card.code}
          width={226}
          height={314}
          className="mx-auto"
        />
      ) : (
        <div className="flex flex-col w-[226px] justify-center items-center bg-black bg-opacity-30 rounded-lg shadow-2xl border-2 border-green-950" />
      )}
    </div>
  );
};

export default PlayerHUD;
