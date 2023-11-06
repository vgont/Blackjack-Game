import { useState } from "react";
import NewDeck from "./NewDeck";
import PlayerScore from "./PlayerScore";
import Title from "./Title";

interface IScore {
  handleDeck: () => void;
  scorePlayerOne: number;
  scorePlayerTwo: number;
  totalMatchs: number;
  totalDraws: number;
}

const Score: React.FC<IScore> = ({
  handleDeck,
  scorePlayerOne,
  scorePlayerTwo,
  totalMatchs,
  totalDraws,
}) => {
  const [showWarning, setShowWarning] = useState(false);

  const handleWarning = () => {
    setShowWarning(!showWarning);
  };

  return (
    <div className="w-1/5 flex flex-col items-center bg-green-700 border-2 border-green-900 rounded-lg mx-2 p-3">
      <Title>Score</Title>
      <div className="flex flex-col self-start ml-12 gap-4">
        <PlayerScore playerName="Player 1" score={scorePlayerOne} />
        <PlayerScore playerName="Player 2" score={scorePlayerTwo} />
        <p className="text-white font-semibold text-2xl font-mono">{`Draws: ${totalDraws}`}</p>
        <p className="text-white font-semibold text-2xl font-mono">{`Matchs: ${totalMatchs}`}</p>
      </div>
      {showWarning && (
        <div
          className={`absolute bg-white w-1/6 h-16 mt-48 text-black rounded opacity-0 transition-opacity ${
            showWarning ? "opacity-70" : ""
          }`}
        >
          <p className="text-center">
            {"When clicked, the score will be reset"}
          </p>
        </div>
      )}
      <NewDeck
        onclick={handleDeck}
        onMouseEnter={handleWarning}
        onMouseLeave={handleWarning}
      />
    </div>
  );
};

export default Score;
