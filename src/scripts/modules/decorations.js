import { Container } from '@pixi/display';
import { createSprite } from '../helpers/sprite';
import { fadeOut, fallingDown } from '../services/animations.js';

const DECORS = {
    bookStand:  { x: 830,   y: -20, name: 'book-stand.png', },
    couch:      { x: 130,   y: 320, name: 'couch.png', },
    globe:      { x: 90,    y: 110, name: 'globe.png', },
    plant1:     { x: 450,   y: -40, name: 'plant.png', },
    plant2:     { x: 1140,  y: 170, name: 'plant.png', },
    table:      { x: 200,   y: 200, name: 'table.png', },
};

let TIMEOUT = 300;

export const decorationsInit = () => {
    const decorContainer = new Container();

    // Сортируем по Y, чтобы не перекрывались предметы по экспозиции
    Object.values(DECORS).sort((a, b) => a.y - b.y).forEach((item) => {
        const decor = createSprite(`decoration/${item.name}`);
        decor.position.set(item.x, item.y - 50);
        decor.alpha = 0;

        setTimeout(() => {
            fadeOut(decor);
            fallingDown(decor, item.y, 4);
        }, TIMEOUT);

        TIMEOUT += 100;

        decorContainer.addChild(decor);
    });

    return decorContainer;
};
