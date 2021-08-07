import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import shortid from 'shortid';
import moment from 'moment';
import { dateTypes } from '~/configs';

const AUTH = auth();
const DB = database();

export const refs = {
    users: DB.ref('/USERS'),
    userinfo: uid => DB.ref(`/USERS/${uid}/info`),
    note: (uid, noteid) => DB.ref(`/USERS/${uid}/notes/${noteid}`),
};

export const SIGNINWITHEMAIL = args => new Promise((resolve, reject) => {
    const { email, password, name } = args;
    AUTH
        .createUserWithEmailAndPassword(email, password)
        .then(d => {
            const uid = d.user.uid;
            const ref = refs.userinfo(uid);

            SET(ref, { ...args, password: undefined })
                .then(() => resolve(d))
                .catch(reject);
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
});


export const LOGINWITHEMAIL = args => new Promise((resolve, reject) => {
    const { email, password } = args;

    AUTH.signInWithEmailAndPassword(email, password)
        .then(d => {
            const uid = d.user.uid;
            const ref = refs.userinfo(uid);

            GET(ref)
                .then(d => resolve({ ...d, uid }))
                .catch(reject);

        })
        .catch(e => {

        });
});


export const SEND = args => new Promise((resolve, reject) => {
    const { uid, text } = args;
    const noteid = `${shortid()}_${shortid()}`;
    const ref = refs.note(uid, noteid);
    const createDate = moment().format(dateTypes.type1);
    const data = {
        text,
        createDate,
        archive: false
    };

    SET(ref, data)
        .then(resolve)
        .catch(reject);
});


export const SET = async (ref, data) => new Promise((resolve, reject) => {
    ref
        .set(data)
        .then(resolve)
        .catch(reject);
});

export const GET = async ref => new Promise((resolve, reject) => {
    ref
        .once('value')
        .then(d => resolve(d.val()))
        .catch(reject);
});