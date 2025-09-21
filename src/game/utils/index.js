import { height, width } from "../consts";
import { black, orange, white } from "../consts/colors";

const Bases = {
    text(scene, { y = 0, text, style = {}, isVisible = true }) {
        const config = {
            fontFamily: "Arial",
            fontSize: Math.max(12, width / 30),
            color: white.css,
            stroke: black.css,
            strokeThickness: 3,
            align: "center",
        };

        return scene.add
            .text(width / 2, height / 2 + y, text, {
                ...config,
                ...style,
            })
            .setOrigin(0.5)
            .setVisible(isVisible);
    },
    flashScreen(scene, { color, alpha }) {
        const flash = scene.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            color,
            alpha
        );
        scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 250,
            onComplete: () => flash.destroy(),
        });
    },
    particle(scene, { x, y, options = {} }) {
        const config = {
            speed: { min: 50, max: 150 },
            scale: { start: 0.5, end: 0 },
            lifespan: 600,
            quantity: 12,
            tint: 0xe67e22,
            blendMode: "ADD",
        };
        const particles = scene.add.particles(x, y, "particle", {
            ...config,
            ...options,
        });

        scene.time.delayedCall(700, () => particles.destroy());
    },
    textBox(
        scene,
        {
            x,
            y,
            element,
            operator,
            value,
            bg = orange.hex,
            color = white.css,
            fontSize = 24,
            stroke = orange.css,
            strokeThickness = 3,
            velocityY = 120,
            radius = 16,
            width = 60,
            height = 60,
        }
    ) {
        // === Draw box centered ===
        const box = scene.add.graphics();
        box.fillStyle(bg, 1);
        box.fillRoundedRect(-(width / 2), -(height / 2), width, height, radius);
        box.x = x;
        box.y = y;

        // Add physics
        scene.physics.add.existing(box);
        element.add(box);
        box.body.setVelocityY(velocityY);

        // Save metadata
        box.operation = operator;
        box.value = value;

        // === Add centered text ===
        const text = scene.add
            .text(x, y, `${operator}${value}`, {
                fontSize: `${fontSize}px`,
                color,
                fontWeight: "bold",
                stroke,
                strokeThickness,
                align: "center",
                resolution: window.devicePixelRatio,
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            })
            .setOrigin(0.5);

        // Link text to box
        box.textObj = text;

        return box;
    },
};

export const { text, flashScreen, particle, textBox } = Bases;
