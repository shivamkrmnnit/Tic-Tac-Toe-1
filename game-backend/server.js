const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 5000;

// Store active games
const games = {};

app.use(cors());

app.get('/', (req, res) => {
  res.send('Game Server is Running');
});

// Handle socket connection
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Player joins a game
  socket.on('joinGame', ({ gameId, playerName }) => {
    console.log(`${playerName} is joining game ${gameId}`);

    if (!games[gameId]) {
      games[gameId] = {
        players: [],
        board: Array(9).fill(null),
        currentTurn: 'O',
        winner: null,
      };
    }

    const game = games[gameId];

    // Check if player is reconnecting
    const existingPlayer = game.players.find((p) => p.name === playerName);
    if (existingPlayer) {
      existingPlayer.id = socket.id; // Update socket ID
      socket.join(gameId);
      io.to(gameId).emit('playerJoined', {
        players: game.players,
        message: `${playerName} rejoined the game.`,
      });
      console.log(`${playerName} reconnected to game ${gameId}`);
      return;
    }

    // Add new player
    if (game.players.length < 2) {
      const symbol = game.players.length === 0 ? 'O' : 'X';
      game.players.push({ id: socket.id, name: playerName, symbol });
      socket.join(gameId);

      io.to(gameId).emit('playerJoined', {
        players: game.players,
        message: `${playerName} joined the game.`,
      });

      console.log(`Game ${gameId} Players:`, game.players);

      if (game.players.length === 2) {
        io.to(gameId).emit('startGame', {
          message: 'Game started!',
          currentTurn: game.currentTurn,
        });
        console.log(`Game ${gameId} started!`);
      }
    } else {
      socket.emit('error', { message: 'Game is full.' });
      console.log(`Game ${gameId} is full. Player ${playerName} rejected.`);
    }
  });

  // Player makes a move
  socket.on('makeMove', ({ gameId, index }) => {
    const game = games[gameId];
    if (!game) {
      socket.emit('error', { message: 'Game not found.' });
      return;
    }

    const player = game.players.find((p) => p.id === socket.id);
    if (!player) {
      socket.emit('error', { message: 'You are not part of this game.' });
      return;
    }

    if (game.board[index] || game.currentTurn !== player.symbol || game.winner) {
      socket.emit('error', { message: 'Invalid move.' });
      return;
    }

    game.board[index] = player.symbol;
    game.currentTurn = game.currentTurn === 'O' ? 'X' : 'O';

    // Check for a winner
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
        game.winner = player.symbol;
        io.to(gameId).emit('gameOver', {
          winner: player.name,
          board: game.board,
        });
        console.log(`Game ${gameId} won by ${player.name}`);
        return;
      }
    }

    // Check for a draw
    if (game.board.every((cell) => cell !== null)) {
      io.to(gameId).emit('gameOver', { winner: null, board: game.board });
      console.log(`Game ${gameId} ended in a draw.`);
      return;
    }

    // Update board
    io.to(gameId).emit('updateBoard', {
      board: game.board,
      currentTurn: game.currentTurn,
    });
  });

  // Reset game
  socket.on('resetGame', ({ gameId }) => {
    const game = games[gameId];
    if (!game) {
      socket.emit('error', { message: 'Game not found.' });
      return;
    }

    game.board = Array(9).fill(null);
    game.currentTurn = 'O';
    game.winner = null;

    io.to(gameId).emit('resetGame', {
      board: game.board,
      currentTurn: game.currentTurn,
      message: 'Game has been reset.',
    });

    console.log(`Game ${gameId} has been reset.`);
  });

  // Handle player disconnection
  socket.on('disconnect', () => {
    console.log(`A user disconnected: ${socket.id}`);
    for (const gameId in games) {
      const game = games[gameId];
      const playerIndex = game.players.findIndex((p) => p.id === socket.id);

      if (playerIndex !== -1) {
        const playerName = game.players[playerIndex].name;
        game.players.splice(playerIndex, 1);

        io.to(gameId).emit('playerLeft', {
          message: `${playerName} has left the game.`,
          players: game.players,
        });

        console.log(`Player ${playerName} left game ${gameId}`);

        // If no players remain, delete the game
        if (game.players.length === 0) {
          delete games[gameId];
          console.log(`Game ${gameId} deleted.`);
        }
        break;
      }
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
