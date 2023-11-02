interface INewDeck {
  onclick: () => void;
}

const NewDeck: React.FC<INewDeck> = ({ onclick }) => {
  return (
    <button
      onClick={onclick}
      className="mt-auto mb-7 bg-green-900 hover:bg-green-950 border-2 border-green-950 hover:text-gray-300 font-semibold px-9 py-3 rounded text-white"
    >
      New Deck
    </button>
  );
};

export default NewDeck;
