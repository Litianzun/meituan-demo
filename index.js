/**
 * @format
 */
import React,{PureComponent} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RootView from './src/rootview'

export default class AwesomeProject extends PureComponent {
    render() {
        return <RootView />
    }
}
AppRegistry.registerComponent(appName, () => AwesomeProject);
