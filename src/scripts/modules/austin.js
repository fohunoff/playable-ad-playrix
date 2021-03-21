import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH, AUSTIN_POSITION_X, AUSTIN_POSITION_Y } from '../constants/index.js';

export const austinInit = () => {
    const austin = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}austin.png`));
    austin.position.set(AUSTIN_POSITION_X, AUSTIN_POSITION_Y);

    app.stage.addChild(austin);
};
