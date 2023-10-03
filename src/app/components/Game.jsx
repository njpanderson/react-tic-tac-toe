"use client"

import { useState, StrictMode } from 'react';

import Board from './Board';
import Button from './Button';
import { getRowSize } from '../lib/logic';

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

  function moves() {
    const moves = [];

    const startIndex = gameState.historyOrderAsc ? 0 : gameState.history.length - 1;
    const endIndex = gameState.historyOrderAsc ? gameState.history.length : -1;
    const increment = gameState.historyOrderAsc ? 1 : -1;

    // Loop through moves in forwards (or reverse) order
    for (let a = startIndex; a !== endIndex; a += increment) {
      const item = gameState.history[a];

      moves.push(
        <li key={item.move} className="mb-1">
          {a === gameState.currentMove ? (
            <span>
              {a === 0 ? (
                <span>At start</span>
              ) : (
                <span>At move #{item.move}</span>
              )}
            </span>
          ) : (
            <button
              onClick={() => jumpTo(item.move)}
              className="underline hover:text-green-600"
            >{
              (item.move === 0) ? 'Go to start' : `Go to move #${item.move}`
            }</button>
          )}
          {(typeof item.col !== 'undefined' && typeof item.row !== 'undefined') ?
            <span className="inline-block rounded-md ml-1 px-[3px] py-[2px] text-xs text-white bg-green-600">
              ({item.col}, {item.row})
            </span>
            : null
          }
        </li>
      );
    }

    return moves;
  }

  function jumpTo(nextMove) {
    gameState.setCurrentMove(nextMove);
  }

  function sortMoves(ascending = true) {
    gameState.setHistoryOrderAsc(ascending);
  }

  function handlePlay(nextSquares, index) {
    const rowSize = getRowSize(nextSquares);

    const nextHistory = [...gameState.history.slice(0, gameState.currentMove + 1), {
      move: gameState.currentMove + 1,
      squares: nextSquares,
      col: index % rowSize,
      row: Math.floor(index / rowSize) % rowSize
    }];

    gameState.setHistory(nextHistory);
    gameState.setCurrentMove(nextHistory.length - 1);
  }

  function onBoardSizeChange(event) {
    const size = parseInt(event.target.value, 10);

    // Set the board size as needed
    gameState.setBoardSize(size);

    // Clear the history and change the squares array
    gameState.setHistory([{
      move: 0,
      squares: Array(sizes[size]).fill(null)
    }]);

    // Set the current move back to zero
    gameState.setCurrentMove(initialState.currentMove);
  }

  return (
    <StrictMode>
      <div className="container h-screen flex flex-col justify-center content-center px-4 sm:mx-auto" data-component="game">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full sm:col-span-8 flex flex-wrap flex-col content-center">
            <div className="flex flex-wrap justify-center my-2" data-component="controls">
              <span className="w-full text-center">Board Size:</span>
              <input
                type="range"
                min="0"
                className="ml-2 block"
                max={sizes.length - 1}
                value={gameState.boardSize}
                onChange={onBoardSizeChange}
              />
            </div>

            <div className="mx-auto overflow-hidden my-4 p-[1px]" data-component="game-board">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
          </div>

          <div className="group col-span-full sm:col-span-4">
            <p className="my-2">
              <Button onClick={() => sortMoves()}>Newer ⬇</Button>
              <Button onClick={() => sortMoves(false)}>Older ⬆</Button>
            </p>
            <ul className="text-sm mt-3 pt-2 border-t border-grey-300 text-gray-400
              group-hover:text-gray-900 transition duration-700 overflow-y-auto max-h-[300px]">{moves()}</ul>
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
