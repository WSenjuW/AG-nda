import {  InfoContext } from './Componentes/Navigation_InfoContext/InfoContext';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Componentes/Navigation_InfoContext/Navigation';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <InfoContext>
      <StatusBar barStyle='light-content' backgroundColor={'#202020'} />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </InfoContext>
  );
}