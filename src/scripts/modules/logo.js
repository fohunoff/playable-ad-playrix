import { createSprite } from '../helpers/sprite';
import { LOGO_POSITION_X, LOGO_POSITION_Y } from '../constants';

export const logoInit = () => {
    const logo = createSprite('logo.png');
    logo.position.set(LOGO_POSITION_X, LOGO_POSITION_Y);

    return logo;
};
