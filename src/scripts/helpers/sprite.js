import * as PIXI from 'pixi.js';
import { RES_PATH } from '../constants';

class Sprite extends PIXI.Sprite {
    constructor(texture, identifier) {
        super(texture);
        
        this._identifier = identifier;
    }
}

export const createSprite = (image, id = null) => {
    return new Sprite(PIXI.Texture.from(`${RES_PATH}${image}`), id);
};
