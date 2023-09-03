export default function Square({ value, index, winnerCell, onSquareClick }) {
  const className = ['square'];

  if (winnerCell)
    className.push('square-winner-cell');

  return (
    <button
      className={className.join(' ')}
      onClick={onSquareClick}
    >
      <span className="index">{index}</span>
      <span className="value">{value}</span>
    </button>
  );
}
