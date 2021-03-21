import { app } from '../../main.js';

export const animationSwing = (element) => {
    let currentAnimationTime = 0;

    app.ticker.add(() => {
        element.y += Math.sin(currentAnimationTime) * 0.3;
        currentAnimationTime += 0.05;
    });
}
