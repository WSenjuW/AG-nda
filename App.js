import {  InfoContext } from './Componentes/Navigation_InfoContext/InfoContext';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Componentes/Navigation_InfoContext/Navigation';

export default function App() {
  return (
    <InfoContext>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </InfoContext>
  );
}