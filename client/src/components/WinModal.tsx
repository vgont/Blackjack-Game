import PlayerInfos from "./PlayerInfos";
import Title from "./Title";

interface IWinModal {
  winner: string | null;
  playersCardsDrawed: () => { winner: number; loser: number };
  playersCardsSum: () => { winner: number; loser: number };
  totalCardsDrawed: () => number;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const WinModal: React.FC<IWinModal> = ({
  isModalOpen,
  setIsModalOpen,
  winner,
  playersCardsDrawed,
  totalCardsDrawed,
  playersCardsSum,
}) => {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const matchData = {
    winner: winner,
    winnerCardsDrawed: playersCardsDrawed().winner,
    loserCardsDrawed: playersCardsDrawed().loser,
    winnerCardsSum: playersCardsSum().winner,
    loserCardsSum: playersCardsSum().loser,
  };

  const loser = () => {
    if (winner === "Player 1") return "Player 2";
    if (winner === "Player 2") return "Player 1";
  };

  console.log(matchData);

  async function registerMatch() {
    const response = await fetch("http://localhost:8080/registerMatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchData),
    });
    return response.json();
  }

  const handleRegister = async () => {
    registerMatch();
    setIsModalOpen(false);
  };

  if (isModalOpen)
    return (
      <div
        className="bg-opacity-80 inset-0 backdrop-blur fixed w-screen h-screen z-50"
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="fixed inset-0 flex flex-col w-1/3 h-fit p-8 m-auto bg-green-800 rounded text-white border-solid border-2 border-green-950 bg-opacity-80 backdrop-blur items-center"
          onClick={stopPropagation}
        >
          <button
            className="text-white font-extrabold self-start justify-self-end"
            onClick={() => setIsModalOpen(false)}
          >
            X
          </button>
          <Title>{winner ? `${winner} Win!` : "Draw"}</Title>
          <div
            id="winner_infos"
            className="flex flex-col items-center justify-center"
          >
            {winner && (
              <div className="flex flex-col items-center justify-center">
                <PlayerInfos
                  cardsDrawed={playersCardsDrawed().winner}
                  cardsSum={playersCardsSum().winner}
                />
                <h2 className="text-3xl font-extrabold text-white font-inter mt-10 mb-5">
                  {loser()}
                </h2>
                <PlayerInfos
                  cardsDrawed={playersCardsDrawed().loser}
                  cardsSum={playersCardsSum().loser}
                />
              </div>
            )}
            <p className="font-semibold mt-16 text-2xl uppercase">
              {`Total cards drawed: ${totalCardsDrawed()}`}{" "}
            </p>
          </div>
          <button
            className="bg-green-600 px-5 py-2 rounded font-semibold mt-10 hover:bg-green-700"
            onClick={handleRegister}
          >
            {"Register Match"}
          </button>
        </div>
      </div>
    );
};

export default WinModal;
