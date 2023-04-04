import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BtnAddNoteModal, BtnRemoveNoteModal } from './Btns.js';
import { DataContext } from '../App';
import { v4 as uuidv4 } from 'uuid';

export function ModalComponent(props) {
    const [idNumber, setIdNumber] = useState(null);
    const [fecha, setFecha] = useState(new Date());
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('date');
    const { info, dispatch } = useContext(DataContext);



    useEffect(() => {
        if (props.modal.modal === undefined) {
            setIdNumber(uuidv4());
        } else {
            setIdNumber(props.modal.modal.id);
            setFecha(props.modal.modal.date);
            setText(props.modal.modal.note)
        }
    }, []);



    function ModalPress(e) {
        setMode(e);
        setShowModal(true);
    }

    function sendInfo() {
        let item = {
            date: fecha,
            note: text,
            id: idNumber
        }

        let modalOk = props.modal.modal;
        dispatch({
            type: (modalOk === undefined ? "ADD_NOTE" : "UPDATE_DATA"),
            item: { item: item, oldItem: props.modal.modal }
        });
        props.modal.setModal(null);
    }

    function removeInfo() {
        dispatch({ type: 'REMOVE_NOTE', item: { item: props.modal.modal, oldItem: undefined } })
        props.modal.setModal(null);
    }



    return (
        <View style={info.theme === "light" ? styles.modalLight : styles.modalDark} >
            <Text style={info.theme === 'light' ? styles.infoTextLight : styles.infoTextDark }>
                {props.modal.modal === undefined ? "Nota nueva" : "Editar nota"}</Text>
            <View style={styles.BoxHoraFecha}>
                <TouchableOpacity style={styles.Fecha} onPress={() => ModalPress('date')}>
                    <Text style={info.theme == "light" ? styles.horaFechaTitle : styles.horaFechaTitleDark}>Fecha</Text>
                    <Text style={info.theme == "light" ? styles.horaFechaTextLight : styles.horaFechaTextDark}
                    >{fecha.getDate() + " / " + (fecha.getMonth() + 1) + ' / ' + fecha.getFullYear()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Hora} onPress={() => ModalPress('time')} >
                    <Text style={info.theme == "light" ? styles.horaFechaTitle : styles.horaFechaTitleDark}>Hora</Text>
                    <Text style={info.theme == "light" ? styles.horaFechaTextLight : styles.horaFechaTextDark}
                    >{fecha.getHours() + ":" + fecha.getMinutes()}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.BoxAsuntos}>
                <Text style={info.theme == "light" ? styles.horaFechaTitle : styles.horaFechaTitleDark}>Asunto</Text>
                <TextInput
                    defaultValue={text}
                    style={info.theme === "light" ? styles.asuntoLight : styles.asuntoDark}
                    multiline={true}
                    onChange={e => { setText(e.nativeEvent.text) }}
                    autoCapitalize='sentences'
                    cursorColor={info.theme === 'light' ? '#000' : '#fff'}
                    inputMode='text'
                    maxLength={500}
                />
            </View>
            <View style={styles.btnBox}>
                {props.modal.modal !== undefined && <BtnRemoveNoteModal RI={removeInfo} />}
                <BtnAddNoteModal SI={sendInfo} showModal={text !== "" ? false : true} />
            </View>
            {showModal
                &&
                <DateTimePicker
                    value={fecha}
                    mode={mode}
                    minimumDate={new Date()}
                    is24Hour={true}
                    onChange={(e, selectedData) => { setFecha(selectedData); setShowModal(false) }}
                />}
            <TouchableOpacity
                style={info.theme === "light" ? styles.btnCloseLight : styles.btnCloseDark}
                onPress={() => props.modal.setModal(null)}
            >
                <Text style={info.theme === 'light' ? styles.textBtnCloseLight : styles.textBtnCloseDark}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    infoTextLight: {
        fontSize:34,
        position: 'absolute',
        top: 30,
        left: 40,
        color: '#000'
    },
    infoTextDark: {
        fontSize:34,
        position: 'absolute',
        top: 30,
        left: 40,
        color: '#fff',
    },
    btnCloseLight: {
        width: 80,
        height: 45,
        backgroundColor: '#C0C2C8',
        position: 'absolute',
        top: 30,
        right: 38,
        borderRadius: 5,

    },
    btnCloseDark: {
        width: 80,
        height: 45,
        backgroundColor: '#404040',
        position: 'absolute',
        top: 30,
        right: 38,
        borderRadius: 5,

    },
    textBtnCloseLight: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25
    },
    textBtnCloseDark: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        color: '#fff'
    },
    modalLight: {
        width: '100%',
        height: "100%",
        paddingVertical: "22%",
        backgroundColor: '#f1f1f1',
        position: 'absolute',
        display: 'flex',
        zIndex: 101,
    },
    modalDark: {
        width: '100%',
        height: "100%",
        paddingVertical: "22%",
        backgroundColor: '#1f1f1f',
        position: 'absolute',
        display: 'flex',
        zIndex: 101,
    },
    BoxHoraFecha: {
        width: '86%',
        height: 70,
        alignSelf: 'center',
    },
    Fecha: {
        height: '100%',
        width: 200,
        position: 'absolute',
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
    }
    ,
    Hora: {
        width: 180,
        height: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
    },
    horaFechaTextLight: {
        width: '100%',
        height: 40,
        fontSize: 22,
        paddingBottom: 5,
        backgroundColor: '#C0C2C8',
        textAlign: 'center',
        borderBottomWidth: 3,
        textAlignVertical: 'bottom'
    },
    horaFechaTextDark: {
        width: '100%',
        height: 40,
        fontSize: 22,
        paddingBottom: 5,
        backgroundColor: '#404040',
        textAlign: 'center',
        borderBottomWidth: 3,
        textAlignVertical: 'bottom',
        borderBottomColor: '#fff',
        color: '#fff'
    },
    horaFechaTitleLight: {
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 5,
    },
    horaFechaTitleDark: {
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 5,
        color: '#fff'
    },
    BoxAsuntos: {
        width: "86%",
        height: '50%',
        marginVertical: 40,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    asuntoLight: {
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: '#C0C2C8',
        textAlignVertical: 'top',
        fontSize: 20,
        borderRadius: 3,
        borderBottomWidth: 4,
        color: '#000'
    },
    asuntoDark: {
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: '#404040',
        textAlignVertical: 'top',
        fontSize: 20,
        borderRadius: 3,
        borderBottomWidth: 4,
        borderBottomColor: '#fff',
        color: '#fff'
    },
    btnBox: {
        width: '86%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 40
    },
});