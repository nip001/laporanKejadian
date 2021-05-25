import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import Router from './src/router/Router'
import Store from './src/Redux/Store'
export class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
