import * as types from '../types';

export const KEYBOARD_OPEN = ({ endCoordinates: { height } }) => {
    return {
        type: types.KEYBOARD_OPEN,
        payload: height
    };
};

export const KEYBOARD_CLOSE = () => {
    return { type: types.KEYBOARD_CLOSE };
};