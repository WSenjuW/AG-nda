import { DataContext } from '../Navigation_InfoContext/InfoContext';
import TodayItem from "./todayItem";
import ItemDate from "./itemDate";
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';


export function NotesItems({ navigation, setModal }) {
    let { todayNotes, notes } = useContext(DataContext).info;

    return (
        <>
            {todayNotes.length !== 0
                &&
                <TodayItem setModal={setModal} navigation={navigation} />
            }
            {
                Object.keys(notes).length !== 0 &&
                Object.keys(notes).map((element) => <ItemDate key={uuidv4()} navigation={navigation}
                    element={element} setModal={setModal}
                />)
            }
        </>
    );
};
