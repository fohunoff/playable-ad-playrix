import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

export const foregroundDecorInit = () => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    const plantForeground = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/plant-foreground.png`));
    plantForeground.position.set(1130, 445);

    container.addChild(plantForeground);
}
