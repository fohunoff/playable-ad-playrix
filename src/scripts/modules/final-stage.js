import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';

import { app } from '../../main.js';
import { RES_PATH, APP_WIDTH, APP_HEIGHT } from '../constants/index.js';

import { animationSwing, fadeOut } from '../services/animations.js';

let container;

export const finalStageInit = () => {
    container = new PIXI.Container();
    container.interactive = true;
    container.visible = false;
    app.stage.addChild(container);

    const createOverlay = () => {
        const overlay = new Graphics();
        overlay.beginFill(0x000000);
        overlay.drawRect(0, 0, APP_WIDTH, APP_HEIGHT);
        overlay.alpha = 0.4;
        overlay.endFill();
        container.addChild(overlay);
    }

    const createBanner = () => {
        const banner = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/banner.png`));
        banner.x = APP_WIDTH / 2;
        banner.y = 50;
        banner.anchor.set(0.5, 0);

        container.addChild(banner);
    };

    const createContinueButton = () => {
        const continueButton = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/continue-button.png`));
        continueButton.x = APP_WIDTH / 2;
        continueButton.y = 480;
        continueButton.anchor.set(0.5, 0);

        continueButton.interactive = true;
        continueButton.buttonMode = true;

        continueButton.on('pointerdown', () => {
            console.log('open game link');
        });

        // Анимация "качения кнопки"
        animationSwing(continueButton);

        container.addChild(continueButton);
    };

    createOverlay();
    createBanner();
    createContinueButton();

    fadeOut(container);
};

export const getContainer = () => container;
