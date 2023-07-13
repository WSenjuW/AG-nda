import { ScrollView, StyleSheet, Text, View, StatusBar } from "react-native";
import { DataContext } from "./Navigation_InfoContext/InfoContext";
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { MONTHS, MONTHS_COLORS, PAST_NOTES_MSG } from './StaticText.json';


function PastNotesScreen({ navigation }) {
    const { themeList, themeIndex, languageList, languageIndex, pastNotes } = useContext(DataContext).info;
    return (
        <View style={{ ...styles.viewContainer, backgroundColor: themeList[themeIndex].background }} >
            <StatusBar
                barStyle={themeList[themeIndex].typeTheme == 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={themeList[themeIndex].btnBackground}
            />
            <ScrollView style={styles.scrollViewBox}>
                {   
                    Object.keys(pastNotes).length === 0
                    ?
                    <Text style={{...styles.msgAlert, color:themeList[themeIndex].textColor}}>{PAST_NOTES_MSG[languageList[languageIndex]]}</Text>
                    :
                    Object.keys(pastNotes).map((element) =>
                        <View key={uuidv4()} style={styles.boxYear}>
                            <Text style={{ ...styles.textYear, borderBottomColor: themeList[themeIndex].textColor, color: themeList[themeIndex].textColor }}>{element}</Text>
                            {
                                Object.keys(pastNotes[element]).map((el) =>
                                    <View style={styles.monthBox} key={uuidv4()}>
                                        {
                                            pastNotes[element][el].map((elemento) =>
                                                <View
                                                    style={{ ...styles.itemList, backgroundColor: themeList[themeIndex].btnBackground }}
                                                    key={uuidv4()}
                                                >
                                                    <View style={styles.dateBox}>
                                                        <Text style={{ ...styles.DB_Month, backgroundColor: MONTHS_COLORS[el] }}>
                                                            {MONTHS[languageList[languageIndex]][el]}
                                                        </Text>
                                                        <Text style={styles.DB_Day}>
                                                            {new Date(elemento.date).getDate()}
                                                        </Text>
                                                    </View>
                                                    <Text style={{ ...styles.msg, color: themeList[themeIndex].textColor }}>
                                                        {elemento.note}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </ScrollView>
        </View >
    )
};

const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        justifyContent: 'center'
    },
    yearInfo: {
        fontSize: 20,
        borderBottomWidth: 1,
        backgroundColor: 'red'
    },
    scrollViewBox: {
        width: '94%',
        maxHeight: "96%",
        alignSelf: 'center',
    },
    boxYear: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    textYear: {
        fontSize: 20,
        letterSpacing: 2,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    monthBox: {
        width: '100%',
        height: 'auto',
        marginVertical: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    itemList: {
        width: '100%',
        minHeight: 120,
        height: 'auto',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        padding: 5
    },
    dateBox: {
        width: 118,
        height: 112,
        backgroundColor: '#f1f1f1',
        alignSelf: 'center',
        borderRadius: 14,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    },
    DB_Month: {
        width: '100%',
        height: '28%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#fff'
    },
    DB_Day: {
        width: '100%',
        height: '70%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 60,
        color: 'gray'
    },
    msg: {
        width: 360,
        minHeight: 110,
        height: 'auto',
        marginLeft: 10,
        fontSize: 24,
        textAlignVertical: 'center',
        paddingVertical: 4,
        paddingLeft: 12
    },
    msgAlert:{
        color:"#fff",
        fontSize:28,
        textAlign:'center',
        marginTop:'50%'

    }
});

export default PastNotesScreen;