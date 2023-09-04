export default function Square({ value, index, winnerCell, onSquareClick }) {
  const className = ['square'];

  if (winnerCell)
    className.push('square-winner-cell');

  function handleClick(event) {
    if (typeof onSquareClick === 'function')
      onSquareClick(event, index);
  }

  return (
    <button
      className={className.join(' ')}
      onClick={handleClick}
    >
      <span className="index">{index}</span>
      <span className="value">{value}</span>
    </button>
  );
}
