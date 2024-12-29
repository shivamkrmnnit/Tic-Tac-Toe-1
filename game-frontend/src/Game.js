import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Game.css';

let socket;

function Game() {
  const { gameId } = useParams();
  const { state } = useLocation();
  const { playerName } = state || {}; // Fallback if state is not passed
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState('');
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!playerName) {
      navigate('/'); // Redirect if playerName is not found (i.e., not joined)
    }

    // Replace with your backend URI
    socket = io('https://tic-tac-toe-1-1.onrender.com');

    console.log('Joining game:', gameId, playerName);

    socket.emit('joinGame', { gameId, playerName });

    socket.on('playerJoined', ({ players }) => {
      console.log('Players:', players);
      setPlayers(players);
    });

    socket.on('startGame', ({ currentTurn }) => {
      console.log('Game started. Current turn:', currentTurn);
      setCurrentTurn(currentTurn);
      setMessage('Game started!');
    });

    socket.on('updateBoard', ({ board, currentTurn }) => {
      console.log('Board updated:', board);
      setBoard(board);
      setCurrentTurn(currentTurn);
    });

    socket.on('gameOver', ({ winner, board }) => {
      console.log('Game over. Winner:', winner);
      setBoard(board);
      setWinner(winner);
      setMessage(winner ? `${winner} wins!` : 'It\'s a draw!');
    });

    socket.on('playerLeft', ({ message }) => {
      console.log('Player left:', message);
      setMessage(message);
    });

    socket.on('resetGame', ({ board, currentTurn }) => {
      console.log('Game reset.');
      setBoard(board);
      setCurrentTurn(currentTurn);
      setWinner(null);
      setMessage('Game has been reset!');
    });

    return () => socket.disconnect();
  }, [gameId, playerName, navigate]);

  const makeMove = (index) => {
    if (board[index] || winner) {
      return; // Prevent move if the cell is already filled or the game is over
    }

    console.log('Making move at index:', index);
    socket.emit('makeMove', { gameId, index });
  };

  const resetGame = () => {
    socket.emit('resetGame', { gameId });
  };

  const getPlayerNameBySymbol = (symbol) => {
    const player = players.find((p) => p.symbol === symbol);
    return player ? player.name : '';
  };

  return (
    <div className="game-container">
      <h1>Two-Player Tic-Tac-Toe Game</h1>
      {players.length > 0 ? (
        <div>
          <p className={`message ${winner ? (winner === 'Draw' ? 'draw' : 'win') : ''}`}>
            {message}
          </p>
          <p>Current Turn: {getPlayerNameBySymbol(currentTurn)}</p>
          <div className="board">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`cell ${cell}`}
                onClick={() => makeMove(index)} // Call makeMove on cell click
              >
                {cell}
              </div>
            ))}
          </div>
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      ) : (
        <p>Waiting for players to join...</p>
      )}
    </div>
  );
}

export default Game;
