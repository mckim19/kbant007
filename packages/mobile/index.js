/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from '@kbant/app';
import {name as appName} from './app.json';
import './shim'

AppRegistry.registerComponent(appName, () => App);
