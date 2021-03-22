import { app } from '../../main.js';
import { createSprite } from '../helpers/sprite';
import { AUSTIN_POSITION_X, AUSTIN_POSITION_Y } from '../constants';

export const austinInit = () => {
    const austin = createSprite('austin.png');
    austin.position.set(AUSTIN_POSITION_X, AUSTIN_POSITION_Y);

    app.stage.addChild(austin);
};
