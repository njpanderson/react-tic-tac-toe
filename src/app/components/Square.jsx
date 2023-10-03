export default function Square({ className, value, index, winnerCell, onSquareClick }) {
  const classNames = [className, 'float-left -m-[1px] border w-12 h-12 sm:w-16 sm:h-16 relative'];

  classNames.push(
    winnerCell
    ? 'bg-green-200 font-semibold text-green-700 z-10 outline outline-2 -outline-offset-2'
    : 'border-slate-200 bg-white'
  );

  function handleClick(event) {
    if (typeof onSquareClick === 'function')
      onSquareClick(event, index);
  }

  return (
    <button
      className={classNames.filter(part => !!part).join(' ')}
      onClick={handleClick}
    >
      <span className="absolute left-0 top-0 ml-1 mt-1 text-[10px] sm:text-[12px] text-slate-400">{index}</span>
      <span className="text-4xl">{value}</span>
    </button>
  );
}
