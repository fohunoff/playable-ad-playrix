import { app } from '../../main.js';

/**
 *
 * @param {*} element
 * @param {*} amplitude
 * @param {*} speed
 */
export const animationSwing = (element, amplitude = 0.3, speed = 0.05) => {
    let currentAnimationTime = 0;

    app.ticker.add(() => {
        element.y += Math.sin(currentAnimationTime) * amplitude;
        currentAnimationTime += speed;
    });
}

/**
 *
 * @param {*} element
 * @param {*} step
 */
export const fadeOut = (element, step = 0.1) => {
    app.ticker.add(() => {
        if (element.alpha < 1) {
            element.alpha += step;
        }
    });
};

/**
 *
 * @param {*} element
 * @param {*} finalPosition
 * @param {*} step
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
