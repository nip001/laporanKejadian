import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../page/Home';
import Register from '../page/Register';
import Login from '../page/Login';
import MainMenu  from '../page/MainMenu';
import Laporan from '../page/Laporan';
import HistoriLaporan from '../page/HistoriLaporan';
import MapPage from '../page/MapPage';

const Stack = createStackNavigator();
export class Router extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="MainMenu" component={MainMenu}/>
                <Stack.Screen name="Laporan" component={Laporan}/>
                <Stack.Screen name="HistoriLaporan" component={HistoriLaporan}/>
                <Stack.Screen name="MapPage" component={MapPage}/>
            </Stack.Navigator>
        )
    }
}

export default Router
