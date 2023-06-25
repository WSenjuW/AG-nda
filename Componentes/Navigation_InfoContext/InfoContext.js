import { useEffect, useReducer, createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    pastNotes: {},
    todayNotes: [],
    notes: {},
    languageList: ['es', 'en'],
    languageIndex: 0,
    themeIndex: 0,
    themeList: [
        {
            themeTitle: 'light',
            textColor: "#000",
            background: '#f1f1f1',
            btnBackground: '#CBCBCB',
            itemListBackground: '#CBCBCB',
            typeTheme: "light"
        },
        {
            themeTitle: 'dark',
            textColor: "#fff",
            background: '#1f1f1f',
            btnBackground: '#363636',
            itemListBackground: '#363636',
            typeTheme: "dark"
        }
    ]
}

const reducer = (state, action) => {

    function updateNotes() {
        let todayDate = new Date();
        let yearNotes = Object.keys(state.notes).filter(e => Number(e) <= todayDate.getFullYear());


        // A continuación esta un if para actualizar los datos del todayNotes.
        if (state.todayNotes.length !== 0) {
            state.todayNotes.forEach(item => {
                let infoDate = new Date(item.date);
                let year = infoDate.getFullYear();
                let mes = infoDate.getDate();
                if (infoDate.getDate() !== todayDate.getDate()) {
                    if (state.pastNotes[year] === undefined) {
                        state.pastNotes[year] = new Object();
                        state.pastNotes[year][mes] = new Array();
                        state.pastNotes[year][mes].push(item);
                    } else {
                        if (state.pastNotes[year][mes] == undefined) state.pastNotes[year][mes] = [item]
                        else state.pastNotes[year][mes].push(item);
                    }
                    state.todayNotes = state.todayNotes.filter(e => e.id !== item.id);
                }
            })
        }


        if (yearNotes.length !== 0) {
            // este forEach trabaja con los diferentes años en el objeto notes;
            yearNotes.forEach(e => {
                if (Number(e) < todayDate.getFullYear()) {
                    state.pastNotes[e] = state.notes[e];
                    delete state.notes[e];
                } else {
                    let Months = Object.keys(state.notes[e]).filter(el => Number(el) <= todayDate.getMonth());
                    // Este forEach trabaja con los meses dentro de los años.
                    Months.forEach((elemento) => {
                        if (Number(elemento) < todayDate.getMonth()) {
                            state.pastNotes[e][elemento] = state.notes[e][elemento];
                            delete state.notes[e][elemento];
                            Object.keys(state.notes[e]).length === 0 && delete state.notes[e];
                        } else {
                            // En este forEach manejamos las notas individualmente.
                            state.notes[e][elemento].forEach(el => {
                                let dateInfo = new Date(el.date);
                                if (dateInfo.getDate() < todayDate.getDate()) {
                                    if (state.pastNotes[e] == undefined) {
                                        state.pastNotes[e] = new Object();
                                        state.pastNotes[e][elemento] = new Array();
                                        state.pastNotes[e][elemento].push(el);
                                    } else {
                                        if (state.pastNotes[e][elemento] == undefined)
                                            state.pastNotes[e][elemento] = [el]
                                        else state.pastNotes[e][elemento].push(el)
                                    }
                                    state.notes[e][elemento] = state.notes[e][elemento].filter(item => item.id !== el.id);
                                    state.notes[e][elemento].length === 0 && delete state.notes[e][elemento];
                                    Object.keys(state.notes[e]).length === 0 && delete state.notes[e];
                                }
                                if (dateInfo.getDate() == todayDate.getDate()) {
                                    state.todayNotes.push(el);
                                    state.notes[e][elemento] = state.notes[e][elemento].filter(item => item.id !== el.id);
                                    state.notes[e][elemento].length === 0 && delete state.notes[e][elemento];
                                    Object.keys(state.notes[e]).length === 0 && delete state.notes[e];
                                }
                            })
                        }
                    })
                }
            })
        }
    }

    switch (action.type) {
        case "CHANGE_LANGUAGE": {
            state.languageIndex = action.item;
            updateNotes();
            return state
        }
            break;
        case "CHANGE_THEME": {
            state.themeIndex = action.item;
            updateNotes()
            return state
        }
            break;
        case "UPDATE_DATA": {
            const infoStringify = JSON.parse(action.info);
            state = infoStringify;
            updateNotes();
            return state
        }
            break;
        case "UPDATE_NOTE": {
            const TODAY_NOTES = new Date();
            const ITEM_DAY = new Date(action.item['date']).getDate();
            const ITEM_MONTH = new Date(action.item['date']).getMonth();
            const ITEM_YEAR = new Date(action.item['date']).getFullYear();
            const OI_DAY = new Date(action.oldItem['date']).getDate();
            const OI_MONTH = new Date(action.oldItem['date']).getMonth();
            const OI_YEAR = new Date(action.oldItem['date']).getFullYear();

            //  A continuación tenemos la función para eliminar los datos de la nota antigua pera luego crear una nueva con los datos.
            if (OI_YEAR === TODAY_NOTES.getFullYear() && OI_MONTH === TODAY_NOTES.getMonth() && OI_DAY === TODAY_NOTES.getDate()) {
                state.todayNotes = state.todayNotes.filter(e => e.id !== action.oldItem.id);
            } else {
                state.notes[OI_YEAR][OI_MONTH] = state.notes[OI_YEAR][OI_MONTH].filter(e => e.id !== action.oldItem.id);
                state.notes[OI_YEAR][OI_MONTH].length === 0 && delete state.notes[OI_YEAR][OI_MONTH];
                Object.keys(state.notes[OI_YEAR]).length === 0 && delete state.notes[OI_YEAR];
            }

            //A continuación una función para crear una nueva nota e ubicaría en un sitio.
            if (ITEM_YEAR === TODAY_NOTES.getFullYear() && ITEM_MONTH === TODAY_NOTES.getMonth() && ITEM_DAY === TODAY_NOTES.getDate()) {
                state.todayNotes.push(action.item);
            } else {
                if (state.notes[ITEM_YEAR] === undefined) {
                    state.notes[ITEM_YEAR] = new Object;
                    state.notes[ITEM_YEAR][ITEM_MONTH] = [action.item];
                } else {
                    state.notes[ITEM_YEAR][ITEM_MONTH].push(action.item);
                }
            }

            updateNotes();
            return state
        }
            break;
        case "ADD_NOTE": {
            const year = new Date(action.item['date']).getFullYear();
            const month = new Date(action.item['date']).getMonth();

            if (state.notes[year] === undefined) {
                state.notes[year] = new Object;
                state.notes[year][month] = [action.item];
            }
            else {
                if (state.notes[year][month] === undefined) { state.notes[year][month] = [action.item] }
                else { state.notes[year][month].push(action.item) }
            }
            updateNotes();
            return state
        }
            break;
        case "REMOVE_NOTE": {
            const TODAY_DATE = new Date();
            const dateDay = new Date(action.item['date']).getDate();
            const year = new Date(action.item['date']).getFullYear();
            const month = new Date(action.item['date']).getMonth();

            if (TODAY_DATE.getFullYear() === year && TODAY_DATE.getMonth() === month && TODAY_DATE.getDate() === dateDay) {
                state.todayNotes = state.todayNotes.filter(element => element.id !== action.item.id);
            } else {
                state.notes[year][month] = state.notes[year][month].filter(e => e.id !== action.item.id);
                state.notes[year][month].length === 0 && delete state.notes[year][month];
                Object.keys(state.notes[year]).length === 0 && delete state.notes[year];
            }

            updateNotes();
            return state
        }
            break;
        default:{
            updateNotes();
            return state
        }
            break;
    }
}
const DataContext = createContext();

function InfoContext({ children }) {
    const [info, dispatchFunction] = useReducer(reducer, initialState);
    const [switchFunction, setSwitchFunction] = useState(true);

    useEffect(() => {
        async function updateInfo() {
            await AsyncStorage.clear();
            let data = await AsyncStorage.getItem('info');
            if (data !== null) {
                dispatchInfo({ type: "UPDATE_DATA", info: data });
                setSwitchFunction(!switchFunction);
            }
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