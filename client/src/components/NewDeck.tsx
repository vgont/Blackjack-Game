interface INewDeck {
  onclick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const NewDeck: React.FC<INewDeck> = ({
  onclick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <button
      onClick={onclick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="transition mt-auto mb-7 bg-green-900 hover:bg-green-950 border-2 border-green-950 hover:text-gray-300 font-semibold px-9 py-3 rounded text-white"
    >
      New Deck
    </button>
  );
};

export default NewDeck;
