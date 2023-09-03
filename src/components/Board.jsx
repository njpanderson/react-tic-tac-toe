import { calculateWinner } from '../lib/logic';
import Square from './Square';

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);

  const status = (
    winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : '0'}`
  );

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares))
      return;

    const nextSquares = squares.slice();
    nextSquares[i] = (xIsNext ? 'X' : '0');
    onPlay(nextSquares);
  }

  const cellsPerRow = Math.round(Math.sqrt(squares.length));
  const cellRow = Array(cellsPerRow).fill(0);

  const boardRows = cellRow.map((row, rowIndex) => {
    const rowCells = cellRow.map((square, index) => {
      const cellIndex = index + (cellsPerRow * rowIndex);

      return (
          <Square
            key={cellIndex}
            value={squares[cellIndex]}
            index={cellIndex}
            onSquareClick={() => handleClick(cellIndex)}
          />
      );
    });

    return (
      <div className="board-row" key={rowIndex}>
        {rowCells}
      </div>
    )
  });

  return (
    <>
      <p className='status'>{status}</p>
      {boardRows}
    </>
  );
}
