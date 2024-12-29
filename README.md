# **Tic Tac Toe Game (Real-Time Multiplayer)**

This is a real-time multiplayer **Tic Tac Toe** game built using **React** for the frontend and **Node.js** with **Socket.IO** for the backend. The game allows two players to join a game session, make moves, and see the game state in real-time.

## **Features**
- **Real-time Gameplay**: Players can join a game and make moves that are instantly reflected on both players' screens.
- **Multiplayer**: Two players can join the same game by using a unique game ID.
- **Winner Detection**: The game automatically detects and announces the winner or a draw.
- **Game Reset**: Players can reset the game at any time.
- **Player Disconnection**: If a player disconnects, the other player is notified.

## **Technologies Used**
- **Frontend**: React, React Router
- **Backend**: Node.js, Express, Socket.IO
- **Real-Time Communication**: Socket.IO for bidirectional communication between client and server.

## **Installation**

### **Prerequisites**
- **Node.js** and **npm** installed on your machine.
  - Download and install from [Node.js official website](https://nodejs.org/).

### **Backend Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tic-tac-toe.git-1
   cd tic-tac-toe
2. Install dependencies:

```
cd game-backend
npm install express socket.io cors
```
Start the server:
```
npm start
```
The server will run on http://localhost:5000.

# Frontend Setup
Navigate to the frontend directory (if your project is structured that way) or directly to the project root if the React app is in the same directory.

Install dependencies:

```
cd game-frontend
npm install
```
Start the React app:

```
npm start
```
The app will be available at http://localhost:3000.

# Running the Game
Open the React app in two different browser tabs.
In one tab, enter a player name and join the game with a game ID (you can create a new game or join an existing one).
The second player can join the same game using the same game ID.
Players can take turns making moves by clicking on the game board.
The game will automatically detect the winner or announce a draw once all cells are filled.
# How the Game Works
Join a Game: Players enter a name and a unique game ID to join a game.
Making a Move: Players click on a cell in the 3x3 grid to make their move (either "X" or "O").
Current Turn: The game displays whose turn it is (either "X" or "O").
Game Over: The game will detect a winner or declare a draw once all cells are filled.
Reset: Players can reset the game at any time by clicking the "Reset Game" button.
Folder Structure

```
tic-tac-toe/
│
├── game-backend/
│   ├── server.js           # Backend server with Socket.IO
│   └── package.json        # Backend dependencies
│
├── game-frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── Game.js         # Game component
│   │   └── Game.css        # CSS for the game UI
│   └── package.json        # Frontend dependencies
│
└── README.md               # Project documentation

```

# Game UI
The game UI consists of:

A 3x3 grid where players can click to make their moves.
A message area displaying the current player's turn, game status (win, draw), and player actions (joining, leaving).
A reset button to restart the game.
# Contributing
Feel free to fork this repository and submit issues or pull requests. If you have any improvements or bug fixes, don't hesitate to contribute!

# License
This project is open-source and available under the MIT License.

# Screenshots
Add screenshots of the game interface here, if needed.

![Screenshot 2024-12-29 220610](https://github.com/user-attachments/assets/bcb4bccb-4234-4dc8-87a7-924fa5d8b50c)

![Screenshot 2024-12-29 220631](https://github.com/user-attachments/assets/2837e34b-3e65-44c0-b095-14d686fdb6ba)

# Troubleshooting

If you face any issues with the game, make sure both the backend and frontend servers are running correctly.
Ensure the frontend is connected to the correct backend URL (http://localhost:5000).
csharp







