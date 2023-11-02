interface IDrawCard {
  onclick: () => void;
  playerTurn: boolean;
  hasDeck: boolean;
  loadingCard: boolean;
}

const DrawCard: React.FC<IDrawCard> = ({
  onclick,
  playerTurn,
  hasDeck,
  loadingCard,
}) => {
  const handleBgColor = () => {
    if (!hasDeck || !playerTurn || loadingCard) {
      return "bg-gray-400 text-gray-300";
    }
    if ((!hasDeck && playerTurn) || loadingCard) {
      return "bg-gray-400 text-gray-300";
    }
    return "bg-green-600 text-white hover:bg-green-700";
  };

  const handleDisabledButton = (
    playerTurn: boolean,
    hasDeck: boolean,
    loadingCard: boolean
  ) => {
    if (!hasDeck || !playerTurn || loadingCard) {
      return true;
    }
    if ((!hasDeck && playerTurn) || loadingCard) {
      return true;
    }
    return false;
  };

  return (
    <button
      className={`self-center mt-10 px-5 py-2 rounded font-semibold ${handleBgColor()}`}
      onClick={onclick}
      disabled={handleDisabledButton(playerTurn, hasDeck, loadingCard)}
    >
      {"Draw a Card"}
    </button>
  );
};

export default DrawCard;
