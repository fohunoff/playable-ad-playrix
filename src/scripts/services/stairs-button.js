import * as PIXI from 'pixi.js';
import { RES_PATH } from '../constants/index.js';
import { fadeOut } from './animations.js';

const BUTTON_POSITION_Y = 15;

class MyIDSprite extends PIXI.Sprite {
    constructor(texture, identifier) {
        super(texture);
        this._identifier = identifier;
    }
}

export const createStairsButton = (image) => {
    const button = new PIXI.Container();
    const nonActiveButton = new MyIDSprite(PIXI.Texture.from(`${RES_PATH}interactive/non-active-button.png`), 'normal');
    const activeButton = new MyIDSprite(PIXI.Texture.from(`${RES_PATH}interactive/active-button.png`), 'active');
    const stairsTexture = new MyIDSprite(PIXI.Texture.from(`${RES_PATH}interactive/${image}`), 'stairs');

    button.addChild(nonActiveButton);
    button.addChild(activeButton);
    button.addChild(stairsTexture);

    button.interactive = true;
    button.buttonMode = true;

    activeButton.visible = false;

    fadeOut(button);

    return button;
}

export const resetActive = (container) => {
    const nonActiveButton = container.children.find((item) => item['_identifier'] === 'normal');
    const activeButton = container.children.find((item) => item['_identifier'] === 'active');

    nonActiveButton.visible = true;
    activeButton.visible = false;
}

export const setActive = (container) => {
    const nonActiveButton = container.children.find((item) => item['_identifier'] === 'normal');
    const activeButton = container.children.find((item) => item['_identifier'] === 'active');

    nonActiveButton.visible = false;
    activeButton.visible = true;
};
