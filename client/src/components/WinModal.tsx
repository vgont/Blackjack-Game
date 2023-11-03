import Title from "./Title";

interface IWinModal {
  winner: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const WinModal: React.FC<IWinModal> = ({
  isModalOpen,
  setIsModalOpen,
  winner,
}) => {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          <Title>{winner} Win!</Title>
          <button className="bg-green-600 px-5 py-2 rounded font-semibold">
            {"Registrar Partida"}
          </button>
        </div>
      </div>
    );
};

export default WinModal;
