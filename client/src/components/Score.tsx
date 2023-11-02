import NewDeck from "./NewDeck";
import PlayerScore from "./PlayerScore";
import Title from "./Title";

interface IScore {
  handleDeck: () => void;
  scorePlayerOne: number;
  scorePlayerTwo: number;
}

const Score: React.FC<IScore> = ({
  handleDeck,
  scorePlayerOne,
  scorePlayerTwo,
}) => {
  return (
    <div className="w-1/5 flex flex-col items-center bg-green-700 border-2 border-green-900 rounded-lg mx-2 p-3">
      <Title>Score</Title>
      <div className="flex flex-col self-start ml-12 gap-4">
        <PlayerScore playerName="Player 1" score={scorePlayerOne} />
        <PlayerScore playerName="Player 2" score={scorePlayerTwo} />
        <p className="text-white font-semibold text-2xl font-mono">{`Matchs: ${
          scorePlayerOne + scorePlayerTwo
        }`}</p>
      </div>
      <NewDeck onclick={handleDeck} />
    </div>
  );
};

export default Score;
