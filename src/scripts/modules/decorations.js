import * as PIXI from 'pixi.js';
import { app } from '../../main.js';
import { RES_PATH } from '../constants/index.js';

export const decorationsInit = () => {
    const decorContainer = new PIXI.Container();
    app.stage.addChild(decorContainer);

    const bookStand = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/book-stand.png`));
    const couch = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/couch.png`));
    const globe = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/globe.png`));
    const plant1 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/plant.png`));
    const plant2 = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/plant.png`));
    const table = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}decoration/table.png`));

    bookStand.position.set(830, -20);
    plant1.position.set(450, -40);
    globe.position.set(90, 110);
    plant2.position.set(1140, 170);
    table.position.set(200, 200);
    couch.position.set(130, 320);

    decorContainer.addChild(bookStand);
    decorContainer.addChild(plant1);
    decorContainer.addChild(globe);
    decorContainer.addChild(plant2);
    decorContainer.addChild(table);
    decorContainer.addChild(couch);
};
