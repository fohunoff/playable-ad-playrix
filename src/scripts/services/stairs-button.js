import * as PIXI from 'pixi.js';
import { createSprite } from '../helpers/sprite';
import { fadeOut } from './animations.js';

export const createStairsButton = (image) => {
    const button = new PIXI.Container();
    const nonActiveButton = createSprite('interactive/non-active-button.png', 'normal');
    const activeButton = createSprite('interactive/active-button.png', 'active');
    const stairsTexture = createSprite(`interactive/${image}`, 'stairs');

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
