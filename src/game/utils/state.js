import { text } from ".";
import { audio } from "../consts";
import { black, primary, white } from "../consts/colors";
import { playSound } from "./helper";

const States = {
    textPause(scene) {
        scene.pauseText = text(scene, {
            y: -80,
            text: "PAUSED",
            style: {
                fontSize: 48,
                color: white.css,
                stroke: primary.css,
                strokeThickness: 8,
            },
            isVisible: false,
        });
        scene.pauseInstructions = text(scene, {
            text: "Click button ▶ play to resume",
            style: {
                color: primary.css,
                stroke: black.css,
                fontSize: 24,
                strokeThickness: 8,
            },
            isVisible: false,
        });
    },
    getSoundKey(operation) {
        switch (operation) {
            case "x":
                return audio.key.power;
            case "/":
                return audio.key.cut;
            case "+":
                return audio.key.power;
            case "-":
                return audio.key.cut;
            default:
                return audio.key.effect;
        }
    },
    togglePause(scene, isPause) {
        scene.isPaused = isPause;

        if (scene.isPaused) {
            scene.physics.pause();
            scene.spawnTimer.paused = true;
            scene.pauseText.setVisible(true);
            scene.pauseInstructions.setVisible(true);

            playSound(scene, audio.key.click);
        } else {
            scene.physics.resume();
            scene.spawnTimer.paused = false;
            scene.pauseText.setVisible(false);
            scene.pauseInstructions.setVisible(false);

            playSound(scene, audio.key.start);
        }
    },
    textPopup(scene, { x, y, changeText, resultText, color }) {
        const popup = scene.add
            .text(x, y - 30, changeText, {
                fontSize: "20px",
                fill: color,
                fontWeight: "bold",
                stroke: white.css,
                strokeThickness: 2,
            })
            .setOrigin(0.5);

        const result = scene.add
            .text(x, y - 10, resultText, {
                fontSize: "14px",
                fill: white.css,
                fontWeight: "bold",
            })
            .setOrigin(0.5);

        scene.tweens.add({
            targets: [popup, result],
            y: y - 80,
            alpha: 0,
            duration: 1000,
            ease: "Power2",
            onComplete: () => {
                popup.destroy();
                result.destroy();
            },
        });
    },
};

export const { textPause, getSoundKey, togglePause, textPopup } = States;
