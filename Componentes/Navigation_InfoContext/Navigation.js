import { DataContext, InfoContext } from './InfoContext.js';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useContext, useState } from 'react';
import Home from '../HomeView/Home.js';
import NoteModal from '../NoteModal.js';
import Menu from '../HomeView/Menu.js';
import Settings from '../Settings.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const languageVariable = {
    ajustes: {
        es: 'Ajustes',
        en: 'Settings'
    }
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <Menu {...props} />}>
            <Drawer.Screen options={{ headerShown: false }} name='StackNavigator' component={StackNavigator} />
        </Drawer.Navigator>
    )
}

function StackNavigator(params) {
    const [modal, setModal] = useState();
    const { languageList, languageIndex , themeList, themeIndex } = useContext(DataContext).info;
    return (
        <Stack.Navigator initialRouteName='Home' >
            <Stack.Screen options={{ headerShown: false, }} name='Home' >{(props) => <Home {...props} modal={modal} setModal={setModal} />}</Stack.Screen>
            <Stack.Screen options={{ headerShown: false, }} name='Modal'>{(props) => <NoteModal {...props} modal={modal} setModal={setModal} />}</Stack.Screen>
            <Stack.Screen options={
                {title:languageVariable.ajustes[languageList[languageIndex]],
                    headerStyle:{
                        backgroundColor:themeList[themeIndex].btnBackground,
                    },
                headerTintColor:themeList[themeIndex].textColor
                
                }} name='Settings'>{(props) => <Settings {...props} />}</Stack.Screen>
        </Stack.Navigator>
    )
}