import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

import { allStairs, oldStairs, STAIRS_FINAL_POSITION_Y } from './stairs.js';
import { getContainer } from './final-stage.js';

const STAIRS_FALL_OFFSET = 30;

const BUTTON_POSITION_Y = 15;
const BUTTON_OFFSET = 130;
let buttonX = 830;

export const interactiveInit = () => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    const button1 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/stairs-1.png`));
    const button2 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/stairs-2.png`));
    const button3 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/stairs-3.png`));
    const stairsButtons = [button1, button2, button3];

    const okButton = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/ok-button.png`));

    let selectedIndex = null;

    /**
     *
     * @param {*} index
     */
    const setStairsDefault = (index) => {
        const activeStairs = allStairs[index];

        activeStairs.y = STAIRS_FINAL_POSITION_Y - STAIRS_FALL_OFFSET;
        activeStairs.alpha = 0;
        activeStairs.visible = true;
    }

    /**
     *
     * @param {object} stairsButton
     */
    const moveOkButton = (stairsButton) => {
        console.log(typeof stairsButton);

        const { x, y, width, height } = stairsButton;

        okButton.alpha = 0;
        okButton.visible = true;
        okButton.x = x - ((okButton.width - width) / 2);
        okButton.y = y + height - 30;
    };

    /**
     *
     * @param {*} button
     * @param {*} index
     */
    const clickStairsButtonHandler = (button, index) => {
        if (selectedIndex === index) return;
        selectedIndex = index;

        allStairs.forEach((stairs) => stairs.visible = false);
        oldStairs.visible = false;

        setStairsDefault(index);
        moveOkButton(button);
    };

    const clickOkButtonHandler = () => {
        const finalStage = getContainer();
        finalStage.visible = true;
        finalStage.alpha = 0;
    };

    const animationOkButton = () => {
        if (okButton.alpha < 1) {
            okButton.alpha += 0.1;
        }
    }

    /**
     *
     * @param {*} button
     * @param {*} index
     */
    const initButton = (button, index) => {
        button.interactive = true;
        button.buttonMode = true;
        button.position.set(buttonX, BUTTON_POSITION_Y);

        buttonX += BUTTON_OFFSET;
        container.addChild(button);

        button.on('pointerdown', () => clickStairsButtonHandler(button, index));
    };

    /**
     *
     */
    const initOkButton = () => {
        okButton.visible = false;
        okButton.interactive = true;
        okButton.buttonMode = true;

        okButton.on('pointerdown', () => clickOkButtonHandler());

        container.addChild(okButton);
    };

    stairsButtons.forEach(initButton);
    initOkButton();

    app.ticker.add(animationOkButton);
}
