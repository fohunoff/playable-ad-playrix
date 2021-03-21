import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH, LOGO_POSITION_X, LOGO_POSITION_Y } from '../constants/index.js';

export const logoInit = () => {
    const logo = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}logo.png`));
    logo.position.set(LOGO_POSITION_X, LOGO_POSITION_Y);

    app.stage.addChild(logo);
};
