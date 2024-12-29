import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  const [gameId, setGameId] = useState(''); // State for Game ID
  const [playerName, setPlayerName] = useState(''); // State for Player Name
  const navigate = useNavigate(); // Navigation function

  const handleJoinGame = () => {
    if (!gameId.trim()) {
      alert('Please enter a valid Game ID.');
      return;
    }

    if (!playerName.trim()) {
      alert('Please enter your name.');
      return;
    }

    navigate(`/game/${gameId}`, { state: { playerName } });
  };

  return (
    <div className="home-container">
      <h1>Welcome to Tic-Tac-Toe</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
      </div>
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  );
}

export default Home;
