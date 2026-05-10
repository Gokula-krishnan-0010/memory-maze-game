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
        const htmlButton = document.getElementById("reveal");
        let revealTimer = null;
        htmlButton.addEventListener('click', () => {
            if(!this.physics.world.debugGraphic) {
                this.physics.world.createDebugGraphic();
            }

            this.physics.world.drawDebug = true;
            htmlButton.style.color = 'red';
            if (revealTimer !== null) {
                clearTimeout(revealTimer);
            }

            // 3. Set the 5-second (5000ms) countdown
            revealTimer = setTimeout(() => {
                
                // Time's up! Turn OFF debug physics
                this.physics.world.drawDebug = false;
                
                // Clear the frozen neon lines from the screen
                this.physics.world.debugGraphic.clear(); 
                
                htmlBtn.style.color = "aqua"; // Reset visual feedback
                revealTimer = null; // Reset the timer variable

            }, 5000);
        })
    }

    update() {
        this.maki.move(this.lia)
    }
}
