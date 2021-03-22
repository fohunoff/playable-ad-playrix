import { app } from '../../main.js';

/**
 * Анимация покачивания вверх-вниз
 * @param {object} element - элемент, к которому будет применена анимация
 * @param {number} amplitude
 * @param {number} speed
 */
export const animationSwing = (element, amplitude = 0.3, speed = 0.05) => {
    let currentAnimationTime = 0;

    app.ticker.add(() => {
        element.y += Math.sin(currentAnimationTime) * amplitude;
        currentAnimationTime += speed;
    });
}

/**
 * Анимация появления элемента через альфа-канал
 * @param {object} element - элемент, к которому будет применена анимация
 * @param {number} step - шаг увеличения прозрачности за кадр
 */
export const fadeOut = (element, step = 0.1) => {
    app.ticker.add(() => {
        if (element.alpha < 1) {
            element.alpha += step;
        }
    });
};

/**
 * Падение элемента до заданной точки
 * @param {object} element - элемент, к которому будет применена анимация
 * @param {number} finalPosition - координата, до которой должен опускаться элемент
 * @param {number} step - шаг сдвига в пикселях за кадр
 */
export const fallingDown = (element, finalPosition, step = 5) => {
    if (!finalPosition) {
        finalPosition = element.y;
    }

    app.ticker.add(() => {
        if (element.y < finalPosition) {
            element.y += step;
        }
    })
}
