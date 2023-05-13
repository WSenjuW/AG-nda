import { useEffect, useReducer, createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



const initialState = {
    notes: {},
    languageList: ['es', 'en'],
    languageIndex: 0,
    themeIndex: 0,
    themeList: [
        {
            themeTitle: 'light',
            background: '#f1f1f1',
            textColor: "#000",
            btnBackground: '#bfbfbf',
            btnColor: '#000',
            menuBackground: '#f1f1f1',
            menuItemBackground: '#DDDDDD',
            menuItemColor: '#000',
            itemListBackground: '#FFD966',
            itemListColor: "#000"
        },
        {
            themeTitle: 'dark',
            background: '#1f1f1f',
            textColor: "#fff",
            btnBackground: '#383838',
            btnColor: '#fff',
            menuBackground: '#1f1f1f',
            menuItemBackground: '#363636',
            menuItemColor: '#fff',
            itemListBackground: '#0E8388',
            itemListColor: "#000"
        }
    ]
}

const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_LANGUAGE": {
            if (state.languageIndex >= state.languageList.length - 1) { state.languageIndex = 0 }
            else { state.languageIndex = state.languageIndex + 1 }
            return state
        }
            break;
        case "CHANGE_THEME": {
            if (state.themeIndex >= state.themeList.length - 1) { state.themeIndex = 0 }
            else { state.themeIndex = state.themeIndex + 1 }
            return state
        }
            break;
        case "UPDATE_DATA": {
            const infoStringify = JSON.parse(action.info);
            return state = infoStringify;
        }
            break;
        case "UPDATE_NOTE": {
            const year = new Date(action.item.item['date']).getFullYear();
            const month = new Date(action.item.item['date']).getMonth();
            let yearOI = new Date(action.item.oldItem.date).getFullYear();
            let monthOI = new Date(action.item.oldItem.date).getMonth();

            state.notes[yearOI][monthOI] = state.notes[yearOI][monthOI].filter(e => e.id !== action.item.oldItem.id);

            if (state.notes[yearOI][monthOI].length === 0) {
                delete state.notes[yearOI][monthOI];
                if (Object.keys(state.notes[year]).length === 0) {   delete state.notes[year]   }
            }
            if (state.notes[year] === undefined) {
                state.notes[year] = new Object;
                state.notes[year][month] = [action.item.item];
            }
            else {
                if (state.notes[year][month] !== undefined) {
                    let indexItem = state.notes[year][month].findIndex(e => e.id === action.item.oldItem.id);
                    Object.assign(state.notes[year][month][indexItem], action.item.item);
                }
                else { state.notes[year][month].push(action.item.item) }
            }
            return state
        }
            break;
        case "ADD_NOTE": {
            const year = new Date(action.item.item['date']).getFullYear();
            const month = new Date(action.item.item['date']).getMonth();

            if (state.notes[year] === undefined) {
                state.notes[year] = new Object;
                state.notes[year][month] = [action.item.item];
            }
            else {
                if (state.notes[year][month] === undefined) { state.notes[year][month] = [action.item.item] }
                else { state.notes[year][month].push(action.item.item) }
            }
            return state
        }
            break;
        case "REMOVE_NOTE": {
            const year = new Date(action.item.item['date']).getFullYear();
            const month = new Date(action.item.item['date']).getMonth();

            state.notes[year][month] = state.notes[year][month].filter(e => e.id !== action.item.item.id);

            if (state.notes[year][month].length === 0) {
                delete state.notes[year][month];
                if (Object.keys(state.notes[year]).length === 0) { delete state.notes[year]; }
            }
            return state
        }
        default: return state;
            break;
    }
}
const DataContext = createContext();

function InfoContext({ children }) {
    const [info, dispatchFunction] = useReducer(reducer, initialState);
    const [switchFunction, setSwitchFunction] = useState(true);

    useEffect(() => {
        async function updateInfo() {
            let data = await AsyncStorage.getItem('info');
            if (data !== null) dispatchInfo({ type: "UPDATE_DATA", info: data })
        }
        updateInfo()
    }, []);



    useEffect(() => {
        if (info !== initialState) AsyncStorage.setItem('info', JSON.stringify(info))
    }, [switchFunction]);


    function dispatchInfo(params) {
        dispatchFunction(params);
        setSwitchFunction(!switchFunction);
    }

    return (
        <DataContext.Provider value={{ info: info, dispatch: dispatchInfo }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, InfoContext }