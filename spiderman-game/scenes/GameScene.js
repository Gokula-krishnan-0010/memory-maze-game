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

    update() {
        this.maki.move(this.lia)
    }
}
