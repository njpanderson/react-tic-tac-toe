import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const squareSize = 16; // Any number with a whole square root (9, 16, 25 etc)
  const [history, setHistory] = useState([Array(squareSize).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const moves = history.map((squares, move) => {
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>At move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{
            (move > 0) ? `Go to move #${move}` : 'Go to start'
          }</button>
        )}
      </li>
    );
  });

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
