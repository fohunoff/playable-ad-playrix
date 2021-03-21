import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

export const austinInit = () => {
    const austin = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}austin.png`));
    austin.x = 700;
    austin.y = 115;
    app.stage.addChild(austin);
};
