import { SIGNINWITHEMAIL } from '~request/firebase';

import * as types from '../types';


export const USER_LOGIN = () => {
    return {
        type: types.USER_LOGIN,
        payload: {}
    };
};

export const USER_SIGNIN = (eposta, parola) => async dispatch => {

    const data = await SIGNINWITHEMAIL(eposta, parola);

    dispatch({
        type: types.USER_SIGNIN,
        payload: {
            uid: data.user.uid
        }
    });
};