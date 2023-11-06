interface IStopDraw {
  onclick: () => void;
  isStopDrawDisabled: boolean;
}

const StopDraw: React.FC<IStopDraw> = ({ onclick, isStopDrawDisabled }) => {
  return (
    <button
      disabled={isStopDrawDisabled}
      onClick={onclick}
      className={`self-center mt-10 px-5 py-2 rounded font-semibold transition ${
        isStopDrawDisabled
          ? "bg-gray-400 text-gray-300"
          : "bg-green-500 text-white hover:bg-green-700"
      }`}
    >
      Stop Draw
    </button>
  );
};

export default StopDraw;
