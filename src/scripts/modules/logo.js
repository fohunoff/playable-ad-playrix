import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

const POSITION_X = 40;
const POSITION_Y = 10;

export const logoInit = () => {
    const logo = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}logo.png`));
    logo.position.set(POSITION_X, POSITION_Y);

    app.stage.addChild(logo);
};
