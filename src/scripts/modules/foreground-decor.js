import { Container } from '@pixi/display';
import { createSprite } from '../helpers/sprite';
import { fadeOut, fallingDown } from '../services/animations.js';
import { FOREGROUND_PLANT_X, FOREGROUND_PLANT_Y } from '../constants';

const TIMEOUT = 500;

export const foregroundDecorInit = () => {
    const container = new Container();

    const plantForeground = createSprite('decoration/plant-foreground.png');
    plantForeground.position.set(FOREGROUND_PLANT_X, FOREGROUND_PLANT_Y - 50);
    plantForeground.alpha = 0;

    setTimeout(() => {
        fadeOut(plantForeground);
        fallingDown(plantForeground, FOREGROUND_PLANT_Y);
    }, TIMEOUT);

    container.addChild(plantForeground);

    return container;
}
