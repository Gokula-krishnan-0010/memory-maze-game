import { Scene, manager } from '@tialops/maki'

export default class GameScene extends Scene {
    preload() {
        super.preload()
        this.lia = this.maki.player('lia')
        manager.map(this, 'gk-tile')
        manager.preload(this)
    }

    create() {
        super.create()
        manager.create(this)

        // Place lia in the center of the map (50×50 tiles × 16px = 800×800)
        this.lia.sprite.setPosition(750, 500)

        this.physics.add.collider(this.lia.sprite, manager.getWallGroup(this, 'gk-tile'))

        // GK logic
        // ==========================================
        // 1. THE GOAL SETUP (Top-Left)
        // ==========================================
        // Creates an invisible 32x32 square at X:50, Y:50. 
        // Adjust these coordinates if your top-left maze exit is slightly different.
        this.goal = this.add.zone(50, 50, 32, 32); 
        this.physics.add.existing(this.goal, true); // true = static body

        // Listen for when Lia touches the goal
        this.physics.add.overlap(this.lia.sprite, this.goal, this.handleVictory, null, this);



        const htmlButton = document.getElementById("reveal");
        let revealsLeft = 3;
        let isRevealing = false;
        htmlButton.innerText = `Reveal walls (${revealsLeft} left)`;

        htmlButton.addEventListener('click', () => {
            if(revealsLeft <= 0 || isRevealing)
                return;
            revealsLeft--;
            isRevealing = true;

            htmlButton.style.color = "orange";
            htmlButton.style.cursor = "wait";
            htmlButton.innerText = `Revealing... (${revealsLeft} left)`;

            if(!this.physics.world.debugGraphic) {
                this.physics.world.createDebugGraphic();
            }
            this.physics.world.drawDebug = true;

            // 3. Set the 5-second (5000ms) countdown
            revealTimer = setTimeout(() => {
                
                // Time's up! Turn OFF debug physics
                this.physics.world.drawDebug = false;
                
                // Clear the frozen neon lines from the screen
                this.physics.world.debugGraphic.clear(); 

                // 6. Restore the UI (if they still have charges left)
                isRevealing = false;
                if (revealsLeft > 0) {
                    htmlButton.style.color = 'black';
                    htmlButton.style.cursor = "pointer";
                    htmlButton.innerText = `Reveal walls (${revealsLeft} left)`;
                } else {
                    // They used their last charge! Permanently disable it.
                    htmlButton.style.backgroundColor = "grey";
                    htmlButton.style.cursor = "not-allowed";
                    htmlButton.innerText = "No Reveals Left";
                }

            }, 5000);
        })
    }

    handleVictory(playerSprite, goalZone) {
        // Stop the overlap event from firing 60 times a second
        this.physics.world.disableBody(goalZone.body);

        // Freeze Lia in place so the player can't walk off-screen
        this.physics.pause();

        // reveal map
        this.physics.world.createDebugGraphic();        

        // 🎉 TRIGGER THE CONFETTI 🎉
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                zIndex: 1000 // Ensures it shoots OVER your left-side UI panel
            });
        }

        const htmlButton = document.getElementById("reveal");
        htmlButton.style.backgroundColor = "#00ffcc";
        htmlButton.style.color = "black";
        htmlButton.innerText = "YOU ESCAPED!";        
    }

    update() {
        this.maki.move(this.lia)
    }
}
