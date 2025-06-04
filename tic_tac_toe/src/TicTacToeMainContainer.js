import React, { useState } from 'react';

// PUBLIC_INTERFACE
function TicTacToeMainContainer() {
  /**
   * This is the main container for the TicTacToe Classic game.
   * It handles game state: player turns, board state, win/draw detection, and reset.
   * It also applies the specified color scheme and layout as per design specs.
   */
  // 9 cells, each null/X/O
  const [board, setBoard] = useState(Array(9).fill(null));
  // true: X's turn, false: O's turn.
  const [isXNext, setIsXNext] = useState(true);
  // null: ongoing, "X"/"O": won, "draw": full/no winner
  const [gameStatus, setGameStatus] = useState(null);

  // Returns an array of 3 indices that won or null if none
  function calculateWinner(b) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // columns
      [0,4,8],[2,4,6]          // diagonals
    ];
    for (let line of lines) {
      const [a, b1, c] = line;
      if (
        b[a] &&
        b[a] === b[b1] &&
        b[a] === b[c]
      ) {
        return { player: b[a], line };
      }
    }
    return null;
  }

  // Handle cell click
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (board[idx] || gameStatus) return; // Already filled or game over
    const boardCopy = board.slice();
    boardCopy[idx] = isXNext ? 'X' : 'O';
    const winner = calculateWinner(boardCopy);

    if (winner) {
      setBoard(boardCopy);
      setGameStatus(winner.player);
      return;
    }
    if (!boardCopy.includes(null)) {
      setBoard(boardCopy);
      setGameStatus('draw');
      return;
    }
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus(null);
  }

  // Styling constants
  const COLORS = {
    primary: '#ffffff',
    secondary: '#222222',
    accent: '#4caf50',
  };

  // Determine status line
  let statusText = '';
  if (gameStatus === 'draw') {
    statusText = "It's a draw! 🤝";
  } else if (gameStatus === 'X' || gameStatus === 'O') {
    statusText = `Player ${gameStatus} wins! 🎉`;
  } else {
    statusText = `Current turn: Player ${isXNext ? 'X' : 'O'}`;
  }

  // Highlight winning cells if game is won
  let winningLine = null;
  if (gameStatus === 'X' || gameStatus === 'O') {
    winningLine = calculateWinner(board)?.line;
  }

  // PRIVATE_COMPONENT: a cell in the grid
  function Cell({ value, onClick, highlight }) {
    return (
      <button
        className="ttt-cell"
        style={{
          background: COLORS.primary,
          color: value === 'X' ? COLORS.accent : value === 'O' ? COLORS.secondary : COLORS.secondary,
          border: `2px solid ${highlight ? COLORS.accent : COLORS.secondary}`,
          boxShadow: highlight ? `0 0 10px ${COLORS.accent}80` : undefined,
          fontWeight: highlight ? '700' : '500',
          fontSize: '2.5rem',
        }}
        aria-label={value ? `Cell: ${value}` : 'Empty cell'}
        onClick={onClick}
        disabled={!!value || !!gameStatus}
      >
        {value}
      </button>
    );
  }

  // Main render
  return (
    <div className="ttt-main-container"
      style={{
        minHeight: '90vh',
        width: '100vw',
        background: COLORS.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1
        style={{
          marginTop: '1.5rem',
          marginBottom: '0.5rem',
          textAlign: 'center',
          color: COLORS.secondary,
          fontWeight: 700,
          fontSize: '2rem'
        }}
      >TicTacToe Classic</h1>
      {/* Current Player or Final Status */}
      <div
        style={{
          marginBottom: '1.2rem',
          fontSize: '1.25rem',
          fontWeight: '500',
          color: (gameStatus === 'draw')
            ? COLORS.secondary
            : (gameStatus === 'X')
            ? COLORS.accent
            : (gameStatus === 'O')
            ? COLORS.secondary
            : COLORS.secondary
        }}
      >
        {statusText}
      </div>
      {/* Game board */}
      <div
        className="ttt-board"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 70px)',
          gridTemplateRows: 'repeat(3, 70px)',
          gap: '14px',
          background: COLORS.secondary,
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 12px 32px #0001, 0 2px 8px #4442'
        }}
      >
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell}
            onClick={() => handleClick(idx)}
            highlight={!!(winningLine && winningLine.includes(idx))}
          />
        ))}
      </div>
      {/* Footer: Status and Reset */}
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        {/* Show winner/draw message below board if over */}
        {(gameStatus === 'X' || gameStatus === 'O' || gameStatus === 'draw') && (
          <div
            style={{
              color: (gameStatus === 'draw') ? COLORS.secondary : COLORS.accent,
              fontWeight: '600',
              fontSize: '1.14rem'
            }}
          >
            {gameStatus === 'draw'
              ? 'It\'s a draw. Try again!'
              : `Congratulations! Player ${gameStatus} wins.`}
          </div>
        )}
        <button
          className="ttt-reset-btn"
          style={{
            marginTop: '0.8rem',
            background: COLORS.accent,
            color: COLORS.primary,
            border: 'none',
            borderRadius: '6px',
            padding: '12px 36px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 1px 7px #4caf5055',
            transition: 'background 0.22s'
          }}
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToeMainContainer;
