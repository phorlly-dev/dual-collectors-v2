import { flashScreen, particle } from ".";
import { audio } from "../consts";
import { error, success, warning } from "../consts/colors";
import { textPopup } from "./state";

const Effects = {
    powerEffect(scene, { x, y, operation, value, oldPower }) {
        particle(scene, { x, y, options: { tint: 0x9b59b6 } });

        const changeText =
            operation === "x" ? `Power x${value}!` : `Power ÷${value}`;
        const resultText = `${oldPower} → ${scene.power}`;

        textPopup(scene, { x, y, changeText, resultText, color: warning.css });
        flashScreen(scene, { color: 0x9b59b6, alpha: 0.3 });
    },
    scoreEffect(scene, { x, y, operation, value, oldScore }) {
        particle(scene, { x, y });

        const changeText =
            operation === "+" ? `Score +${value}!` : `Score -${value}`;
        const resultText = `${oldScore} → ${scene.score}`;

        textPopup(scene, { x, y, changeText, resultText, color: success.css });
        flashScreen(scene, { color: 0xe67e22, alpha: 0.2 });
    },
    bombEffect(scene, player) {
        // 1. Camera shake
        scene.cameras.main.shake(250, 0.01);

        // 2. Flash player
        scene.tweens.add({
            targets: player,
            alpha: { from: 1, to: 0 },
            tint: 0xff0000, // red flash
            yoyo: true,
            repeat: 3,
            duration: 100,
            onComplete: () => {
                player.clearTint();
                player.alpha = 1;
            },
        });

        // 3. Explosion particles
        const particles = scene.add.particles(player.x, player.y, "particle", {
            speed: { min: -200, max: 200 },
            lifespan: 600,
            quantity: 20,
            scale: { start: 0.5, end: 0 },
            tint: [error.css, warning.css, success.css],
            blendMode: "ADD",
        });

        // destroy particles after animation
        scene.time.delayedCall(600, () => particles.destroy());

        // 4. Play sound
        scene.sound.play(audio.key.bomb, { volume: 0.6 });
    },
};

export const { powerEffect, scoreEffect, bombEffect } = Effects;
