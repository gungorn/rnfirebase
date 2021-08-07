import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from '@react-native-firebase/app';

import store from '~redux';
import { Navigation } from '~/Navigation';

const App = () => {
    useEffect(() => {
        firebase.initializeApp({
            apiKey: "AIzaSyBfM6OEXpYoqlNZIqBA9f7L6liKmhYN9uQ",
            authDomain: "rnfirebasekodluyoruz.firebaseapp.com",
            databaseURL: "https://rnfirebasekodluyoruz-default-rtdb.firebaseio.com",
            projectId: "rnfirebasekodluyoruz",
            storageBucket: "rnfirebasekodluyoruz.appspot.com",
            messagingSenderId: "707478664593",
            appId: "1:707478664593:android:6daf9b8048e76932951630",
            measurementId: "",
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Provider store={store}>
                <Navigation />
            </Provider>
        </View>
    );
};

export { App };