import { useState } from 'react';
import Board from './Board';

const sizes = Array(4).fill(0).map((value, index) => Math.pow(index + 3, 2));

export default function Game() {
  const initialState = {
    boardSize: 0,
    currentMove: 0
  };

  const gameState = {};

  [gameState.boardSize, gameState.setBoardSize] = useState(initialState.boardSize);
  [gameState.history, gameState.setHistory] = useState([{
    move: 0,
    squares: Array(sizes[0]).fill(null)
  }]);
  [gameState.currentMove, gameState.setCurrentMove] = useState(initialState.currentMove);
  [gameState.historyOrderAsc, gameState.setHistoryOrderAsc] = useState(true);

  const currentSquares = gameState.history[gameState.currentMove].squares;
  const xIsNext = gameState.currentMove % 2 === 0;

  function boardSizeUpdater(size) {
    const newSize = parseInt(size, 10);

    gameState.setHistory([{
      move: 0,
      squares: Array(sizes[newSize]).fill(null)
    }]);

    gameState.setCurrentMove(initialState.currentMove);

    return newSize;
  }

  function moves() {
    const moves = [];

    const startIndex = gameState.historyOrderAsc ? 0 : gameState.history.length - 1;
    const endIndex = gameState.historyOrderAsc ? gameState.history.length : -1;
    const increment = gameState.historyOrderAsc ? 1 : -1;

    // Loop through moves in forwards (or reverse) order
    for (let a = startIndex; a !== endIndex; a += increment) {
      const item = gameState.history[a];

      moves.push(
        <li key={item.move}>
          {a === gameState.currentMove ? (
            <span>
              {a === 0 ? (
                <span>At start</span>
              ) : (
                <span>At move #{item.move}</span>
              )}
            </span>
          ) : (
            <button onClick={() => jumpTo(item.move)}>{
              (item.move === 0) ? 'Go to start' : `Go to move #${item.move}`
            }</button>
          )}
        </li>
      );
    }

    return moves;
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...gameState.history.slice(0, gameState.currentMove + 1), {
      move: gameState.currentMove + 1,
      squares: nextSquares
    }];

    gameState.setHistory(nextHistory);
    gameState.setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    gameState.setCurrentMove(nextMove);
  }

  function sortMoves(ascending = true) {
    gameState.setHistoryOrderAsc(ascending);
  }

  return (
    <div className="game">
      <div className="controls">
        Board Size:
        <input
          type="range"
          min="0"
          max={sizes.length - 1}
          value={gameState.boardSize}
          onChange={e => gameState.setBoardSize(() => boardSizeUpdater(e.target.value))}
        />
      </div>

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>

      <div className="game-info">
        <p className="sort">
          <span>Sort:</span>
          <button onClick={() => sortMoves()}>⬇</button>
          <button onClick={() => sortMoves(false)}>⬆</button>
        </p>
        <ol>{moves()}</ol>
      </div>
    </div>
  );
}
