import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import store from '~redux';

import { Splash } from '~screens';

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <Provider store={store}>
                <Splash />
            </Provider>
        </View>
    );
};

export { App };