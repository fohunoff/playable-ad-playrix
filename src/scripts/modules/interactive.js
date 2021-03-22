import { Container } from '@pixi/display';
import { createSprite } from '../helpers/sprite';
import { getContainer } from './final-stage.js';
import { createStairsButton, resetActive, setActive } from '../services/stairs-button.js';
import { animationSwing, fadeOut } from '../services/animations.js';

import { allStairs, oldStairs } from './stairs.js';
import {
    STAIRS_POSITION_Y,
    STAIRS_FALL_OFFSET,
    STAIRS_BUTTON_POSITION_Y,
    STAIRS_BUTTON_OFFSET,
} from '../constants';

let buttonX = 830;
let isStairsButtonInit = false;
let timeoutDelay = 0;

export const interactiveInit = () => {
    const container = new Container();

    const stairsButtons = [
        createStairsButton('stairs-1.png'),
        createStairsButton('stairs-2.png'),
        createStairsButton('stairs-3.png'),
    ];

    const okButton = createSprite('interactive/ok-button.png');
    const hammerIcon = createSprite('interactive/hammer.png');

    let selectedIndex = null;

    /**
     * Устанавливает стартовую точку лестницы
     * @param {number} index - индекс активного элемента
     */
    const setStairsDefault = (index) => {
        const activeStairs = allStairs[index];

        activeStairs.y = STAIRS_POSITION_Y - STAIRS_FALL_OFFSET;
        activeStairs.alpha = 0;
        activeStairs.visible = true;
    }

    /**
     * Устанавливает позицию кнопки ОК при переключении иконок лестниц
     * @param {object} stairsButton - контейнер кнопки-лестницы
     */
    const setOkButtonPosition = (stairsButton) => {
        const { x, y, width, height } = stairsButton;

        okButton.alpha = 0;
        okButton.visible = true;
        okButton.x = x - ((okButton.width - width) / 2);
        okButton.y = y + height - 30;
    };

    /**
     * Обработчик "клика" по лестнице
     * Инициализирует кнопку ОК
     * Устанавливает стартовые значения кнопки ОК и декор-лестинцы
     * @param {object} stairsButton - контейнер кнопки-лестницы
     * @param {number} index - индекс активной кнопки
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

    /**
     * Обрабочик клика кнопки ОК
     * Запускает финальную сцену
     */
    const clickOkButtonHandler = () => {
        const finalStage = getContainer();
        finalStage.visible = true;
        finalStage.alpha = 0;
    };

    /**
     * Инициализация иконки молотка
     * По клику запускает инициализацию кнопок-иконок лестниц
     */
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
     * Инициализация кнопки-иконки лестницы
     * @param {object} button - сама кнопка-иконка
     * @param {number} index - индекс кнопки в массиве для отображения декора-лестницы
     */
    const initStairsButton = (button, index) => {
        button.position.set(buttonX, STAIRS_BUTTON_POSITION_Y);

        timeoutDelay += 100;
        buttonX += STAIRS_BUTTON_OFFSET;
        button.on('pointerdown', () => clickStairsButtonHandler(button, index));

        setTimeout(() => {
            button.alpha = 0;
            container.addChild(button);
        }, timeoutDelay);
    };

    /**
     * Инициализация кнопки ОК
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

    return container;
}
