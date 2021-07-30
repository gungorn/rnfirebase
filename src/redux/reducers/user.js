import { USER_LOGIN, USER_SIGNIN } from '../types';


const initialState = {
    uid: ''
};

export const user = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOGIN:
            return {};

        case USER_SIGNIN:
            return { ...state, uid: payload.uid };

        default:
            return { ...state };
    }
}