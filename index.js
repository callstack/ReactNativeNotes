/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import NotesMainPanel from './src/NotesMainPanel';
import UserAccountPanel from './src/UserAccountPanel';
import ApplicationSettingsPanel from './src/ApplicationSettingsPanel';

AppRegistry.registerComponent(appName, () => App);
