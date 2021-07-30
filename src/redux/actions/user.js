import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import * as types from '../types';


export const USER_LOGIN = () => {
    return {
        type: types.USER_LOGIN,
        payload: {}
    };
};

export const USER_SIGNIN = (eposta, parola) => async dispatch => {
    auth()
        .createUserWithEmailAndPassword(eposta, parola)
        .then(d => {
            console.log('test', d);
            const uid = d.user.uid;

            database()
                .ref(`/USERS/${uid}/info`)
                .set({
                    name: 'nurettin',
                    surname: 'lorem ipsum',
                    age: 99,
                })
                .then(() => console.log('Data set.'));

            dispatch({
                type: types.USER_SIGNIN,
                payload: {
                    uid
                }
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });
};