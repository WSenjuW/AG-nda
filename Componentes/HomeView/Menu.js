import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { DataContext } from "../Navigation_InfoContext/InfoContext";

const languageVariable = {
    ajuste: {
        es: 'Ajustes',
        en: 'Settings'
    },
    PN:{
        es:'Notas pasadas',
        en:'Past notes'
    }
}

export default function Menu({ navigation }) {
    const { themeList, themeIndex, languageList, languageIndex, pastNotes } = useContext(DataContext).info;

    return (
        <View style={{ ...styles.menuBox, backgroundColor: themeList[themeIndex].background }}>
            <TouchableOpacity
                style={{
                    ...styles.menuItem,
                    borderColor: themeList[themeIndex].textColor
                }}
                onPress={() => navigation.navigate('Settings')}
            >
                <Text style={{
                    ...styles.menuItemText,
                    backgroundColor: (themeList[themeIndex].btnBackground),
                    color: themeList[themeIndex].textColor
                }}
                >{languageVariable.ajuste[languageList[languageIndex]]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                ...styles.menuItem,
                borderColor: themeList[themeIndex].textColor,
                backgroundColor: (themeList[themeIndex].btnBackground)
            }}
            >
                <Text style={{
                    ...styles.menuItemText,
                    color: themeList[themeIndex].textColor
                }}>
                {languageVariable.PN[languageList[languageIndex]]}
                </Text>
            </TouchableOpacity>
            <Text style={{ ...styles.infoDeveloped, color: themeList[themeIndex].textColor }}>Developed by WSenjuW</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoDeveloped: {
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        fontSize: 16
    },
    menuBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 50,
        overflow: 'hidden'
    },
    menuItem: {
        width: "92%",
        height: 50,
        alignSelf: 'center',
        borderLeftWidth: 4,
        marginBottom: 30,
        borderRadius: 5,
        overflow: 'hidden'
    },
    menuItemText: {
        width: '100%',
        minWidth: 200,
        height: "100%",
        textAlignVertical: 'center',
        fontSize: 18,
        paddingLeft: 8,
        letterSpacing: 2,
    },
});