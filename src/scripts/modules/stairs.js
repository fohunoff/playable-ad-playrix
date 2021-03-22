import { Container } from '@pixi/display';
import { createSprite } from '../helpers/sprite';
import { STAIRS_POSITION_X, STAIRS_POSITION_Y } from '../constants';
import { fadeOut, fallingDown } from '../services/animations.js';

export const allStairs = [
    createSprite('stairs/stairs-1.png'),
    createSprite('stairs/stairs-2.png'),
    createSprite('stairs/stairs-3.png'),
];

export const oldStairs = createSprite('stairs/old-stairs.png');

export const stairsInit = () => {
    const container = new Container();

    oldStairs.position.set(840, 55);
    container.addChild(oldStairs);

    /**
     * Инициализация декора лестниц
     * @param {object} stairs
     */
    const initStairs = (stairs) => {
        stairs.position.set(STAIRS_POSITION_X, STAIRS_POSITION_Y);
        stairs.visible = false;
        container.addChild(stairs);

        fadeOut(stairs);
        fallingDown(stairs, STAIRS_POSITION_Y)
    }

    allStairs.forEach(initStairs);

    return container;
};
