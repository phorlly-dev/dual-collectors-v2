import { height } from "../consts";
import { playIfNotPlaying, stopIfPlaying } from "./helper";

const Controllers = {
    actions(scene) {
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
        else stop(scene);

        // Jump
        scene.cursors.space.isDown || scene.isJump
            ? jump(scene)
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
    jump(scene) {
        scene.player.setVelocityY(-330);
    },
    fallback(scene) {
        scene.player.setVelocityY(height);
    },
    stop(scene) {
        scene.player.setVelocityX(0);
        scene.player.anims.play("turn");

        stopIfPlaying(scene.walk);
    },
};

export const { actions, moveLeft, moveRight, jump, fallback, stop } =
    Controllers;
