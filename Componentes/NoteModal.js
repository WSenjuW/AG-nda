import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useContext, useState, useEffect, useRef } from 'react';
import { BtnAddNoteModal, BtnRemoveNoteModal } from './Btns';
import { DataContext } from './Navigation_InfoContext/InfoContext';
import { v4 as uuidv4 } from 'uuid';
import { ASUNTO, HOUR, FECHA, EDIT_NOTE , NEW_NOTE } from './StaticText.json';

export default function NoteModal({ modal, setModal, navigation }) {
    const [idNumber, setIdNumber] = useState(null);
    const [fecha, setFecha] = useState(new Date());
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('date');
    const { dispatch } = useContext(DataContext);
    const { languageList,
        languageIndex,
        themeList,
        themeIndex } = useContext(DataContext).info;

    // Este useEffect tiene la funcion de elegir la funcion a seguir, si crear una nueva nota, o si modificar una existente.
    useEffect(() => {
        if (modal === undefined) {
            setIdNumber(uuidv4());
            fecha.setHours(12);
            fecha.setMinutes(0);
        } else {
            setIdNumber(modal.id);
            setFecha(new Date(modal.date));
            setText(modal.note);
        }
    }, []);

    // Esta funcion tiene la tarea de elegir el tipo de modal DatePicker y de mostrarlo. 
    function ModalPress(e) { setMode(e); setShowModal(true) }

    // Esta es una funcion designada para los botones de Agregar/Modificar o borrar la información de una nota.
    function sendInfo() {
        let item = {
            date: fecha.toJSON(),
            note: text.trim(),
            id: idNumber
        }
        dispatch({
            type: (modal === undefined ? "ADD_NOTE" : "UPDATE_NOTE"),
            item: item,
            oldItem: modal
        });
        setModal(undefined);
        navigation.navigate('Home');
    }
    // Esta funcion tiene la tarea de eliminar una nota.
    function removeInfo() {
        dispatch({
            type: 'REMOVE_NOTE',
            item: modal,
            oldItem: undefined
        });
        setModal(undefined);
        navigation.navigate("Home");
    };

    return (
        <View style={{
            ...styles.boxBackground,
            backgroundColor: themeList[themeIndex].background,
        }}>
            <View style={styles.modal} >
                <View style={styles.boxAuxiliar}>
                    <Text
                        style={{
                            ...styles.infoText,
                            color: themeList[themeIndex].textColor
                        }}
                    >
                        {modal === undefined ? NEW_NOTE[languageList[languageIndex]] : EDIT_NOTE[languageList[languageIndex]]}
                    </Text>
                    <TouchableOpacity
                        style={{
                            ...styles.btnClose,
                            backgroundColor: themeList[themeIndex].btnBackground
                        }}
                        onPress={() => { setModal(undefined), navigation.navigate("Home") }}
                    >
                        <Text style={{
                            ...styles.textBtnClose,
                            color: themeList[themeIndex].textColor
                        }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.BoxHoraFecha}>
                    <TouchableOpacity style={styles.Fecha} onPress={() => ModalPress('date')}>
                        <Text style={{
                            ...styles.horaFechaTitle,
                            color: themeList[themeIndex].textColor
                        }}>{FECHA[languageList[languageIndex]]}</Text>
                        <Text style={{
                            ...styles.horaFechaText,
                            color: themeList[themeIndex].textColor,
                            backgroundColor: themeList[themeIndex].btnBackground,
                            borderBottomColor: themeList[themeIndex].textColor
                        }}
                        >{fecha.getDate() + " / " + (fecha.getMonth() + 1) + ' / ' + fecha.getFullYear()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Hora} onPress={() => ModalPress('time')} >
                        <Text style={{
                            ...styles.horaFechaTitle,
                            color: themeList[themeIndex].textColor
                        }}>{HOUR[languageList[languageIndex]]}</Text>
                        <Text style={{
                            ...styles.horaFechaText,
                            color: themeList[themeIndex].textColor,
                            backgroundColor: themeList[themeIndex].btnBackground,
                            borderBottomColor: themeList[themeIndex].textColor
                        }}
                        >{(fecha.getHours().toString().length === 1 ? ('0' + fecha.getHours()) : fecha.getHours())
                            + " : " +
                            (fecha.getMinutes().toString().length === 1 ? ("0" + fecha.getMinutes()) : fecha.getMinutes())}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.BoxAsuntos, borderBottomColor: themeList[themeIndex].textColor }}>
                    <Text style={{
                        ...styles.horaFechaTitle,
                        color: themeList[themeIndex].textColor
                    }}>{ASUNTO[languageList[languageIndex]]}</Text>
                    <TextInput
                        defaultValue={text}
                        style={{
                            ...styles.asunto,
                            backgroundColor: themeList[themeIndex].btnBackground,
                            color: themeList[themeIndex].textColor,
                        }}
                        onChange={e => { setText(e.nativeEvent.text) }}
                        autoCapitalize='sentences'
                        cursorColor={themeList[themeIndex].textColor}
                        inputMode='text'
                        multiline={true}
                        numberOfLines={19}
                        maxLength={200}
                    />
                    <Text style={{...styles.limitLength, color:themeList[themeIndex].textColor}}>{ text.length + ' / 200'}</Text>
                </View>
                <View style={styles.btnBox}>
                    {modal !== undefined && <BtnRemoveNoteModal RI={removeInfo} />}
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxBackground: {
        height: "100%",
        width: '100%',
        zIndex: 101,
        position: "absolute",
        top: 0,
        paddingBottom: 140,
        overflow: 'hidden'
    },
    modal: {
        width: '100%',
        height: "100%",
        display: 'flex',
        zIndex: 101,
    },
    boxAuxiliar: {
        width: "86%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 80
    },
    infoText: {
        fontSize: 34,
        width: 260,
        color: '#000'
    },
    btnClose: {
        width: 80,
        height: 45,
        backgroundColor: '#C0C2C8',
        borderRadius: 5,
    },
    textBtnClose: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25
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
    },
    Hora: {
        width: 180,
        height: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
    },
    horaFechaText: {
        width: '100%',
        height: 40,
        fontSize: 22,
        paddingBottom: 5,
        backgroundColor: '#C0C2C8',
        textAlign: 'center',
        borderBottomWidth: 2,
        textAlignVertical: 'bottom',
    },
    horaFechaTitle: {
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 5,
        letterSpacing: 1.6
    },
    BoxAsuntos: {
        width: "86%",
        height: "50%",
        marginVertical: 50,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderBottomWidth: 3
    },
    asunto: {
        width: '100%',
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#C0C2C8',
        textAlignVertical: 'top',
        fontSize: 28,
        color: '#000',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    limitLength:{
        position:'absolute',
        bottom:10,
        right:10
    },
    btnBox: {
        width: '86%',
        height: 80,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40
    },
});