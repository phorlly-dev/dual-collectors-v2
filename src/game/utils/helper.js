import { emitEvent } from "../../hooks/remote";
import { makeBoxes } from "./object";

const Helpers = {
    textBoxes(scene) {
        makeBoxes(scene.powerBoxes);
        makeBoxes(scene.scoreBoxes);
        makeBoxes(scene.bombBoxes);
    },
    setPower(power) {
        emitEvent("power", power);
    },
    setScore(score) {
        emitEvent("score", score);
    },
    onClick(scene, { keys, callback, once = true }) {
        // allow both array or string with "|"
        const events = Array.isArray(keys) ? keys : keys.split("|");

        events.forEach((key) => {
            const isKeyboard =
                key.startsWith("keydown-") || key.startsWith("keyup-");
            const { input } = scene;
            const { keyboard } = scene.input;
            if (isKeyboard) {
                once
                    ? keyboard.once(key, callback)
                    : keyboard.on(key, callback);
            } else {
                once ? input.once(key, callback) : input.on(key, callback);
            }
        });
    },
    playSound(scene, key) {
        if (scene.sound.locked) {
            scene.sound.once(Phaser.Sound.Events.UNLOCKED, () =>
                scene.sound.play(key)
            );
        } else {
            scene.sound.play(key);
        }
    },
    playIfNotPlaying(sound) {
        if (sound && !sound.isPlaying) {
            sound.play();
        }
    },
    stopIfPlaying(sound) {
        if (sound && sound.isPlaying) {
            sound.stop();
        }
    },
};

export const {
    textBoxes,
    setPower,
    onClick,
    setScore,
    playSound,
    playIfNotPlaying,
    stopIfPlaying,
} = Helpers;
