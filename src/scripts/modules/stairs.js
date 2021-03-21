import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

const stairs1 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/stairs-1.png`));
const stairs2 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/stairs-2.png`));
const stairs3 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/stairs-3.png`));

export const oldStairs = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}stairs/old-stairs.png`));
export const allStairs = [stairs1, stairs2, stairs3];
export const STAIRS_FINAL_POSITION_X = 900;
export const STAIRS_FINAL_POSITION_Y = 25;

export const stairsInit = () => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    oldStairs.position.set(840, 55);
    container.addChild(oldStairs);

    /**
     *
     * @param {*} stair
     */
    const initStairs = (stair) => {
        stair.position.set(STAIRS_FINAL_POSITION_X, STAIRS_FINAL_POSITION_Y);
        stair.visible = false;
        container.addChild(stair);
    }

    const animationDropStairs = (stairs) => {
        // "Падение" лестницы
        if (stairs.y < STAIRS_FINAL_POSITION_Y) {
            stairs.y += 5;
        }

        // Выход из прозрачного
        if (stairs.alpha < 1) {
            stairs.alpha += 0.1;
        }
    }

    allStairs.forEach(initStairs);

    app.ticker.add(() => allStairs.forEach(animationDropStairs));
};
