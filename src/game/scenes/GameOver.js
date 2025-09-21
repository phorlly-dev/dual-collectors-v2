import { isMobile } from "../../hooks/function";
import { emitEvent } from "../../hooks/remote";
import {
    audio,
    over,
    press_restart,
    start,
    tap_restart,
    width,
} from "../consts";
import { error, primary, secondary, success } from "../consts/colors";
import { text } from "../utils";
import { onClick, playSound } from "../utils/helper";

class GameOver extends Phaser.Scene {
    constructor() {
        super(over);
    }

    create(data) {
        emitEvent("header", data.isHeader);
        emitEvent("footer", data.isFooter);
        const bg = this.cameras.main.setBackgroundColor(secondary.css);

        const fontSize = width / 10;
        const title = text(this, {
            y: -120,
            text: "GAME OVER!",
            style: {
                fontFamily: "Arial Black",
                fontSize: fontSize,
                stroke: primary.css,
                color: error.css,
                strokeThickness: 10,
            },
        });
        const score = text(this, {
            y: -12,
            text: `Final Score: ${data.score}`,
            style: {
                fontSize: fontSize / 2,
                strokeThickness: 10,
            },
        });
        this.label = text(this, {
            y: 100,
            text: "",
            style: {
                fontFamily: "Lucida Console",
                fontSize: fontSize / 3,
                color: primary.css,
                stroke: secondary.css,
                strokeThickness: 8,
            },
        });

        onClick(this, {
            keys: ["keydown-SPACE", "pointerdown"],
            callback: () => {
                // destroy texts
                bg.destroy();
                title.destroy();
                score.destroy();
                this.label.destroy();

                // stop GameOver scene
                this.scene.stop();

                // stop and reset Game scene
                this.scene.stop(start);

                // start fresh with unpaused state
                this.scene.start(start);

                playSound(this, audio.key.start);
            },
        });
    }

    update() {
        this.label.setText(isMobile() ? tap_restart : press_restart);
    }
}

export default GameOver;
