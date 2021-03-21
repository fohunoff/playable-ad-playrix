import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH, STAIRS_POSITION_X, STAIRS_POSITION_Y } from '../constants/index.js';
import { fadeOut, fallingDown } from '../services/animations.js';

export const allStairs = [
    new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/stairs-1.png`)),
    new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/stairs-2.png`)),
    new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/stairs-3.png`)),
];

export const oldStairs = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/old-stairs.png`));

export const stairsInit = () => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    oldStairs.position.set(840, 55);
    container.addChild(oldStairs);

    /**
     *
     * @param {*} stairs
     */
    const initStairs = (stairs) => {
        stairs.position.set(STAIRS_POSITION_X, STAIRS_POSITION_Y);
        stairs.visible = false;
        container.addChild(stairs);

        fadeOut(stairs);
        fallingDown(stairs, STAIRS_POSITION_Y)
    }

    allStairs.forEach(initStairs);
};
