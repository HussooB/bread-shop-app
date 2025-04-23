import Login from './screens/loginPage.js'
import {View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './navigation/stackNavigator.js'
import DashBoard from './screens/DashBoard.js'
export default function App(){
  return(
    <NavigationContainer>
      <DashBoard />
      </NavigationContainer>
  )
}