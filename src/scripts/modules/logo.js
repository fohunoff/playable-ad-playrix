import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

export const logoInit = () => {
    const logo = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}logo.png`));
    logo.position.set(40, 10);
    app.stage.addChild(logo);
};
