# 🧩 Memory Maze - 2D pixel game

> In Memory Maze, your only weapon is your mind! You get exactly five second per reveal to memorize the pixel labyrinth before the lights cut out. Navigate blindly, manage your 3 limited reveals, and escape!
> [Try it out!](https://memory-maze-game-sigma.vercel.app/)

https://github.com/user-attachments/assets/26494bfe-c8da-4788-9782-ea3bc6381579

## 🎮 How to Play

1. **The Flash:** At the start of the level, the maze layout is visible for exactly 1 second.
2. **The Dark:** The walls disappear into pure blackness. Navigate blindly using your spatial memory!
3. **The Lifeline:** Lost? Click the "Reveal Map" button. It flashes the map back on for 5 seconds—but you only get **3 chances** per game.
4. **The Escape:** Reach the top-left corner to trigger the victory confetti!

## 🚀 Getting Started

To run the game locally, ensure you have [Node.js](https://nodejs.org/) installed.

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/Gokula-krishnan-0010/memory-maze-game.git
   cd memory-maze-game
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the Maki development server and play the game:
   ```bash
   npx maki dev
   ```

## 🛠️ Tech Stack

* **Game Engine:** [Phaser 3](https://phaser.io/)
* **Framework:** [@tialops/maki](https://tial-ops.github.io/maki_tuto/) (A lightweight Phaser wrapper optimized for top-down pixel RPGs)
* **UI & Effects:** Standard HTML/CSS DOM overlays, featuring `canvas-confetti` for victory juice.

## 🏆 Behind the Scenes

*Built for a Hackathon/Game Jam.*

We wanted to take a universally understood genre—the top-down 2D pixel maze—and strip away the player's greatest asset: their sight. 

Instead of writing complex visibility masks, I engineered a clever solution using the engine's physics debug tools. By toggling Phaser's `arcade.physics` bounding boxes on and off, we simulated the map flashing in the dark while ensuring all collision boundaries remained perfectly intact. This allowed us to build an incredibly lightweight, performant web game.
