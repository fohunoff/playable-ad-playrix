import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH, STAIRS_POSITION_Y } from '../constants/index.js';
import { allStairs, oldStairs } from './stairs.js';
import { getContainer } from './final-stage.js';
import { animationSwing, fadeOut } from '../services/animations.js';

const STAIRS_FALL_OFFSET = 30;

const BUTTON_POSITION_Y = 15;
const BUTTON_OFFSET = 130;

let buttonX = 830;
let isStairsButtonInit = false;

export const interactiveInit = () => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    /****** */

    // const nonActiveButton = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/non-active-button.png`));
    // const activeButton = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/active-button.png`));

    // const button1 = new PIXI.Container();
    // button1.addChild(nonActiveButton);
    // button1.addChild(activeButton);

    // button1.interactive = true;
    // button1.buttonMode = true;

    // nonActiveButton.position.set(400, BUTTON_POSITION_Y);
    // activeButton.position.set(400, BUTTON_POSITION_Y);

    // activeButton.visible = false;

    // button1.on('pointerdown', () => {
    //     nonActiveButton.visible = !nonActiveButton.visible;
    //     activeButton.visible = !activeButton.visible;
    // });

    // app.stage.addChild(button1);

    /****** */

    const stairsButtons = [
        new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/stairs-1.png`)),
        new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/stairs-2.png`)),
        new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/stairs-3.png`)),
    ];

    const okButton = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/ok-button.png`));
    const hammerIcon = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}interactive/hammer.png`));

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
        setOkButtonPosition(button);
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
            initOkButton();

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
        fadeOut(okButton);

        container.addChild(okButton);
    };

    setTimeout(() => {
        hammerIconInit();
    }, 2000);
}
