interface IPlayerScore {
  score: number;
  playerName: string;
}

const PlayerScore: React.FC<IPlayerScore> = ({ score, playerName }) => {
  return (
    <p className="text-white font-semibold text-2xl font-mono">{`${playerName}: ${score}`}</p>
  );
};

export default PlayerScore;
