import * as PIXI from 'pixi.js';
import { APP_SETIINGS, RES_PATH } from './scripts/constants';

import { austinInit } from './scripts/modules/austin.js';
import { decorationsInit } from './scripts/modules/decorations.js';
import { stairsInit } from './scripts/modules/stairs.js';
import { foregroundDecorInit } from './scripts/modules/foreground-decor.js';
import { interactiveInit } from './scripts/modules/interactive.js';
import { finalStageInit } from './scripts/modules/final-stage.js';
import { logoInit } from './scripts/modules/logo.js';

import { createSprite } from './scripts/helpers/sprite.js';
import { fadeOut } from './scripts/services/animations.js';

export const app = new PIXI.Application(APP_SETIINGS);
app.stage.alpha = 0;

document.getElementById('game').appendChild(app.view);
app.stage.addChild(createSprite('bg.jpg'));

app.stage.addChild(austinInit());
app.stage.addChild(decorationsInit());
app.stage.addChild(stairsInit());
app.stage.addChild(foregroundDecorInit());
app.stage.addChild(interactiveInit());
app.stage.addChild(finalStageInit());
app.stage.addChild(logoInit());

setTimeout(() => fadeOut(app.stage), 300);
