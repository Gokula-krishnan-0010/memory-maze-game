import Phaser from 'phaser'
import GameScene from './scenes/GameScene.js'
import { inject } from '@vercel/analytics'

// Initialize Vercel Web Analytics
inject()

let game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [GameScene]
})
