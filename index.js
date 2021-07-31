import { AppRegistry, Platform, UIManager } from 'react-native';

import { App } from './src/App';

//! sadece android için
if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);


AppRegistry.registerComponent('rnfirebase', () => App);
