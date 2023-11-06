interface IPlayerInfos {
  cardsDrawed: number;
  cardsSum: number;
}

const PlayerInfos: React.FC<IPlayerInfos> = ({ cardsDrawed, cardsSum }) => {
  return (
    <div>
      <p className="font-semibold text-xl uppercase">
        {`Total cards sum: ${cardsSum}`}{" "}
      </p>
      <p className="font-semibold text-xl uppercase">
        {`Cards drawed: ${cardsDrawed}`}{" "}
      </p>
    </div>
  );
};

export default PlayerInfos;
