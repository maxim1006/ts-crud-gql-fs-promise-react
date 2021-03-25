/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {AppContainer} from './src/components/app/app.container';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);
