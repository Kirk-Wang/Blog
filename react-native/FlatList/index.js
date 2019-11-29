/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import App from './App';
import {name as appName} from './app.json';

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
});

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator));
