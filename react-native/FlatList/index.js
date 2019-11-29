/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import App from './App';
import DetailsScreen from './pages/DetailsScreen';
import {name as appName} from './app.json';

const AppNavigator = createStackNavigator({
  App: {
    screen: App,
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      title: 'DetailsPage'
    }
  }
});

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator));
