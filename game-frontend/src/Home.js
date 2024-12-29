https://github.com/shivamkrmnnit/Tic-Tac-Toe-1.gitimport React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const joinGame = () => {
    if (gameId && playerName) {
      // Redirect to the game page with the gameId as a URL parameter
      navigate(`/game/${gameId}`, { state: { playerName } });
    } else {
      alert('Please enter both Game ID and Player Name.');
    }
  };

  return (
    <div className="home-container">
      <h1>Join a Game</h1>
      <input
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <input
        placeholder="Your Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={joinGame}>Join Game</button>
    </div>
  );
}

export default Home;
