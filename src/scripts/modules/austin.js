import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

const POSITION_X = 700;
const POSITION_Y = 115;

export const austinInit = () => {
    const austin = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}austin.png`));
    austin.position.set(POSITION_X, POSITION_Y);

    app.stage.addChild(austin);
};
