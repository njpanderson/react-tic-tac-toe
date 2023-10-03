import { calculateWinner } from '../lib/logic';
import Square from './Square';

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);

  const status = (
    winner
    ? `Winner: ${winner.char}`
    : `Next player: ${xIsNext ? 'X' : '0'}`
  );

  function handleClick(event, index) {
    if (squares[index] || calculateWinner(squares))
      return;

    const nextSquares = squares.slice();
    nextSquares[index] = (xIsNext ? 'X' : '0');
    onPlay(nextSquares, index);
  }

  const cellsPerRow = Math.round(Math.sqrt(squares.length));
  const cellRow = Array(cellsPerRow).fill(0);

  const boardRows = cellRow.map((row, rowIndex) => {
    const rowCells = cellRow.map((square, index) => {
      const cellIndex = index + (cellsPerRow * rowIndex);
      let className = '';

      if (index % cellsPerRow === (cellsPerRow - 1)) {
        // Right side
        if (rowIndex === 0) {
          // Top
          className = 'rounded-tr-lg';
        } else if (rowIndex === (squares.length / cellsPerRow) - 1) {
          // Bottom
          className = 'rounded-br-lg';
        }
      } else if (index === 0) {
        // Left side
        if (rowIndex === 0) {
          // Top
          className = 'rounded-tl-lg';
        } else if (rowIndex === (squares.length / cellsPerRow) - 1) {
          // Bottom
          className = 'rounded-bl-lg';
        }
      }

      return (
          <Square
            key={cellIndex}
            value={squares[cellIndex]}
            index={cellIndex}
            className={className}
            winnerCell={(winner && winner.cells.indexOf(cellIndex) !== -1)}
            onSquareClick={handleClick}
          />
      );
    });

    return (
      <div className="after:clear-left after:table" key={rowIndex}>
        {rowCells}
      </div>
    )
  });

  return (
    <>
      <p className="font-medium text-sm mb-1 text-center">{status}</p>
      {boardRows}
    </>
  );
}
