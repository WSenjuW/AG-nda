import { useState, useEffect, useReducer, createContext } from 'react';


const initialState = {
    theme: 'light',
    background: '#f1f1f1',
    notes: [],
}


const reducer = (state, action) => {

    switch (action.type) {
        case "CHANGE_THEME": return { ...state, theme: action.value }
            break;
        case "CHANGE_BACKGROUND": return { ...state, background: action.value }
            break;
        case "UPDATE_DATA": {
            const year = action.item.item['date'].getFullYear();
            const month = action.item.item['date'].getMonth();
            let yearOldItem = action.item.oldItem.date.getFullYear().toString();
            let monthOldItem = action.item.oldItem.date.getMonth();

            let indexYearOld = state.notes.findIndex(e => e.year == yearOldItem);
            let indexMonthOld = state.notes[indexYearOld].NLY.findIndex(e => e.month == monthOldItem);

            state.notes[indexYearOld].NLY[indexMonthOld].NLM = [...state.notes[indexYearOld].NLY[indexMonthOld].NLM.filter(e => e.id !== action.item.oldItem.id)];
            if (state.notes[indexYearOld].NLY[indexMonthOld].NLM.length === 0) {
                state.notes[indexYearOld].NLY = state.notes[indexYearOld].NLY.filter(e => e.month !== monthOldItem);
                if (state.notes[indexYearOld].NLY.length === 0) {
                    state.notes = state.notes.filter(e => e.year !== yearOldItem);
                }
            }


            const indexYear = state.notes.findIndex(e => e.year === year);
            if (indexYear === -1)
                state['notes'].push({ year: year, NLY: [{ month: month, NLM: [action.item.item] }] })
            else {
                const indexMonth = state.notes[indexYear].NLY.findIndex(e => e.month === month);
                if (indexMonth === -1) state.notes[indexYear].NLY.push({ month: month, NLM: [action.item.item] })
                else {
                    const indexItem = state.notes[indexYear].NLY[indexMonth].NLM.findIndex(e => e.id === action.item.item.id);
                    if (indexItem !== -1) Object.assign(state.notes[indexYear].NLY[indexMonth].NLM[indexItem], action.item.item)
                    else state.notes[indexItem].NLY[indexMonth].NLM.push(action.item.item);
                }
            }

            return state
        }
            break;
        case "ADD_NOTE": {
            const year = action.item.item['date'].getFullYear();
            const month = action.item.item['date'].getMonth();
            let indexYear = state.notes.findIndex(e => e.year === year);

            if (indexYear === -1) {
                state['notes'].push({ year: year, NLY: [{ month: month, NLM: [action.item.item] }] });
            }
            else {
                let indexMonth = state.notes[indexYear].NLY.findIndex(e => e.month === month);

                if (indexMonth === -1) state.notes[indexYear].NLY.push({ month: month, NLM: [action.item.item] })
                else state.notes[indexYear].NLY[indexMonth].NLM.push(action.item.item);
            }

            return state
        }
            break;
        case "REMOVE_NOTE": {
            const year = action.item.item['date'].getFullYear();
            const month = action.item.item['date'].getMonth();
            let indexYear = state.notes.findIndex(e => e.year == year);
            let indexMonth = state.notes[indexYear].NLY.findIndex((e) => e.month == month);

            state.notes[indexYear].NLY[indexMonth].NLM = state.notes[indexYear].NLY[indexMonth].NLM.filter(e => e.id !== action.item.item.id);

            if (state.notes[indexYear].NLY[indexMonth].NLM.length === 0) {
                state.notes[indexYear].NLY = state.notes[indexYear].NLY.filter(e => e.month !== month);

                if (state.notes[indexYear].NLY.length === 0) {
                    state.notes = state.notes.filter(e => e.year !== year);
                }
            }
            return state
        }
        default: return state;
            break;
    }
}
const DataContext = createContext();

function InfoContext({ children }) {
    const [info, dispatchInfo] = useReducer(reducer, initialState)

    useEffect(() => {
        const FunctionInfo = async () => {
            if (initialState !== info) {
                await AsyncStorage.setItem('info', JSON.stringify(info));
            }
        }
        FunctionInfo()
    }, [info]);

    return (
        <DataContext.Provider value={{ info: info, dispatch: dispatchInfo }}>
            { children }
        </DataContext.Provider>
    )
}


export { DataContext, InfoContext }