import { height } from "../consts";
import { playIfNotPlaying, stopIfPlaying } from "./helper";

const Controllers = {
    updateActions(scene) {
        // Left movement
        if (scene.cursors.left.isDown || scene.as.A.isDown || scene.isLeft)
            moveLeft(scene);
        // Right movement
        else if (
            scene.cursors.right.isDown ||
            scene.as.S.isDown ||
            scene.isRight
        )
            moveRight(scene);
        // Idle
        else stopAction(scene);

        // Jump
        scene.cursors.space.isDown || scene.isJump
            ? moveUp(scene)
            : fallback(scene);
    },
    moveLeft(scene) {
        scene.player.setVelocityX(-160);
        scene.player.anims.play("left", true);

        playIfNotPlaying(scene.walk);
    },
    moveRight(scene) {
        scene.player.setVelocityX(160);
        scene.player.anims.play("right", true);

        playIfNotPlaying(scene.walk);
    },
    moveUp(scene) {
        scene.player.setVelocityY(-330);
    },
    fallback(scene) {
        scene.player.setVelocityY(height);
    },
    stopAction(scene) {
        scene.player.setVelocityX(0);
        scene.player.anims.play("turn");

        stopIfPlaying(scene.walk);
    },
};

export const {
    updateActions,
    moveLeft,
    moveRight,
    moveUp,
    fallback,
    stopAction,
} = Controllers;
