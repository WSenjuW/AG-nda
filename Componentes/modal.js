import DateTimePicker from '@react-native-community/datetimepicker';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated, BackHandler } from 'react-native';
import { useContext, useState, useEffect, useRef } from 'react';
import { BtnAddNoteModal, BtnRemoveNoteModal } from './Btns';
import { DataContext } from './InfoContext';
import { v4 as uuidv4 } from 'uuid';


const modalTitle = {
    EN: {
        es: "Editar nota",
        en: "Edit note"
    },
    CNN: {
        es: "Nota nueva",
        en: 'New note'
    }
}

const LanguageVariables = {
    fecha: {
        es: "Fecha",
        en: "Date"
    },
    hour: {
        es: "Hora",
        en: "Hour"
    },
    msgNote: {
        es: "Asunto",
        en: "Note's subject"
    }
}






export function ModalComponent({ modal }) {
    const [idNumber, setIdNumber] = useState(null);
    const [fecha, setFecha] = useState(new Date());
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('date');
    const { dispatch } = useContext(DataContext);
    const { languageList, languageIndex } = useContext(DataContext).info;

    const contentOpacityRef = useRef(new Animated.Value(0)).current;
    const modalBoxTranslationRef = useRef(new Animated.Value(4000)).current;


    useEffect(() => {
        function backAction() {
            if (modal !== null) {
                modal.setModal(null);
                return true;
            }
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);



    useEffect(() => {
        if (modal.modal === undefined) {
            setIdNumber(uuidv4());
            fecha.setHours(12);
            fecha.setMinutes(0);
        } else {
            setIdNumber(modal.modal.id);
            setFecha( new Date(modal.modal.date));
            setText(modal.modal.note)
        }
    }, []);

    // el siguiente useEfect es para activar las animaciones
    useEffect(() => {
        Animated.timing(modalBoxTranslationRef, { toValue: 0, duration: 200, useNativeDriver: true }).start()
        Animated.timing(contentOpacityRef, { toValue: 1, duration: 300, delay: 200, useNativeDriver: true }).start()
    }, []);



    function ModalPress(e) {
        setMode(e);
        setShowModal(true)
    }

    function sendInfo() {
        let item = {
            date: fecha.toJSON(),
            note: text.trim(),
            id: idNumber
        }
        dispatch({
            type: (modal.modal === undefined ? "ADD_NOTE" : "UPDATE_NOTE"),
            item: { item: item, oldItem: modal.modal }
        });
        modal.setModal(null);
    }

    function removeInfo() {
        dispatch({ type: 'REMOVE_NOTE', item: { item: modal.modal, oldItem: undefined } })
        modal.setModal(null);
    }

    const { themeList, themeIndex } = useContext(DataContext).info;

    return (
        <Animated.View  style={{
            ...styles.boxBackground,
            backgroundColor: themeList[themeIndex].background,
            transform: [

                { translateX: modalBoxTranslationRef }
            ],
        }}>
            <Animated.View ref={contentOpacityRef} style={{ ...styles.modal, opacity: contentOpacityRef }} >
                <View style={styles.boxAuxiliar}>
                    <Text
                        style={{ ...styles.infoText, color: themeList[themeIndex].textColor }}
                    >
                        {modal.modal === undefined ? modalTitle.CNN[languageList[languageIndex]] : modalTitle.EN[languageList[languageIndex]]}
                    </Text>
                    <TouchableOpacity
                        style={{ ...styles.btnClose, backgroundColor: themeList[themeIndex].btnBackground }}
                        onPress={() => modal.setModal(null)}
                    >
                        <Text style={{ ...styles.textBtnClose, color: themeList[themeIndex].btnColor }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.BoxHoraFecha}>
                    <TouchableOpacity style={{ ...styles.Fecha }} onPress={() => ModalPress('date')}>
                        <Text style={{
                            ...styles.horaFechaTitle,
                            color: themeList[themeIndex].textColor
                        }}>{LanguageVariables.fecha[languageList[languageIndex]]}</Text>
                        <Text style={{
                            ...styles.horaFechaText,
                            color: themeList[themeIndex].textColor,
                            backgroundColor: themeList[themeIndex].menuItemBackground,
                            borderBottomColor: themeList[themeIndex].textColor
                        }}
                        >{fecha.getDate() + " / " + (fecha.getMonth() + 1) + ' / ' + fecha.getFullYear()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Hora} onPress={() => ModalPress('time')} >
                        <Text style={{ ...styles.horaFechaTitle, color: themeList[themeIndex].textColor }}>{LanguageVariables.hour[languageList[languageIndex]]}</Text>
                        <Text style={{
                            ...styles.horaFechaText,
                            color: themeList[themeIndex].textColor,
                            backgroundColor: themeList[themeIndex].menuItemBackground,
                            borderBottomColor: themeList[themeIndex].textColor
                        }}
                        >{(fecha.getHours().toString().length === 1 ? ('0' + fecha.getHours()) : fecha.getHours())
                            + " : " +
                            (fecha.getMinutes().toString().length === 1 ? ("0" + fecha.getMinutes()) : fecha.getMinutes())}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.BoxAsuntos}>
                    <Text style={{
                        ...styles.horaFechaTitle,
                        color: themeList[themeIndex].textColor
                    }}>{LanguageVariables.msgNote[languageList[languageIndex]]}</Text>
                    <TextInput
                        defaultValue={text}
                        style={{
                            ...styles.asunto,
                            backgroundColor: themeList[themeIndex].menuItemBackground,
                            borderBottomColor: themeList[themeIndex].textColor,
                            color: themeList[themeIndex].textColor
                        }}
                        multiline={true}
                        onChange={e => { setText(e.nativeEvent.text) }}
                        autoCapitalize='sentences'
                        cursorColor={themeList[themeIndex].textColor}
                        inputMode='text'
                        maxLength={500}
                    />
                </View>
                <View style={styles.btnBox}>
                    {modal.modal !== undefined && <BtnRemoveNoteModal RI={removeInfo} />}
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
            </Animated.View>
        </Animated.View>
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
        borderBottomWidth: 3,
        textAlignVertical: 'bottom'
    },
    horaFechaTitle: {
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 5,
    },
    BoxAsuntos: {
        width: "86%",
        height: '50%',
        marginVertical: 50,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    asunto: {
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