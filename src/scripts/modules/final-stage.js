import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { createSprite } from '../helpers/sprite';
import { animationSwing, fadeOut } from '../services/animations.js';
import {
    APP_WIDTH,
    APP_HEIGHT,
    REDIRECT_URL,
    BANNER_POSITION_Y,
    CONTINUE_BUTTON_POSITION_Y,
} from '../constants';

let container;

export const finalStageInit = () => {
    container = new Container();
    container.interactive = true;
    container.visible = false;

    const createOverlay = () => {
        const overlay = new Graphics();
        overlay.beginFill(0x000000);
        overlay.drawRect(0, 0, APP_WIDTH, APP_HEIGHT);
        overlay.alpha = 0.4;
        overlay.endFill();
        container.addChild(overlay);
    }

    const createBanner = () => {
        const banner = createSprite('interactive/banner.png');
        banner.x = APP_WIDTH / 2;
        banner.y = BANNER_POSITION_Y;
        banner.anchor.set(0.5, 0);

        container.addChild(banner);
    };

    const createContinueButton = () => {
        const continueButton = createSprite('interactive/continue-button.png');
        continueButton.x = APP_WIDTH / 2;
        continueButton.y = CONTINUE_BUTTON_POSITION_Y;
        continueButton.anchor.set(0.5, 0);

        continueButton.interactive = true;
        continueButton.buttonMode = true;

        continueButton.on('pointerdown', () => {
            const win = window.open(REDIRECT_URL, '_blank');
            win.focus();
        });

        // Анимация "качения кнопки"
        animationSwing(continueButton);

        container.addChild(continueButton);
    };

    createOverlay();
    createBanner();
    createContinueButton();

    fadeOut(container);

    return container;
};

export const getContainer = () => container;
