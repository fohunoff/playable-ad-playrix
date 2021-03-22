import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { createSprite } from '../helpers/sprite';
import { getContainer } from './final-stage.js';
import { createStairsButton, resetActive, setActive } from '../services/stairs-button.js';
import { animationSwing, fadeOut } from '../services/animations.js';

import { allStairs, oldStairs } from './stairs.js';
import { STAIRS_POSITION_Y } from '../constants';

const STAIRS_FALL_OFFSET = 30;

const BUTTON_POSITION_Y = 15;
const BUTTON_OFFSET = 130;

let buttonX = 830;
let isStairsButtonInit = false;
let timeoutDelay = 0;

export const interactiveInit = () => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    const stairsButtons = [
        createStairsButton('stairs-1.png'),
        createStairsButton('stairs-2.png'),
        createStairsButton('stairs-3.png'),
    ];

    const okButton = createSprite('interactive/ok-button.png');
    const hammerIcon = createSprite('interactive/hammer.png');

    let selectedIndex = null;

    /**
     *
     * @param {*} index
     */
    const setStairsDefault = (index) => {
        const activeStairs = allStairs[index];

        activeStairs.y = STAIRS_POSITION_Y - STAIRS_FALL_OFFSET;
        activeStairs.alpha = 0;
        activeStairs.visible = true;
    }

    /**
     *
     * @param {object} stairsButton
     */
    const setOkButtonPosition = (stairsButton) => {
        const { x, y, width, height } = stairsButton;

        okButton.alpha = 0;
        okButton.visible = true;
        okButton.x = x - ((okButton.width - width) / 2);
        okButton.y = y + height - 30;
    };

    /**
     *
     * @param {*} stairsButton
     * @param {*} index
     */
    const clickStairsButtonHandler = (stairsButton, index) => {
        if (selectedIndex === index) return;
        selectedIndex = index;

        stairsButtons.forEach(resetActive);
        setActive(stairsButton);

        allStairs.forEach((stairs) => stairs.visible = false);
        oldStairs.visible = false;

        initOkButton();
        setStairsDefault(index);
        setOkButtonPosition(stairsButton);
    };

    const clickOkButtonHandler = () => {
        const finalStage = getContainer();
        finalStage.visible = true;
        finalStage.alpha = 0;
    };

    const hammerIconInit = () => {
        hammerIcon.interactive = true;
        hammerIcon.buttonMode = true;
        hammerIcon.position.set(1090, 265);
        hammerIcon.alpha = 0;

        hammerIcon.on('pointerdown', () => {
            if (isStairsButtonInit) return;

            stairsButtons.forEach(initStairsButton);

            isStairsButtonInit = true;
        });

        animationSwing(hammerIcon, 0.7, 0.1);
        fadeOut(hammerIcon);

        container.addChild(hammerIcon);
    };

    /**
     *
     * @param {*} button
     * @param {*} index
     */
    const initStairsButton = (button, index) => {
        button.position.set(buttonX, BUTTON_POSITION_Y);

        timeoutDelay += 100;
        buttonX += BUTTON_OFFSET;
        button.on('pointerdown', () => clickStairsButtonHandler(button, index));

        setTimeout(() => {
            button.alpha = 0;
            container.addChild(button);
        }, timeoutDelay);
    };

    /**
     *
     */
    const initOkButton = () => {
        okButton.visible = false;
        okButton.interactive = true;
        okButton.buttonMode = true;

        okButton.on('pointerdown', () => clickOkButtonHandler());
        fadeOut(okButton);

        container.addChild(okButton);
    };

    setTimeout(() => {
        hammerIconInit();
    }, 2000);
}
