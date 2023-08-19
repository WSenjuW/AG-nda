import { useContext, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { DataContext } from "../Navigation_InfoContext/InfoContext";
import { MENU } from '../StaticText.json';

export default function Menu({ navigation }) {
    const { themeList, themeIndex, languageList, languageIndex, pastNotes, notes } = useContext(DataContext).info;
    const PN_Length = useRef(0);

    useEffect(() => {
        // Este useEffect sirve para actualizar la cantidad de notas antiguas.
        let valueLength = 0;
        if (Object.keys(pastNotes).length !== 0) {
            Object.keys(pastNotes).forEach((element) => {
               Object.keys(pastNotes[element]).forEach((el) =>{
                  valueLength += pastNotes[element][el].length;
               })
            });
        };
        PN_Length.current = valueLength;
    });

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
                >{MENU.STT[languageList[languageIndex]]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('pastNotes')}
                style={{
                    ...styles.menuItem,
                    borderColor: themeList[themeIndex].textColor,
                    backgroundColor: (themeList[themeIndex].btnBackground)
                }}
            >
                <Text style={{
                    ...styles.menuItemText,
                    color: themeList[themeIndex].textColor
                }}>
                    {MENU.P_N[languageList[languageIndex]]}
                </Text>
                <Text
                    style={{
                        ...styles.PN_length_Styles,
                        color: themeList[themeIndex].textColor,
                    }}
                >
                    {PN_Length.current}
                </Text>
            </TouchableOpacity>
            <Text style={{
                ...styles.infoDeveloped,
                color: themeList[themeIndex].textColor
            }}
            >Developed by M.M</Text>
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
    PN_length_Styles: {
        height: '100%',
        textAlignVertical: 'center',
        position: 'absolute',
        right: 22,
        fontSize: 20,
    }
});