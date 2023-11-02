import Image from "next/image";

interface IDeckImage {
  hasDeck: boolean;
}

const DeckImage: React.FC<IDeckImage> = ({ hasDeck }) => {
  return hasDeck ? (
    <Image
      src="https://deckofcardsapi.com/static/img/back.png"
      alt="back_card"
      width={226}
      height={314}
    />
  ) : (
    <div className="w-[226px] h-[314px] flex flex-col justify-center items-center bg-green-950 bg-opacity-30 rounded-lg border-2 border-green-950 shadow-lg">
      <p className="text-white">{"You don't have a deck yet!"}</p>
    </div>
  );
};

export default DeckImage;
