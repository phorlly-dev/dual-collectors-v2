import { exponentFromValue } from "../../hooks/function";
import { emitEvent, onEvent } from "../../hooks/remote";
import { audio, height, image, over, start, width } from "../consts";
import spawnBoxes from "../utils/box-factory";
import { actions } from "../utils/controller";
import { bombEffect, powerEffect, scoreEffect } from "../utils/effect";
import { playSound, setPower, setScore, textBoxes } from "../utils/helper";
import { makeAnimations, makePlayer } from "../utils/object";
import { getSoundKey, textPause, togglePause } from "../utils/state";

class Game extends Phaser.Scene {
    constructor() {
        super(start);

        // Declare scene-level variables
        this.player = null;
        this.powerBoxes = null;
        this.scoreBoxes = null;
        this.bombBoxes = null;
        this.cursors = null;
        this.as = null;
        this.spawnTimer = null;
        this.walk = null;
        this.pauseText = null;
        this.pauseInstructions = null;

        this.power = 100;
        this.score = 0;
        this.isPaused = false;
        this.isLeft = false;
        this.isRight = false;
        this.isJump = false;
    }

    create() {
        // 🔹 Lifecycle hook
        emitEvent("current-scene-ready", this);
        emitEvent("header", true);
        emitEvent("footer", true);

        // ---  background ---
        this.add.image(width / 2, height / 2, image.key.bg).setAlpha(0.2);

        // --- Reset game state ---
        this.restartGame();

        // --- Player, animations, UI ---
        this.player = makePlayer(this);

        makeAnimations(this);
        textPause(this);

        // --- Physics groups ---
        this.powerBoxes = this.physics.add.group();
        this.scoreBoxes = this.physics.add.group();
        this.bombBoxes = this.physics.add.group();

        // --- Controls ---
        this.cursors = this.input.keyboard.createCursorKeys();
        this.as = this.input.keyboard.addKeys("A,S");

        // --- Spawn boxes timer ---
        this.spawnTimer = this.time.addEvent({
            delay: 1800,
            callback: () => spawnBoxes(this),
            loop: true,
        });

        // --- Overlap handlers ---
        this.registerOverlap(this.powerBoxes, this.collectPowerBox);
        this.registerOverlap(this.scoreBoxes, this.collectScoreBox);
        this.registerOverlap(this.bombBoxes, this.hitBomb);

        // --- Sounds ---
        this.walk = this.sound.add(audio.key.walk, { loop: true, volume: 0.8 });
        this.sound.play(audio.key.playing, { loop: true, volume: 0.5 });

        this.controls();
    }

    controls() {
        onEvent("mute", (isMute) => {
            this.sound.mute = isMute;
            playSound(this, audio.key.click);
        });
        onEvent("pause", (isPause) => {
            togglePause(this, isPause);
            playSound(this, audio.key.click);
        });
        onEvent("left", (isLeft) => {
            this.isLeft = isLeft;
        });
        onEvent("right", (isRight) => {
            this.isRight = isRight;
        });
        onEvent("jump", (isJump) => {
            this.isJump = isJump;
        });
    }

    update() {
        if (this.isPaused) return;

        // --- Player movement ---
        actions(this);

        // --- Update box text positions + cleanup ---
        textBoxes(this);

        // --- Game over check ---
        if (this.power <= 0 && !this.isPaused) {
            this.isPaused = true; // prevent multiple triggers
            this.time.delayedCall(800, () => {
                this.scene.start(over, {
                    score: this.score,
                    isHeader: false,
                    isFooter: false,
                });

                playSound(this, audio.key.end);
            });
        }
    }

    // --- Overlap helper ---
    registerOverlap(group, callback) {
        this.physics.add.overlap(this.player, group, callback, null, this);
    }

    // --- Collectors ---
    collectPowerBox(_player, powerBox) {
        if (powerBox.operation === "x") {
            this.power += exponentFromValue(powerBox.value) * 10;
        } else if (powerBox.operation === "/") {
            this.power = Math.floor(this.power / powerBox.value);
        }

        powerEffect(this, {
            x: powerBox.x,
            y: powerBox.y,
            operation: powerBox.operation,
            value: powerBox.value,
            oldPower: this.power,
        });

        setPower(this.power);
        playSound(this, getSoundKey(powerBox.operation));

        if (powerBox.textObj) powerBox.textObj.destroy();
        powerBox.destroy();
    }

    collectScoreBox(_player, scoreBox) {
        if (scoreBox.operation === "+") {
            this.score += scoreBox.value;
        } else if (scoreBox.operation === "-") {
            this.score = Math.max(0, this.score - scoreBox.value);
        }

        scoreEffect(this, {
            x: scoreBox.x,
            y: scoreBox.y,
            operation: scoreBox.operation,
            value: scoreBox.value,
            oldScore: this.score,
        });

        setScore(this.score);
        playSound(this, getSoundKey(scoreBox.operation));

        if (scoreBox.textObj) scoreBox.textObj.destroy();
        scoreBox.destroy();
    }

    hitBomb(player) {
        bombEffect(this, player);

        this.power = Math.max(0, this.power - 50);

        setPower(this.power);
    }

    // --- Restart/reset state ---
    restartGame() {
        this.power = 100;
        this.score = 0;
        this.isPaused = false;

        setPower(this.power);
        setScore(this.score);
    }
}

export default Game;
