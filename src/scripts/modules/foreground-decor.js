import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { fadeOut, fallingDown } from '../services/animations.js';
import { RES_PATH, FOREGROUND_PLANT_X, FOREGROUND_PLANT_Y } from '../constants/index.js';

const TIMEOUT = 500;

export const foregroundDecorInit = () => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    const plantForeground = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/plant-foreground.png`));
    plantForeground.position.set(FOREGROUND_PLANT_X, FOREGROUND_PLANT_Y - 50);
    plantForeground.alpha = 0;

    setTimeout(() => {
        fadeOut(plantForeground);
        fallingDown(plantForeground, FOREGROUND_PLANT_Y);
    }, TIMEOUT);

    container.addChild(plantForeground);
}
