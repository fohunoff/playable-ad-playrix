// import { app } from './modules/app.js';
// document.body.appendChild(app.view);

import * as PIXI from 'pixi.js';
import { APP_SETIINGS, RES_PATH } from './scripts/constants/index.js';

import { austinInit } from './scripts/modules/austin.js';
import { decorationsInit } from './scripts/modules/decorations.js';
import { stairsInit } from './scripts/modules/stairs.js';
import { foregroundDecorInit } from './scripts/modules/foreground-decor.js';
import { interactiveInit } from './scripts/modules/interactive.js';
import { finalStageInit } from './scripts/modules/final-stage.js';
import { logoInit } from './scripts/modules/logo.js';

import { fadeOut } from './scripts/services/animations.js';

export const app = new PIXI.Application(APP_SETIINGS);
app.stage.alpha = 0;

document.getElementById('game').appendChild(app.view);

const bg = new PIXI.Sprite(PIXI.Texture.from(`${RES_PATH}bg.jpg`));
app.stage.addChild(bg);

austinInit();
decorationsInit();
stairsInit();
foregroundDecorInit();
interactiveInit();
finalStageInit();
logoInit();

setTimeout(() => {
    fadeOut(app.stage);
}, 300);
