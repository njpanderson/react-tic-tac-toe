export default function Square({ value, index, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      <span className="index">{index}</span>
      <span className="value">{value}</span>
    </button>
  );
}
