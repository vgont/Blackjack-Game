import Title from "./Title";

interface IWinModal {
  winner: string | null;
  winnerCardsDrawed: () => number;
  playersCardsSum: () => { winner: number; loser: number };
  totalCardsDrawed: () => number;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const WinModal: React.FC<IWinModal> = ({
  isModalOpen,
  setIsModalOpen,
  winner,
  winnerCardsDrawed,
  totalCardsDrawed,
  playersCardsSum,
}) => {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const matchData = {
    winner: winner,
    winnerCardsDrawed: winnerCardsDrawed(),
    totalCardsDrawed: totalCardsDrawed(),
    winnerCardsSum: playersCardsSum().winner,
    loserCardsSum: playersCardsSum().loser,
  };

  console.log(matchData);

  const handleRegister = async () => {
    const response = await fetch("http://localhost:8080/registerMatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchData),
    });
    return response.json();
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
          <div id="winner_infos" className="flex flex-col">
            {winner && (
              <div>
                {" "}
                <p className="font-semibold text-xl uppercase">
                  {`Cards drawed: ${winnerCardsDrawed()}`}{" "}
                </p>
                <p className="font-semibold text-xl uppercase">
                  {`Total cards sum: ${playersCardsSum().winner}`}{" "}
                </p>
              </div>
            )}
            <p className="font-semibold mt-5 text-xl uppercase">
              {`Total cards drawed: ${totalCardsDrawed()}`}{" "}
            </p>
          </div>
          <button
            className="bg-green-600 px-5 py-2 rounded font-semibold mt-10"
            onClick={handleRegister}
          >
            {"Register Match"}
          </button>
        </div>
      </div>
    );
};

export default WinModal;
